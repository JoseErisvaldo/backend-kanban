import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTaskStatusResponseSchema } from "../../schema/taskStatuses";

class ReorderTaskStatusesService {
  async execute({
    project_id,
    order,
  }: {
    project_id: string;
    order: string[];
  }) {
    try {
      const existingProject = await prismaClient.project.findFirst({
        where: { id: project_id },
      });

      if (!existingProject) {
        return Promise.reject(new Error("Projeto não encontrado"));
      }

      const statuses = await prismaClient.taskStatus.findMany({
        where: { projectId: project_id },
      });

      if (!statuses || statuses.length === 0) {
        return Promise.reject(
          new Error("Nenhum status encontrado para este projeto"),
        );
      }

      const existingIds = new Set(statuses.map((s) => s.id));
      const providedIds = new Set(order);

      if (existingIds.size !== providedIds.size) {
        return Promise.reject(new Error("Lista de statuses inválida"));
      }

      for (const id of providedIds) {
        if (!existingIds.has(id)) {
          return Promise.reject(
            new Error("Lista de statuses contém IDs inválidos"),
          );
        }
      }

      const updates = order.map((id, idx) =>
        prismaClient.taskStatus.update({
          where: { id },
          data: { position: idx + 1 },
        }),
      );

      await prismaClient.$transaction(updates);

      const updated = await prismaClient.taskStatus.findMany({
        where: { projectId: project_id },
        orderBy: { position: "asc" },
      });

      return GetTaskStatusResponseSchema.parse(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);

        return Promise.reject(
          new Error("Erro de validação dos status de tarefa"),
        );
      } else {
        console.error("Erro ao reordenar status:", error);

        return Promise.reject(
          new Error("Erro ao reordenar os status de tarefa"),
        );
      }
    }
  }
}

export { ReorderTaskStatusesService };

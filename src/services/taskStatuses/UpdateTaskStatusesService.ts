import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { UpdateTaskStatusesResponseSchema } from "../../schema/taskStatuses";

class UpdateTaskStatusesService {
  async execute({
    project_id,
    id,
    name,
  }: {
    project_id: string;
    id: string;
    name: string;
  }) {
    try {
      const existingProject = await prismaClient.project.findFirst({
        where: { id: project_id },
      });

      if (!existingProject) {
        return Promise.reject(new Error("Projeto não encontrado"));
      }

      const existingStatus = await prismaClient.taskStatus.findUnique({
        where: { id },
      });

      if (existingStatus?.name === name) {
        return Promise.reject(
          new Error("Nome do status de tarefa é o mesmo que o atual"),
        );
      }

      if (!existingStatus || existingStatus.projectId !== project_id) {
        return Promise.reject(
          new Error("Status de tarefa não encontrado para este projeto"),
        );
      }

      const duplicate = await prismaClient.taskStatus.findFirst({
        where: {
          projectId: project_id,
          name,
          AND: [{ id: { not: id } }],
        },
      });

      if (duplicate) {
        return Promise.reject(
          new Error("Já existe um status com esse nome neste projeto"),
        );
      }

      const updated = await prismaClient.taskStatus.update({
        where: { id },
        data: { name },
      });

      return UpdateTaskStatusesResponseSchema.parse(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);

        throw new Error("Erro de validação dos status de tarefa");
      } else {
        console.error("Erro ao atualizar dados da tarefa:", error);

        throw new Error("Erro ao atualizar dados da tarefa");
      }
    }
  }
}

export { UpdateTaskStatusesService };

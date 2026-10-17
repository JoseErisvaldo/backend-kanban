import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { DeleteTaskStatusesResponseSchema } from "../../schema/taskStatuses.js";

class DeleteTaskStatusesService {
  async execute({ project_id, id }: { project_id: string; id: string }) {
    try {
      const existingStatus = await prismaClient.taskStatus.findUnique({
        select: {
          id: true,
          projectId: true,
          tasks: true,
        },
        where: { id },
      });

      if (!existingStatus || existingStatus.projectId !== project_id) {
        return Promise.reject(
          new Error("Status de tarefa não encontrado para este projeto"),
        );
      }

      if (existingStatus.tasks && existingStatus.tasks.length > 0) {
        return Promise.reject(
          new Error(
            "Não é possível deletar um status que possui tarefas associadas",
          ),
        );
      }

      await prismaClient.taskStatus.delete({ where: { id } });

      return DeleteTaskStatusesResponseSchema.parse({
        message: "Status deletado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return Promise.reject(error);
      } else {
        if (error instanceof ZodError) {
          console.error("Erro de schema:", error.issues);

          return Promise.reject(
            new Error("Erro de validação dos status de tarefa"),
          );
        } else {
          console.error("Erro ao deletar status:", error);

          return Promise.reject(
            new Error("Erro ao deletar o status de tarefa"),
          );
        }
      }
    }
  }
}

export { DeleteTaskStatusesService };

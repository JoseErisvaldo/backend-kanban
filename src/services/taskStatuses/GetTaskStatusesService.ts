import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTaskStatusResponseSchema } from "../../schema/taskStatuses";

interface TaskStatuses {
  projectId: string;
}

class GetTaskStatusesService {
  async execute(projectId: string): Promise<TaskStatuses[]> {
    try {
      const taskStatuses = await prismaClient.taskStatus.findMany({
        where: projectId ? { projectId } : undefined,
      });

      if (!taskStatuses || taskStatuses.length === 0) {
        return Promise.reject(
          new Error("Nenhum status de tarefa encontrado para este projeto"),
        );
      }

      const orderedTaskStatuses = taskStatuses.sort(
        (a, b) => a.position - b.position,
      );

      return GetTaskStatusResponseSchema.parse(orderedTaskStatuses);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);

        throw new Error("Erro de validação dos status de tarefa");
      } else {
        console.error("Erro ao buscar status de tarefa:", error);

        throw new Error("Erro ao buscar os status de tarefa");
      }
    }
  }
}

export { GetTaskStatusesService };

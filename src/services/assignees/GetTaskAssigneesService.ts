import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTaskAssigneesResponseSchema } from "../../schema/tasks";

class GetTaskAssigneesService {
  async execute(taskId: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (!task) throw new Error("Task não encontrada");

      const assignees = await prismaClient.taskAssignee.findMany({
        where: { taskId },
        select: {
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "asc" },
      });

      return GetTaskAssigneesResponseSchema.parse(assignees);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (responsáveis):", error.issues);
        throw new Error("Erro de validação ao listar responsáveis");
      }

      if (error instanceof Error) throw error;

      console.error("Erro ao listar responsáveis:", error);
      throw new Error("Erro ao listar responsáveis da task");
    }
  }
}

export { GetTaskAssigneesService };

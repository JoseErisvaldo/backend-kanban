import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTaskCommentsResponseSchema } from "../../schema/tasks";

class GetTaskCommentsService {
  async execute(taskId: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const comments = await prismaClient.taskComment.findMany({
        where: { taskId },
        select: {
          id: true,
          body: true,
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "asc" },
      });

      return GetTaskCommentsResponseSchema.parse(comments);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (comentários):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao listar comentários"),
        );
      }

      console.error("Erro ao listar comentários:", error);
      return Promise.reject(new Error("Erro ao listar comentários"));
    }
  }
}

export { GetTaskCommentsService };

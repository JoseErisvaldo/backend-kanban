import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { TaskCommentSchema } from "../../schema/tasks.js";

class CreateTaskCommentService {
  async execute(taskId: string, userId: string, body: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
      });
      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const created = await prismaClient.taskComment.create({
        data: {
          taskId,
          userId,
          body,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
      });

      return TaskCommentSchema.parse(created);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (comentário):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao criar comentário"),
        );
      }

      console.error("Erro ao criar comentário:", error);
      return Promise.reject(new Error("Erro ao criar comentário"));
    }
  }
}

export { CreateTaskCommentService };

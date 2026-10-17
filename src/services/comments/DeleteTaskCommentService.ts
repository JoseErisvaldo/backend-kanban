import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { DeleteTaskCommentResponseSchema } from "../../schema/tasks";

class DeleteTaskCommentService {
  async execute(taskId: string, id: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const comment = await prismaClient.taskComment.findUnique({
        where: { id },
      });
      if (!comment || comment.taskId !== taskId) {
        return Promise.reject(
          new Error("Comentário não encontrado nesta task"),
        );
      }

      await prismaClient.taskComment.delete({ where: { id } });

      return DeleteTaskCommentResponseSchema.parse({
        message: "Comentário deletado com sucesso",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (comentário):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao deletar comentário"),
        );
      }

      console.error("Erro ao deletar comentário:", error);
      return Promise.reject(new Error("Erro ao deletar comentário"));
    }
  }
}

export { DeleteTaskCommentService };

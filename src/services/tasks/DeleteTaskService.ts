import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { DeleteTaskResponseSchema } from "../../schema/tasks.js";

class DeleteTaskService {
  async execute(projectId: string, id: string) {
    try {
      const task = await prismaClient.task.findUnique({ where: { id } });
      if (!task || task.projectId !== projectId)
        return Promise.reject(new Error("Task não encontrada neste projeto"));

      await prismaClient.task.delete({ where: { id } });

      return DeleteTaskResponseSchema.parse({
        message: "Task deletada com sucesso",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (delete):", error.issues);
        return Promise.reject(new Error("Erro de validação ao deletar task"));
      }
      console.error("Erro ao deletar task:", error);
      return Promise.reject(new Error("Erro ao deletar task"));
    }
  }
}

export { DeleteTaskService };

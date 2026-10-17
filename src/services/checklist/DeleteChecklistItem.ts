import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { DeleteChecklistItemResponseSchema } from "../../schema/tasks.js";

class DeleteChecklistItemService {
  async execute(taskId: string, id: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
      });
      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const item = await prismaClient.taskChecklistItem.findUnique({
        where: { id },
      });
      if (!item || item.taskId !== taskId) {
        return Promise.reject(
          new Error("Item da checklist não encontrado nesta task"),
        );
      }

      await prismaClient.taskChecklistItem.delete({ where: { id } });

      return DeleteChecklistItemResponseSchema.parse({
        message: "Item da checklist removido com sucesso",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (checklist):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao remover item da checklist"),
        );
      }

      console.error("Erro ao remover item da checklist:", error);
      return Promise.reject(new Error("Erro ao remover item da checklist"));
    }
  }
}

export { DeleteChecklistItemService };

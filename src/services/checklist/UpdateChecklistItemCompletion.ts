import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { ChecklistItemResponseSchema } from "../../schema/tasks";

class UpdateChecklistItemCompletionService {
  async execute(taskId: string, id: string, isCompleted: boolean) {
    const task = await prismaClient.task.findUnique({ where: { id: taskId } });
    if (!task) return Promise.reject(new Error("Task não encontrada"));

    const item = await prismaClient.taskChecklistItem.findUnique({
      where: { id },
    });
    if (!item || item.taskId !== taskId) {
      return Promise.reject(
        new Error("Item da checklist não encontrado nesta task"),
      );
    }

    try {
      const updated = await prismaClient.taskChecklistItem.update({
        where: { id },
        data: { isCompleted },
      });

      return ChecklistItemResponseSchema.parse({
        id: updated.id,
        taskId: updated.taskId,
        title: updated.title,
        isCompleted: updated.isCompleted,
        position: updated.position,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (checklist):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao atualizar conclusão do item"),
        );
      }

      console.error("Erro ao atualizar conclusão do item:", error);
      return Promise.reject(new Error("Erro ao atualizar conclusão do item"));
    }
  }
}

export { UpdateChecklistItemCompletionService };

import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { ChecklistItemResponseSchema } from "../../schema/tasks";

class CreateChecklistItemService {
  async execute(taskId: string, title: string) {
    try {
      const task = await prismaClient.task.findUnique({ where: { id: taskId } });
      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const position = await prismaClient.taskChecklistItem.count({ where: { taskId } });

      const created = await prismaClient.taskChecklistItem.create({
        data: {
          taskId,
          title,
          position: position + 1,
        },
      });

      return ChecklistItemResponseSchema.parse({
        id: created.id,
        taskId: created.taskId,
        title: created.title,
        isCompleted: created.isCompleted,
        position: created.position,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (checklist):", error.issues);
        return Promise.reject(new Error("Erro de validação ao criar item de checklist"));
      }
      console.error("Erro ao criar item de checklist:", error);
      return Promise.reject(new Error("Erro ao criar item de checklist"));
    }
  }
}

export { CreateChecklistItemService };

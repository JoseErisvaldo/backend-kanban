import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { GetTaskResponseSchema } from "../../schema/tasks.js";
import computeSla from "../../utils/computeSla.js";

class GetTaskByIdService {
  async execute(projectId: string, id: string) {
    try {
      const task = await prismaClient.task.findFirst({
        where: { id, projectId },
        select: {
          id: true,
          project: { select: { id: true, name: true } },
          creator: { select: { id: true, name: true, email: true } },
          type: true,
          status: { select: { id: true, name: true, position: true } },
          title: true,
          description: true,
          position: true,
          dueDate: true,
          createdAt: true,
          assignees: {
            select: { user: { select: { id: true, name: true, email: true } } },
          },
          checklistItems: {
            select: {
              id: true,
              title: true,
              isCompleted: true,
              position: true,
            },
            orderBy: { position: "asc" },
          },
          comments: {
            select: {
              id: true,
              body: true,
              createdAt: true,
              user: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (!task) return Promise.reject(new Error("Task não encontrada"));

      const mapped = {
        id: task.id,
        project: task.project,
        creator: task.creator
          ? { id: task.creator.id, name: task.creator.name }
          : { id: "", name: "" },
        type: task.type,
        status: task.status
          ? { id: task.status.id, name: task.status.name }
          : { id: "", name: "" },
        title: task.title,
        description: task.description,
        position: task.position,
        dueDate: task.dueDate ?? null,
        createdAt: task.createdAt,
        assignees: task.assignees
          ? task.assignees.map((a) => ({ id: a.user.id, name: a.user.name }))
          : [],
        checklist: task.checklistItems
          ? task.checklistItems.map((c) => ({
              id: c.id,
              title: c.title,
              isCompleted: c.isCompleted,
              position: c.position,
            }))
          : [],
        comments: task.comments
          ? task.comments.map((c) => ({
              id: c.id,
              body: c.body,
              createdAt: c.createdAt,
              user: { id: c.user.id, name: c.user.name },
            }))
          : [],
        slaRemainingDays: computeSla(task.createdAt, task.dueDate ?? null),
      };

      return GetTaskResponseSchema.parse(mapped);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (detail):", error.issues);
        return Promise.reject(new Error("Erro de validação da task"));
      }
      console.error("Erro ao buscar task:", error);
      return Promise.reject(new Error("Erro ao buscar a task"));
    }
  }
}

export { GetTaskByIdService };

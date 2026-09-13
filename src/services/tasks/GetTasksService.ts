import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTasksResponseSchema } from "../../schema/tasks";
import computeSla from "../../utils/computeSla";

class GetTasksService {
  async execute(projectId: string) {
    try {
      const tasks = await prismaClient.task.findMany({
        select: {
          id: true,
          projectId: true,
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
          type: true,
          status: {
            select: {
              id: true,
              name: true,
            },
          },
          title: true,
          description: true,
          position: true,
          dueDate: true,
          createdAt: true,
          _count: {
            select: {
              comments: true,
            },
          },
          assignees: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: { projectId },
        orderBy: { position: "asc" },
      });

      if (!tasks) {
        return Promise.reject(
          new Error("Nenhuma task encontrada para este projeto"),
        );
      }

      const mapped = tasks.map((t) => ({
        id: t.id,
        projectId: t.projectId,
        creator: t.creator
          ? { id: t.creator.id, name: t.creator.name }
          : undefined,
        type: t.type,
        status: t.status ? { id: t.status.id, name: t.status.name } : undefined,
        title: t.title,
        description: t.description,
        position: t.position,
        dueDate: t.dueDate,
        createdAt: t.createdAt,
        assignees: t.assignees
          ? t.assignees.map((a) => ({ id: a.user.id, name: a.user.name }))
          : [],
        commentsCount: t._count ? t._count.comments : 0,
        slaRemainingDays: computeSla(t.createdAt, t.dueDate ?? null),
      }));

      return GetTasksResponseSchema.parse(mapped);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);
        return Promise.reject(new Error("Erro de validação das tasks"));
      } else {
        console.error("Erro ao buscar tasks:", error);
        return Promise.reject(new Error("Erro ao buscar as tasks"));
      }
    }
  }
}

export { GetTasksService };

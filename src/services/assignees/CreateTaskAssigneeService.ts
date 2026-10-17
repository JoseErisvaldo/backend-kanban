import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { CreateTaskAssigneeResponseSchema } from "../../schema/tasks.js";

class CreateTaskAssigneeService {
  async execute(taskId: string, userId: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (!task) throw new Error("Task não encontrada");

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true },
      });
      if (!user) throw new Error("Usuário não encontrado");

      const existingAssignee = await prismaClient.taskAssignee.findUnique({
        where: { taskId_userId: { taskId, userId } },
      });
      if (existingAssignee)
        throw new Error("Usuário já é responsável pela task");

      const created = await prismaClient.taskAssignee.create({
        data: { taskId, userId },
        select: {
          taskId: true,
          createdAt: true,
          user: { select: { id: true, name: true } },
        },
      });

      return CreateTaskAssigneeResponseSchema.parse(created);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (responsável):", error.issues);
        throw new Error("Erro de validação ao adicionar responsável");
      }

      if (error instanceof Error) throw error;

      console.error("Erro ao adicionar responsável:", error);
      throw new Error("Erro ao adicionar responsável à task");
    }
  }
}

export { CreateTaskAssigneeService };

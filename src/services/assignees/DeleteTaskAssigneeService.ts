import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { DeleteTaskAssigneeResponseSchema } from "../../schema/tasks";

class DeleteTaskAssigneeService {
  async execute(taskId: string, userId: string) {
    try {
      const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (!task) throw new Error("Task não encontrada");

      const assignee = await prismaClient.taskAssignee.findUnique({
        where: { taskId_userId: { taskId, userId } },
      });
      if (!assignee) {
        throw new Error("Usuário não é responsável por esta task");
      }

      await prismaClient.taskAssignee.delete({
        where: { taskId_userId: { taskId, userId } },
      });

      return DeleteTaskAssigneeResponseSchema.parse({
        message: "Responsável removido da task com sucesso",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (responsável):", error.issues);
        throw new Error("Erro de validação ao remover responsável");
      }

      if (error instanceof Error) throw error;

      console.error("Erro ao remover responsável:", error);
      throw new Error("Erro ao remover responsável da task");
    }
  }
}

export { DeleteTaskAssigneeService };

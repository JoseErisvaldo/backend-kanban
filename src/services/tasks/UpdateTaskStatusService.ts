import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetTaskByIdService } from "./GetTaskByIdService";

class UpdateTaskStatusService {
  async execute(projectId: string, id: string, statusId: string) {
    try {
      const task = await prismaClient.task.findUnique({ where: { id } });
      if (!task || task.projectId !== projectId)
        return Promise.reject(new Error("Task não encontrada neste projeto"));

      const targetStatus = await prismaClient.taskStatus.findUnique({
        where: { id: statusId },
      });
      if (!targetStatus || targetStatus.projectId !== projectId)
        return Promise.reject(new Error("Status inválido para este projeto"));

      if (task.statusId === statusId) {
        const detail = new GetTaskByIdService();
        return detail.execute(projectId, id);
      }

      const oldStatusId = task.statusId;
      const oldPosition = task.position;

      const countInTarget = await prismaClient.task.count({
        where: { projectId, statusId },
      });
      const newPosition = countInTarget + 1;

      await prismaClient.$transaction([
        prismaClient.task.update({
          where: { id },
          data: { statusId, position: newPosition },
        }),
        prismaClient.task.updateMany({
          where: {
            projectId,
            statusId: oldStatusId,
            position: { gt: oldPosition },
          },
          data: { position: { decrement: 1 } },
        }),
      ]);

      const detail = new GetTaskByIdService();
      return detail.execute(projectId, id);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (status):", error.issues);
        return Promise.reject(
          new Error("Erro de validação ao alterar status da task"),
        );
      }
      console.error("Erro ao alterar status da task:", error);
      return Promise.reject(new Error("Erro ao alterar status da task"));
    }
  }
}

export { UpdateTaskStatusService };

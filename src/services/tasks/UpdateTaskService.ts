import { ZodError } from "zod";
import prismaClient from "../../prisma/index.js";
import { GetTaskByIdService } from "./GetTaskByIdService.js";
import { TaskType } from "../../schema/tasks.js";

type UpdateTaskParams = {
  projectId: string;
  id: string;
  data: {
    title?: string;
    description?: string;
    dueDate?: string;
    type?: TaskType;
  };
};

class UpdateTaskService {
  async execute({ projectId, id, data }: UpdateTaskParams) {
    try {
      const existingProject = await prismaClient.project.findUnique({
        where: { id: projectId },
      });
      if (!existingProject)
        return Promise.reject(new Error("Projeto não encontrado"));

      const task = await prismaClient.task.findUnique({ where: { id } });
      if (!task || task.projectId !== projectId)
        return Promise.reject(new Error("Task não encontrada neste projeto"));

      if ((data as any).statusId !== undefined) {
        return Promise.reject(
          new Error(
            "Altere o status via PATCH /projects/:projectId/tasks/:id/status",
          ),
        );
      }

      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.dueDate !== undefined)
        updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
      if (data.type !== undefined) updateData.type = data.type;

      await prismaClient.task.update({ where: { id }, data: updateData });

      const detailService = new GetTaskByIdService();
      const updated = await detailService.execute(projectId, id);

      return updated;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema (update):", error.issues);
        return Promise.reject(new Error("Erro de validação ao atualizar task"));
      }
      console.error("Erro ao atualizar task:", error);
      return Promise.reject(new Error("Erro ao atualizar task"));
    }
  }
}

export { UpdateTaskService };

import prismaClient from "../../prisma";
import { TaskStatusResponseSchema } from "../../schema/taskStatuses";

class CreateTaskStatusesService {
  async execute({ project_id, name }: { project_id: string; name: string }) {
    const newTaskStatus: {
      projectId: string;
      name: string;
      position?: number;
    } = {
      projectId: project_id,
      name,
    };

    const existingProject = await prismaClient.project.findFirst({
      where: {
        id: project_id,
      },
    });

    if (!existingProject) {
      throw new Error("Projeto não encontrado");
    }

    const existingTaskStatus = await prismaClient.taskStatus.findFirst({
      where: {
        projectId: project_id,
        name,
      },
    });

    if (existingTaskStatus) {
      throw new Error("Status de tarefa já existe para este projeto");
    }

    const position = await prismaClient.taskStatus.count({
      where: {
        projectId: project_id,
      },
    });

    newTaskStatus.position = position + 1;

    const createTaskStatus = await prismaClient.taskStatus.create({
      data: newTaskStatus,
    });

    return TaskStatusResponseSchema.parse(createTaskStatus);
  }
}

export { CreateTaskStatusesService };

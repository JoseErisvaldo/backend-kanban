import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { CreateTaskResponseSchema } from "../../schema/tasks";
export interface CreateTaskParams {
  project_id: string;
  creator_id: string;
  title: string;
  description?: string;
  status_id?: string;
  dueDate?: string;
  type:
    | "BUG"
    | "FEATURE"
    | "IMPROVEMENT"
    | "CHORE"
    | "RESEARCH"
    | "HOTFIX"
    | "DESIGN"
    | "TEST";
}

class CreateTaskService {
  async execute({
    project_id,
    creator_id,
    title,
    description,
    status_id,
    dueDate,
    type,
  }: CreateTaskParams) {
    try {
      const existingProject = await prismaClient.project.findUnique({
        where: { id: project_id },
      });

      if (!existingProject) {
        return Promise.reject(new Error("Projeto não encontrado"));
      }

      let targetStatusId = status_id;

      if (targetStatusId) {
        const status = await prismaClient.taskStatus.findUnique({
          where: { id: targetStatusId },
        });

        if (!status || status.projectId !== project_id) {
          return Promise.reject(new Error("Status inválido para este projeto"));
        }
      } else {
        const firstStatus = await prismaClient.taskStatus.findFirst({
          where: { projectId: project_id },
          orderBy: { position: "asc" },
        });

        if (!firstStatus) {
          return Promise.reject(
            new Error("Nenhum status definido para este projeto"),
          );
        }

        targetStatusId = firstStatus.id;
      }

      const position = await prismaClient.task.count({
        where: { projectId: project_id },
      });

      const created = await prismaClient.task.create({
        data: {
          projectId: project_id,
          creatorId: creator_id,
          statusId: targetStatusId,
          title,
          ...(description ? { description } : {}),
          position: position + 1,
          ...(dueDate ? { dueDate: new Date(dueDate) } : {}),
          type,
        },
      });

      return CreateTaskResponseSchema.parse(created);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);
        return Promise.reject(new Error("Erro de validação da task"));
      } else {
        console.error("Erro ao criar task:", error);
        return Promise.reject(new Error("Erro ao criar task"));
      }
    }
  }
}

export { CreateTaskService };

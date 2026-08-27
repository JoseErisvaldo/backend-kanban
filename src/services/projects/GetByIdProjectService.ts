import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { GetProjectByIdResponseSchema } from "../../schema/projects";

class GetByIdProjectService {
  async execute(id: string) {
    try {
      const project = await prismaClient.project.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          ownerId: true,
          createdAt: true,
          owner: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              tasks: true,
            },
          },
        },
      });

      if (!project) {
        throw new Error("Projeto não encontrado");
      }

      return GetProjectByIdResponseSchema.parse({
        ...project,
        total_task: {
          tasks: project._count.tasks,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);

        throw new Error("Erro de validação dos projetos");
      } else {
        console.error("Erro ao buscar projeto:", error);

        throw new Error("Erro ao buscar o projeto");
      }
    }
  }
}

export { GetByIdProjectService };

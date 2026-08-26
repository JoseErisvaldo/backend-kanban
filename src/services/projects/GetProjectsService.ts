import prismaClient from "../../prisma";
import { GetProjectsResponseSchema } from "../../schema/projects";
import { ZodError } from "zod";

class GetProjectsService {
  async execute() {
    try {
      const projects = await prismaClient.project.findMany({
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
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const response = GetProjectsResponseSchema.parse(projects);

      return response;
    } catch (error) {
      //TODO: Handle ZodError globally in the application, instead of throwing a new error here.
      if (error instanceof ZodError) {
        console.error("Erro de schema:", error.issues);

        throw new Error("Erro de validação dos projetos");
      }

      console.error("Erro ao obter projetos:", error);

      throw new Error("Erro ao obter os projetos");
    }
  }
}

export { GetProjectsService };

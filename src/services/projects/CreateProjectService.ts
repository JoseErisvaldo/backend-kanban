import { ZodError } from "zod";
import prismaClient from "../../prisma";

interface ICreateProject {
  owner_id: string;
  name: string;
  description?: string;
}

class CreateProjectService {
  async execute({ owner_id, name, description }: ICreateProject) {
    try {
      const userAlreadyExists = await prismaClient.project.findFirst({
        where: {
          ownerId: owner_id,
          name,
        },
      });

      if (userAlreadyExists) {
        throw new Error("Você já possui um projeto com esse nome!");
      }

      const project = await prismaClient.project.create({
        data: {
          ownerId: owner_id,
          name,
          description,
        },
      });

      return project;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        if (error instanceof ZodError) {
          console.error("Erro de schema:", error.issues);

          throw new Error("Erro de validação dos projetos");
        } else {
          console.error("Erro ao criar projeto:", error);

          throw new Error("Erro ao criar o projeto");
        }
      }
    }
  }
}
export { CreateProjectService };

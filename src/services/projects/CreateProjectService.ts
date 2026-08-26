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
      console.error("CreateProjectService error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Erro ao criar o projeto");
    }
  }
}
export { CreateProjectService };

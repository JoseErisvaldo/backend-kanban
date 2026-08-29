import prismaClient from "../../prisma";

interface IUpdateProject {
  id: string;
  name: string;
  description: string;
}

class PutProjectService {
  async execute({ id, name, description }: IUpdateProject) {
    const existeProject = await prismaClient.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!existeProject) {
      throw new Error("Projeto não encontrado");
    }

    const updatedProject = await prismaClient.project.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return updatedProject;
  }
}

export { PutProjectService };

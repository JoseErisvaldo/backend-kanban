import prismaClient from "../../prisma";
import { GetProjectByIdResponseSchema } from "../../schema/projects";

class GetByIdProjectService {
  async execute(id: string) {
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
  }
}

export { GetByIdProjectService };

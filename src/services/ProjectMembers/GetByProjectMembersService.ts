import prismaClient from "../../prisma";
import { GetProjectMembersResponseSchema } from "../../schema/projectMembers";

interface IGetByProjectMembers {
  projectId: string;
}
class GetByProjectMembersService {
  async execute({ projectId }: IGetByProjectMembers) {
    const existProject = await prismaClient.projectMember.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        projectId: true,
        userId: true,
        createdAt: true,
        project: {
          select: {
            name: true,
            description: true,
            createdAt: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (existProject.length === 0) {
      throw new Error("Projeto nao localizado");
    }

    const response = GetProjectMembersResponseSchema.parse(existProject);

    return response;
  }
}

export { GetByProjectMembersService };

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
    });

    if (existProject.length === 0) {
      throw new Error("Projeto nao localizado");
    }

    const response = GetProjectMembersResponseSchema.parse(existProject);

    return response;
  }
}

export { GetByProjectMembersService };

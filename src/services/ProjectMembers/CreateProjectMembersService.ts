import prismaClient from "../../prisma";

interface ICreateProjectMembersDTO {
  project_id: string;
  user_id: string;
}

class CreateProjectMembers {
  async execute({
    project_id: projectId,
    user_id: userId,
  }: ICreateProjectMembersDTO) {
    try {
      const newMember = {
        projectId,
        userId,
      };

      const existingProject = await prismaClient.project.findFirst({
        where: {
          id: projectId,
        },
      });

      if (!existingProject) {
        throw new Error("Projeto não encontrado");
      }

      const existingUser = await prismaClient.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        throw new Error("Usuário não encontrado");
      }

      const existingMemberInProject =
        await prismaClient.projectMember.findFirst({
          where: {
            projectId,
            userId,
          },
        });

      if (existingMemberInProject) {
        throw new Error("Membro já existe no projeto");
      }

      const createMember = await prismaClient.projectMember.create({
        data: newMember,
      });

      return createMember;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Erro ao adicionar membro ao projeto");
    }
  }
}

export { CreateProjectMembers };

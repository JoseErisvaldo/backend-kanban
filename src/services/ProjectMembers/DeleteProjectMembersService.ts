import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { DeleteMemberInProjectResponseSchema } from "../../schema/projectMembers";

class DeleteProjectMembersService {
  async execute(id: string) {
    try {
      const existProject = await prismaClient.projectMember.findUnique({
        where: {
          id: id,
        },
      });

      if (!existProject) {
        throw new Error("Id do membro no projeto nao localizado");
      }

      await prismaClient.projectMember.delete({
        where: {
          id: id,
        },
      });

      return DeleteMemberInProjectResponseSchema.parse({
        message: "Usuario excluido com sucesso do projeto",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        if (error instanceof ZodError) {
          console.error("Erro de schema:", error.issues);

          throw new Error("Erro de validação");
        } else {
          console.error("Erro ao deletar usuario do projeto:", error);

          throw new Error("Erro ao deletar usuario do projeto");
        }
      }
    }
  }
}

export { DeleteProjectMembersService };

import { ZodError } from "zod";
import prismaClient from "../../prisma";
import { DeleteProjectResponseSchema } from "../../schema/projects";

class DeleteProjectService {
  async execute(id: string) {
    try {
      const existingProject = await prismaClient.project.findUnique({
        select: {
          id: true,
          tasks: true,
        },
        where: {
          id: id,
        },
      });

      if (!existingProject) {
        throw new Error("Projeto não encontrado");
      }

      if (existingProject.tasks.length > 0) {
        throw new Error(
          "Não é possível deletar um projeto que possui tarefas associadas",
        );
      }

      await prismaClient.project.delete({
        where: {
          id: id,
        },
      });

      return DeleteProjectResponseSchema.parse({
        message: "Projeto deletado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        if (error instanceof ZodError) {
          console.error("Erro de schema:", error.issues);

          throw new Error("Erro de validação dos projetos");
        } else {
          console.error("Erro ao deletar projeto:", error);

          throw new Error("Erro ao deletar o projeto");
        }
      }
    }
  }
}

export { DeleteProjectService };

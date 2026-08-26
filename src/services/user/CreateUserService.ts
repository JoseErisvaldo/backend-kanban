import { hash } from "bcryptjs";
import prismaClient from "../../prisma/index.js";

interface User {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: User) {
    try {
      const existeUser = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (existeUser) {
        throw new Error("Usuario já existe!");
      }

      const passwordHash = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });

      const safeUser = {
        ...user,
        id: String(user.id),
        createdAt:
          user.createdAt instanceof Date
            ? user.createdAt.toISOString()
            : user.createdAt,
      };

      return safeUser;
    } catch (error) {
      throw new Error(
        "Erro ao criar usuário: " +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }
}

export { CreateUserService };

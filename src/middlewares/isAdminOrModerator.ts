import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma";

export const isAdminOrModerator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user_id;

  if (!userId) {
    res.status(401).json({ error: "Acesso negado" });
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(403).json({ error: "Usuario sem permissão!" });
    return;
  }

  if (user.role !== "ADMIN" && user.role !== "MODERADOR") {
    res.status(403).json({ error: "Usuario sem permissão!" });
    return;
  }

  next();
};

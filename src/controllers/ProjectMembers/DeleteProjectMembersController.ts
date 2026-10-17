import { Request, Response } from "express";
import { DeleteProjectMembersService } from "../../services/ProjectMembers/DeleteProjectMembersService.js";

class DeleteProjectMembersController {
  async handle(req: Request, res: Response) {
    const { id } = req.query as { id: string };

    const deleteProejtctMembersService = new DeleteProjectMembersService();
    await deleteProejtctMembersService.execute(id);

    return res
      .status(200)
      .json({ message: "Membro deletado do projeto com sucesso" });
  }
}

export { DeleteProjectMembersController };

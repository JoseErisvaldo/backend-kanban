import { Request, Response } from "express";
import { DeleteProjectService } from "../../services/projects/DeleteProjectService";

class DeleteProjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.query as { id: string };

    const deleteProjectService = new DeleteProjectService();
    await deleteProjectService.execute(id);

    return res.status(200).json({ message: "Projeto deletado com sucesso" });
  }
}

export { DeleteProjectController };

import { Request, Response } from "express";
import { GetByIdProjectService } from "../../services/projects/GetByIdProjectService";

class GetByIdProjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.query as { id: string };

    const getByIdProjectService = new GetByIdProjectService();
    const project = await getByIdProjectService.execute(id);

    return res.json(project);
  }
}

export { GetByIdProjectController };

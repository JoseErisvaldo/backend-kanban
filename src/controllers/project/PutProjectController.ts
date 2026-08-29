import { Request, Response } from "express";
import { PutProjectService } from "../../services/projects/PutProjectService";
class PutProjectController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const { id } = req.query as { id: string };

    const putProjectService = new PutProjectService();
    const result = await putProjectService.execute({ id, name, description });

    return res.status(200).json(result);
  }
}

export { PutProjectController };

import { Request, Response } from "express";
import { CreateProjectService } from "../../services/projects/CreateProjectService";

class CreateProjectController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const user_id = req.user_id;

    const createProjectService = new CreateProjectService();
    const project = await createProjectService.execute({
      owner_id: user_id,
      name,
      description,
    });
    return res.json(project);
  }
}

export { CreateProjectController };

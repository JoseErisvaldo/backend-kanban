import { GetProjectsService } from "../../services/projects/GetProjectsService";
import { Request, Response } from "express";

class GetProjectsController {
  async handle(req: Request, res: Response) {
    const getProjectsService = new GetProjectsService();
    const projects = await getProjectsService.execute();
    return res.status(200).json(projects);
  }
}

export { GetProjectsController };

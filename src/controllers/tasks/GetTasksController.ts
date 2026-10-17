import { Request, Response } from "express";
import { GetTasksService } from "../../services/tasks/GetTasksService.js";

class GetTasksController {
  async handle(req: Request, res: Response) {
    const { projectId } = req.params as { projectId: string };

    const service = new GetTasksService();
    const tasks = await service.execute(projectId);

    return res.status(200).json(tasks);
  }
}

export { GetTasksController };

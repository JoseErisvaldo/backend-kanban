import { Request, Response } from "express";
import { GetTaskByIdService } from "../../services/tasks/GetTaskByIdService.js";

class GetTaskByIdController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as { projectId: string; id: string };

    const service = new GetTaskByIdService();
    const task = await service.execute(projectId, id);

    return res.status(200).json(task);
  }
}

export { GetTaskByIdController };

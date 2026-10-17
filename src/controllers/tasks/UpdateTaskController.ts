import { Request, Response } from "express";
import { UpdateTaskService } from "../../services/tasks/UpdateTaskService.js";

class UpdateTaskController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as { projectId: string; id: string };
    const data = req.body;

    const service = new UpdateTaskService();
    const updated = await service.execute({ projectId, id, data });

    return res.status(200).json(updated);
  }
}

export { UpdateTaskController };

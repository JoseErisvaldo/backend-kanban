import { Request, Response } from "express";
import { ReorderTaskStatusesService } from "../../services/taskStatuses/ReorderTaskStatusesService.js";

class ReorderTaskStatusesController {
  async handle(req: Request, res: Response) {
    const { projectId } = req.params as { projectId: string };
    const { order } = req.body as { order: string[] };

    const service = new ReorderTaskStatusesService();
    const result = await service.execute({ project_id: projectId, order });

    return res.status(200).json(result);
  }
}

export { ReorderTaskStatusesController };

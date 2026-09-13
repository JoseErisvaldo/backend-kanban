import { Request, Response } from "express";
import { UpdateTaskStatusService } from "../../services/tasks/UpdateTaskStatusService";

class UpdateTaskStatusController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as { projectId: string; id: string };
    const { statusId } = req.body as { statusId: string };

    const service = new UpdateTaskStatusService();
    const updated = await service.execute(projectId, id, statusId);

    return res.status(200).json(updated);
  }
}

export { UpdateTaskStatusController };

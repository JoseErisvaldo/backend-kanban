import { Request, Response } from "express";
import { DeleteTaskService } from "../../services/tasks/DeleteTaskService";

class DeleteTaskController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as { projectId: string; id: string };

    const service = new DeleteTaskService();
    const result = await service.execute(projectId, id);

    return res.status(200).json(result);
  }
}

export { DeleteTaskController };

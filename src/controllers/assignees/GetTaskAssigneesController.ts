import { Request, Response } from "express";
import { GetTaskAssigneesService } from "../../services/assignees/GetTaskAssigneesService.js";

class GetTaskAssigneesController {
  async handle(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };

    const service = new GetTaskAssigneesService();
    const assignees = await service.execute(taskId);

    return res.status(200).json(assignees);
  }
}

export { GetTaskAssigneesController };

import { Request, Response } from "express";
import { DeleteTaskStatusesService } from "../../services/taskStatuses/DeleteTaskStatusesService.js";

class DeleteTaskStatusesController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as { projectId: string; id: string };

    const deleteTaskStatusesService = new DeleteTaskStatusesService();
    const result = await deleteTaskStatusesService.execute({
      project_id: projectId,
      id,
    });

    return res.status(200).json(result);
  }
}

export { DeleteTaskStatusesController };

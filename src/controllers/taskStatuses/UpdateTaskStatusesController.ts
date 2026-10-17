import { Request, Response } from "express";
import { UpdateTaskStatusesService } from "../../services/taskStatuses/UpdateTaskStatusesService.js";

class UpdateTaskStatusesController {
  async handle(req: Request, res: Response) {
    const { projectId, id } = req.params as {
      projectId: string;
      id: string;
    };

    const { name } = req.body;

    const updateTaskStatusesService = new UpdateTaskStatusesService();
    const updated = await updateTaskStatusesService.execute({
      project_id: projectId,
      id,
      name,
    });

    return res.status(200).json(updated);
  }
}

export { UpdateTaskStatusesController };

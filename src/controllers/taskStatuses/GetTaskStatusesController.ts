import { Request, Response } from "express";
import { GetTaskStatusesService } from "../../services/taskStatuses/GetTaskStatusesService";

class GetTaskStatusesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params as { projectId: string };
    const getTaskStatusesService = new GetTaskStatusesService();

    const taskStatuses = await getTaskStatusesService.execute(projectId);
    return res.status(200).json(taskStatuses);
  }
}

export { GetTaskStatusesController };

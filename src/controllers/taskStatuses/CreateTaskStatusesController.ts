import { Request, Response } from "express";
import { CreateTaskStatusesService } from "../../services/taskStatuses/CreateTaskStatusesService";

class CreateTaskStatusesController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const { projectId } = req.params as { projectId: string };

    const createTaskStatusesService = new CreateTaskStatusesService();
    const taskStatuses = await createTaskStatusesService.execute({
      project_id: projectId,
      name: name,
    });

    return res.status(201).json(taskStatuses);
  }
}

export { CreateTaskStatusesController };

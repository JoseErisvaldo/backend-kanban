import { Request, Response } from "express";
import { CreateTaskService } from "../../services/tasks/CreateTaskService";

class CreateTaskController {
  async handle(req: Request, res: Response) {
    const { projectId } = req.params as { projectId: string };
    const { title, description, statusId, dueDate, type } = req.body as {
      title: string;
      description?: string;
      statusId?: string;
      dueDate?: string;
      type: string;
    };

    const creatorId = req.user_id;

    const service = new CreateTaskService();
    const created = await service.execute({
      project_id: projectId,
      creator_id: creatorId,
      title,
      description,
      status_id: statusId,
      dueDate,
      type,
    });

    return res.status(201).json(created);
  }
}

export { CreateTaskController };

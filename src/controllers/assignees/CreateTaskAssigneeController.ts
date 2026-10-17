import { Request, Response } from "express";
import { CreateTaskAssigneeService } from "../../services/assignees/CreateTaskAssigneeService.js";

class CreateTaskAssigneeController {
  async handle(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };
    const { userId } = req.body as { userId: string };

    const service = new CreateTaskAssigneeService();
    const assignee = await service.execute(taskId, userId);

    return res.status(201).json(assignee);
  }
}

export { CreateTaskAssigneeController };

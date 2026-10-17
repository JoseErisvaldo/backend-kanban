import { Request, Response } from "express";
import { DeleteTaskAssigneeService } from "../../services/assignees/DeleteTaskAssigneeService.js";

class DeleteTaskAssigneeController {
  async handle(req: Request, res: Response) {
    const { taskId, userId } = req.params as {
      taskId: string;
      userId: string;
    };

    const service = new DeleteTaskAssigneeService();
    const result = await service.execute(taskId, userId);

    return res.status(200).json(result);
  }
}

export { DeleteTaskAssigneeController };

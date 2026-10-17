import { Request, Response } from "express";
import { GetTaskCommentsService } from "../../services/comments/GetTaskCommentsService.js";

class GetTaskCommentsController {
  async handle(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };

    const service = new GetTaskCommentsService();
    const comments = await service.execute(taskId);

    return res.status(200).json(comments);
  }
}

export { GetTaskCommentsController };

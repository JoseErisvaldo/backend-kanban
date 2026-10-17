import { Request, Response } from "express";
import { DeleteTaskCommentService } from "../../services/comments/DeleteTaskCommentService.js";

class DeleteTaskCommentController {
  async handle(req: Request, res: Response) {
    const { taskId, id } = req.params as { taskId: string; id: string };

    const service = new DeleteTaskCommentService();
    const result = await service.execute(taskId, id);

    return res.status(200).json(result);
  }
}

export { DeleteTaskCommentController };

import { Request, Response } from "express";
import { CreateTaskCommentService } from "../../services/comments/CreateTaskCommentService";

class CreateTaskCommentController {
  async handle(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };
    const { body } = req.body as { body: string };
    const userId = req.user_id;

    const service = new CreateTaskCommentService();
    const comment = await service.execute(taskId, userId, body);

    return res.status(201).json(comment);
  }
}

export { CreateTaskCommentController };

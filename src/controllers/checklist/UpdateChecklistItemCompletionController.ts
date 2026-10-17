import { Request, Response } from "express";
import { UpdateChecklistItemCompletionService } from "../../services/checklist/UpdateChecklistItemCompletion.js";

class UpdateChecklistItemCompletionController {
  async handle(req: Request, res: Response) {
    const { taskId, id } = req.params as { taskId: string; id: string };
    const { isCompleted } = req.body as { isCompleted: boolean };

    const service = new UpdateChecklistItemCompletionService();
    const item = await service.execute(taskId, id, isCompleted);

    return res.status(200).json(item);
  }
}

export { UpdateChecklistItemCompletionController };

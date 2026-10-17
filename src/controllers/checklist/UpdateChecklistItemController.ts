import { Request, Response } from "express";
import { UpdateChecklistItemService } from "../../services/checklist/UpdateChecklistItem.js";

class UpdateChecklistItemController {
  async handle(req: Request, res: Response) {
    const { taskId, id } = req.params as { taskId: string; id: string };
    const { title } = req.body as { title: string };

    const service = new UpdateChecklistItemService();
    const item = await service.execute(taskId, id, title);

    return res.status(200).json(item);
  }
}

export { UpdateChecklistItemController };

import { Request, Response } from "express";
import { DeleteChecklistItemService } from "../../services/checklist/DeleteChecklistItem";

class DeleteChecklistItemController {
  async handle(req: Request, res: Response) {
    const { taskId, id } = req.params as { taskId: string; id: string };

    const service = new DeleteChecklistItemService();
    const result = await service.execute(taskId, id);

    return res.status(200).json(result);
  }
}

export { DeleteChecklistItemController };

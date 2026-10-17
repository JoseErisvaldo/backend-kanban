import { Request, Response } from "express";
import { CreateChecklistItemService } from "../../services/checklist/CreateChecklistItemService.js";

class CreateChecklistItemController {
  async handle(req: Request, res: Response) {
    const { taskId } = req.params as { taskId: string };
    const { title } = req.body as { title: string };

    const service = new CreateChecklistItemService();
    const item = await service.execute(taskId, title);

    return res.status(201).json(item);
  }
}

export { CreateChecklistItemController };

import { Request, Response } from "express";
import { GetByProjectMembersService } from "../../services/ProjectMembers/GetByProjectMembersService";

class GetByProjectMembersController {
  async handle(req: Request, res: Response) {
    const { id: projectId } = req.params as { id: string };

    const getByProjectMembersService = new GetByProjectMembersService();
    const getByProject = await getByProjectMembersService.execute({
      projectId,
    });

    return res.status(200).json(getByProject);
  }
}

export { GetByProjectMembersController };

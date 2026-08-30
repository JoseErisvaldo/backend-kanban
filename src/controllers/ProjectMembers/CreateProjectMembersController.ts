import { Request, Response } from "express";
import { CreateProjectMembers } from "../../services/ProjectMembers/CreateProjectMembersService";

class CreateProjectMembersController {
  async handle(req: Request, res: Response) {
    const { project_id: projectId, user_id: userId } = req.body;

    const createProjectMembersService = new CreateProjectMembers();
    const newMember = await createProjectMembersService.execute({
      project_id: projectId,
      user_id: userId,
    });

    return res.status(201).json(newMember);
  }
}

export { CreateProjectMembersController };

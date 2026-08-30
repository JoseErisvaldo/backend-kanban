import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import { CreateUserSchema } from "./schema/userSchema.js";
import {
  CreateProjectSchema,
  GetProjectByIdParamsSchema,
  DeleteProjectParamsSchema,
  PutProjectBodySchema,
  PutProjectParamsSchema,
} from "./schema/projects.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
import { CreateProjectController } from "./controllers/project/CreateProjectController.js";
import { isAdminOrModerator } from "./middlewares/isAdminOrModerator.js";
import { GetProjectsController } from "./controllers/project/GetProjectsController.js";
import { GetByIdProjectController } from "./controllers/project/GetByIdProjectController.js";
import { DeleteProjectController } from "./controllers/project/DeleteProjectController.js";
import { PutProjectController } from "./controllers/project/PutProjectController.js";
import { CreateProjectMembersController } from "./controllers/ProjectMembers/CreateProjectMembersController.js";
import { CreateProjectMembersSchema } from "./schema/projectMembers.js";
import { is } from "zod/v4/locales";

const router = Router();

router.get("/health", (req, res) => {
  res.send("OK");
});

router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
  "/users",
  validateSchema(CreateUserSchema),
  new CreateUserController().handle,
);

router.post("/session", new AuthUserController().handle);

router.post(
  "/projects",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateProjectSchema),
  new CreateProjectController().handle,
);

router.get("/projects", isAuthenticated, new GetProjectsController().handle);
router.get(
  "/project/details",
  isAuthenticated,
  validateSchema(GetProjectByIdParamsSchema),
  new GetByIdProjectController().handle,
);
router.delete(
  "/project",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(DeleteProjectParamsSchema),
  new DeleteProjectController().handle,
);
router.put(
  "/project",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(PutProjectParamsSchema),
  validateSchema(PutProjectBodySchema),
  new PutProjectController().handle,
);

router.post(
  "/project/members",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateProjectMembersSchema),
  new CreateProjectMembersController().handle,
);

export default router;

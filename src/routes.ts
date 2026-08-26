import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { validateSchema } from "./middlewares/validateSchema.js";
import { CreateUserSchema } from "./schema/userSchema.js";
import { CreateProjectSchema } from "./schema/projects.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
import { CreateProjectController } from "./controllers/project/CreateProjectController.js";
import { isAdminOrModerator } from "./middlewares/isAdminOrModerator.js";
import { GetProjectsController } from "./controllers/project/GetProjectsController.js";

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

export default router;

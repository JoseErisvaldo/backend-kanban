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
import { GetByProjectMembersController } from "./controllers/ProjectMembers/GetByProjectMembersController.js";
import {
  CreateProjectMembersSchema,
  DDeleteMemberInProjectParamsSchema,
  GetProjectMembersParamsSchema,
} from "./schema/projectMembers.js";
import { DeleteProjectMembersController } from "./controllers/ProjectMembers/DeleteProjectMembersController.js";
import { CreateTaskStatusesController } from "./controllers/taskStatuses/CreateTaskStatusesController.js";
import {
  CreateTaskStatusesSchema,
  GetTaskStatusesParamsSchema,
} from "./schema/taskStatuses.js";
import { UpdateTaskStatusesSchema } from "./schema/taskStatuses.js";
import { UpdateTaskStatusesController } from "./controllers/taskStatuses/UpdateTaskStatusesController.js";
import { DeleteTaskStatusesSchema } from "./schema/taskStatuses.js";
import { DeleteTaskStatusesController } from "./controllers/taskStatuses/DeleteTaskStatusesController.js";
import { ReorderTaskStatusesSchema } from "./schema/taskStatuses.js";
import { ReorderTaskStatusesController } from "./controllers/taskStatuses/ReorderTaskStatusesController.js";
import {
  CreateChecklistItemParamsSchema,
  CreateTaskCommentSchema,
  CreateTaskSchema,
  DeleteChecklistItemParamsSchema,
  DeleteTaskCommentParamsSchema,
  GetTaskCommentsParamsSchema,
  UpdateChecklistItemCompletionSchema,
  UpdateChecklistItemParamsSchema,
} from "./schema/tasks.js";
import { CreateTaskController } from "./controllers/tasks/CreateTaskController.js";
import { GetTasksParamsSchema } from "./schema/tasks.js";
import { GetTasksController } from "./controllers/tasks/GetTasksController.js";
import {
  GetTaskParamsSchema,
  UpdateTaskParamsSchema,
  UpdateTaskStatusSchema,
} from "./schema/tasks.js";
import { GetTaskByIdController } from "./controllers/tasks/GetTaskByIdController.js";
import { UpdateTaskController } from "./controllers/tasks/UpdateTaskController.js";
import { UpdateTaskStatusController } from "./controllers/tasks/UpdateTaskStatusController.js";
import { DeleteTaskController } from "./controllers/tasks/DeleteTaskController.js";
import { GetTaskStatusesController } from "./controllers/taskStatuses/GetTaskStatusesController.js";
import { CreateChecklistItemController } from "./controllers/checklist/CreateChecklistItemController.js";
import { UpdateChecklistItemController } from "./controllers/checklist/UpdateChecklistItemController.js";
import { UpdateChecklistItemCompletionController } from "./controllers/checklist/UpdateChecklistItemCompletionController.js";
import { DeleteChecklistItemController } from "./controllers/checklist/DeleteChecklistItemController.js";
import { CreateTaskCommentController } from "./controllers/comments/CreateTaskCommentController.js";
import { GetTaskCommentsController } from "./controllers/comments/GetTaskCommentsController.js";
import { DeleteTaskCommentController } from "./controllers/comments/DeleteTaskCommentController.js";

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
router.get(
  "/project/:id/members",
  isAuthenticated,
  validateSchema(GetProjectMembersParamsSchema),
  new GetByProjectMembersController().handle,
);
router.delete(
  "/projects/members",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(DDeleteMemberInProjectParamsSchema),
  new DeleteProjectMembersController().handle,
);

router.post(
  "/projects/:projectId/statuses",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(CreateTaskStatusesSchema),
  new CreateTaskStatusesController().handle,
);
router.get(
  "/projects/:projectId/statuses",
  isAuthenticated,
  validateSchema(GetTaskStatusesParamsSchema),
  new GetTaskStatusesController().handle,
);
router.put(
  "/projects/:projectId/statuses/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(UpdateTaskStatusesSchema),
  new UpdateTaskStatusesController().handle,
);
router.delete(
  "/projects/:projectId/statuses/:id",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(DeleteTaskStatusesSchema),
  new DeleteTaskStatusesController().handle,
);
router.patch(
  "/projects/:projectId/statuses/reorder",
  isAuthenticated,
  isAdminOrModerator,
  validateSchema(ReorderTaskStatusesSchema),
  new ReorderTaskStatusesController().handle,
);

router.post(
  "/projects/:projectId/tasks",
  isAuthenticated,
  validateSchema(CreateTaskSchema),
  new CreateTaskController().handle,
);
router.get(
  "/projects/:projectId/tasks",
  isAuthenticated,
  validateSchema(GetTasksParamsSchema),
  new GetTasksController().handle,
);
router.get(
  "/projects/:projectId/tasks/:id",
  isAuthenticated,
  validateSchema(GetTaskParamsSchema),
  new GetTaskByIdController().handle,
);
router.put(
  "/projects/:projectId/tasks/:id",
  isAuthenticated,
  validateSchema(UpdateTaskParamsSchema),
  new UpdateTaskController().handle,
);
router.delete(
  "/projects/:projectId/tasks/:id",
  isAuthenticated,
  validateSchema(GetTaskParamsSchema),
  new DeleteTaskController().handle,
);
router.patch(
  "/projects/:projectId/tasks/:id/status",
  isAuthenticated,
  validateSchema(UpdateTaskStatusSchema),
  new UpdateTaskStatusController().handle,
);
router.post(
  "/tasks/:taskId/checklist",
  isAuthenticated,
  validateSchema(CreateChecklistItemParamsSchema),
  new CreateChecklistItemController().handle,
);
router.put(
  "/tasks/:taskId/checklist/:id",
  isAuthenticated,
  validateSchema(UpdateChecklistItemParamsSchema),
  new UpdateChecklistItemController().handle,
);
router.patch(
  "/tasks/:taskId/checklist/:id/complete",
  isAuthenticated,
  validateSchema(UpdateChecklistItemCompletionSchema),
  new UpdateChecklistItemCompletionController().handle,
);
router.delete(
  "/tasks/:taskId/checklist/:id",
  isAuthenticated,
  validateSchema(DeleteChecklistItemParamsSchema),
  new DeleteChecklistItemController().handle,
);
router.post(
  "/tasks/:taskId/comments",
  isAuthenticated,
  validateSchema(CreateTaskCommentSchema),
  new CreateTaskCommentController().handle,
);
router.get(
  "/tasks/:taskId/comments",
  isAuthenticated,
  validateSchema(GetTaskCommentsParamsSchema),
  new GetTaskCommentsController().handle,
);
router.delete(
  "/tasks/:taskId/comments/:id",
  isAuthenticated,
  validateSchema(DeleteTaskCommentParamsSchema),
  new DeleteTaskCommentController().handle,
);
export default router;

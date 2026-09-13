import { z } from "zod";

export const TaskTypeEnum = z.enum([
  "BUG",
  "FEATURE",
  "IMPROVEMENT",
  "CHORE",
  "RESEARCH",
  "HOTFIX",
  "DESIGN",
  "TEST",
]);

export type TaskType = z.infer<typeof TaskTypeEnum>;

export const CreateTaskSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
  body: z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    type: TaskTypeEnum,
    statusId: z.string().uuid().optional(),
    dueDate: z
      .string()
      .min(1, "Data de vencimento é obrigatória")
      .optional()
      .refine(
        (date) => !date || !isNaN(Date.parse(date)),
        "Data de vencimento deve ser uma data válida",
      )
      .refine(
        (date) => date && new Date(date) > new Date(),
        "Data de vencimento deve ser uma data futura",
      ),
  }),
});

export const CreateTaskResponseSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  creatorId: z.string(),
  type: TaskTypeEnum,
  statusId: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  position: z.number(),
  dueDate: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date().optional()),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
});

export const GetTasksParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
});

export const TaskAssigneeUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TaskStatusShortSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetTasksResponseSchema = z.array(
  z.object({
    id: z.string(),
    projectId: z.string(),
    creator: TaskAssigneeUserSchema,
    type: TaskTypeEnum,
    status: TaskStatusShortSchema.optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    position: z.number(),
    dueDate: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date().optional()),
    createdAt: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date()),
    assignees: z.array(TaskAssigneeUserSchema).optional(),
    commentsCount: z.number().optional(),
    slaRemainingDays: z.number().nullable().optional(),
  }),
);

export const GetTaskParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
    id: z.string().uuid("ID da task deve ser um UUID válido"),
  }),
});

export const TaskCommentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TaskCommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
  user: TaskCommentUserSchema,
});

export const TaskChecklistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
  position: z.number(),
});

export const ProjectShortSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetTaskResponseSchema = z.object({
  id: z.string(),
  project: ProjectShortSchema,
  creator: TaskAssigneeUserSchema,
  type: TaskTypeEnum,
  status: TaskStatusShortSchema,
  title: z.string(),
  description: z.string().nullable().optional(),
  position: z.number(),
  dueDate: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date().nullable().optional()),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
  assignees: z.array(TaskAssigneeUserSchema),
  checklist: z.array(TaskChecklistItemSchema),
  comments: z.array(TaskCommentSchema),
  slaRemainingDays: z.number().nullable().optional(),
});

export const UpdateTaskBodySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || !isNaN(Date.parse(date)),
      "Data de vencimento deve ser uma data válida",
    ),
  type: TaskTypeEnum.optional(),
});

export const UpdateTaskParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
    id: z.string().uuid("ID da task deve ser um UUID válido"),
  }),
  body: UpdateTaskBodySchema,
});

export const DeleteTaskResponseSchema = z.object({
  message: z.string(),
});

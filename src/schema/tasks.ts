import { z } from "zod";

export const CreateTaskSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
  body: z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    type: z.enum([
      "BUG",
      "FEATURE",
      "IMPROVEMENT",
      "CHORE",
      "RESEARCH",
      "HOTFIX",
      "DESIGN",
      "TEST",
    ]),
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
  type: z.enum([
    "BUG",
    "FEATURE",
    "IMPROVEMENT",
    "CHORE",
    "RESEARCH",
    "HOTFIX",
    "DESIGN",
    "TEST",
  ]),
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
    type: z.enum([
      "BUG",
      "FEATURE",
      "IMPROVEMENT",
      "CHORE",
      "RESEARCH",
      "HOTFIX",
      "DESIGN",
      "TEST",
    ]),
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

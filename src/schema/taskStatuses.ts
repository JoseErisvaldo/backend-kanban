import { z } from "zod";

export const CreateTaskStatusesSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
  body: z.object({
    name: z.string().min(1, "Nome do status de tarefa é obrigatório"),
  }),
});

export const GetTaskStatusResponseSchema = z.array(
  z.object({
    id: z.string(),
    projectId: z.string(),
    name: z.string(),
    position: z.number(),
    createdAt: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date()),
  }),
);

export const GetTaskStatusesParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
});

export const UpdateTaskStatusesSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
    id: z.string().uuid("ID do status deve ser um UUID válido"),
  }),
  body: z.object({
    name: z.string().min(1, "Nome do status de tarefa é obrigatório"),
  }),
});

export const UpdateTaskStatusesResponseSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  position: z.number().optional(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
});

export const DeleteTaskStatusesSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
    id: z.string().uuid("ID do status deve ser um UUID válido"),
  }),
});

export const DeleteTaskStatusesResponseSchema = z.object({
  message: z.string(),
});

export const ReorderTaskStatusesSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
  body: z.object({
    order: z
      .array(z.string().uuid("ID do status deve ser um UUID válido"))
      .min(1),
  }),
});

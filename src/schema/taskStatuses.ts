import { z } from "zod";

export const CreateTaskStatusesSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("ID do projeto deve ser um UUID válido"),
  }),
  body: z.object({
    name: z.string().min(1, "Nome do status de tarefa é obrigatório"),
  }),
});

export const TaskStatusResponseSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  position: z.number(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
});

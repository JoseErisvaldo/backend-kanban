import { z } from "zod";

export const CreateProjectMembersSchema = z.object({
  body: z.object({
    project_id: z.string(),
    user_id: z.string(),
  }),
});

export const GetProjectMembersParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const GetProjectMembersResponseSchema = z.array(
  z.object({
    projectId: z.string(),
    userId: z.string(),
    createdAt: z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg;
    }, z.date()),
    project: z.object({
      name: z.string(),
      description: z.string().nullable(),
      createdAt: z.preprocess((arg) => {
        if (typeof arg === "string") return new Date(arg);
        return arg;
      }, z.date()),
    }),
    user: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  }),
);

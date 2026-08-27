import z from "zod";

export const CreateProjectSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Nome é obrigatório"),
      description: z.string().optional(),
    })
    .strict(),
});

export const GetProjectsResponseSchema = z.array(
  z
    .object({
      id: z.string(),
      ownerId: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      createdAt: z.date(),
      owner: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
      total_task: z.object({
        tasks: z.number(),
      }),
    })
    .strict(),
);

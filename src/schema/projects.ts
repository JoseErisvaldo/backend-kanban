import z from "zod";

export const CreateProjectSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Nome é obrigatório"),
      description: z.string().optional(),
    })
    .strict(),
});

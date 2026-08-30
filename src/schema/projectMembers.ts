import { z } from "zod";

export const CreateProjectMembersSchema = z.object({
  body: z.object({
    project_id: z.string(),
    user_id: z.string(),
  }),
});

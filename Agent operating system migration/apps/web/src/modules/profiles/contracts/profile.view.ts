import { z } from "zod";

export const profileDataVisibilitySchema = z.object({
  showEmail: z.boolean(),
  showParticipation: z.boolean(),
  showStewardships: z.boolean(),
});

export type ProfileDataVisibility = z.infer<typeof profileDataVisibilitySchema>;

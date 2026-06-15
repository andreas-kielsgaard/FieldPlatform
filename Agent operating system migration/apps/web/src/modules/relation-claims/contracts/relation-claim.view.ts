import { z } from "zod";

import { relationClaimIdSchema, reviewStateSchema } from "~/shared/contracts";

export const relationClaimViewSchema = z.object({
  id: relationClaimIdSchema,
  relationType: z.string().min(1),
  rationale: z.string().min(1),
  reviewState: reviewStateSchema,
});

export type RelationClaimView = z.infer<typeof relationClaimViewSchema>;

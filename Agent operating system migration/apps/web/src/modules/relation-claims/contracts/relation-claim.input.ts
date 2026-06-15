import { z } from "zod";

import { representationIdSchema } from "~/shared/contracts";

export const relationClaimInputSchema = z.object({
  sourceRepresentationId: representationIdSchema,
  targetRepresentationId: representationIdSchema,
  relationType: z.string().trim().min(2),
  rationale: z.string().trim().min(10),
});

export type RelationClaimInput = z.infer<typeof relationClaimInputSchema>;

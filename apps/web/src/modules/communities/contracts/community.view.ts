import { z } from "zod";

import {
  representationIdSchema,
  reviewStateSchema,
  visibilityScopeSchema,
} from "~/shared/contracts";

export const communityOrientationViewSchema = z.object({
  representationId: representationIdSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  visibilityScope: visibilityScopeSchema,
  reviewState: reviewStateSchema,
  waysInCount: z.number().int().min(0),
});

export type CommunityOrientationView = z.infer<typeof communityOrientationViewSchema>;

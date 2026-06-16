import { z } from "zod";

export const visibilityScopeSchema = z.enum([
  "private",
  "steward_visible",
  "community_visible",
  "link_visible",
  "public",
]);

export const publicationStatusSchema = z.enum(["draft", "published", "archived"]);

export const reviewStateSchema = z.enum([
  "not_required",
  "pending_review",
  "accepted",
  "rejected",
  "superseded",
]);

export const representationKindSchema = z.enum(["community", "event", "offering", "field_signal"]);

export const participationKindSchema = z.enum(["saved", "followed", "tracked"]);

export type VisibilityScope = z.infer<typeof visibilityScopeSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
export type ReviewState = z.infer<typeof reviewStateSchema>;
export type RepresentationKind = z.infer<typeof representationKindSchema>;
export type ParticipationKind = z.infer<typeof participationKindSchema>;

export type RepresentationState = {
  id: string;
  visibilityScope: VisibilityScope;
  publicationStatus: PublicationStatus;
  reviewState: ReviewState;
};

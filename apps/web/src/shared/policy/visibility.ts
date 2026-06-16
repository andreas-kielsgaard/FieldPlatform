import type { CurrentActor } from "../auth";
import type { RepresentationState } from "../contracts";

export type VisibilityContext = {
  actor?: CurrentActor | null;
  hasLinkAccess?: boolean;
  isCommunityParticipant?: boolean;
  stewardedRepresentationIds?: readonly string[];
};

export function canViewRepresentation(
  representation: RepresentationState,
  context: VisibilityContext = {},
) {
  if (representation.publicationStatus === "archived") {
    return false;
  }

  if (
    representation.publicationStatus === "draft" ||
    representation.reviewState === "pending_review" ||
    representation.reviewState === "rejected" ||
    representation.reviewState === "superseded"
  ) {
    return isStewardForRepresentation(representation.id, context);
  }

  if (
    representation.visibilityScope === "public" &&
    representation.publicationStatus === "published"
  ) {
    return true;
  }

  if (representation.visibilityScope === "link_visible") {
    return Boolean(context.hasLinkAccess) || isStewardForRepresentation(representation.id, context);
  }

  if (representation.visibilityScope === "community_visible") {
    return (
      Boolean(context.isCommunityParticipant) ||
      isStewardForRepresentation(representation.id, context)
    );
  }

  if (representation.visibilityScope === "steward_visible") {
    return isStewardForRepresentation(representation.id, context);
  }

  return false;
}

function isStewardForRepresentation(representationId: string, context: VisibilityContext) {
  return Boolean(context.stewardedRepresentationIds?.includes(representationId));
}

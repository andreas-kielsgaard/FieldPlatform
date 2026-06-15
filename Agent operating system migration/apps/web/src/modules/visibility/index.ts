export const visibilityAxes = {
  visibilityScope: ["private", "steward_visible", "community_visible", "link_visible", "public"],
  publicationStatus: ["draft", "published", "archived"],
  reviewState: ["not_required", "pending_review", "accepted", "rejected", "superseded"],
} as const;

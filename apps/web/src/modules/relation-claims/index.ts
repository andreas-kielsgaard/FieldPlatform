export const relationClaimsModule = {
  name: "relation-claims",
  boundary: "Nudges and relation suggestions are reviewable claims, not direct edits.",
} as const;

export * from "./contracts/relation-claim.input";
export * from "./contracts/relation-claim.view";
export * from "./domain/review-state";

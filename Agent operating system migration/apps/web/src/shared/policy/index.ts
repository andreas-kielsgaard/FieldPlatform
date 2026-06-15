export const policyBoundary = {
  name: "policy",
  owns: "authorization, visibility, publishing, and review decisions",
} as const;

export * from "./visibility";

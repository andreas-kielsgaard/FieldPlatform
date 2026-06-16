export const sharedUiBoundary = {
  name: "ui",
  owns: "presentation primitives only",
} as const;

export * from "./semantic-primitives";

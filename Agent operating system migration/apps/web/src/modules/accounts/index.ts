export type AccountId = string;

export const accountsModule = {
  name: "accounts",
  boundary: "Authentication account records, not public profile authority.",
} as const;

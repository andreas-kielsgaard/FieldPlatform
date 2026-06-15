export type StewardshipRole = "steward" | "reviewer" | "publisher";

export type StewardshipGrant = {
  representationId: string;
  accountId: string;
  role: StewardshipRole;
};

export function hasStewardshipRole(
  grants: readonly StewardshipGrant[],
  input: { accountId: string; representationId: string; role: StewardshipRole },
) {
  return grants.some(
    (grant) =>
      grant.accountId === input.accountId &&
      grant.representationId === input.representationId &&
      grant.role === input.role,
  );
}

import { accountIdSchema, profileIdSchema } from "../contracts";
import type { CurrentActor } from "./types";

export function createCurrentActor(input: { accountId: string; profileId?: string | null }) {
  const actor: CurrentActor = {
    accountId: accountIdSchema.parse(input.accountId),
  };

  if (input.profileId) {
    actor.profileId = profileIdSchema.parse(input.profileId);
  }

  return actor;
}

export function isAuthenticatedActor(actor: CurrentActor | null): actor is CurrentActor {
  return Boolean(actor?.accountId);
}

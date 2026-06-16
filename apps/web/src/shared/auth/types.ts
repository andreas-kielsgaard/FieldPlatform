import type { AccountId, ProfileId } from "../contracts";

export type CurrentActor = {
  accountId: AccountId;
  profileId?: ProfileId;
};

export type AnonymousActor = {
  accountId?: never;
  profileId?: never;
};

export type ActorContext = CurrentActor | AnonymousActor;

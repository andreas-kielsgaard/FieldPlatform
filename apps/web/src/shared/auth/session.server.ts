import type { CurrentActor } from "./types";

export type SessionLookup = (request: Request) => Promise<CurrentActor | null>;

let sessionLookup: SessionLookup = async () => null;

export function configureSessionLookup(lookup: SessionLookup) {
  sessionLookup = lookup;
}

export function getCurrentActorFromRequest(request: Request) {
  return sessionLookup(request);
}

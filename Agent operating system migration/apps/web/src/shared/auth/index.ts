export const authBoundary = {
  name: "auth",
  owns: "authentication/session translation only; product authority remains app-owned",
} as const;

export type { ActorContext, AnonymousActor, CurrentActor } from "./types";

import type { PlatformDomain } from "../platformDomain";
import { Community } from "./community";
import type { User } from "./user";

export class UserCommunityAccess {
  constructor(private readonly platform: PlatformDomain, private readonly user: User) {}

  followed(): Community[] {
    return this.edgesByState(["observing", "curious", "occasional"]);
  }

  member(): Community[] {
    return this.user.participationEdges()
      .filter(edge => ["member", "trusted", "core", "requested"].includes(edge.data().accessLevel))
      .map(edge => edge.community());
  }

  committed(): Community[] {
    return this.edgesByState(["recurring", "contributor", "facilitator", "steward"]);
  }

  dormant(): Community[] {
    return this.user.participationEdges()
      .filter(edge => edge.data().relationshipState === "dormant" || edge.data().decayState === "dormant" || edge.data().decayState === "fading")
      .map(edge => edge.community());
  }

  managed(): Community[] {
    return this.platform.communities.list().filter(community => community.canBeManagedBy(this.user));
  }

  private edgesByState(states: string[]): Community[] {
    return this.user.participationEdges()
      .filter(edge => states.includes(edge.data().relationshipState))
      .map(edge => edge.community());
  }
}

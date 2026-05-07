import type { Community } from "../models/community";
import type { PlatformDomain } from "../platformDomain";
import type { Id } from "../types";
import { idOf } from "../utils/domainUtils";

export class CommunityHealthService {
  constructor(private readonly platform: PlatformDomain) {}

  summarize(community: Community | Id): unknown {
    return this.platform.raw().calculations.summarizeGroup(idOf(community));
  }

  bondingScore(community: Community | Id): number {
    return Number(this.platform.raw().calculations.bondingScore(idOf(community)));
  }

  bridgingScore(community: Community | Id): number {
    return Number(this.platform.raw().calculations.bridgingScore(idOf(community)));
  }

  newcomerDropoff(community: Community | Id): unknown {
    return this.platform.raw().calculations.newcomerDropoff(idOf(community));
  }

  dormantParticipants(community: Community | Id): unknown {
    return this.platform.raw().calculations.dormantParticipants(idOf(community));
  }
}

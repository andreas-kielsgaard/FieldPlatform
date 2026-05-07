import type { Community } from "../models/community";
import type { PlatformDomain } from "../platformDomain";
import type { Id } from "../types";
export declare class CommunityHealthService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    summarize(community: Community | Id): unknown;
    bondingScore(community: Community | Id): number;
    bridgingScore(community: Community | Id): number;
    newcomerDropoff(community: Community | Id): unknown;
    dormantParticipants(community: Community | Id): unknown;
}

import type { Community } from "../models/community";
import type { Event } from "../models/event";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { EventDraftData, Id } from "../types";
export interface EventRecommendation {
    event: Event;
    score: number;
    reasons: string[];
}
export interface CommunityRecommendation {
    community: Community;
    score: number;
    reasons: string[];
}
export declare class RecommendationService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    eventsForUser(user: User | Id): EventRecommendation[];
    communitiesForUser(user: User | Id): CommunityRecommendation[];
    groupsForEventDraft(eventDraft: EventDraftData): CommunityRecommendation[];
}

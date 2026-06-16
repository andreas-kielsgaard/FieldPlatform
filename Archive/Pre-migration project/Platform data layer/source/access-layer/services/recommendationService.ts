import type { Community } from "../models/community";
import type { Event } from "../models/event";
import type { User } from "../models/user";
import type { PlatformDomain } from "../platformDomain";
import type { CommunityRecord, EventDraftData, EventRecord, Id } from "../types";
import { idOf, normalizeEventDraft } from "../utils/domainUtils";

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

export class RecommendationService {
  constructor(private readonly platform: PlatformDomain) {}

  eventsForUser(user: User | Id): EventRecommendation[] {
    return (this.platform.raw().calculations.recommendEventsForPerson(idOf(user)) as Array<{ event: EventRecord; score: number; reasons: string[] }>)
      .map(item => ({
        event: this.platform.events.get(item.event.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
  }

  communitiesForUser(user: User | Id): CommunityRecommendation[] {
    return (this.platform.raw().calculations.recommendGroupsForPerson(idOf(user)) as Array<{ group: CommunityRecord; score: number; reasons: string[] }>)
      .map(item => ({
        community: this.platform.communities.get(item.group.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
  }

  groupsForEventDraft(eventDraft: EventDraftData): CommunityRecommendation[] {
    return (this.platform.raw().calculations.recommendGroupsForEvent(normalizeEventDraft(eventDraft)) as Array<{ group: CommunityRecord; score: number; reasons: string[] }>)
      .map(item => ({
        community: this.platform.communities.get(item.group.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
  }
}

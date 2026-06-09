import type { PlatformDomain } from "../platformDomain";
import type { Id, SuggestedEventShareRecord } from "../types";
export declare class EventSuggestionService {
    private readonly platform;
    constructor(platform: PlatformDomain);
    suggest(eventId: Id, groupId: Id, suggestedBy: Id, note?: string): SuggestedEventShareRecord;
    feature(shareId: Id, featuredBy: Id): SuggestedEventShareRecord;
}

import type { PlatformDomain } from "../platformDomain";
import type { Id, SuggestedEventShareRecord } from "../types";

export class EventSuggestionService {
  constructor(private readonly platform: PlatformDomain) {}

  suggest(eventId: Id, groupId: Id, suggestedBy: Id, note = ""): SuggestedEventShareRecord {
    return this.platform.raw().database.create("suggestedEventShares", {
      eventId,
      groupId,
      suggestedBy,
      status: "pending",
      note
    }) as SuggestedEventShareRecord;
  }

  feature(shareId: Id, featuredBy: Id): SuggestedEventShareRecord {
    const updated = this.platform.raw().database.update("suggestedEventShares", shareId, {
      status: "featured",
      featuredBy
    }) as SuggestedEventShareRecord;

    this.platform.raw().database.transaction((snapshot: { featuredEvents: Id[] }) => {
      if (!snapshot.featuredEvents.includes(updated.eventId)) snapshot.featuredEvents.push(updated.eventId);
    });

    return updated;
  }
}

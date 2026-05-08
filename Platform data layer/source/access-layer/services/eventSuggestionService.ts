import type { PlatformDomain } from "../platformDomain";
import type { Id, SuggestedEventShareRecord } from "../types";

export class EventSuggestionService {
  constructor(private readonly platform: PlatformDomain) {}

  suggest(eventId: Id, groupId: Id, suggestedBy: Id, note = ""): SuggestedEventShareRecord {
    const share = this.platform.raw().database.create("suggestedEventShares", {
      eventId,
      groupId,
      suggestedBy,
      status: "pending",
      note
    }) as SuggestedEventShareRecord;

    this.platform.raw().database.create("fieldRelations", {
      sourceType: "event",
      sourceId: eventId,
      targetType: "community",
      targetId: groupId,
      relationKind: "relevant_to",
      relationStrength: 0,
      status: "suggested",
      provenance: "user_suggested",
      suggestedBy,
      reviewAuthorityType: "community",
      reviewAuthorityId: groupId,
      visibility: "visible_to_stewards",
      reason: note || "Event suggested as related to this community.",
      evidence: [{ type: "suggested_event_share", label: share.id, objectType: "event", objectId: eventId }],
      holdTypes: ["stewardship"],
      movementUnlocked: ["ask_steward", "remain_observing"]
    });

    return share;
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

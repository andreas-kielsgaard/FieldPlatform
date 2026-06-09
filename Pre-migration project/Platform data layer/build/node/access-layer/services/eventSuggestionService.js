"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSuggestionService = void 0;
class EventSuggestionService {
    constructor(platform) {
        this.platform = platform;
    }
    suggest(eventId, groupId, suggestedBy, note = "") {
        const share = this.platform.raw().database.create("suggestedEventShares", {
            eventId,
            groupId,
            suggestedBy,
            status: "pending",
            note
        });
        const existingMirror = this.platform.raw().queries.getFieldRelationsBetween("event", eventId, "community", groupId)
            .find((relation) => relation.relationKind === "relevant_to" &&
            relation.status === "suggested" &&
            relation.provenance === "user_suggested" &&
            relation.suggestedBy === suggestedBy);
        if (!existingMirror) {
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
        }
        return share;
    }
    feature(shareId, featuredBy) {
        const updated = this.platform.raw().database.update("suggestedEventShares", shareId, {
            status: "featured",
            featuredBy
        });
        this.platform.raw().database.transaction((snapshot) => {
            if (!snapshot.featuredEvents.includes(updated.eventId))
                snapshot.featuredEvents.push(updated.eventId);
        });
        return updated;
    }
}
exports.EventSuggestionService = EventSuggestionService;

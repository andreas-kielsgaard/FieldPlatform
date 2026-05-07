"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSuggestionService = void 0;
class EventSuggestionService {
    constructor(platform) {
        this.platform = platform;
    }
    suggest(eventId, groupId, suggestedBy, note = "") {
        return this.platform.raw().database.create("suggestedEventShares", {
            eventId,
            groupId,
            suggestedBy,
            status: "pending",
            note
        });
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

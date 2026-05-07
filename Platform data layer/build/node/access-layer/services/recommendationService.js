"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class RecommendationService {
    constructor(platform) {
        this.platform = platform;
    }
    eventsForUser(user) {
        return this.platform.raw().calculations.recommendEventsForPerson((0, domainUtils_1.idOf)(user))
            .map(item => ({
            event: this.platform.events.get(item.event.id),
            score: item.score,
            reasons: [...item.reasons]
        }));
    }
    communitiesForUser(user) {
        return this.platform.raw().calculations.recommendGroupsForPerson((0, domainUtils_1.idOf)(user))
            .map(item => ({
            community: this.platform.communities.get(item.group.id),
            score: item.score,
            reasons: [...item.reasons]
        }));
    }
    groupsForEventDraft(eventDraft) {
        return this.platform.raw().calculations.recommendGroupsForEvent((0, domainUtils_1.normalizeEventDraft)(eventDraft))
            .map(item => ({
            community: this.platform.communities.get(item.group.id),
            score: item.score,
            reasons: [...item.reasons]
        }));
    }
}
exports.RecommendationService = RecommendationService;

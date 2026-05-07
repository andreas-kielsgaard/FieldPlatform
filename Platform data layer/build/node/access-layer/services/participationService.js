"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationService = void 0;
const recordFactories_1 = require("../utils/recordFactories");
class ParticipationService {
    constructor(platform) {
        this.platform = platform;
    }
    setEdge(personId, groupId, patch) {
        const existing = this.platform.raw().queries.getParticipationEdge(personId, groupId);
        if (existing) {
            return this.platform.raw().database.update("participationEdges", existing.id, patch);
        }
        return this.platform.raw().database.create("participationEdges", {
            ...(0, recordFactories_1.defaultParticipationEdge)(personId, groupId),
            ...patch,
            personId,
            groupId
        });
    }
    followGroup(personId, groupId) {
        return this.setEdge(personId, groupId, {
            relationshipState: "curious",
            accessLevel: "known",
            recency: 35,
            frequency: 10,
            visibility: "visibleToStewards",
            decayState: "active"
        });
    }
    makeDormant(personId, groupId) {
        return this.setEdge(personId, groupId, {
            relationshipState: "dormant",
            decayState: "dormant",
            recency: 0
        });
    }
    reactivate(personId, groupId) {
        return this.setEdge(personId, groupId, {
            relationshipState: "curious",
            decayState: "reactivating",
            recency: 25,
            visibility: "visibleToStewards"
        });
    }
}
exports.ParticipationService = ParticipationService;

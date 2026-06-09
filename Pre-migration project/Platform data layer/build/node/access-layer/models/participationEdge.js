"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationEdge = void 0;
class ParticipationEdge {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().database.get("participationEdges", this.id);
    }
    user() {
        return this.platform.users.get(this.data().personId);
    }
    community() {
        return this.platform.communities.get(this.data().groupId);
    }
    strength() {
        return Number(this.platform.raw().calculations.engagementStrength(this.id));
    }
    makeDormant() {
        const record = this.platform.participation.makeDormant(this.data().personId, this.data().groupId);
        return new ParticipationEdge(this.platform, record.id);
    }
    reactivate() {
        const record = this.platform.participation.reactivate(this.data().personId, this.data().groupId);
        return new ParticipationEdge(this.platform, record.id);
    }
    update(patch) {
        this.platform.participation.setEdge(this.data().personId, this.data().groupId, patch);
        return this;
    }
}
exports.ParticipationEdge = ParticipationEdge;

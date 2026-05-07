"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const domainUtils_1 = require("../utils/domainUtils");
const participationEdge_1 = require("./participationEdge");
const userCommunityAccess_1 = require("./userCommunityAccess");
const userEventAccess_1 = require("./userEventAccess");
class User {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
        this.events = new userEventAccess_1.UserEventAccess(platform, this);
        this.communities = new userCommunityAccess_1.UserCommunityAccess(platform, this);
    }
    profile() {
        return this.platform.raw().queries.getPerson(this.id);
    }
    name() {
        return this.profile().name;
    }
    tags() {
        return [...this.profile().tags];
    }
    participationEdges() {
        return this.platform.raw().queries.getEdgesForPerson(this.id)
            .map(record => new participationEdge_1.ParticipationEdge(this.platform, record.id));
    }
    edgeTo(community) {
        const record = this.platform.raw().queries.getParticipationEdge(this.id, (0, domainUtils_1.idOf)(community));
        return record ? new participationEdge_1.ParticipationEdge(this.platform, record.id) : null;
    }
    followCommunity(community) {
        const record = this.platform.participation.followGroup(this.id, (0, domainUtils_1.idOf)(community));
        return new participationEdge_1.ParticipationEdge(this.platform, record.id);
    }
    requestMembership(community, note = "") {
        return this.platform.memberships.request(this.id, (0, domainUtils_1.idOf)(community), note);
    }
    createEvent(data) {
        return this.platform.events.create(data, this);
    }
    createCommunity(data) {
        return this.platform.communities.create(data, this);
    }
    canManageEvent(event) {
        return Boolean(this.platform.raw().queries.canManageEvent(this.id, (0, domainUtils_1.idOf)(event)));
    }
    canManageCommunity(community) {
        return Boolean(this.platform.raw().queries.canManageCommunity(this.id, (0, domainUtils_1.idOf)(community)));
    }
}
exports.User = User;

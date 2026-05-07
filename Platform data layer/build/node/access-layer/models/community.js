"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const domainUtils_1 = require("../utils/domainUtils");
const participationEdge_1 = require("./participationEdge");
class Community {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getGroup(this.id);
    }
    name() {
        return this.data().name;
    }
    changeName(name) {
        this.platform.communityManagement.update(this.id, { name });
        return this;
    }
    addTag(tag) {
        const tags = (0, domainUtils_1.addUnique)(this.data().tags, tag);
        this.platform.communityManagement.update(this.id, { tags });
        return this;
    }
    removeTag(tag) {
        const tags = this.data().tags.filter(existing => existing !== tag);
        this.platform.communityManagement.update(this.id, { tags });
        return this;
    }
    addVenue(venue) {
        const venues = (0, domainUtils_1.addUnique)(this.data().venues, (0, domainUtils_1.idOf)(venue));
        this.platform.communityManagement.update(this.id, { venues });
        return this;
    }
    removeVenue(venue) {
        const venueId = (0, domainUtils_1.idOf)(venue);
        const venues = this.data().venues.filter(existing => existing !== venueId);
        this.platform.communityManagement.update(this.id, { venues });
        return this;
    }
    updateEntryGuidance(entryGuidance) {
        this.platform.communityManagement.update(this.id, { entryGuidance });
        return this;
    }
    updateAccessRules(accessRules) {
        this.platform.communityManagement.update(this.id, { accessRules });
        return this;
    }
    followedBy(user) {
        const record = this.platform.participation.followGroup((0, domainUtils_1.idOf)(user), this.id);
        return new participationEdge_1.ParticipationEdge(this.platform, record.id);
    }
    requestMembership(user, note = "") {
        return this.platform.memberships.request((0, domainUtils_1.idOf)(user), this.id, note);
    }
    approveMembershipRequest(requestId, approver) {
        const record = this.platform.memberships.approve(requestId, (0, domainUtils_1.idOf)(approver));
        return new participationEdge_1.ParticipationEdge(this.platform, record.id);
    }
    markRelationshipTo(otherCommunity, type = "markedBySteward", note = "", markedBy) {
        return this.platform.communityManagement.markRelationshipTo(this.id, (0, domainUtils_1.idOf)(otherCommunity), type, note, markedBy ? (0, domainUtils_1.idOf)(markedBy) : null);
    }
    events() {
        return this.platform.events.list()
            .filter(event => (0, domainUtils_1.touchesCommunity)(event.data(), this.id));
    }
    bridgeEvents() {
        return this.events().filter(event => (0, domainUtils_1.isBridgeEvent)(event.data()));
    }
    deeperEvents() {
        return this.events().filter(event => !(0, domainUtils_1.isBridgeEvent)(event.data()));
    }
    participationEdges() {
        return this.platform.raw().queries.getEdgesForGroup(this.id)
            .map(record => new participationEdge_1.ParticipationEdge(this.platform, record.id));
    }
    personalMetricsFor(user) {
        return this.platform.raw().calculations.personalGroupMetrics((0, domainUtils_1.idOf)(user), this.id);
    }
    health() {
        return this.platform.communityHealth.summarize(this);
    }
    generatedFields() {
        return this.platform.generatedFields.generateFieldsFromCommunities([this]);
    }
    canBeManagedBy(user) {
        return Boolean(this.platform.raw().queries.canManageCommunity((0, domainUtils_1.idOf)(user), this.id));
    }
}
exports.Community = Community;

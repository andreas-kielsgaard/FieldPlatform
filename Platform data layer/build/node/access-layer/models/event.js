"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const domainUtils_1 = require("../utils/domainUtils");
class Event {
    constructor(platform, id) {
        this.platform = platform;
        this.id = id;
    }
    data() {
        return this.platform.raw().queries.getEvent(this.id);
    }
    title() {
        return this.data().title;
    }
    changeName(name) {
        this.platform.eventManagement.update(this.id, { title: name });
        return this;
    }
    addTag(tag) {
        const tags = (0, domainUtils_1.addUnique)(this.data().tags, tag);
        this.platform.eventManagement.update(this.id, { tags });
        return this;
    }
    removeTag(tag) {
        const tags = this.data().tags.filter(existing => existing !== tag);
        this.platform.eventManagement.update(this.id, { tags });
        return this;
    }
    setVenue(venue) {
        this.platform.eventManagement.update(this.id, { venueId: (0, domainUtils_1.idOf)(venue) });
        return this;
    }
    setAccess(access) {
        this.platform.eventManagement.update(this.id, { access });
        return this;
    }
    registerUser(user) {
        this.platform.eventRegistration.register((0, domainUtils_1.idOf)(user), this.id);
        return this;
    }
    markUserInterested(user) {
        this.platform.eventRegistration.markInterested((0, domainUtils_1.idOf)(user), this.id);
        return this;
    }
    suggestToCommunity(community, suggestedBy, note = "") {
        return this.platform.eventSuggestions.suggest(this.id, (0, domainUtils_1.idOf)(community), (0, domainUtils_1.idOf)(suggestedBy), note);
    }
    relevanceFor(user) {
        return this.platform.raw().calculations.eventInterest((0, domainUtils_1.idOf)(user), this.id);
    }
    linkedCommunities() {
        return this.data().linkedGroups.map(groupId => this.platform.communities.get(groupId));
    }
    relevantCommunities() {
        return this.data().relevantGroups.map(groupId => this.platform.communities.get(groupId));
    }
    venue() {
        return this.platform.venues.get(this.data().venueId);
    }
    canBeManagedBy(user) {
        return Boolean(this.platform.raw().queries.canManageEvent((0, domainUtils_1.idOf)(user), this.id));
    }
}
exports.Event = Event;

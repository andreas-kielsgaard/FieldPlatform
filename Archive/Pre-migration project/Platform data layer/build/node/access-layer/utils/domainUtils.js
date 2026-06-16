"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idOf = idOf;
exports.addUnique = addUnique;
exports.normalizeEventDraft = normalizeEventDraft;
exports.normalizeCommunityDraft = normalizeCommunityDraft;
exports.touchesCommunity = touchesCommunity;
exports.isBridgeEvent = isBridgeEvent;
exports.clone = clone;
function idOf(value) {
    return typeof value === "string" ? value : value.id;
}
function addUnique(items, item) {
    return items.includes(item) ? [...items] : [...items, item];
}
function normalizeEventDraft(data, creatorId) {
    return {
        access: "public",
        tags: [],
        linkedGroups: [],
        relevantGroups: [],
        attendance: { interested: [], attending: [] },
        ...data,
        creatorId: data.creatorId || creatorId,
        hostId: data.hostId || creatorId
    };
}
function normalizeCommunityDraft(data) {
    return {
        state: "draft",
        tags: [],
        norms: [],
        venues: [],
        stewards: [],
        ...data
    };
}
function touchesCommunity(event, communityId) {
    return [...event.linkedGroups, ...event.relevantGroups].includes(communityId);
}
function isBridgeEvent(event) {
    return event.access === "public" ||
        event.tags.includes("beginner-friendly") ||
        event.tags.includes("low-threshold") ||
        event.tags.includes("drop-in");
}
function clone(value) {
    if (typeof structuredClone === "function")
        return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
}

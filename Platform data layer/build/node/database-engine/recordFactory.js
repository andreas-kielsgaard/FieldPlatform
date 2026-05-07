"use strict";
const FieldPlatformRecordFactory = (() => {
    const { generateId, unique } = getUtils();
    const { collectionPrefixes } = getConfig();
    function withId(collectionName, record, idPrefix = null) {
        return {
            ...record,
            id: record.id || generateId(idPrefix || collectionPrefixes[collectionName] || collectionName)
        };
    }
    function edgeId(personId, groupId) {
        return `edge_${personId}_${groupId}`;
    }
    function groupRelationshipId(relationship, index) {
        return `group_rel_${relationship.fromGroupId}_${relationship.toGroupId}_${relationship.type || "related"}_${index}`;
    }
    function managedObjectId(personId, objectType, objectId, roles = []) {
        return `managed_${personId}_${objectType}_${objectId}_${roles.join("_") || "role"}`;
    }
    function defaultParticipationEdge(personId, groupId) {
        return {
            id: edgeId(personId, groupId),
            personId,
            groupId,
            relationshipState: "observing",
            accessLevel: "public",
            engagementStrength: 0,
            recency: 0,
            frequency: 0,
            contributionLevel: 0,
            trustLevel: 0,
            roleModes: [],
            socialEmbeddedness: "none",
            normFamiliarity: "new",
            identitySalience: "low",
            visibility: "privateToUser",
            decayState: "active"
        };
    }
    function normalizeEventRecord(event) {
        var _a, _b;
        return {
            linkedGroups: [],
            relevantGroups: [],
            tags: [],
            cohostIds: [],
            volunteerIds: [],
            attendance: { interested: [], attending: [] },
            ...withId("events", event),
            attendance: {
                interested: unique(((_a = event.attendance) === null || _a === void 0 ? void 0 : _a.interested) || []),
                attending: unique(((_b = event.attendance) === null || _b === void 0 ? void 0 : _b.attending) || [])
            }
        };
    }
    function getUtils() {
        if (typeof require === "function")
            return require("./utils");
        return window.FieldPlatformDatabaseUtils;
    }
    function getConfig() {
        if (typeof require === "function")
            return require("./collectionConfig");
        return window.FieldPlatformCollectionConfig;
    }
    return {
        withId,
        edgeId,
        groupRelationshipId,
        managedObjectId,
        defaultParticipationEdge,
        normalizeEventRecord
    };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformRecordFactory = FieldPlatformRecordFactory;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformRecordFactory;
}

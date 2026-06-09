"use strict";
const FieldPlatformSnapshotNormalizer = (() => {
    const { clone, unique } = getUtils();
    const { collectionNames } = getConfig();
    const { defaultParticipationEdge, edgeId, groupRelationshipId, relationReviewId, managedObjectId, normalizeFieldRelationRecord, normalizeDataShareRequestRecord, normalizeVisibilityGrantRecord, normalizeEventRecord, withId } = getRecordFactory();
    function normalizeSnapshot(input) {
        const snapshot = clone(input || {});
        collectionNames.forEach(collectionName => {
            if (!Array.isArray(snapshot[collectionName]))
                snapshot[collectionName] = [];
        });
        snapshot.schemaVersion = snapshot.schemaVersion || 1;
        snapshot.appState = snapshot.appState || {
            currentPersonId: snapshot.currentPersonId || "p_casey",
            focus: snapshot.focus || { type: "group", id: "ci" }
        };
        snapshot.personas = snapshot.personas || ["p_casey", "p_maya", "p_liv", "p_samir", "p_rune", "p_noa"];
        snapshot.people = snapshot.people.map(person => withId("people", person));
        snapshot.groups = snapshot.groups.map(group => ({
            tags: [],
            norms: [],
            venues: [],
            stewards: [],
            ...withId("groups", group)
        }));
        snapshot.venues = snapshot.venues.map(venue => ({
            associatedGroups: [],
            ...withId("venues", venue)
        }));
        snapshot.events = snapshot.events.map(normalizeEventRecord);
        snapshot.createdEvents = snapshot.createdEvents.map(normalizeEventRecord);
        snapshot.participationEdges = snapshot.participationEdges.map(edge => ({
            ...defaultParticipationEdge(edge.personId, edge.groupId),
            ...edge,
            id: edge.id || edgeId(edge.personId, edge.groupId)
        }));
        snapshot.groupRelationships = snapshot.groupRelationships.map((relationship, index) => ({
            id: relationship.id || groupRelationshipId(relationship, index),
            source: relationship.source || "seed",
            ...relationship
        }));
        snapshot.fieldRelations = snapshot.fieldRelations.map(normalizeFieldRelationRecord);
        snapshot.relationReviews = snapshot.relationReviews.map((review, index) => ({
            id: review.id || relationReviewId(review.fieldRelationId, review.action, index),
            ...review
        }));
        snapshot.dataShareRequests = snapshot.dataShareRequests.map(normalizeDataShareRequestRecord);
        snapshot.visibilityGrants = snapshot.visibilityGrants.map(normalizeVisibilityGrantRecord);
        snapshot.membershipRequests = snapshot.membershipRequests.map(request => withId("membershipRequests", request));
        snapshot.suggestedEventShares = snapshot.suggestedEventShares.map(share => withId("suggestedEventShares", share));
        snapshot.festivals = snapshot.festivals.map(festival => withId("festivals", festival));
        snapshot.forumThreads = snapshot.forumThreads.map(thread => withId("forumThreads", thread));
        snapshot.createdCommunities = snapshot.createdCommunities.map(record => withId("createdCommunities", record));
        snapshot.managedObjects = mergeManagedObjects(snapshot.managedObjects, deriveManagedObjects(snapshot)).map(record => withId("managedObjects", record));
        snapshot.featuredEvents = unique(snapshot.featuredEvents);
        return snapshot;
    }
    function deriveManagedObjects(snapshot) {
        const managed = [];
        snapshot.groups.forEach(group => {
            (group.stewards || []).forEach(personId => {
                managed.push({
                    id: managedObjectId(personId, "group", group.id, ["steward", "manager"]),
                    personId,
                    objectType: "group",
                    objectId: group.id,
                    roles: ["steward", "manager"],
                    source: "group.stewards"
                });
            });
            if (group.creatorId) {
                managed.push({
                    id: managedObjectId(group.creatorId, "group", group.id, ["creator", "manager"]),
                    personId: group.creatorId,
                    objectType: "group",
                    objectId: group.id,
                    roles: ["creator", "manager"],
                    source: "group.creator"
                });
            }
        });
        [...snapshot.events, ...snapshot.createdEvents].forEach(event => {
            if (event.creatorId) {
                managed.push({
                    id: managedObjectId(event.creatorId, "event", event.id, ["creator", "manager"]),
                    personId: event.creatorId,
                    objectType: "event",
                    objectId: event.id,
                    roles: ["creator", "manager"],
                    source: "event.creator"
                });
            }
            if (event.hostId) {
                managed.push({
                    id: managedObjectId(event.hostId, "event", event.id, ["host", "manager"]),
                    personId: event.hostId,
                    objectType: "event",
                    objectId: event.id,
                    roles: ["host", "manager"],
                    source: "event.host"
                });
            }
            (event.cohostIds || []).forEach(personId => {
                managed.push({
                    id: managedObjectId(personId, "event", event.id, ["cohost", "manager"]),
                    personId,
                    objectType: "event",
                    objectId: event.id,
                    roles: ["cohost", "manager"],
                    source: "event.cohost"
                });
            });
            (event.volunteerIds || []).forEach(personId => {
                managed.push({
                    id: managedObjectId(personId, "event", event.id, ["volunteer"]),
                    personId,
                    objectType: "event",
                    objectId: event.id,
                    roles: ["volunteer"],
                    source: "event.volunteer"
                });
            });
        });
        return managed;
    }
    function mergeManagedObjects(existing, derived) {
        const byId = new Map();
        [...existing, ...derived].forEach(item => byId.set(item.id, item));
        return Array.from(byId.values());
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
    function getRecordFactory() {
        if (typeof require === "function")
            return require("./recordFactory");
        return window.FieldPlatformRecordFactory;
    }
    return {
        normalizeSnapshot,
        deriveManagedObjects
    };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformSnapshotNormalizer = FieldPlatformSnapshotNormalizer;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformSnapshotNormalizer;
}

"use strict";
const FieldPlatformQueryApi = (() => {
    function createQueryApi(database) {
        const { get, find, list } = database;
        function getManagedObjectsForPerson(personId) {
            return list("managedObjects", { filter: { personId } });
        }
        function getEvent(eventId) {
            return get("events", eventId) || get("createdEvents", eventId);
        }
        function canManageEvent(personId, eventId) {
            const event = getEvent(eventId);
            if (!event)
                return false;
            if (event.creatorId === personId || event.hostId === personId)
                return true;
            if ((event.cohostIds || []).includes(personId))
                return true;
            if ((event.volunteerIds || []).includes(personId))
                return true;
            return getManagedObjectsForPerson(personId).some(item => item.objectType === "event" && item.objectId === eventId);
        }
        function canManageCommunity(personId, groupId) {
            const group = get("groups", groupId);
            if (!group)
                return false;
            if (group.creatorId === personId || (group.stewards || []).includes(personId))
                return true;
            return getManagedObjectsForPerson(personId).some(item => item.objectType === "group" && item.objectId === groupId);
        }
        function relationTouchesObject(relation, objectType, objectId) {
            return (relation.sourceType === objectType && relation.sourceId === objectId) ||
                (relation.targetType === objectType && relation.targetId === objectId);
        }
        return {
            getPerson: personId => get("people", personId),
            listPeople: () => list("people"),
            getGroup: groupId => get("groups", groupId),
            listGroups: () => list("groups"),
            getVenue: venueId => get("venues", venueId),
            listVenues: () => list("venues"),
            getEvent,
            listEvents: () => [...list("events"), ...list("createdEvents")],
            getFestival: festivalId => get("festivals", festivalId),
            listFestivals: () => list("festivals"),
            getParticipationEdge: (personId, groupId) => find("participationEdges", edge => edge.personId === personId && edge.groupId === groupId),
            getEdgesForPerson: personId => list("participationEdges", { filter: { personId } }),
            getEdgesForGroup: groupId => list("participationEdges", { filter: { groupId } }),
            getMembershipRequestsForGroup: groupId => list("membershipRequests", { filter: { groupId } }),
            getSuggestedEventSharesForGroup: groupId => list("suggestedEventShares", { filter: { groupId } }),
            getFieldRelation: relationId => get("fieldRelations", relationId),
            listFieldRelations: () => list("fieldRelations"),
            getFieldRelationsForObject: (objectType, objectId) => list("fieldRelations").filter(relation => relationTouchesObject(relation, objectType, objectId)),
            getFieldRelationsBetween: (sourceType, sourceId, targetType, targetId) => list("fieldRelations").filter(relation => relation.sourceType === sourceType &&
                relation.sourceId === sourceId &&
                relation.targetType === targetType &&
                relation.targetId === targetId),
            getFieldRelationsForReviewAuthority: (authorityType, authorityId) => list("fieldRelations").filter(relation => relation.reviewAuthorityType === authorityType &&
                relation.reviewAuthorityId === authorityId),
            getPendingFieldRelationsForReviewAuthority: (authorityType, authorityId) => list("fieldRelations").filter(relation => relation.reviewAuthorityType === authorityType &&
                relation.reviewAuthorityId === authorityId &&
                relation.status === "suggested"),
            getRelationReviewsForRelation: fieldRelationId => list("relationReviews", { filter: { fieldRelationId } }),
            getManagedObjectsForPerson,
            canManageEvent,
            canManageCommunity
        };
    }
    return { createQueryApi };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformQueryApi = FieldPlatformQueryApi;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformQueryApi;
}

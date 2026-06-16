"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeId = edgeId;
exports.managedObjectId = managedObjectId;
exports.groupRelationshipId = groupRelationshipId;
exports.defaultParticipationEdge = defaultParticipationEdge;
function edgeId(personId, groupId) {
    return `edge_${personId}_${groupId}`;
}
function managedObjectId(personId, objectType, objectId, roles) {
    return `managed_${personId}_${objectType}_${objectId}_${roles.join("_") || "role"}`;
}
function groupRelationshipId(fromGroupId, toGroupId, type) {
    return `group_rel_${fromGroupId}_${toGroupId}_${type}_${Date.now()}`;
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

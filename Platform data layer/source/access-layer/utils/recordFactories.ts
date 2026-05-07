import type { Id, ParticipationEdgeRecord } from "../types";

export function edgeId(personId: Id, groupId: Id): Id {
  return `edge_${personId}_${groupId}`;
}

export function managedObjectId(personId: Id, objectType: "event" | "group" | string, objectId: Id, roles: string[]): Id {
  return `managed_${personId}_${objectType}_${objectId}_${roles.join("_") || "role"}`;
}

export function groupRelationshipId(fromGroupId: Id, toGroupId: Id, type: string): Id {
  return `group_rel_${fromGroupId}_${toGroupId}_${type}_${Date.now()}`;
}

export function defaultParticipationEdge(personId: Id, groupId: Id): ParticipationEdgeRecord {
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

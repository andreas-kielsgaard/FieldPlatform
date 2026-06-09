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

  function fieldRelationId(sourceType, sourceId, targetType, targetId, relationKind, index = 0) {
    return `field_rel_${sourceType}_${sourceId}_${targetType}_${targetId}_${relationKind || "related"}_${index}`;
  }

  function relationReviewId(fieldRelationIdValue, action, index = 0) {
    return `relation_review_${fieldRelationIdValue}_${action || "review"}_${index}`;
  }

  function dataShareRequestId(requesterType, requesterId, subjectType, subjectId, purpose, index = 0) {
    return `data_share_request_${requesterType}_${requesterId}_${subjectType}_${subjectId}_${purpose || "share"}_${index}`;
  }

  function visibilityGrantId(subjectType, subjectId, recipientScope, purpose, index = 0) {
    return `visibility_grant_${subjectType}_${subjectId}_${recipientScope || "scope"}_${purpose || "purpose"}_${index}`;
  }

  function normalizeFieldRelationRecord(relation, index = 0) {
    return {
      relationStrength: 0,
      status: "suggested",
      provenance: "calculated",
      visibility: "visible_to_stewards",
      evidence: [],
      holdTypes: [],
      movementUnlocked: [],
      ...relation,
      id: relation.id || fieldRelationId(
        relation.sourceType,
        relation.sourceId,
        relation.targetType,
        relation.targetId,
        relation.relationKind,
        index
      )
    };
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
    return {
      linkedGroups: [],
      relevantGroups: [],
      tags: [],
      cohostIds: [],
      volunteerIds: [],
      attendance: { interested: [], attending: [] },
      ...withId("events", event),
      attendance: {
        interested: unique(event.attendance?.interested || []),
        attending: unique(event.attendance?.attending || [])
      }
    };
  }

  function normalizeDataShareRequestRecord(request, index = 0) {
    const now = request.createdAt || new Date().toISOString();
    return {
      facets: [],
      recipientIds: [],
      requirementLevel: "optional_before_action",
      status: "pending",
      version: 1,
      materialChangeBehavior: "requires_update_on_change",
      createdAt: now,
      updatedAt: request.updatedAt || now,
      ...request,
      facets: unique(request.facets || []),
      recipientIds: unique(request.recipientIds || []),
      id: request.id || dataShareRequestId(
        request.requesterType,
        request.requesterId,
        request.subjectType,
        request.subjectId,
        request.purpose,
        index
      )
    };
  }

  function normalizeVisibilityGrantRecord(grant, index = 0) {
    const now = grant.createdAt || new Date().toISOString();
    return {
      facets: [],
      recipientIds: [],
      status: "active",
      audienceBehavior: "fixed",
      createdAt: now,
      updatedAt: grant.updatedAt || now,
      ...grant,
      facets: unique(grant.facets || []),
      recipientIds: unique(grant.recipientIds || []),
      id: grant.id || visibilityGrantId(
        grant.subjectType,
        grant.subjectId,
        grant.recipientScope,
        grant.purpose,
        index
      )
    };
  }

  function getUtils() {
    if (typeof require === "function") return require("./utils");
    return window.FieldPlatformDatabaseUtils;
  }

  function getConfig() {
    if (typeof require === "function") return require("./collectionConfig");
    return window.FieldPlatformCollectionConfig;
  }

  return {
    withId,
    edgeId,
    groupRelationshipId,
    managedObjectId,
    fieldRelationId,
    relationReviewId,
    dataShareRequestId,
    visibilityGrantId,
    defaultParticipationEdge,
    normalizeEventRecord,
    normalizeFieldRelationRecord,
    normalizeDataShareRequestRecord,
    normalizeVisibilityGrantRecord
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformRecordFactory = FieldPlatformRecordFactory;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformRecordFactory;
}

const FieldPlatformFieldRelationCalculations = (() => {
  const shared = getShared();

  function relationsForObject(snapshot, objectType, objectId) {
    return (snapshot.fieldRelations || []).filter(relation => touchesObject(relation, objectType, objectId));
  }

  function acceptedRelationsForObject(snapshot, objectType, objectId) {
    return relationsForObject(snapshot, objectType, objectId).filter(relation => relation.status === "accepted");
  }

  function pendingRelationsForReviewAuthority(snapshot, authorityType, authorityId) {
    return (snapshot.fieldRelations || []).filter(relation =>
      relation.status === "suggested" &&
      relation.reviewAuthorityType === authorityType &&
      relation.reviewAuthorityId === authorityId
    );
  }

  function movementOptionsForRelation(snapshot, relationId) {
    const relation = findRelation(snapshot, relationId);
    if (!relation) return [];
    if (relation.status === "declined") return ["remain_observing"];
    if (relation.status === "suggested") return unique([...(relation.movementUnlocked || []), "ask_steward", "remain_observing"]);
    if (relation.visibility === "private" && relation.sourceType !== "person") return unique(relation.movementUnlocked || []);

    const derived = [];
    if (relation.status === "accepted" || relation.status === "refined" || relation.status === "computed") {
      if (relation.relationKind === "good_first_step_for" || relation.relationKind === "belongs_with") {
        if (relation.sourceType === "event" || relation.targetType === "event") derived.push("attend", "mark_interested");
        if (relation.sourceType === "community" || relation.targetType === "community") derived.push("follow", "request_access");
      }
      if (relation.relationKind === "soft_landing_after") derived.push("attend", "follow");
      if (relation.relationKind === "bridges_to") derived.push("follow", "suggest_connection");
      if (relation.sourceType === "person" || relation.targetType === "person") derived.push("remain_observing", "request_access", "ask_steward");
    }

    return unique([...(relation.movementUnlocked || []), ...derived]);
  }

  function relationExplanation(snapshot, relationId) {
    const relation = findRelation(snapshot, relationId);
    if (!relation) return null;
    return {
      relationId: relation.id,
      status: relation.status,
      provenance: relation.provenance,
      relationKind: relation.relationKind,
      source: describeEndpoint(snapshot, relation.sourceType, relation.sourceId),
      target: describeEndpoint(snapshot, relation.targetType, relation.targetId),
      reason: relation.reason || fallbackReason(relation),
      evidence: relation.evidence || [],
      holdTypes: relation.holdTypes || [],
      movementOptions: movementOptionsForRelation(snapshot, relation.id)
    };
  }

  function holdSignalsForObject(snapshot, objectType, objectId) {
    const counts = {};
    relationsForObject(snapshot, objectType, objectId).forEach(relation => {
      (relation.holdTypes || []).forEach(holdType => {
        counts[holdType] = (counts[holdType] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([holdType, count]) => ({ holdType, count }));
  }

  function findRelation(snapshot, relationId) {
    return (snapshot.fieldRelations || []).find(relation => relation.id === relationId);
  }

  function touchesObject(relation, objectType, objectId) {
    return (relation.sourceType === objectType && relation.sourceId === objectId) ||
      (relation.targetType === objectType && relation.targetId === objectId);
  }

  function describeEndpoint(snapshot, objectType, objectId) {
    const record = getRecord(snapshot, objectType, objectId);
    return {
      objectType,
      objectId,
      label: record?.name || record?.title || record?.id || objectId
    };
  }

  function getRecord(snapshot, objectType, objectId) {
    if (objectType === "person") return shared.getPerson(snapshot, objectId);
    if (objectType === "community") return shared.getGroup(snapshot, objectId);
    if (objectType === "event") return (snapshot.events || []).find(event => event.id === objectId) || (snapshot.createdEvents || []).find(event => event.id === objectId);
    if (objectType === "venue") return shared.getVenue(snapshot, objectId);
    if (objectType === "festival") return (snapshot.festivals || []).find(festival => festival.id === objectId);
    if (objectType === "generatedField") return { id: objectId, name: objectId };
    if (objectType === "practice" || objectType === "tag") return { id: objectId, name: objectId };
    return null;
  }

  function fallbackReason(relation) {
    if (relation.status === "suggested") return "Suggested connection waiting for review.";
    if (relation.status === "computed") return "Calculated from shared context.";
    if (relation.status === "accepted") return "Accepted connection.";
    return "Relation is represented in the data model.";
  }

  function unique(items) {
    return Array.from(new Set(items.filter(Boolean)));
  }

  function getShared() {
    if (typeof require === "function") return require("./shared");
    return window.FieldPlatformCalculationShared;
  }

  return {
    relationsForObject,
    acceptedRelationsForObject,
    pendingRelationsForReviewAuthority,
    movementOptionsForRelation,
    relationExplanation,
    holdSignalsForObject
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformFieldRelationCalculations = FieldPlatformFieldRelationCalculations;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformFieldRelationCalculations;
}

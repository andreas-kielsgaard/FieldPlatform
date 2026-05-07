const FieldPlatformCommunityHealthCalculations = (() => {
  const shared = getShared();
  const { average, clamp, unique, getPerson, getEdgesForGroup, getEdgesForPerson, computeEngagementStrength } = shared;
  const { computeGroupOverlap } = getOverlap();
  const { generateEmergentFields } = getGeneratedFields();

  function computeBondingScore(data, groupId) {
    const edges = getEdgesForGroup(data, groupId);
    if (!edges.length) return 0;
    const strongEdges = edges.filter(edge => ["recurring", "contributor", "facilitator", "steward"].includes(edge.relationshipState));
    const trustAverage = average(edges.map(edge => edge.trustLevel));
    const carrierRatio = edges.filter(edge => edge.normFamiliarity === "carrier").length / edges.length;
    const embeddedRatio = edges.filter(edge => ["moderate", "strong"].includes(edge.socialEmbeddedness)).length / edges.length;

    return Math.round(clamp(
      strongEdges.length / edges.length * 38 +
      trustAverage * 0.28 +
      carrierRatio * 18 +
      embeddedRatio * 16
    ));
  }

  function computeBridgingScore(data, groupId) {
    const edges = getEdgesForGroup(data, groupId);
    const people = edges.map(edge => edge.personId);
    const bridgePeople = people.filter(personId => getEdgesForPerson(data, personId).filter(edge => edge.groupId !== groupId && computeEngagementStrength(edge) > 25).length >= 2);
    const relationships = data.groupRelationships.filter(rel => rel.fromGroupId === groupId || rel.toGroupId === groupId);
    const relevantEvents = data.events.filter(event => event.relevantGroups.includes(groupId) && event.relevantGroups.length > 1);
    return Math.round(clamp(bridgePeople.length * 11 + relationships.length * 8 + relevantEvents.length * 5));
  }

  function detectDormantParticipants(data, groupId) {
    return getEdgesForGroup(data, groupId)
      .filter(edge => edge.decayState === "dormant" || edge.relationshipState === "dormant" || edge.decayState === "reactivating" || edge.decayState === "fading")
      .map(edge => ({
        person: getPerson(data, edge.personId),
        edge,
        note: edge.decayState === "reactivating"
          ? "reactivating through beginner-friendly or low-threshold events"
          : "participation has faded; avoid individual targeting and look for aggregate patterns"
      }));
  }

  function detectNewcomerDropoff(data, groupId) {
    const edges = getEdgesForGroup(data, groupId);
    const newcomerCount = edges.filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState)).length;
    const recurringCount = edges.filter(edge => ["recurring", "contributor", "facilitator", "steward"].includes(edge.relationshipState)).length;
    const fadingCount = edges.filter(edge => ["fading", "dormant"].includes(edge.decayState)).length;
    const rate = Math.round(clamp((newcomerCount + fadingCount) / Math.max(1, edges.length) * 100));

    return {
      newcomerCount,
      recurringCount,
      fadingCount,
      rate,
      message: rate > 45
        ? "Many newcomers or light participants are not yet forming a second point of contact."
        : "Newcomer continuation looks reasonably balanced in this demo state."
    };
  }

  function detectBridgePeople(data, groupOrFieldId) {
    const field = generateEmergentFields(data).find(item => item.id === groupOrFieldId);
    const groupIds = field ? field.groups : [groupOrFieldId];
    const candidateIds = unique(groupIds.flatMap(groupId => getEdgesForGroup(data, groupId).map(edge => edge.personId)));

    return candidateIds
      .map(personId => {
        const edges = getEdgesForPerson(data, personId).filter(edge => computeEngagementStrength(edge) > 25);
        return {
          person: getPerson(data, personId),
          edges,
          bridgeScore: Math.round(clamp(edges.length * 18 + average(edges.map(edge => computeEngagementStrength(edge))) * 0.35))
        };
      })
      .filter(item => item.edges.length >= 2)
      .sort((a, b) => b.bridgeScore - a.bridgeScore)
      .slice(0, 6);
  }

  function summarizeGroup(data, groupId) {
    const group = shared.getGroup(data, groupId);
    const edges = getEdgesForGroup(data, groupId);
    const distribution = {};
    edges.forEach(edge => {
      distribution[edge.relationshipState] = (distribution[edge.relationshipState] || 0) + 1;
    });
    const overlaps = data.groups
      .filter(other => other.id !== groupId)
      .map(other => computeGroupOverlap(data, groupId, other.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return {
      group,
      edges,
      distribution,
      bondingScore: computeBondingScore(data, groupId),
      bridgingScore: computeBridgingScore(data, groupId),
      dropoff: detectNewcomerDropoff(data, groupId),
      dormant: detectDormantParticipants(data, groupId),
      bridges: detectBridgePeople(data, groupId),
      overlaps
    };
  }

  function getShared() {
    if (typeof require === "function") return require("./shared");
    return window.FieldPlatformCalculationShared;
  }

  function getOverlap() {
    if (typeof require === "function") return require("./overlap");
    return window.FieldPlatformOverlapCalculations;
  }

  function getGeneratedFields() {
    if (typeof require === "function") return require("./generatedFields");
    return window.FieldPlatformGeneratedFieldCalculations;
  }

  return {
    computeBondingScore,
    computeBridgingScore,
    detectDormantParticipants,
    detectNewcomerDropoff,
    detectBridgePeople,
    summarizeGroup
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformCommunityHealthCalculations = FieldPlatformCommunityHealthCalculations;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformCommunityHealthCalculations;
}

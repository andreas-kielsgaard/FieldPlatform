const FieldPlatformCalculations = (() => {
  const shared = getShared();
  const overlap = getOverlap();
  const generatedFields = getGeneratedFields();
  const communityHealth = getCommunityHealth();
  const recommendations = getRecommendations();

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

  function getCommunityHealth() {
    if (typeof require === "function") return require("./communityHealth");
    return window.FieldPlatformCommunityHealthCalculations;
  }

  function getRecommendations() {
    if (typeof require === "function") return require("./recommendations");
    return window.FieldPlatformRecommendationCalculations;
  }

  return {
    computeEngagementStrength: shared.computeEngagementStrength,
    computeBondingScore: communityHealth.computeBondingScore,
    computeBridgingScore: communityHealth.computeBridgingScore,
    computeGroupOverlap: overlap.computeGroupOverlap,
    generateEmergentFields: generatedFields.generateEmergentFields,
    recommendGroupsForParticipant: recommendations.recommendGroupsForParticipant,
    recommendEventsForParticipant: recommendations.recommendEventsForParticipant,
    recommendGroupsForEvent: recommendations.recommendGroupsForEvent,
    computePersonalGroupMetrics: recommendations.computePersonalGroupMetrics,
    computeCreatorGroupSignal: recommendations.computeCreatorGroupSignal,
    detectDormantParticipants: communityHealth.detectDormantParticipants,
    detectNewcomerDropoff: communityHealth.detectNewcomerDropoff,
    detectBridgePeople: communityHealth.detectBridgePeople,
    summarizeGroup: communityHealth.summarizeGroup,
    eventRelevanceCalculation: recommendations.eventRelevanceCalculation,
    getGroup: shared.getGroup,
    getPerson: shared.getPerson,
    getVenue: shared.getVenue,
    getEdgesForGroup: shared.getEdgesForGroup,
    getEdgesForPerson: shared.getEdgesForPerson
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformCalculations = FieldPlatformCalculations;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformCalculations;
}

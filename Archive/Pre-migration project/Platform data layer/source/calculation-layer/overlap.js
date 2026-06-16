const FieldPlatformOverlapCalculations = (() => {
  const shared = getShared();
  const { clamp, getEdgesForGroup, getGroup, computeEngagementStrength } = shared;

  function computeGroupOverlap(data, groupAId, groupBId) {
    const a = getEdgesForGroup(data, groupAId).filter(edge => computeEngagementStrength(edge) > 20);
    const b = getEdgesForGroup(data, groupBId).filter(edge => computeEngagementStrength(edge) > 20);
    const aPeople = new Set(a.map(edge => edge.personId));
    const bPeople = new Set(b.map(edge => edge.personId));
    const sharedPeople = Array.from(aPeople).filter(personId => bPeople.has(personId));
    const groupA = getGroup(data, groupAId);
    const groupB = getGroup(data, groupBId);
    const sharedTags = groupA.tags.filter(tag => groupB.tags.includes(tag));
    const sharedVenues = groupA.venues.filter(venueId => groupB.venues.includes(venueId));
    const denominator = Math.max(1, Math.min(aPeople.size, bPeople.size));
    const score = clamp(sharedPeople.length / denominator * 48 + sharedTags.length * 7 + sharedVenues.length * 10);

    return {
      groupAId,
      groupBId,
      sharedPeopleCount: sharedPeople.length,
      sharedPeople,
      sharedTags,
      sharedVenues,
      score: Math.round(score),
      explanation: [
        sharedPeople.length ? `${sharedPeople.length} shared participation edges above light engagement` : "low direct participant overlap",
        sharedTags.length ? `${sharedTags.length} shared practice tags` : "different practice language",
        sharedVenues.length ? `${sharedVenues.length} shared venues` : "no shared venue anchor"
      ]
    };
  }

  function getShared() {
    if (typeof require === "function") return require("./shared");
    return window.FieldPlatformCalculationShared;
  }

  return { computeGroupOverlap };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformOverlapCalculations = FieldPlatformOverlapCalculations;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformOverlapCalculations;
}

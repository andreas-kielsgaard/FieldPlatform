const FieldPlatformRecommendationCalculations = (() => {
  const shared = getShared();
  const { average, clamp, unique, getGroup, getPerson, getEdgesForGroup, getEdgesForPerson, computeEngagementStrength } = shared;
  const { computeGroupOverlap } = getOverlap();

  function recommendGroupsForParticipant(data, personId) {
    const personEdges = getEdgesForPerson(data, personId);
    const knownGroupIds = new Set(personEdges.map(edge => edge.groupId));
    const personTags = new Set([
      ...getPerson(data, personId).tags,
      ...personEdges.flatMap(edge => {
        const group = getGroup(data, edge.groupId);
        return group ? group.tags : [];
      })
    ]);

    return data.groups
      .filter(group => !knownGroupIds.has(group.id) || personEdges.find(edge => edge.groupId === group.id).relationshipState === "observing")
      .map(group => {
        const tagMatch = group.tags.filter(tag => personTags.has(tag));
        const eventMatch = data.events.filter(event => event.relevantGroups.includes(group.id)).length;
        const overlapMatch = personEdges.reduce((sum, edge) => sum + computeGroupOverlap(data, edge.groupId, group.id).score, 0);
        const score = clamp(tagMatch.length * 14 + eventMatch * 4 + overlapMatch * 0.18 + (group.state === "public" ? 8 : 2));
        return {
          group,
          score: Math.round(score),
          reasons: [
            tagMatch.length ? `${tagMatch.slice(0, 3).join(", ")} overlap` : "different practice language",
            group.state === "public" ? "public entry point" : "has a clearer commitment layer",
            overlapMatch > 80 ? "people from spaces you follow often show up nearby" : "light adjacent field signal"
          ]
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  function recommendEventsForParticipant(data, personId) {
    const edges = getEdgesForPerson(data, personId);
    const activeGroups = edges.filter(edge => computeEngagementStrength(edge) > 20).map(edge => edge.groupId);
    const personTags = new Set([
      ...getPerson(data, personId).tags,
      ...activeGroups.flatMap(groupId => getGroup(data, groupId).tags)
    ]);

    return data.events
      .map(event => {
        const linkedSignal = event.relevantGroups.filter(groupId => activeGroups.includes(groupId)).length;
        const tagSignal = event.tags.filter(tag => personTags.has(tag)).length;
        const lowThreshold = event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold") || event.access === "public";
        const score = clamp(linkedSignal * 24 + tagSignal * 12 + (lowThreshold ? 10 : 0));
        const reasons = [];
        if (linkedSignal) reasons.push("event is adjacent to communities you already participate in");
        if (tagSignal) reasons.push(`${tagSignal} tag matches from your current orientation`);
        if (lowThreshold) reasons.push("low-threshold entry point");
        if (event.access !== "public") reasons.push("visible, but signup has a stronger commitment layer");
        return { event, score: Math.round(score), reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  function recommendGroupsForEvent(data, draftEvent) {
    const draftTags = draftEvent.tags || [];
    const draftVenueId = draftEvent.venueId;
    const facilitatorEdges = draftEvent.hostId ? getEdgesForPerson(data, draftEvent.hostId) : [];

    return data.groups
      .map(group => {
        const tagOverlap = group.tags.filter(tag => draftTags.includes(tag));
        const venueFit = group.venues.includes(draftVenueId) ? 1 : 0;
        const facilitatorFit = facilitatorEdges.find(edge => edge.groupId === group.id);
        const adjacentEvents = data.events.filter(event => event.relevantGroups.includes(group.id) && event.tags.some(tag => draftTags.includes(tag)));
        const beginnerFit = draftEvent.beginnerFriendly && group.entryGuidance.toLowerCase().includes("first");
        const score = clamp(
          tagOverlap.length * 18 +
          venueFit * 16 +
          (facilitatorFit ? computeEngagementStrength(facilitatorFit) * 0.22 : 0) +
          adjacentEvents.length * 6 +
          (beginnerFit ? 8 : 0)
        );
        const reasons = [
          tagOverlap.length ? `tag overlap: ${tagOverlap.slice(0, 4).join(", ")}` : "low tag overlap",
          venueFit ? "uses the selected venue or nearby rhythm" : "no direct venue anchor",
          facilitatorFit ? "facilitator already has a participation edge here" : "new relationship to this group"
        ];
        if (beginnerFit) reasons.push("good low-threshold entry fit");
        return { group, score: Math.round(score), reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function computePersonalGroupMetrics(data, personId, groupId) {
    const edge = getEdgesForPerson(data, personId).find(item => item.groupId === groupId);
    const activeEdges = getEdgesForPerson(data, personId)
      .filter(item => item.groupId !== groupId && computeEngagementStrength(item) > 20);
    const activeGroupIds = activeEdges.map(item => item.groupId);
    const overlapScores = activeGroupIds.map(activeGroupId => computeGroupOverlap(data, groupId, activeGroupId));
    const participatedEvents = data.events.filter(event =>
      event.attendance.attending.includes(personId) || event.attendance.interested.includes(personId)
    );
    const eventTags = unique(participatedEvents.flatMap(event => event.tags));
    const group = getGroup(data, groupId);
    const sharedEventTags = group ? group.tags.filter(tag => eventTags.includes(tag)) : [];
    const sharedEvents = participatedEvents.filter(event => event.relevantGroups.includes(groupId));
    const averageOverlap = average(overlapScores.map(item => item.score));
    const sharedCommunities = overlapScores.filter(item => item.score > 34).length;
    const participationScore = edge ? computeEngagementStrength(edge) : 0;
    const exposureScore = clamp(averageOverlap * 0.55 + sharedEventTags.length * 12 + sharedEvents.length * 9);

    return {
      participationScore,
      exposureScore: Math.round(exposureScore),
      sharedCommunities,
      sharedEventTags,
      sharedEventsCount: sharedEvents.length,
      strongestOverlap: overlapScores.sort((a, b) => b.score - a.score)[0] || null
    };
  }

  function computeCreatorGroupSignal(data, creatorId, groupId, draftEvent = null) {
    const creator = getPerson(data, creatorId);
    const creatorEvents = data.events.filter(event => event.hostId === creatorId);
    const draftTags = draftEvent?.tags || [];
    const creatorTags = unique([
      ...(creator ? creator.tags : []),
      ...draftTags,
      ...creatorEvents.flatMap(event => event.tags)
    ]);
    const group = getGroup(data, groupId);
    const groupTags = group ? group.tags : [];
    const tagOverlap = groupTags.filter(tag => creatorTags.includes(tag));
    const eventAudience = unique(creatorEvents.flatMap(event => [
      ...event.attendance.interested,
      ...event.attendance.attending
    ]));
    const groupParticipants = getEdgesForGroup(data, groupId)
      .filter(edge => computeEngagementStrength(edge) > 20)
      .map(edge => edge.personId);
    const sharedParticipants = eventAudience.filter(personId => groupParticipants.includes(personId));
    const relevantCreatorEvents = creatorEvents.filter(event =>
      event.linkedGroups.includes(groupId) ||
      event.relevantGroups.includes(groupId)
    );
    const markedRelevantShares = data.suggestedEventShares.filter(share =>
      share.groupId === groupId &&
      share.status === "featured" &&
      creatorEvents.some(event => event.id === share.eventId)
    );
    const hasHostedOrMarkedRelevant = relevantCreatorEvents.length > 0 || markedRelevantShares.length > 0;
    const participantOverlapScore = clamp(sharedParticipants.length / Math.max(1, eventAudience.length) * 100);
    const relevanceFrequency = clamp(relevantCreatorEvents.length / Math.max(1, creatorEvents.length) * 100);
    const proportionalRelevance = clamp(participantOverlapScore * 0.55 + tagOverlap.length * 12 + relevanceFrequency * 0.25);

    return {
      participantOverlapScore: Math.round(participantOverlapScore),
      sharedParticipantsCount: sharedParticipants.length,
      creatorAudienceCount: eventAudience.length,
      tagOverlap,
      hasHostedOrMarkedRelevant,
      relevantCreatorEventsCount: relevantCreatorEvents.length + markedRelevantShares.length,
      relevanceFrequency: Math.round(relevanceFrequency),
      proportionalRelevance: Math.round(proportionalRelevance)
    };
  }

  function eventRelevanceCalculation(data, event, personId) {
    const person = getPerson(data, personId);
    const edges = getEdgesForPerson(data, personId);
    const activeGroupIds = edges.filter(edge => computeEngagementStrength(edge) > 20).map(edge => edge.groupId);
    const groupSignal = event.relevantGroups.filter(groupId => activeGroupIds.includes(groupId));
    const tagSignal = event.tags.filter(tag => person.tags.includes(tag) || activeGroupIds.some(groupId => getGroup(data, groupId).tags.includes(tag)));
    const accessSignal = event.access === "public" ? 10 : event.access === "visible-but-member-signup-only" ? 4 : 0;

    return {
      eventId: event.id,
      personId,
      groupSignal,
      tagSignal,
      accessSignal,
      score: Math.round(clamp(groupSignal.length * 24 + tagSignal.length * 12 + accessSignal)),
      formula: "score = groupSignal*24 + tagSignal*12 + accessSignal"
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

  return {
    recommendGroupsForParticipant,
    recommendEventsForParticipant,
    recommendGroupsForEvent,
    computePersonalGroupMetrics,
    computeCreatorGroupSignal,
    eventRelevanceCalculation
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformRecommendationCalculations = FieldPlatformRecommendationCalculations;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformRecommendationCalculations;
}

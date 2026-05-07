window.FieldMath = (() => {
  const stateWeight = {
    observing: 4,
    curious: 12,
    occasional: 28,
    recurring: 48,
    contributor: 65,
    facilitator: 72,
    steward: 78,
    dormant: -10,
    alumnus: 18
  };

  const accessWeight = {
    public: 0,
    known: 5,
    requested: 3,
    member: 8,
    trusted: 12,
    core: 16
  };

  const embeddednessWeight = {
    none: 0,
    light: 8,
    moderate: 16,
    strong: 24
  };

  const normWeight = {
    new: 0,
    familiar: 8,
    carrier: 16
  };

  const decayWeight = {
    active: 8,
    fading: -8,
    dormant: -18,
    reactivating: 4
  };

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function unique(items) {
    return Array.from(new Set(items));
  }

  function getGroup(data, groupId) {
    return data.groups.find(group => group.id === groupId);
  }

  function getPerson(data, personId) {
    return data.people.find(person => person.id === personId);
  }

  function getVenue(data, venueId) {
    return data.venues.find(venue => venue.id === venueId);
  }

  function getEdgesForGroup(data, groupId) {
    return data.participationEdges.filter(edge => edge.groupId === groupId);
  }

  function getEdgesForPerson(data, personId) {
    return data.participationEdges.filter(edge => edge.personId === personId);
  }

  function computeEngagementStrength(edge) {
    const roleScore = Math.min(18, edge.roleModes.length * 4);
    const base =
      (edge.recency * 0.22) +
      (edge.frequency * 0.24) +
      (edge.contributionLevel * 0.16) +
      (edge.trustLevel * 0.12) +
      stateWeight[edge.relationshipState] +
      accessWeight[edge.accessLevel] +
      embeddednessWeight[edge.socialEmbeddedness] +
      normWeight[edge.normFamiliarity] +
      decayWeight[edge.decayState] +
      roleScore;

    return Math.round(clamp(base / 2.3));
  }

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

  function generateEmergentFields(data) {
    const tagFields = buildTagFields(data);
    const venueFields = buildVenueFields(data);
    const overlapField = buildOverlapFields(data);
    return [...tagFields, ...venueFields, ...overlapField]
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 8);
  }

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
    const group = getGroup(data, groupId);
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

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function buildTagFields(data) {
    const tagCounts = {};
    data.groups.forEach(group => {
      group.tags.forEach(tag => {
        if (!tagCounts[tag]) tagCounts[tag] = { groups: [], people: new Set() };
        tagCounts[tag].groups.push(group.id);
        getEdgesForGroup(data, group.id).forEach(edge => tagCounts[tag].people.add(edge.personId));
      });
    });

    return Object.entries(tagCounts)
      .filter(([, value]) => value.groups.length >= 2)
      .map(([tag, value]) => ({
        id: `field_tag_${tag.replaceAll(" ", "_")}`,
        name: `${titleCase(tag)} Field`,
        generatedFrom: "tags",
        groups: value.groups,
        peopleCount: value.people.size,
        tags: [tag],
        strength: clamp(value.groups.length * 18 + value.people.size * 3),
        clarity: value.groups.length >= 3 ? "clear" : "forming",
        description: `Generated because ${value.groups.length} named groups share the practice tag "${tag}".`
      }));
  }

  function buildVenueFields(data) {
    return data.venues
      .filter(venue => venue.associatedGroups.length >= 2)
      .map(venue => {
        const people = new Set(venue.associatedGroups.flatMap(groupId => getEdgesForGroup(data, groupId).map(edge => edge.personId)));
        return {
          id: `field_venue_${venue.id}`,
          name: `${venue.name} Practice Cluster`,
          generatedFrom: "venues",
          groups: venue.associatedGroups,
          peopleCount: people.size,
          tags: ["venue overlap", venue.type],
          strength: clamp(venue.associatedGroups.length * 16 + people.size * 2),
          clarity: venue.associatedGroups.length >= 3 ? "clear" : "forming",
          description: `Generated from repeated use of ${venue.name} by multiple groups.`
        };
      });
  }

  function buildOverlapFields(data) {
    const movementGroups = ["ci", "ecstatic", "acro", "queer"];
    const relationalGroups = ["circling", "tea", "meditation", "somatic"];
    return [
      customField(data, "field_movement_bridge", "Movement and Consent Bridge", "participation overlap", movementGroups, ["movement", "consent", "body literacy"]),
      customField(data, "field_relational_landing", "Relational Landing Field", "rhythm", relationalGroups, ["presence", "tea", "integration"])
    ];
  }

  function customField(data, id, name, generatedFrom, groups, tags) {
    const people = new Set(groups.flatMap(groupId => getEdgesForGroup(data, groupId).map(edge => edge.personId)));
    const averageOverlap = average(pairGroups(groups).map(([a, b]) => computeGroupOverlap(data, a, b).score));
    return {
      id,
      name,
      generatedFrom,
      groups,
      peopleCount: people.size,
      tags,
      strength: Math.round(clamp(averageOverlap + groups.length * 8)),
      clarity: averageOverlap > 45 ? "clear" : "emerging",
      description: `Generated from repeated overlaps across ${groups.length} groups, not created as a formal group.`
    };
  }

  function pairGroups(groups) {
    const pairs = [];
    groups.forEach((groupId, index) => {
      groups.slice(index + 1).forEach(otherId => pairs.push([groupId, otherId]));
    });
    return pairs;
  }

  function titleCase(text) {
    return text.replace(/\b\w/g, letter => letter.toUpperCase());
  }

  return {
    computeEngagementStrength,
    computeBondingScore,
    computeBridgingScore,
    computeGroupOverlap,
    generateEmergentFields,
    recommendGroupsForParticipant,
    recommendEventsForParticipant,
    recommendGroupsForEvent,
    computePersonalGroupMetrics,
    computeCreatorGroupSignal,
    detectDormantParticipants,
    detectNewcomerDropoff,
    detectBridgePeople,
    summarizeGroup,
    eventRelevanceCalculation,
    getGroup,
    getPerson,
    getVenue,
    getEdgesForGroup,
    getEdgesForPerson
  };
})();

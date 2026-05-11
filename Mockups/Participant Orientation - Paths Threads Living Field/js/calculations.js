(function () {
  function allObjects(data) {
    return [
      ...data.events,
      ...data.communities,
      ...data.venues,
      ...data.people.map(person => ({ ...person, type: "facilitator" })),
      ...data.fields
    ];
  }

  function getObject(data, type, id) {
    const keys = {
      facilitator: "people",
      community: "communities",
      field: "fields",
      event: "events",
      venue: "venues"
    };
    const key = keys[type] || `${type}s`;
    const collection = data[key] || [];
    return collection.find(item => item.id === id);
  }

  function tagsFor(object, data) {
    if (!object) return [];
    const tags = new Set(object.tags || []);
    if (object.type === "event") {
      const community = getObject(data, "community", object.communityId);
      const venue = getObject(data, "venue", object.venueId);
      const facilitator = object.facilitatorId ? getObject(data, "facilitator", object.facilitatorId) : null;
      [...(community?.tags || []), ...(venue?.tags || []), ...(facilitator?.tags || [])].forEach(tag => tags.add(tag));
      (object.fieldIds || []).forEach(fieldId => (getObject(data, "field", fieldId)?.tags || []).forEach(tag => tags.add(tag)));
    }
    return Array.from(tags);
  }

  function relevantEdges(persona, object, data) {
    return data.participationEdges.filter(edge => {
      if (edge.personaId !== persona.id) return false;
      if (edge.objectType === object.type && edge.objectId === object.id) return true;
      const edgeObject = getObject(data, edge.objectType, edge.objectId);
      return tagsOverlap(tagsFor(edgeObject, data), tagsFor(object, data)) > 0;
    });
  }

  function computeFamiliarity(persona, object, data) {
    const direct = data.participationEdges.find(edge => edge.personaId === persona.id && edge.objectType === object.type && edge.objectId === object.id);
    if (direct) return direct.strength;
    const edges = relevantEdges(persona, object, data);
    return Math.min(70, edges.reduce((sum, edge) => sum + Math.round(edge.strength * 0.22), 0));
  }

  function computeAdjacency(persona, object, data) {
    const personaTags = new Set(persona.tags);
    const overlap = tagsFor(object, data).filter(tag => personaTags.has(tag)).length * 14;
    const relationBoost = connectedRelations(object, data).reduce((sum, relation) => sum + Math.round(relation.weight * 0.08), 0);
    return clamp(overlap + relationBoost, 0, 100);
  }

  function computeDormantThreadRelevance(persona, object, data) {
    const dormantEdges = data.participationEdges.filter(edge => edge.personaId === persona.id && edge.state === "dormant");
    if (!dormantEdges.length) return 0;
    const objectTags = tagsFor(object, data);
    return clamp(dormantEdges.reduce((sum, edge) => {
      const edgeObject = getObject(data, edge.objectType, edge.objectId);
      const overlap = tagsOverlap(tagsFor(edgeObject, data), objectTags);
      const soft = ["re-entry", "beginner path", "soft landing"].includes(object.entry) ? 22 : 0;
      return sum + overlap * 18 + soft;
    }, 0), 0, 100);
  }

  function computeContinuityFit(persona, object, data) {
    const activeEdges = data.participationEdges.filter(edge => edge.personaId === persona.id && edge.state === "active");
    const continuityTags = ["integration", "rest", "tea", "quiet", "sauna", "morning"];
    const restBoost = persona.needs.includes("rest") ? tagsFor(object, data).filter(tag => continuityTags.includes(tag)).length * 18 : 0;
    const activeOverlap = activeEdges.reduce((sum, edge) => {
      const edgeObject = getObject(data, edge.objectType, edge.objectId);
      return sum + tagsOverlap(tagsFor(edgeObject, data), tagsFor(object, data)) * 9;
    }, 0);
    return clamp(restBoost + activeOverlap, 0, 100);
  }

  function computeExplorationFit(persona, object, data) {
    const familiarity = computeFamiliarity(persona, object, data);
    const adjacency = computeAdjacency(persona, object, data);
    const beginner = ["beginner", "low-threshold", "newcomers"].some(tag => tagsFor(object, data).includes(tag)) ? 20 : 0;
    const explorationNeed = persona.needs.includes("field-preview") || persona.needs.includes("understandable-path") ? 14 : 0;
    return clamp((100 - familiarity) * 0.28 + adjacency * 0.45 + beginner + explorationNeed, 0, 100);
  }

  function classifyOpportunity(persona, object, data) {
    const familiarityScore = computeFamiliarity(persona, object, data);
    const dormantScore = computeDormantThreadRelevance(persona, object, data);
    const adjacencyScore = computeAdjacency(persona, object, data);
    const continuityScore = computeContinuityFit(persona, object, data);
    const explorationScore = computeExplorationFit(persona, object, data);

    let familiarity = "unfamiliar";
    if (dormantScore >= 35) familiarity = "dormant";
    else if (familiarityScore >= 62) familiarity = "familiar";
    else if (familiarityScore >= 24 || adjacencyScore >= 42) familiarity = "adjacent";

    let path = "exploratory horizon";
    if (object.entry) path = object.entry;
    else if (familiarity === "familiar") path = "direct";
    else if (familiarity === "dormant") path = "re-entry";
    else if (adjacencyScore >= 48) path = "beginner path";

    let section = "newConnected";
    if (familiarity === "familiar" || continuityScore >= 58) section = "continue";
    if (familiarity === "dormant" || dormantScore >= 48) section = "dormant";
    if (familiarity === "adjacent" && section !== "dormant") section = "close";
    if (["beginner path", "soft landing", "re-entry"].includes(path) && familiarity !== "familiar" && section !== "dormant") section = "softWays";
    if (object.type === "event" && ["Wed", "Thu", "Fri", "Sat", "Sun", "Tue"].some(day => String(object.when || "").startsWith(day))) {
      section = ["continue", "dormant", "softWays"].includes(section) ? section : "openings";
    }
    if (object.type === "venue" && familiarity !== "unfamiliar") section = "places";

    return {
      familiarity,
      path,
      section,
      scores: {
        familiarity: Math.round(familiarityScore),
        adjacency: Math.round(adjacencyScore),
        dormant: Math.round(dormantScore),
        continuity: Math.round(continuityScore),
        exploration: Math.round(explorationScore)
      }
    };
  }

  function scoreOpportunity(persona, object, data) {
    const classification = classifyOpportunity(persona, object, data);
    const sectionPreference = persona.preferredSections.indexOf(classification.section);
    const sectionBoost = sectionPreference === -1 ? 0 : 22 - sectionPreference * 4;
    const score = Object.values(classification.scores).reduce((sum, value) => sum + value, 0) / 5 + sectionBoost;
    return Math.round(clamp(score, 0, 100));
  }

  function generateConnectionThreads(persona, object, data) {
    const directEdges = data.participationEdges.filter(edge => edge.personaId === persona.id);
    const objectTags = tagsFor(object, data);
    const threads = [];

    directEdges.forEach(edge => {
      const edgeObject = getObject(data, edge.objectType, edge.objectId);
      if (!edgeObject) return;
      const overlap = tagsOverlap(tagsFor(edgeObject, data), objectTags);
      const direct = edge.objectType === object.type && edge.objectId === object.id;
      const relation = relationBetween(edge.objectType, edge.objectId, object.type, object.id, data);
      if (!direct && !overlap && !relation) return;
      const confidence = clamp(edge.strength + overlap * 9 + (relation?.weight || 0) * 0.25, 18, 96);
      threads.push({
        title: direct ? "Already in your rhythm" : "A thread from something you already know",
        explanation: direct
          ? `${object.name} is already connected to your current rhythm.`
          : `${object.name} touches ${edgeObject.name} through ${relation?.label || `${overlap} shared tag${overlap === 1 ? "" : "s"}`}.`,
        confidence: Math.round(confidence),
        nextStep: nextStepFor(object),
        nodes: [
          { type: "You", label: persona.shortName },
          { type: typeLabel(edge.objectType), label: edgeObject.name },
          { type: typeLabel(object.type), label: object.name }
        ],
        relations: [
          edge.state === "dormant" ? "dormant thread" : edge.state === "active" ? "already familiar" : "curious signal",
          relation?.label || "shared context"
        ]
      });
    });

    data.relations.forEach(relation => {
      const touchesObject = relation.toType === object.type && relation.toId === object.id;
      if (!touchesObject) return;
      const sourceObject = getObject(data, relation.fromType, relation.fromId);
      if (!sourceObject) return;
      const sourceThread = directEdges.find(edge => edge.objectType === relation.fromType && edge.objectId === relation.fromId)
        || directEdges.find(edge => tagsOverlap(tagsFor(getObject(data, edge.objectType, edge.objectId), data), tagsFor(sourceObject, data)) > 0);
      if (!sourceThread) return;
      const sourceEdgeObject = getObject(data, sourceThread.objectType, sourceThread.objectId);
      threads.push({
        title: relation.label.includes("soft") || relation.label.includes("continues") ? "A soft continuation" : "One possible path",
        explanation: relation.note,
        confidence: Math.round(clamp(relation.weight + sourceThread.strength * 0.2, 20, 96)),
        nextStep: nextStepFor(object),
        nodes: [
          { type: "You", label: persona.shortName },
          { type: typeLabel(sourceThread.objectType), label: sourceEdgeObject?.name || sourceThread.objectId },
          { type: typeLabel(relation.fromType), label: sourceObject.name },
          { type: typeLabel(object.type), label: object.name }
        ],
        relations: ["known thread", relation.label, "available opening"]
      });
    });

    if (!threads.length) {
      const adjacentTags = objectTags.filter(tag => persona.tags.includes(tag));
      threads.push({
        title: adjacentTags.length ? "New but connected" : "Exploratory horizon",
        explanation: adjacentTags.length
          ? `${object.name} shares ${adjacentTags.slice(0, 2).join(" and ")} with interests already named in this persona.`
          : `${object.name} is not directly in this participant's field yet, but it may be a readable horizon.`,
        confidence: adjacentTags.length ? 46 : 24,
        nextStep: nextStepFor(object),
        nodes: [
          { type: "You", label: persona.shortName },
          { type: "Interest", label: adjacentTags[0] || "curiosity" },
          { type: typeLabel(object.type), label: object.name }
        ],
        relations: ["curious signal", "possible path"]
      });
    }

    return threads.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  }

  function makeOpportunity(persona, object, data, state) {
    const classification = classifyOpportunity(persona, object, data);
    const threads = generateConnectionThreads(persona, object, data);
    return {
      object,
      classification,
      score: scoreOpportunity(persona, object, data),
      threads,
      why: whyThisAppears(persona, object, classification, threads),
      threadSummary: threads[0].explanation,
      state: state.objects[object.id] || {}
    };
  }

  function whyThisAppears(persona, object, classification, threads) {
    if (classification.familiarity === "familiar") return "Already in your rhythm.";
    if (classification.familiarity === "dormant") return `A soft way back into ${object.name}.`;
    if (classification.path === "continuation" || classification.path === "soft landing") return "A continuation from something familiar or nearby.";
    if (classification.familiarity === "adjacent") return "Close to your current field through shared people, venues, or practice tags.";
    if (threads[0]?.confidence >= 45) return "New to you, but connected through a readable thread.";
    return "A possible horizon with enough context to inspect gently.";
  }

  function connectedRelations(object, data) {
    return data.relations.filter(relation =>
      (relation.fromType === object.type && relation.fromId === object.id) ||
      (relation.toType === object.type && relation.toId === object.id)
    );
  }

  function relationBetween(fromType, fromId, toType, toId, data) {
    return data.relations.find(relation =>
      (relation.fromType === fromType && relation.fromId === fromId && relation.toType === toType && relation.toId === toId) ||
      (relation.toType === fromType && relation.toId === fromId && relation.fromType === toType && relation.fromId === toId)
    );
  }

  function tagsOverlap(a, b) {
    const set = new Set(a || []);
    return (b || []).filter(tag => set.has(tag)).length;
  }

  function nextStepFor(object) {
    if (object.type === "event") return object.entry === "re-entry" ? "Reactivate thread" : "Mark interested";
    if (object.type === "community") return "Follow";
    if (object.type === "venue") return "See what happens here";
    if (object.type === "facilitator") return "See other offerings";
    return "Explore this pattern";
  }

  function typeLabel(type) {
    return {
      event: "Event",
      community: "Community",
      venue: "Venue",
      facilitator: "Facilitator",
      field: "Generated field"
    }[type] || type;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  window.ParticipantOrientationCalculations = {
    allObjects,
    getObject,
    relevantEdges,
    computeFamiliarity,
    computeAdjacency,
    computeDormantThreadRelevance,
    computeContinuityFit,
    computeExplorationFit,
    generateConnectionThreads,
    classifyOpportunity,
    scoreOpportunity,
    makeOpportunity,
    typeLabel
  };
})();

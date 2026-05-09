(function () {
  function createViewModel(platform, copy) {
    const currentEventId = "e_ci_jam";
    const reviewCommunityIds = ["ecstatic", "ci", "tea"];

    function eventPage() {
      const event = platform.events.get(currentEventId);
      const data = event.data();
      const venue = data.venueId ? platform.venues.get(data.venueId) : null;
      const host = data.hostId ? platform.users.get(data.hostId) : null;

      return {
        id: event.id,
        title: event.title(),
        time: data.time || "Time not set",
        venue: venue ? venue.name() : "Venue not set",
        venueId: venue ? venue.id : null,
        host: host ? host.name() : "Host not listed",
        access: accessLabel(data.access, data.price),
        audience: data.audience || "People curious about this practice.",
        tags: data.tags || [],
        expectations: eventExpectations(data, venue, host)
      };
    }

    function eventExpectations(data, venue, host) {
      const tags = data.tags || [];
      const items = [];
      if (tags.includes("beginner-friendly")) {
        items.push({
          title: "Beginner-friendly landing",
          text: "The event names a softer entry point before the main practice."
        });
      }
      items.push({
        title: "Access",
        text: `${accessLabel(data.access, data.price)}. ${data.audience || "Audience details are still light."}`
      });
      if (venue) {
        const venueData = venue.data();
        items.push({
          title: "Place feel",
          text: `${venue.name()} is a ${venueData.type || "venue"} in ${venueData.location || "Aarhus"}. ${venueData.atmosphere || ""}`.trim()
        });
      }
      if (host) {
        items.push({
          title: "Held by",
          text: `${host.name()} is the listed host or facilitator.`
        });
      }
      return items;
    }

    function accessLabel(access, price) {
      const accessText = readable(access || "access not listed");
      return price ? `${accessText}, ${price}` : accessText;
    }

    function eventConnections() {
      return platform.fieldRelations
        .forObject("event", currentEventId)
        .map(relationCard)
        .filter(card => card.visibility !== "Private" || card.status === "Waiting for review");
    }

    function relationCard(relation) {
      const raw = relation.data();
      const explanation = relation.explanation() || {};
      const source = endpointLabel(explanation.source, raw.sourceType, raw.sourceId);
      const target = endpointLabel(explanation.target, raw.targetType, raw.targetId);
      const movementValues = relation.movementOptions();
      const badges = badgeLabels(raw);

      return {
        id: raw.id,
        source,
        target,
        sourceType: raw.sourceType,
        sourceId: raw.sourceId,
        targetType: raw.targetType,
        targetId: raw.targetId,
        title: connectionTitle(raw, target),
        connectionType: copy.relationKinds[raw.relationKind] || readable(raw.relationKind),
        status: copy.statusLabels[raw.status] || readable(raw.status),
        visibility: copy.visibilityLabels[raw.visibility] || readable(raw.visibility),
        why: explanation.reason || raw.reason || "This appears because the event and community share context.",
        evidence: explanation.evidence || raw.evidence || [],
        unclear: (explanation.holdTypes || raw.holdTypes || []).map(item => copy.holdLabels[item] || readable(item)),
        movementValues,
        movementLabels: movementValues.map(item => copy.movementLabels[item] || readable(item)),
        badges,
        rawStatus: raw.status
      };
    }

    function connectionTitle(raw, target) {
      if (raw.relationKind === "good_first_step_for") return `This may be a good first step into ${target}`;
      if (raw.relationKind === "soft_landing_after") return `This may be a soft landing near ${target}`;
      if (raw.status === "computed") return `Pattern found with ${target}`;
      return `Connected to ${target}`;
    }

    function badgeLabels(raw) {
      const labels = [];
      const kind = copy.relationKinds[raw.relationKind] || readable(raw.relationKind);
      if (["good_first_step_for", "soft_landing_after", "bridges_to", "deeper_pathway_into"].includes(raw.relationKind)) labels.push(kind);
      if (raw.status === "computed") labels.push("Pattern found");
      if (raw.status === "suggested") labels.push("Waiting for review");
      if (["private", "visible_to_stewards"].includes(raw.visibility)) labels.push(copy.visibilityLabels[raw.visibility]);
      return Array.from(new Set(labels));
    }

    function endpointLabel(endpoint, type, id) {
      if (endpoint && endpoint.label) return endpoint.label;
      return labelFor(type, id);
    }

    function labelFor(type, id) {
      try {
        if (type === "event") return platform.events.get(id).title();
        if (type === "community") return platform.communities.get(id).name();
        if (type === "venue") return platform.venues.get(id).name();
        if (type === "person") return platform.users.get(id).name();
        if (type === "generatedField") return platform.generatedFields.get(id).data().name;
      } catch (error) {
        return id;
      }
      return id;
    }

    function waysInGroups() {
      const event = platform.events.get(currentEventId);
      const eventData = event.data();
      const connections = eventConnections().filter(card => ["Accepted connection", "Pattern found"].includes(card.status));
      const eventActions = new Map([
        ["attend", "Attend"],
        ["mark_interested", "Mark interested"],
        ["ask_facilitator", "Ask facilitator"]
      ]);

      connections.forEach(card => {
        card.movementValues.forEach(value => {
          if (value === "attend" || value === "mark_interested") {
            eventActions.set(value, copy.movementLabels[value] || readable(value));
          }
        });
      });

      const groups = [
        {
          target: "For this event",
          detail: event.title(),
          actions: Array.from(eventActions.values())
        }
      ];

      const communityGroups = connections
        .filter(card => card.targetType === "community")
        .map(card => {
          const actions = new Set();
          card.movementValues.forEach(value => {
            if (["follow", "request_access", "ask_steward", "join_recurring"].includes(value)) {
              actions.add(copy.movementLabels[value] || readable(value));
            }
          });
          actions.add("See beginner-friendly events");
          actions.add("Ask a steward");
          return {
            target: `For ${card.target}`,
            detail: card.connectionType,
            actions: Array.from(actions)
          };
        });

      groups.push(...communityGroups);

      if (eventData.venueId) {
        groups.push({
          target: "For this venue",
          detail: labelFor("venue", eventData.venueId),
          actions: ["See other events here"]
        });
      }

      return groups;
    }

    function targetCommunityChoices() {
      return platform.communities.list().map(community => ({
        id: community.id,
        label: community.name()
      }));
    }

    function reviewCommunityChoices() {
      return reviewCommunityIds.map(id => {
        const community = platform.communities.get(id);
        return { id, label: community.name() };
      });
    }

    function pendingSuggestions(communityId) {
      return platform.fieldRelations.pendingForCommunity(communityId).map(relation => suggestionCard(relation, communityId));
    }

    function reviewedSuggestions(communityId) {
      return platform.fieldRelations
        .forReviewAuthority("community", communityId)
        .filter(relation => !relation.isPending())
        .map(relation => suggestionCard(relation, communityId))
        .slice(0, 4);
    }

    function suggestionCard(relation, communityId) {
      const card = relationCard(relation);
      const eventId = card.sourceType === "event" ? card.sourceId : card.targetType === "event" ? card.targetId : null;
      const eventSummary = eventId ? compactEvent(eventId) : null;
      const community = platform.communities.get(communityId);

      return {
        ...card,
        eventSummary,
        communityName: community.name(),
        suggestedBy: suggestedByLabel(relation.data().suggestedBy),
        acceptingWould: acceptingWould(card, community.name()),
        patternMeaning: "This can remain useful evidence without being shown as a community-approved connection."
      };
    }

    function compactEvent(eventId) {
      const event = platform.events.get(eventId);
      const data = event.data();
      return {
        title: event.title(),
        time: data.time || "Time not set",
        venue: data.venueId ? labelFor("venue", data.venueId) : "Venue not set",
        host: data.hostId ? labelFor("person", data.hostId) : "Host not listed",
        access: accessLabel(data.access, data.price),
        tags: data.tags || [],
        audience: data.audience || ""
      };
    }

    function suggestedByLabel(id) {
      if (!id) return "Suggested from shared context";
      return `Suggested by ${labelFor("person", id)}`;
    }

    function acceptingWould(card, communityName) {
      if (card.rawStatus === "computed") return "This pattern can support orientation without becoming a community endorsement.";
      return `If accepted, this can appear as visible context for ${communityName} and for the event.`;
    }

    function stewardFor(communityId) {
      const stewards = platform.communities.get(communityId).data().stewards || [];
      return stewards[0] || "p_casey";
    }

    function readable(value) {
      return String(value || "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    return {
      currentEventId,
      eventPage,
      eventConnections,
      waysInGroups,
      targetCommunityChoices,
      reviewCommunityChoices,
      pendingSuggestions,
      reviewedSuggestions,
      stewardFor,
      labelFor
    };
  }

  window.Mockup51ViewModel = { createViewModel };
})();

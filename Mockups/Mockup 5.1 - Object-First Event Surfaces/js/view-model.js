(function () {
  function createViewModel(platform, copy) {
    const currentEventId = "e_ci_jam";
    const currentUserId = "p_casey";
    const reviewCommunityIds = ["ecstatic", "ci", "tea"];

    function eventPage() {
      const event = platform.events.get(currentEventId);
      const data = event.data();
      const venue = data.venueId ? platform.venues.get(data.venueId) : null;
      const host = data.hostId ? platform.users.get(data.hostId) : null;
      const tags = data.tags || [];

      return {
        id: event.id,
        title: event.title(),
        time: data.time || "Time not set",
        venue: venue ? venue.name() : "Venue not set",
        venuePreview: venue ? venuePreview(venue) : null,
        host: host ? host.name() : "Host not listed",
        hostPreview: host ? personPreview(host, "ci") : null,
        access: readable(data.access || "access not listed"),
        cost: data.price || "No cost shown",
        forText: data.audience || "Audience not yet described",
        experience: tags.includes("beginner-friendly") ? "Beginner-friendly" : "Some familiarity may be useful",
        entrySupport: tags.includes("beginner-friendly") ? "Beginner landing named" : "Ask facilitator if unsure",
        requirements: requirementsFor(data),
        practicalDetails: eventPracticalDetails(data, venue, host)
      };
    }

    function requirementsFor(data) {
      const access = data.access || "";
      if (access.includes("member") || access.includes("signup")) return "Sign-up or access review may be needed";
      return "No special requirement shown";
    }

    function eventPracticalDetails(data, venue, host) {
      const details = [];
      details.push({
        title: "Timing expectation",
        text: data.tags?.includes("beginner-friendly")
          ? "Arrive early enough for the beginner landing before the main jam."
          : "Check arrival time before attending."
      });
      if (venue) {
        const venueData = venue.data();
        details.push({
          title: "Place feel",
          text: `${venue.name()} is a ${venueData.type || "venue"} in ${venueData.location || "Aarhus"}. ${venueData.atmosphere || ""}`.trim()
        });
      }
      details.push({
        title: "What to bring",
        text: data.tags?.includes("movement") ? "Wear clothes you can move in. Bring water." : "Bring what you need to feel settled."
      });
      if (host) {
        details.push({
          title: "Facilitator note",
          text: `${host.name()} is the listed host or facilitator.`
        });
      }
      return details;
    }

    function venuePreview(venue) {
      const data = venue.data();
      const events = venue.events().map(event => event.title()).filter(title => title !== platform.events.get(currentEventId).title());
      return {
        title: venue.name(),
        lines: [
          `${data.location || "Location not shown"} - ${data.atmosphere || "Atmosphere not described"}`,
          events.length ? `Other events here: ${events.slice(0, 2).join(", ")}` : "No other events shown here"
        ]
      };
    }

    function personPreview(user, communityId) {
      const profile = user.profile();
      return {
        title: user.name(),
        lines: [
          profile.bio || "Public profile context is light.",
          personCommunityRelation(user.id, communityId)
        ]
      };
    }

    function communityPreview(communityId) {
      const community = platform.communities.get(communityId);
      const data = community.data();
      return {
        title: community.name(),
        lines: [
          data.entryGuidance || "Entry guidance is not yet shown.",
          data.rhythm || "Rhythm is not yet shown."
        ]
      };
    }

    function eventConnections() {
      return platform.fieldRelations
        .forObject("event", currentEventId)
        .map(relationCard)
        .filter(card => {
          const active = ["accepted", "refined", "computed"].includes(card.rawStatus);
          const visibleToPublic = card.visibilityValue === "public" || card.visibilityValue === "visible_to_members";
          return (active && visibleToPublic) || card.isOwnPending;
        });
    }

    function relationCard(relation) {
      const raw = relation.data();
      const explanation = relation.explanation() || {};
      const source = endpointLabel(explanation.source, raw.sourceType, raw.sourceId);
      const target = endpointLabel(explanation.target, raw.targetType, raw.targetId);
      const movementValues = relation.movementOptions();
      const isOwnPending = raw.status === "suggested" && raw.suggestedBy === currentUserId;

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
        reviewState: copy.statusLabels[raw.status] || readable(raw.status),
        visibility: visibilityForPublic(raw, isOwnPending),
        visibilityValue: raw.visibility,
        evidenceSource: evidenceSourceLabel(raw),
        why: explanation.reason || raw.reason || "This appears because the event and community share context.",
        evidence: evidenceItems(explanation.evidence || raw.evidence || []),
        unclear: targetAnchoredUnclear(raw, target),
        movementValues,
        movementLabels: movementValues.map(item => copy.movementLabels[item] || readable(item)),
        communityPreview: raw.targetType === "community" ? communityPreview(raw.targetId) : null,
        isOwnPending,
        rawStatus: raw.status,
        rawKind: raw.relationKind
      };
    }

    function visibilityForPublic(raw, isOwnPending) {
      if (isOwnPending && raw.visibility === "visible_to_stewards") return "Sent to stewards";
      return copy.visibilityLabels[raw.visibility] || readable(raw.visibility);
    }

    function connectionTitle(raw, target) {
      if (raw.relationKind === "good_first_step_for") return `This may be a good first step into ${target}`;
      if (raw.relationKind === "soft_landing_after") return `This may be a soft landing near ${target}`;
      if (raw.status === "computed") return `Pattern found with ${target}`;
      return `Connected to ${target}`;
    }

    function evidenceSourceLabel(raw) {
      if (raw.provenance === "steward_marked") return "Steward-marked";
      if (raw.provenance === "user_suggested") return raw.suggestedBy ? `Suggested by ${labelFor("person", raw.suggestedBy)}` : "Suggested by a participant";
      if (raw.provenance === "creator_marked") return "Suggested by creator";
      if (raw.provenance === "calculated") return "Calculated pattern";
      if (raw.provenance === "imported") return "Imported signal";
      return "Source not shown";
    }

    function evidenceItems(items) {
      return items.map(item => ({
        type: copy.evidenceTypes[item.type] || readable(item.type),
        label: item.label || readable(item.type)
      }));
    }

    function targetAnchoredUnclear(raw, target) {
      const holdTypes = raw.holdTypes || [];
      return holdTypes.map(type => {
        if (type === "threshold") return `First step into ${target} may be unclear.`;
        if (type === "context") return `It is unclear whether this is a beginner entry or a deeper-practice event for ${target}.`;
        if (type === "trust") return `Newcomer welcome around ${target} is not yet clear.`;
        if (type === "stewardship") return "Community endorsement is not yet confirmed.";
        if (type === "boundary") return `Access into ${target} may need care or review.`;
        return copy.holdLabels[type] || readable(type);
      });
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
      const connections = eventConnections().filter(card => ["Accepted", "Refined", "Kept as pattern"].includes(card.reviewState));
      const groups = [
        {
          target: "For this event",
          detail: event.title(),
          kind: "direct",
          actions: ["Attend", "Mark interested", "Ask facilitator"]
        }
      ];

      if ((eventData.tags || []).includes("contact improvisation")) {
        groups.push({
          target: "If you are new to contact improvisation",
          detail: "The first step may be a softer entry before the jam.",
          kind: "prerequisite",
          actions: ["See beginner-friendly events", "Ask facilitator"]
        });
      }

      connections
        .filter(card => card.targetType === "community")
        .forEach(card => {
          const actions = new Set();
          card.movementValues.forEach(value => {
            if (["follow", "request_access", "ask_steward", "join_recurring"].includes(value)) {
              actions.add(copy.movementLabels[value] || readable(value));
            }
          });
          actions.add("See beginner-friendly events");
          actions.add("Ask a steward");
          groups.push({
            target: `For ${card.target}`,
            detail: card.connectionType,
            kind: "community",
            actions: Array.from(actions)
          });
        });

      if (eventData.venueId) {
        groups.push({
          target: "For this venue",
          detail: labelFor("venue", eventData.venueId),
          kind: "venue",
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
        .slice(0, 5);
    }

    function suggestionCard(relation, communityId) {
      const card = relationCard(relation);
      const raw = relation.data();
      const eventId = card.sourceType === "event" ? card.sourceId : card.targetType === "event" ? card.targetId : null;
      const eventSummary = eventId ? compactEvent(eventId) : null;
      const community = platform.communities.get(communityId);
      const hostId = eventSummary?.hostId;
      const suggesterId = raw.suggestedBy;

      return {
        ...card,
        eventSummary,
        communityName: community.name(),
        suggestedBy: suggesterId ? labelFor("person", suggesterId) : "Shared context",
        suggesterRelation: suggesterId ? personCommunityRelation(suggesterId, communityId) : "Suggested from shared context",
        hostRelation: hostId ? personCommunityRelation(hostId, communityId) : "Host relation not shown",
        sharedTags: eventSummary ? sharedTags(eventSummary.tags, community.data().tags || []) : [],
        sharedVenue: eventSummary ? sharedVenueLabel(eventSummary.venueId, community.data().venues || []) : "Venue overlap not shown",
        priorRelation: priorRelationLabel(eventId, communityId, raw.id),
        acceptingWould: acceptingWould(card, community.name()),
        patternMeaning: "This may become evidence for other contexts, but it does not endorse the event for another community."
      };
    }

    function compactEvent(eventId) {
      const event = platform.events.get(eventId);
      const data = event.data();
      return {
        id: event.id,
        title: event.title(),
        time: data.time || "Time not set",
        venue: data.venueId ? labelFor("venue", data.venueId) : "Venue not set",
        venueId: data.venueId,
        host: data.hostId ? labelFor("person", data.hostId) : "Host not listed",
        hostId: data.hostId,
        access: readable(data.access || "access not listed"),
        cost: data.price || "No cost shown",
        audience: data.audience || "Audience not yet described",
        experience: (data.tags || []).includes("beginner-friendly") ? "Beginner-friendly" : "Some familiarity may be useful",
        tags: data.tags || []
      };
    }

    function personCommunityRelation(personId, communityId) {
      try {
        const user = platform.users.get(personId);
        const community = platform.communities.get(communityId);
        const edge = user.edgeTo(community);
        if (!edge) return "No prior relation shown";
        const data = edge.data();
        if (data.role === "steward") return "Steward in this community";
        if (data.role === "member" || data.access === "member") return "Member of this community";
        if (data.role === "contributor") return "Contributor in this community";
        if (data.role === "recurring") return "Recurring participant";
        if (data.role === "dormant") return "Dormant relation";
        return data.role ? readable(data.role) : "Light relation shown";
      } catch (error) {
        return "No prior relation shown";
      }
    }

    function sharedTags(eventTags, communityTags) {
      const set = new Set(communityTags);
      return eventTags.filter(tag => set.has(tag));
    }

    function sharedVenueLabel(venueId, communityVenueIds) {
      if (!venueId) return "Venue not shown";
      if (communityVenueIds.includes(venueId)) return `Shared venue: ${labelFor("venue", venueId)}`;
      return "No shared venue shown";
    }

    function priorRelationLabel(eventId, communityId, currentRelationId) {
      const prior = platform.fieldRelations
        .between("event", eventId, "community", communityId)
        .filter(relation => relation.data().id !== currentRelationId)
        .find(relation => relation.isAccepted() || relation.data().status === "computed");
      if (!prior) return "No prior accepted relation shown";
      return `Prior ${copy.statusLabels[prior.data().status] || readable(prior.data().status)} relation shown`;
    }

    function acceptingWould(card, communityName) {
      if (card.rawStatus === "computed") return "This remains a pattern but is not community-endorsed.";
      return `This now appears on the event page as related community context for ${communityName}.`;
    }

    function stewardFor(communityId) {
      const stewards = platform.communities.get(communityId).data().stewards || [];
      return stewards[0] || currentUserId;
    }

    function readable(value) {
      return String(value || "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    return {
      currentEventId,
      currentUserId,
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

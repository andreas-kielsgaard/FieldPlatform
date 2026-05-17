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
        forText: audienceSummary(data),
        audienceNote: data.audience || "Audience not yet described",
        audienceBullets: audienceBullets(data),
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

    function audienceSummary(data) {
      if (!data.audience) return "Audience not yet described";
      if (data.id === "e_ci_jam") return "Curious first-timers, returning movers, and people with movement or relational practice experience";
      return data.audience;
    }

    function audienceBullets(data) {
      if (data.id === "e_ci_jam") {
        return [
          "Curious first-timers",
          "Returning movers",
          "People with some movement or relational practice experience"
        ];
      }
      return data.audience ? [data.audience] : ["Audience not yet described"];
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
          title: "Facilitator's audience note",
          text: data.audience || `${host.name()} has not added an audience note yet.`
        });
      }
      details.push({
        title: "Who this is for",
        items: audienceBullets(data)
      });
      return details;
    }

    function venuePreview(venue) {
      const data = venue.data();
      const events = venue.events().map(event => event.title()).filter(title => title !== platform.events.get(currentEventId).title());
      return {
        title: venue.name(),
        summary: "Get to know this venue",
        lines: [
          `Location and atmosphere: ${data.location || "Location not shown"} - ${data.atmosphere || "Atmosphere not described"}`,
          events.length ? `Other events here: ${events.slice(0, 2).join(", ")}` : "No other events shown here"
        ]
      };
    }

    function personPreview(user, communityId) {
      const profile = user.profile();
      return {
        title: user.name(),
        summary: "Get to know the facilitator",
        lines: [
          profile.bio || "Public profile context is light.",
          `Community context: ${personCommunityRelation(user.id, communityId, "Facilitator")}`,
          "Future facilitator pages should show inspirations, practices, lineages, offerings, and the kinds of spaces they create."
        ]
      };
    }

    function communityPreview(communityId) {
      const community = platform.communities.get(communityId);
      const data = community.data();
      return {
        title: community.name(),
        summary: "Get to know this community",
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
        sourceTypeLabel: objectTypeLabel(raw.sourceType),
        targetTypeLabel: objectTypeLabel(raw.targetType),
        sourceType: raw.sourceType,
        sourceId: raw.sourceId,
        targetType: raw.targetType,
        targetId: raw.targetId,
        title: connectionTitle(raw, target),
        participantContext: participantContext(raw, source, target, isOwnPending),
        objectPair: relationAdapterLabel(raw.sourceType, raw.targetType),
        relationFamily: relationFamily(raw),
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
      if (raw.relationKind === "after_event_soft_landing") return `After-event option near ${target}`;
      if (raw.relationKind === "informal_continuation_after") return `Informal continuation after ${target}`;
      if (raw.status === "computed") return `Pattern found with ${target}`;
      return `Connected to ${target}`;
    }

    function participantContext(raw, source, target, isOwnPending) {
      if (isOwnPending) {
        return {
          section: "Your suggestion",
          typeLabel: "Suggested context",
          objectName: target,
          objectType: objectTypeLabel(raw.targetType),
          title: "Your suggestion is waiting for review",
          body: `A steward can review whether ${target} should be shown as context for this event.`,
          detail: "This is visible here because you sent the suggestion."
        };
      }

      const typeLabel = copy.participantContextKinds[raw.relationKind] || "Connected context";
      if (raw.targetType === "community") {
        return {
          section: "Community involvement",
          typeLabel,
          objectName: target,
          objectType: "Community",
          title: `${typeLabel}: ${target}`,
          body: communityContextBody(raw, target),
          detail: communityContextDetail(raw, target)
        };
      }
      if (raw.targetType === "tag") {
        return {
          section: "Practice context",
          typeLabel,
          objectName: target,
          objectType: "Practice",
          title: `${typeLabel}: ${target}`,
          body: `This event touches the ${target} practice area.`,
          detail: "Use this as a way to explore the practice, not as a community endorsement."
        };
      }
      if (raw.targetType === "generatedField") {
        return {
          section: "Pattern context",
          typeLabel,
          objectName: target,
          objectType: "Generated pattern",
          title: `${typeLabel}: ${target}`,
          body: "This is a computed pattern around shared practices, venues, or participation.",
          detail: "Generated patterns do not speak for a community."
        };
      }
      if (raw.targetType === "event") {
        return {
          section: "Nearby event",
          typeLabel,
          objectName: target,
          objectType: "Event",
          title: `${target}`,
          body: `${source} may connect with ${target} as ${typeLabel.toLowerCase()}.`,
          detail: "This preserves the related event as an event, not just as a relation."
        };
      }
      return {
        section: "Supporting context",
        typeLabel,
        objectName: target,
        objectType: objectTypeLabel(raw.targetType),
        title: `${typeLabel}: ${target}`,
        body: `${target} is connected to this event.`,
        detail: "This context is surfaced to help orientation."
      };
    }

    function communityContextBody(raw, target) {
      if (raw.relationKind === "good_first_step_for") return `This event can work as a beginner path into ${target}.`;
      if (raw.relationKind === "belongs_with") return `This event belongs with ${target}'s public rhythm.`;
      if (raw.relationKind === "soft_landing_after") return `This event may be a soft landing around ${target}.`;
      if (raw.relationKind === "shares_venue") return `This event happens in a place often used by ${target}.`;
      if (raw.relationKind === "bridges_to") return `This event may help people move between this space and ${target}.`;
      return `This event has useful context through ${target}.`;
    }

    function communityContextDetail(raw, target) {
      if (raw.relationKind === "good_first_step_for") return `For ${target}: view the community, see beginner paths, or ask a steward.`;
      if (raw.relationKind === "soft_landing_after") return "This is context for gentle arrival or integration, not a claim of ownership.";
      if (raw.status === "computed") return "This is shown as a pattern, not as a community endorsement.";
      return "This context is confirmed or intentionally surfaced for ordinary browsing.";
    }

    function relationAdapterLabel(sourceType, targetType) {
      return copy.relationAdapters[`${sourceType}:${targetType}`] || `${objectTypeLabel(sourceType)} to ${objectTypeLabel(targetType)}`;
    }

    function relationFamily(raw) {
      if (raw.sourceType === "event" && raw.targetType === "event") {
        if (raw.relationKind.includes("after") || raw.relationKind.includes("continuation") || raw.relationKind.includes("temporal")) return "Temporal or participant-flow relation";
        return "Event sequence relation";
      }
      if (raw.sourceType === "event" && raw.targetType === "community") return "Community context relation";
      if (raw.sourceType === "event" && (raw.targetType === "tag" || raw.targetType === "generatedField")) return "Practice or pattern relation";
      if (raw.sourceType === "event" && raw.targetType === "venue") return "Venue context relation";
      return "Context relation";
    }

    function objectTypeLabel(type) {
      const labels = {
        event: "Event",
        community: "Community",
        venue: "Venue",
        person: "Person",
        tag: "Practice",
        generatedField: "Generated pattern",
        festival: "Festival"
      };
      return labels[type] || readable(type);
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
      const venueName = eventData.venueId ? labelFor("venue", eventData.venueId) : "this venue";
      const hostName = eventData.hostId ? labelFor("person", eventData.hostId) : "the facilitator";
      const groups = [
        {
          target: "For this event",
          targetType: "Event",
          detail: event.title(),
          kind: "direct",
          actions: ["Attend", "Ask facilitator", "Mark interested"]
        }
      ];

      if ((eventData.tags || []).includes("contact improvisation")) {
        groups.push({
          target: "For Contact Improvisation",
          targetType: "Practice",
          detail: "A practice area, not a named community.",
          kind: "practice",
          actions: ["Explore Contact Improvisation", "Find beginner-friendly CI events", "See related practice field"]
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
          actions.add("View community");
          actions.add("See beginner-friendly events");
          actions.add("Ask a steward");
          groups.push({
            target: `For ${card.target}`,
            targetType: "Community",
            detail: card.connectionType,
            kind: "community",
            actions: Array.from(actions)
          });
        });

      if (eventData.hostId) {
        groups.push({
          target: `For ${hostName}`,
          targetType: "Facilitator",
          detail: "A public facilitator context, not a full profile in this prototype.",
          kind: "facilitator",
          actions: ["Get to know facilitator", "See other offerings"]
        });
      }

      if (eventData.venueId) {
        groups.push({
          target: `For ${venueName}`,
          targetType: "Venue",
          detail: "A practical place context.",
          kind: "venue",
          actions: ["See other events here", "Learn what happens at this venue"]
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

    function seedPrototypeRelations() {
      const existingEcstaticEvent = platform.fieldRelations
        .between("event", "e_harbor_integration", "event", "e_ecstatic_sunday")
        .some(relation => relation.data().relationKind === "after_event_soft_landing");
      if (!existingEcstaticEvent) {
        platform.fieldRelations.suggest({
          sourceType: "event",
          sourceId: "e_harbor_integration",
          targetType: "event",
          targetId: "e_ecstatic_sunday",
          relationKind: "after_event_soft_landing",
          relationStrength: 58,
          reviewAuthorityType: "community",
          reviewAuthorityId: "ecstatic",
          visibility: "visible_to_stewards",
          reason: "Post-Dance Harbor Tea happens after Sunday Ecstatic Dance and may be a soft landing for dancers.",
          evidence: [
            { type: "temporal_relation", label: "Tea begins after the dance window" },
            { type: "participant_flow", label: "Some dancers may continue into a quieter social space" },
            { type: "community_endorsement", label: "This does not make the tea event an Ecstatic Dance event" }
          ],
          holdTypes: ["stewardship", "context"],
          movementUnlocked: ["attend", "remain_observing"]
        }, "p_freja");
      }

      const existingCiEvent = platform.fieldRelations
        .between("event", "e_harbor_integration", "event", "e_ci_jam")
        .some(relation => relation.data().relationKind === "informal_continuation_after");
      if (!existingCiEvent) {
        platform.fieldRelations.suggest({
          sourceType: "event",
          sourceId: "e_harbor_integration",
          targetType: "event",
          targetId: "e_ci_jam",
          relationKind: "informal_continuation_after",
          relationStrength: 36,
          reviewAuthorityType: "community",
          reviewAuthorityId: "ci",
          visibility: "visible_to_stewards",
          reason: "A tea, music jam, sauna, or dinner after a CI class can be relevant as participant flow without being CI teaching.",
          evidence: [
            { type: "informal_continuation", label: "Shows the pattern of after-practice social continuation" },
            { type: "participant_flow", label: "Could support informal bonding after movement practice" },
            { type: "community_endorsement", label: "Should not imply CI steward endorsement without review" }
          ],
          holdTypes: ["stewardship", "context"],
          movementUnlocked: ["remain_observing"]
        }, "p_casey");
      }
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
        suggesterRelation: suggesterId ? personCommunityRelation(suggesterId, communityId, "Suggester") : "Suggestion came from shared context, not a named person",
        hostRelation: hostId ? personCommunityRelation(hostId, communityId, "Host") : "Host relation is not visible here",
        participantOverlap: eventId ? participantOverlapLabel(eventId, communityId) : "Participant overlap is not visible here",
        sharedTags: eventSummary ? sharedTags(eventSummary.tags, community.data().tags || []) : [],
        sharedVenue: eventSummary ? sharedVenueLabel(eventSummary.venueId, community.data().venues || []) : "Venue overlap not shown",
        priorRelation: priorRelationLabel(eventId, communityId, raw.id),
        temporalSignal: temporalSignalLabel(raw, eventSummary),
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

    function personCommunityRelation(personId, communityId, subject = "Person") {
      try {
        const user = platform.users.get(personId);
        const community = platform.communities.get(communityId);
        const edge = user.edgeTo(community);
        if (!edge) return `${subject} has no visible prior relation to this community`;
        const data = edge.data();
        const role = data.relationshipState || data.role || data.accessLevel || data.access;
        const modes = data.roleModes && data.roleModes.length ? ` (${data.roleModes.join(", ")})` : "";
        if (role === "steward") return `${subject} stewards this community${modes}`;
        if (role === "member" || data.access === "member" || data.accessLevel === "member") return `${subject} is a member of this community${modes}`;
        if (role === "contributor") return `${subject} contributes to this community${modes}`;
        if (role === "recurring") return `${subject} is a recurring participant${modes}`;
        if (role === "dormant") return `${subject} has a dormant prior relation to this community${modes}`;
        if (role === "curious") return `${subject} is visible as curious about this community${modes}`;
        if (role === "observing") return `${subject} is only observing this community${modes}`;
        if (role) return `${subject} has a visible ${readable(role).toLowerCase()} relation to this community${modes}`;
        return `${subject} has a visible relation to this community${modes}`;
      } catch (error) {
        return `${subject} has no visible prior relation to this community`;
      }
    }

    function participantOverlapLabel(eventId, communityId) {
      try {
        const eventData = platform.events.get(eventId).data();
        const people = new Set([...(eventData.attendance?.attending || []), ...(eventData.attendance?.interested || [])]);
        const related = Array.from(people).filter(personId => {
          try {
            const edge = platform.users.get(personId).edgeTo(platform.communities.get(communityId));
            if (!edge) return false;
            const data = edge.data();
            return data.relationshipState !== "observing" && data.socialEmbeddedness !== "none";
          } catch (error) {
            return false;
          }
        });
        if (!related.length) return "No visible participant overlap with this community";
        if (related.length === 1) return "One visible participant also has a relation to this community";
        return `${related.length} visible participants also have a relation to this community`;
      } catch (error) {
        return "Participant overlap is not visible here";
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
      if (card.sourceType === "event" && card.targetType === "event") return `This can appear near ${card.target} as an after-event or continuation option.`;
      if (card.rawKind === "soft_landing_after" || card.rawKind === "after_event_soft_landing") return `This can appear for ${communityName} as a soft landing or integration option.`;
      return `This now appears on the event page as related community context for ${communityName}.`;
    }

    function reviewActionMessage(action, relationId, communityId, redirectedCommunityId) {
      const relation = platform.fieldRelations.get(relationId);
      const card = relationCard(relation);
      const communityName = labelFor("community", communityId);
      if (action === "accept") return acceptingWould(card, communityName);
      if (action === "refine") return `This was adjusted before becoming visible as ${copy.relationKinds.good_first_step_for}.`;
      if (action === "redirect") return `This suggestion was redirected from ${communityName} to ${labelFor("community", redirectedCommunityId)}.`;
      if (action === "decline") return "This will no longer appear as a suggested connection.";
      if (action === "computed") return "This will inform recommendations but will not appear as an endorsed community connection.";
      return "Review action completed.";
    }

    function temporalSignalLabel(raw, eventSummary) {
      if (raw.sourceType === "event" && raw.targetType === "event") {
        if (raw.relationKind === "after_event_soft_landing") return "Temporal relation: proposed as an after-event soft landing";
        if (raw.relationKind === "informal_continuation_after") return "Temporal relation: proposed as an informal continuation";
        return "Temporal relation: event-to-event sequence may matter";
      }
      if (eventSummary && eventSummary.time) return `Event time: ${eventSummary.time}`;
      return "No temporal signal shown";
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
      seedPrototypeRelations,
      pendingSuggestions,
      reviewedSuggestions,
      stewardFor,
      reviewActionMessage,
      labelFor
    };
  }

  window.Mockup51ViewModel = { createViewModel };
})();

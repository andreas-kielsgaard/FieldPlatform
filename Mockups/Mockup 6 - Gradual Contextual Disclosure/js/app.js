(function () {
  const IDS = {
    user: "p_casey",
    event: "e_ci_jam",
    community: "ci",
    connectionPerson: "p_maya",
    requiredLogistics: "dsr_ci_jam_casey_name_contact",
    communityStewards: "dsr_ci_stewards_casey_presence",
    eventAttendees: "dsr_ci_jam_casey_attendees_presence",
    existingConnections: "dsr_ci_jam_casey_existing_connections",
    communityMembers: "dsr_ci_casey_members_presence",
    mayaContactLater: "dsr_maya_casey_contact_checkin",
    mayaAttendanceStanding: "dsr_maya_casey_attendance_standing",
    mayaNameStanding: "dsr_maya_casey_name_standing",
    mayaContactGrant: "vg_casey_maya_contact_standing"
  };

  const platform = window.FieldPlatformDomain.createPlatformDomain({
    storageKey: "field_platform_mockup_6_contextual_disclosure"
  });

  const state = {
    surface: "event",
    attendedInThisSession: false
  };

  const els = {
    tabs: Array.from(document.querySelectorAll("[data-surface]")),
    surfaces: {
      event: byId("eventSurface"),
      community: byId("communitySurface"),
      connection: byId("connectionSurface"),
      data: byId("dataSurface")
    },
    eventTitle: byId("eventTitle"),
    eventSummary: byId("eventSummary"),
    eventTime: byId("eventTime"),
    eventVenue: byId("eventVenue"),
    eventHost: byId("eventHost"),
    eventAccess: byId("eventAccess"),
    eventCost: byId("eventCost"),
    eventAudience: byId("eventAudience"),
    attendEvent: byId("attendEvent"),
    shareRequiredInfo: byId("shareRequiredInfo"),
    eventRequirementStatus: byId("eventRequirementStatus"),
    eventDisclosurePrompt: byId("eventDisclosurePrompt"),
    communityTitle: byId("communityTitle"),
    communitySummary: byId("communitySummary"),
    communityRhythm: byId("communityRhythm"),
    communityEntry: byId("communityEntry"),
    communityRelation: byId("communityRelation"),
    communityVisibility: byId("communityVisibility"),
    communityDisclosurePrompt: byId("communityDisclosurePrompt"),
    connectionSummary: byId("connectionSummary"),
    standingChoice: byId("standingChoice"),
    laterRequest: byId("laterRequest"),
    interruptionState: byId("interruptionState"),
    connectionScope: byId("connectionScope"),
    connectionChoices: byId("connectionChoices"),
    coverageList: byId("coverageList"),
    requestCount: byId("requestCount"),
    grantCount: byId("grantCount"),
    requestRows: byId("requestRows"),
    grantRows: byId("grantRows")
  };

  resetDemo();
  bindEvents();
  render();

  function bindEvents() {
    els.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        state.surface = tab.dataset.surface;
        render();
      });
    });

    byId("resetDemo").addEventListener("click", () => {
      resetDemo();
      render();
      flash("Demo reset.");
    });

    els.attendEvent.addEventListener("click", () => {
      if (!requiredEventCoverage()) {
        flash("The facilitator asks for name and contact before attendance is accepted.");
        return;
      }
      platform.events.get(IDS.event).registerUser(platform.users.get(IDS.user));
      state.attendedInThisSession = true;
      render();
      flash("Attendance added. You can stay quiet or share a little more here.");
    });

    els.shareRequiredInfo.addEventListener("click", () => {
      createAndAcceptRequiredLogistics();
      render();
      flash("Shared name and contact route with the facilitator for this event.");
    });
  }

  function resetDemo() {
    platform.resetDatabase();
    state.attendedInThisSession = false;
    ensurePrototypeRequests();
  }

  function ensurePrototypeRequests() {
    ensureRequest({
      id: IDS.eventAttendees,
      requesterType: "event",
      requesterId: IDS.event,
      subjectType: "person",
      subjectId: IDS.user,
      contextType: "event",
      contextId: IDS.event,
      facets: ["name", "attendance"],
      recipientScope: "event_attendees",
      purpose: "social_visibility",
      requirementLevel: "suggested_after_participation",
      source: "mockup_event_prompt",
      note: "After attending, Casey may choose whether attendees can know their name and attendance."
    });

    ensureRequest({
      id: IDS.existingConnections,
      requesterType: "event",
      requesterId: IDS.event,
      subjectType: "person",
      subjectId: IDS.user,
      contextType: "event",
      contextId: IDS.event,
      facets: ["attendance"],
      recipientScope: "existing_connections",
      purpose: "social_visibility",
      requirementLevel: "suggested_after_participation",
      source: "mockup_event_prompt",
      note: "After attending, Casey may let existing connections know they are going."
    });

    ensureRequest({
      id: IDS.communityMembers,
      requesterType: "community",
      requesterId: IDS.community,
      subjectType: "person",
      subjectId: IDS.user,
      contextType: "community",
      contextId: IDS.community,
      facets: ["name", "attendance", "community_relationship"],
      recipientScope: "community_members",
      purpose: "social_visibility",
      requirementLevel: "suggested_after_participation",
      source: "mockup_community_prompt",
      note: "Casey may choose whether CI community members can know they are around."
    });

    ensureRequest({
      id: IDS.mayaContactLater,
      requesterType: "person",
      requesterId: IDS.connectionPerson,
      subjectType: "person",
      subjectId: IDS.user,
      facets: ["contact_route"],
      recipientScope: "specific_people",
      recipientIds: [IDS.connectionPerson],
      purpose: "gradual_connection",
      requirementLevel: "standing_relationship",
      source: "mockup_later_request",
      note: "A later one-to-one request for Casey's contact route can be covered by a standing sharing choice."
    });
  }

  function render() {
    renderSurfaces();
    renderEventSurface();
    renderCommunitySurface();
    renderConnectionSurface();
    renderDataSurface();
  }

  function renderSurfaces() {
    els.tabs.forEach(tab => tab.classList.toggle("is-selected", tab.dataset.surface === state.surface));
    Object.entries(els.surfaces).forEach(([name, surface]) => {
      surface.classList.toggle("is-active", name === state.surface);
    });
  }

  function renderEventSurface() {
    const event = platform.events.get(IDS.event).data();
    const host = labelFor("person", event.hostId);
    const venue = labelFor("venue", event.venueId);
    const attending = event.attendance.attending.includes(IDS.user);
    const logisticsCovered = requiredEventCoverage();
    const attendeeVisible = canSee({
      facet: "attendance",
      recipientScope: "event_attendees",
      contextType: "event",
      contextId: IDS.event,
      purpose: "social_visibility"
    });
    const connectionsVisible = canSee({
      facet: "attendance",
      recipientScope: "existing_connections",
      contextType: "event",
      contextId: IDS.event,
      purpose: "social_visibility"
    });

    els.eventTitle.textContent = event.title;
    els.eventSummary.textContent = "Attendance can be private to Casey and still useful to the app for orientation. The facilitator's logistical need is handled separately from optional social visibility.";
    els.eventTime.textContent = event.time || "Time not set";
    els.eventVenue.textContent = venue;
    els.eventHost.textContent = host;
    els.eventAccess.textContent = accessLabel(event.access);
    els.eventCost.textContent = event.price || "No cost shown";
    els.eventAudience.textContent = event.audience || "Audience not specified";
    els.attendEvent.disabled = !logisticsCovered;
    els.attendEvent.textContent = attending ? "Attending" : "Attend";

    els.eventRequirementStatus.innerHTML = [
      statusLine({
        title: logisticsCovered ? "Name and contact route are shared for logistics." : "The facilitator needs a name and contact route first.",
        label: "Required before attendance",
        body: "Only the event facilitator receives this for this event. It does not make Casey visible to attendees, community members, or public pages.",
        pills: [coveragePill(logisticsCovered), requestStatusPill(IDS.requiredLogistics)]
      }),
      statusLine({
        title: attending ? "Attendance exists as a private participation fact." : "Attendance is not added yet.",
        label: "Internal app use",
        body: "The app can use this privately for Casey's own orientation after attendance. Outward surfaces still depend on grants.",
        pills: [pill(attending ? "attending" : "not attending", attending ? "active" : "pending")]
      })
    ].join("");

    const showPrompt = attending || state.attendedInThisSession;
    els.eventDisclosurePrompt.innerHTML = showPrompt
      ? [
        choiceRow({
          title: "Stay quiet for now",
          body: "Casey attends without becoming socially visible here.",
          button: "Keep quiet",
          style: "",
          disabled: true,
          note: !attendeeVisible && !connectionsVisible ? "Current choice" : "Always available"
        }),
        choiceRow({
          title: "Visible to attendees for this event",
          body: "Attendees can see Casey's name and attendance for this event only.",
          button: attendeeVisible ? "Shared" : "Share",
          style: "blue",
          disabled: attendeeVisible,
          action: "share-event-attendees"
        }),
        choiceRow({
          title: "Let existing connections know",
          body: "People Casey already has a connection with can see this attendance.",
          button: connectionsVisible ? "Shared" : "Share",
          style: "amber",
          disabled: connectionsVisible,
          action: "share-existing-connections"
        })
      ].join("")
      : statusLine({
        title: "Attend first, then choose whether to share more.",
        label: "Default",
        body: "The prompt appears after the event action completes, unless a stated requirement is needed before attendance.",
        pills: [pill("quiet by default", "pending")]
      });

    bindChoiceActions(els.eventDisclosurePrompt);
  }

  function renderCommunitySurface() {
    const community = platform.communities.get(IDS.community).data();
    const edgeModel = platform.users.get(IDS.user).edgeTo(IDS.community);
    const edge = edgeModel
      ? edgeModel.data()
      : { relationshipState: "participating nearby", accessLevel: "public" };
    const stewardVisible = canSee({
      facet: "community_relationship",
      recipientScope: "community_stewards",
      contextType: "community",
      contextId: IDS.community,
      purpose: "steward_context"
    });
    const memberVisible = canSee({
      facet: "community_relationship",
      recipientScope: "community_members",
      contextType: "community",
      contextId: IDS.community,
      purpose: "social_visibility"
    });

    els.communityTitle.textContent = community.name;
    els.communitySummary.textContent = community.description || "No community description shown.";
    els.communityRhythm.textContent = community.rhythm || "Rhythm not set";
    els.communityEntry.textContent = community.entryGuidance || "Entry guidance not set";
    els.communityRelation.textContent = `${relationshipLabel(edge.relationshipState)} / ${accessLabel(edge.accessLevel)}`;
    els.communityVisibility.textContent = memberVisible ? "Visible to members" : stewardVisible ? "Visible to stewards" : "Quiet/private";

    els.communityDisclosurePrompt.innerHTML = [
      choiceRow({
        title: "Remain quiet here",
        body: "The app can still orient Casey privately without making their community relationship visible.",
        button: "Keep quiet",
        disabled: true,
        note: !stewardVisible && !memberVisible ? "Current choice" : "Still allowed"
      }),
      choiceRow({
        title: "Let stewards know I am around",
        body: "CI stewards can see Casey has participated near this community and may understand their entry path better.",
        button: stewardVisible ? "Shared" : "Share",
        style: "blue",
        disabled: stewardVisible,
        action: "share-community-stewards"
      }),
      choiceRow({
        title: "Visible to community members",
        body: "Members can see Casey's name, attendance, and community relationship in this community context.",
        button: memberVisible ? "Shared" : "Share",
        style: "amber",
        disabled: memberVisible,
        action: "share-community-members"
      }),
      choiceRow({
        title: "Ask a steward first",
        body: "A future question flow can reduce uncertainty without making Casey visible to everyone.",
        button: "Ask",
        style: "rose",
        action: "ask-steward"
      })
    ].join("");

    bindChoiceActions(els.communityDisclosurePrompt);
  }

  function renderConnectionSurface() {
    const maya = platform.users.get(IDS.connectionPerson).profile();
    const contactCovered = platform.dataShares.coverageForRequest(IDS.mayaContactLater).isCovered;
    const contactVisible = canSee({
      facet: "contact_route",
      recipientScope: "specific_people",
      recipientId: IDS.connectionPerson,
      purpose: "gradual_connection"
    });
    const nameVisible = canSee({
      facet: "name",
      recipientScope: "specific_people",
      recipientId: IDS.connectionPerson,
      purpose: "gradual_connection"
    });
    const attendanceVisible = canSee({
      facet: "attendance",
      recipientScope: "specific_people",
      recipientId: IDS.connectionPerson,
      purpose: "gradual_connection"
    });

    els.connectionSummary.textContent = `${maya.name} already has a standing contact route from Casey. That standing choice can cover a later request without asking again.`;
    els.standingChoice.textContent = contactVisible ? "Contact route shared" : "No standing contact grant";
    els.laterRequest.textContent = contactCovered ? "Covered" : "Not covered";
    els.interruptionState.textContent = contactCovered ? "No" : "Yes";
    els.connectionScope.textContent = [contactVisible && "contact", nameVisible && "name", attendanceVisible && "attendance"]
      .filter(Boolean)
      .join(", ") || "nothing shared";

    els.connectionChoices.innerHTML = [
      choiceRow({
        title: "Contact route with Maya",
        body: "Maya can contact Casey through the route Casey already made available.",
        button: contactVisible ? "Revoke" : "Share",
        style: contactVisible ? "rose" : "blue",
        action: contactVisible ? "revoke-maya-contact" : "share-maya-contact"
      }),
      choiceRow({
        title: "Share name with Maya",
        body: "A small next step in the one-to-one connection without sharing attendance history.",
        button: nameVisible ? "Shared" : "Share",
        disabled: nameVisible,
        action: "share-maya-name"
      }),
      choiceRow({
        title: "Share chosen attendance with Maya",
        body: "Maya can see events Casey chooses to share through this relationship.",
        button: attendanceVisible ? "Shared" : "Share",
        style: "amber",
        disabled: attendanceVisible,
        action: "share-maya-attendance"
      })
    ].join("");

    els.coverageList.innerHTML = [
      statusLine({
        title: contactCovered ? "The later contact request is already covered." : "The later contact request needs a new choice.",
        label: "Coverage",
        body: "The access layer resolves whether an active grant already satisfies the requested facet, recipient, purpose, and context.",
        pills: [coveragePill(contactCovered), requestStatusPill(IDS.mayaContactLater)]
      }),
      statusLine({
        title: "Standing choices are durable but revocable.",
        label: "Current grants",
        body: "Revoking the standing contact route removes quiet coverage for future one-to-one contact requests.",
        pills: [
          pill(contactVisible ? "contact active" : "contact not shared", contactVisible ? "active" : "revoked"),
          pill(nameVisible ? "name active" : "name private", nameVisible ? "active" : "pending"),
          pill(attendanceVisible ? "attendance active" : "attendance private", attendanceVisible ? "active" : "pending")
        ]
      })
    ].join("");

    bindChoiceActions(els.connectionChoices);
  }

  function renderDataSurface() {
    const requests = platform.dataShareRequests.forSubject("person", IDS.user).map(request => request.data());
    const grants = platform.visibilityGrants.forSubject("person", IDS.user).map(grant => grant.data());
    const activeGrants = grants.filter(grant => grant.status === "active");

    els.requestCount.textContent = String(requests.length);
    els.grantCount.textContent = String(activeGrants.length);
    els.requestRows.innerHTML = requests.map(requestRow).join("");
    els.grantRows.innerHTML = grants.map(grantRow).join("");
  }

  function bindChoiceActions(root) {
    root.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => {
        handleChoice(button.dataset.action);
      });
    });
  }

  function handleChoice(action) {
    if (action === "share-event-attendees") {
      acceptRequest(IDS.eventAttendees);
      flash("Casey is now visible to attendees for this event.");
    } else if (action === "share-existing-connections") {
      acceptRequest(IDS.existingConnections);
      flash("Existing connections can now see Casey is attending this event.");
    } else if (action === "share-community-stewards") {
      acceptRequest(IDS.communityStewards);
      flash("CI stewards can now see Casey is around.");
    } else if (action === "share-community-members") {
      acceptRequest(IDS.communityMembers);
      flash("CI members can now see Casey in this community context.");
    } else if (action === "ask-steward") {
      flash("Question flow is future product space in this prototype.");
    } else if (action === "revoke-maya-contact") {
      revokeMayaContact();
      flash("Maya's standing contact route was revoked.");
    } else if (action === "share-maya-contact") {
      createStandingGrant({
        id: IDS.mayaContactGrant,
        facets: ["contact_route"],
        source: "standing_visibility_preference"
      });
      flash("Maya can now see Casey's contact route again.");
    } else if (action === "share-maya-name") {
      createAndAcceptRequest({
        id: IDS.mayaNameStanding,
        requesterType: "person",
        requesterId: IDS.connectionPerson,
        subjectType: "person",
        subjectId: IDS.user,
        facets: ["name"],
        recipientScope: "specific_people",
        recipientIds: [IDS.connectionPerson],
        purpose: "gradual_connection",
        requirementLevel: "standing_relationship",
        source: "mockup_person_connection",
        note: "Casey chooses to share their name with Maya as part of a gradual connection."
      });
      flash("Casey's name is now shared with Maya.");
    } else if (action === "share-maya-attendance") {
      createAndAcceptRequest({
        id: IDS.mayaAttendanceStanding,
        requesterType: "person",
        requesterId: IDS.connectionPerson,
        subjectType: "person",
        subjectId: IDS.user,
        facets: ["attendance"],
        recipientScope: "specific_people",
        recipientIds: [IDS.connectionPerson],
        purpose: "gradual_connection",
        requirementLevel: "standing_relationship",
        source: "mockup_person_connection",
        note: "Casey chooses to share selected attendance with Maya through their existing connection."
      });
      flash("Chosen attendance can now be shared with Maya.");
    }
    render();
  }

  function createAndAcceptRequiredLogistics() {
    const id = `dsr_ci_jam_casey_name_contact_${Date.now()}`;
    createAndAcceptRequest({
      id,
      requesterType: "event",
      requesterId: IDS.event,
      subjectType: "person",
      subjectId: IDS.user,
      contextType: "event",
      contextId: IDS.event,
      facets: ["name", "contact_route"],
      recipientScope: "event_facilitators",
      recipientIds: ["p_ella"],
      purpose: "event_logistics",
      requirementLevel: "required_before_action",
      source: "mockup_required_logistics",
      note: "Event facilitator needs a name and contact route for attendance logistics."
    });
  }

  function createAndAcceptRequest(data) {
    ensureRequest(data);
    acceptRequest(data.id);
  }

  function ensureRequest(data) {
    if (getRequest(data.id)) return;
    platform.dataShareRequests.create(data);
  }

  function acceptRequest(id) {
    const request = getRequest(id);
    if (!request) return;
    if (request.status === "accepted") return;
    if (request.status === "revoked") return;
    platform.dataShareRequests.accept(id, IDS.user);
  }

  function createStandingGrant(data) {
    const existing = getGrant(data.id);
    if (existing && existing.status === "active") return;
    if (existing && existing.status === "revoked") {
      platform.visibilityGrants.create({
        id: `vg_casey_maya_contact_standing_${Date.now()}`,
        subjectType: "person",
        subjectId: IDS.user,
        facets: data.facets,
        recipientScope: "specific_people",
        recipientIds: [IDS.connectionPerson],
        purpose: "gradual_connection",
        source: data.source,
        audienceBehavior: "fixed"
      });
      return;
    }
    platform.visibilityGrants.create({
      id: data.id,
      subjectType: "person",
      subjectId: IDS.user,
      facets: data.facets,
      recipientScope: "specific_people",
      recipientIds: [IDS.connectionPerson],
      purpose: "gradual_connection",
      source: data.source,
      audienceBehavior: "fixed"
    });
  }

  function revokeMayaContact() {
    platform.visibilityGrants.forSubject("person", IDS.user)
      .map(grant => grant.data())
      .filter(grant =>
        grant.status === "active" &&
        grant.purpose === "gradual_connection" &&
        grant.recipientScope === "specific_people" &&
        (grant.recipientIds || []).includes(IDS.connectionPerson) &&
        grant.facets.includes("contact_route")
      )
      .forEach(grant => platform.visibilityGrants.revoke(grant.id, IDS.user));
  }

  function requiredEventCoverage() {
    return platform.dataShares
      .coverageForContext("event", IDS.event, "person", IDS.user, "required_before_action")
      .some(coverage => coverage.isCovered);
  }

  function canSee(query) {
    return platform.visibilityGrants.canSee({
      subjectType: "person",
      subjectId: IDS.user,
      ...query
    });
  }

  function getRequest(id) {
    try {
      return platform.dataShareRequests.get(id).data();
    } catch (error) {
      return null;
    }
  }

  function getGrant(id) {
    try {
      return platform.visibilityGrants.get(id).data();
    } catch (error) {
      return null;
    }
  }

  function labelFor(type, id) {
    if (!id) return "Not set";
    try {
      if (type === "person") return platform.users.get(id).name();
      if (type === "event") return platform.events.get(id).data().title;
      if (type === "community") return platform.communities.get(id).data().name;
      if (type === "venue") return platform.venues.get(id).data().name;
    } catch (error) {
      return id;
    }
    return id;
  }

  function statusLine({ title, label, body, pills = [] }) {
    return `
      <article class="status-line">
        <span class="status-label">${escapeHtml(label)}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(body)}</p>
        ${pills.length ? `<div class="pill-row">${pills.join("")}</div>` : ""}
      </article>
    `;
  }

  function choiceRow({ title, body, button, action, style = "", disabled = false, note = "" }) {
    return `
      <article class="choice-row">
        <div>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(body)}</p>
          ${note ? `<div class="choice-note">${escapeHtml(note)}</div>` : ""}
        </div>
        <button class="choice-button ${escapeHtml(style)}" type="button" ${action ? `data-action="${escapeHtml(action)}"` : ""} ${disabled ? "disabled" : ""}>${escapeHtml(button)}</button>
      </article>
    `;
  }

  function requestRow(request) {
    const coverage = platform.dataShares.coverageForRequest(request.id);
    return `
      <article class="data-row">
        <div class="data-row-top">
          <div>
            <span class="data-row-label">${escapeHtml(scopeLabel(request.recipientScope))} / ${escapeHtml(purposeLabel(request.purpose))}</span>
            <strong>${escapeHtml(requirementLabel(request.requirementLevel))}</strong>
          </div>
          <span class="pill ${escapeHtml(request.status)}">${escapeHtml(request.status)}</span>
        </div>
        <code>${escapeHtml(request.id)}</code>
        <p>${escapeHtml(request.note || "No note.")}</p>
        <div class="data-grid">
          <div><span class="data-row-label">Facets</span><br>${escapeHtml(request.facets.join(", "))}</div>
          <div><span class="data-row-label">Context</span><br>${escapeHtml(contextLabel(request.contextType, request.contextId))}</div>
          <div><span class="data-row-label">Recipient ids</span><br>${escapeHtml((request.recipientIds || []).join(", ") || "scope only")}</div>
          <div><span class="data-row-label">Covered now</span><br>${coverage.isCovered ? "yes" : "no"}</div>
        </div>
      </article>
    `;
  }

  function grantRow(grant) {
    return `
      <article class="data-row">
        <div class="data-row-top">
          <div>
            <span class="data-row-label">${escapeHtml(scopeLabel(grant.recipientScope))} / ${escapeHtml(purposeLabel(grant.purpose))}</span>
            <strong>${escapeHtml(grant.source || "visibility grant")}</strong>
          </div>
          <span class="pill ${escapeHtml(grant.status)}">${escapeHtml(grant.status)}</span>
        </div>
        <code>${escapeHtml(grant.id)}</code>
        <div class="data-grid">
          <div><span class="data-row-label">Facets</span><br>${escapeHtml(grant.facets.join(", "))}</div>
          <div><span class="data-row-label">Context</span><br>${escapeHtml(contextLabel(grant.contextType, grant.contextId))}</div>
          <div><span class="data-row-label">Recipient ids</span><br>${escapeHtml((grant.recipientIds || []).join(", ") || "scope only")}</div>
          <div><span class="data-row-label">From request</span><br>${escapeHtml(grant.sourceRequestId || "standing choice")}</div>
        </div>
      </article>
    `;
  }

  function requestStatusPill(id) {
    const request = getRequest(id);
    return pill(request ? request.status : "not requested", request ? request.status : "pending");
  }

  function coveragePill(isCovered) {
    return pill(isCovered ? "covered" : "not covered", isCovered ? "active" : "pending");
  }

  function pill(text, variant) {
    return `<span class="pill ${escapeHtml(variant)}">${escapeHtml(text)}</span>`;
  }

  function scopeLabel(value) {
    const labels = {
      specific_people: "selected people",
      event_facilitators: "event facilitators",
      venue_hosts: "venue hosts",
      community_stewards: "community stewards",
      event_attendees: "event attendees",
      community_members: "community members",
      existing_connections: "existing connections",
      public: "public"
    };
    return labels[value] || value || "scope not set";
  }

  function purposeLabel(value) {
    const labels = {
      event_logistics: "event logistics",
      venue_logistics: "venue logistics",
      access_or_safety: "access or safety",
      steward_context: "steward context",
      social_visibility: "social visibility",
      gradual_connection: "gradual connection",
      private_recommendation: "private recommendation",
      aggregate_explanation: "aggregate explanation"
    };
    return labels[value] || value || "purpose not set";
  }

  function requirementLabel(value) {
    const labels = {
      required_before_action: "Required before action",
      optional_before_action: "Optional before action",
      suggested_after_participation: "Suggested after participation",
      standing_relationship: "Standing relationship"
    };
    return labels[value] || value || "Requirement not set";
  }

  function accessLabel(value) {
    const labels = {
      public: "Public",
      known: "Known people",
      requested: "Request access",
      member: "Members",
      trusted: "Trusted layer",
      core: "Core",
      "visible-but-member-signup-only": "Visible, member signup"
    };
    return labels[value] || value || "Access not set";
  }

  function relationshipLabel(value) {
    const labels = {
      observing: "Observing",
      curious: "Curious",
      occasional: "Occasional",
      recurring: "Recurring",
      contributor: "Contributor",
      facilitator: "Facilitator",
      steward: "Steward",
      dormant: "Dormant",
      alumnus: "Alumnus"
    };
    return labels[value] || value || "Relationship not set";
  }

  function contextLabel(type, id) {
    if (!type || !id) return "all relevant contexts";
    return `${type}: ${labelFor(type, id)}`;
  }

  function flash(message) {
    const notice = document.createElement("div");
    notice.className = "toast";
    notice.textContent = message;
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 3600);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();

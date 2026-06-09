const DemoApp = (() => {
  const STORAGE_KEY = "field_mockup_2_demo_state";
  let data = loadData();
  let modelPanel = "participationEdges";
  let creatorDraft = defaultDraft();

  function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return window.createInitialDemoData();
    try {
      return JSON.parse(stored);
    } catch (error) {
      return window.createInitialDemoData();
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetData() {
    data = window.createInitialDemoData();
    creatorDraft = defaultDraft();
    saveData();
    render();
    openDrawer("Demo Data Reset", `
      <p>The seeded Aarhus-like ecosystem has been restored.</p>
      <div class="drawer-card">All participation edges, event attendance, steward actions, created events, and recommendations are back to their original fake state.</div>
    `);
  }

  function init() {
    document.querySelectorAll(".tab-button").forEach(button => {
      button.addEventListener("click", () => {
        data.currentView = button.dataset.view;
        saveData();
        render();
      });
    });
    document.getElementById("resetButton").addEventListener("click", resetData);
    document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
    renderPersonaSelect();
    render();
  }

  function renderPersonaSelect() {
    const select = document.getElementById("personaSelect");
    select.innerHTML = data.personas.map(personId => {
      const person = FieldMath.getPerson(data, personId);
      return `<option value="${person.id}">${escapeHtml(person.name)}</option>`;
    }).join("");
    select.value = data.currentPersonId;
    select.addEventListener("change", event => {
      data.currentPersonId = event.target.value;
      saveData();
      render();
    });
  }

  function render() {
    document.querySelectorAll(".tab-button").forEach(button => {
      button.classList.toggle("active", button.dataset.view === data.currentView);
    });

    document.getElementById("personaSelect").value = data.currentPersonId;
    const app = document.getElementById("app");
    if (data.currentView === "participant") app.innerHTML = renderParticipantView();
    if (data.currentView === "steward") app.innerHTML = renderStewardView();
    if (data.currentView === "creator") app.innerHTML = renderCreatorView();
    if (data.currentView === "model") app.innerHTML = renderModelView();
    if (data.currentView === "community") app.innerHTML = renderParticipationViewPage();
  }

  function renderParticipantView() {
    const person = FieldMath.getPerson(data, data.currentPersonId);
    const edges = FieldMath.getEdgesForPerson(data, person.id)
      .map(edge => ({ ...edge, computedStrength: FieldMath.computeEngagementStrength(edge) }))
      .sort((a, b) => b.computedStrength - a.computedStrength);
    const fields = FieldMath.generateEmergentFields(data);
    const groupRecs = FieldMath.recommendGroupsForParticipant(data, person.id);
    const eventRecs = FieldMath.recommendEventsForParticipant(data, person.id);
    const orientationTiers = buildOrientationEventTiers(person, edges, eventRecs);

    return `
      <section class="hero participant-hero">
        <div>
          <div class="eyebrow">Participant view</div>
          <h1>My orientation</h1>
          <p class="hero-copy">Upcoming events are ordered by how directly they touch ${escapeHtml(person.name.split(" ")[0])}'s present commitments, memberships, follows, and overlap edges.</p>
        </div>
        ${renderOrientationBoard(orientationTiers)}
      </section>

      <div class="layout-main participant-flow">
        <div>
          <section class="section participant-section participant-relationships">
            <div class="section-header">
              <div>
                <div class="eyebrow">Participation edges</div>
                <h2>My relationships to groups</h2>
                <p class="muted">Belonging is split into binary layers first, then gradient signals for participation and shared exposure.</p>
              </div>
            </div>
            ${renderRelationshipSections(edges)}
          </section>

          <section class="section participant-section participant-events">
            <div class="section-header">
              <div>
                <div class="eyebrow">Relevant events</div>
                <h2>Events surfaced through overlap</h2>
              </div>
            </div>
            <div class="grid-2 participant-event-list">
              ${eventRecs.map(item => renderEventRecommendation(item)).join("")}
            </div>
          </section>
        </div>

        <aside class="inspector participant-section participant-snapshot">
          <div class="eyebrow">Orientation snapshot</div>
          <h2>${escapeHtml(person.name)}</h2>
          <p>${escapeHtml(person.bio)}</p>
          <div class="tag-row">${person.tags.map(tag).join("")}</div>
          <hr>
          <h3>Possible next steps</h3>
          ${renderNextSteps(edges, groupRecs, eventRecs)}
          <hr>
          <h3>Emergent fields around you</h3>
          ${fields.slice(0, 4).map(renderEmergentFieldSmall).join("")}
        </aside>
      </div>
    `;
  }

  function renderStewardView() {
    const summary = FieldMath.summarizeGroup(data, data.stewardGroupId);
    const group = summary.group;
    const fields = FieldMath.generateEmergentFields(data).filter(field => field.groups.includes(group.id));
    const requests = data.membershipRequests.filter(request => request.groupId === group.id && request.status === "pending");
    const suggested = data.suggestedEventShares.filter(share => share.groupId === group.id && share.status === "pending");

    return `
      <section class="hero">
        <div>
          <div class="eyebrow">Steward view</div>
          <h1>Group field / community health</h1>
          <p class="hero-copy">This is not a roster. It shows the living distribution of participation edges, bridge patterns, returning flow, and formal overlays that stewards can adjust.</p>
          <label class="select-label">
            Stewarding group
            <select onchange="DemoApp.setStewardGroup(this.value)">
              ${data.groups.map(item => `<option value="${item.id}" ${item.id === group.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="grid-2">
          ${metricCard("Bonding capacity", summary.bondingScore, "Depth, trust, norm carriers, and strong embeddedness.")}
          ${metricCard("Bridging capacity", summary.bridgingScore, "People, events, and relationships that connect outward.")}
          ${metricCard("Newcomer dropoff signal", summary.dropoff.rate, summary.dropoff.message)}
          ${metricCard("Dormant/reactivating edges", summary.dormant.length * 18, `${summary.dormant.length} aggregate examples in this demo.`)}
        </div>
      </section>

      <div class="steward-layout">
        <div>
          <section class="section">
            <div class="eyebrow">Participation distribution</div>
            <h2>${escapeHtml(group.name)}</h2>
            ${renderDistribution(summary.distribution)}
            <p class="mini-note">Access, attendance, trust, formal role, and identity salience are deliberately separate. This group can be public at the edge and deeply committed at the center.</p>
          </section>

          <section class="section">
            <div class="eyebrow">Aggregate suggestions</div>
            <h2>What the field is hinting at</h2>
            ${renderStewardSuggestions(summary)}
          </section>
        </div>

        <div>
          <section class="section">
            <div class="section-header">
              <div>
                <div class="eyebrow">Bridge connections</div>
                <h2>Adjacent groups and fields</h2>
              </div>
            </div>
            <div class="grid-2">
              ${summary.overlaps.map(renderOverlapCard).join("")}
              ${fields.map(renderEmergentFieldSmall).join("")}
            </div>
          </section>

          <section class="section">
            <div class="eyebrow">Formal structure overlay</div>
            <h2>Stewarding actions</h2>
            ${renderStewardingControls(group, requests, suggested)}
          </section>
        </div>
      </div>
    `;
  }

  function renderCreatorView() {
    const recommendations = FieldMath.recommendGroupsForEvent(data, creatorDraft);
    const fields = FieldMath.generateEmergentFields(data).map(field => {
      const score = field.tags.filter(item => creatorDraft.tags.includes(item)).length * 18 +
        field.groups.filter(groupId => recommendations.slice(0, 4).some(rec => rec.group.id === groupId)).length * 9 +
        field.strength * 0.22;
      return { field, score: Math.round(score) };
    }).sort((a, b) => b.score - a.score).slice(0, 5);

    return `
      <section class="hero">
        <div>
          <div class="eyebrow">Creator / facilitator view</div>
          <h1>Who might this offering be for?</h1>
          <p class="hero-copy">The creator flow uses event tags, venue, access, beginner-friendliness, intended audience, and facilitator history to suggest groups and fields. It should feel like guided field discovery, not ad targeting.</p>
        </div>
        <div class="field-panel">
          ${renderCreatorHotspots(recommendations)}
        </div>
      </section>

      <div class="creator-layout">
        <section class="section">
          <div class="eyebrow">Create event</div>
          <h2>Draft offering</h2>
          ${renderCreatorForm()}
        </section>

        <section class="section">
          <div class="section-header">
            <div>
              <div class="eyebrow">Find who might be interested</div>
              <h2>Suggested groups and emergent fields</h2>
            </div>
            <button class="primary-button" onclick="DemoApp.createEventFromDraft()">Create event</button>
          </div>
          <div class="grid-2">
            ${recommendations.map(renderEventGroupFit).join("")}
            ${fields.map(item => renderFieldFit(item)).join("")}
          </div>
          <hr>
          <h3>Choose where to share or suggest</h3>
          <div class="grid-3">
            ${recommendations.slice(0, 6).map(item => `
              <label class="check-row card">
                <input type="checkbox" class="share-target" value="${item.group.id}" ${item.score > 45 ? "checked" : ""}>
                <span>
                  <strong>${escapeHtml(item.group.name)}</strong><br>
                  <span class="muted">${item.reasons[0]}</span>
                </span>
              </label>
            `).join("")}
          </div>
          <div class="button-row">
            <button class="secondary-button" onclick="DemoApp.shareDraftToSelected()">Suggest draft to selected groups</button>
          </div>
        </section>
      </div>
    `;
  }

  function renderModelView() {
    const person = FieldMath.getPerson(data, data.currentPersonId);
    const fields = FieldMath.generateEmergentFields(data);
    const relationships = buildComputedRelationships();
    const eventCalcs = data.events.map(event => FieldMath.eventRelevanceCalculation(data, event, person.id)).sort((a, b) => b.score - a.score);
    const panels = {
      people: data.people,
      groups: data.groups,
      participationEdges: data.participationEdges,
      events: data.events,
      venues: data.venues,
      computedGroupRelationships: relationships,
      emergentFields: fields,
      eventRelevance: eventCalcs,
      formulas: formulaReference()
    };

    return `
      <section class="hero">
        <div>
          <div class="eyebrow">Data model explorer</div>
          <h1>Representation, not membership truth</h1>
          <p class="hero-copy">Inspect the fake internal model and computed outputs. This panel exists so the representation can be argued with and changed.</p>
        </div>
        <div class="card">
          <h2>Core objects</h2>
          <div class="table-like">
            <div><strong>Person</strong><span>light profile</span><span>interests, visible attributes, current orientation</span></div>
            <div><strong>Group</strong><span>named container</span><span>norms, rhythm, access, entry guidance</span></div>
            <div><strong>ParticipationEdge</strong><span>main truth</span><span>state, access, strength, trust, roles, visibility, decay</span></div>
            <div><strong>EmergentField</strong><span>computed layer</span><span>generated from tags, venues, overlap, rhythm</span></div>
          </div>
        </div>
      </section>

      <div class="model-layout">
        <section class="section">
          <div class="eyebrow">Panels</div>
          <h2>Inspect data</h2>
          <div class="model-tabs">
            ${Object.keys(panels).map(key => `<button class="pill-button ${modelPanel === key ? "active" : ""}" onclick="DemoApp.setModelPanel('${key}')">${labelFor(key)}</button>`).join("")}
          </div>
          <p class="muted">The current panel is <span class="highlight">${labelFor(modelPanel)}</span>.</p>
          ${renderModelSummary(modelPanel, panels[modelPanel])}
        </section>
        <section class="data-box">
          <div class="card-head">
            <div>
              <div class="eyebrow">${labelFor(modelPanel)}</div>
              <h2>Raw view</h2>
            </div>
            <span class="model-path">Mockup 2/js/${modelPanel === "formulas" ? "calculations" : "data"}.js</span>
          </div>
          <pre>${escapeHtml(JSON.stringify(panels[modelPanel], null, 2))}</pre>
        </section>
      </div>
    `;
  }

  function renderParticipationViewPage() {
    const focus = data.focus || { type: "group", id: data.stewardGroupId };
    if (focus.type === "field") return renderGeneratedFieldPage(focus.id);
    return renderCommunityPage(focus.id);
  }

  function buildOrientationEventTiers(person, edges, eventRecs) {
    const used = new Set();
    const memberGroupIds = edges
      .filter(edge => ["member", "trusted", "core"].includes(edge.accessLevel) && !isDormant(edge))
      .map(edge => edge.groupId);
    const followedGroupIds = edges
      .filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState) && !isDormant(edge))
      .map(edge => edge.groupId);

    const groupTouchesEvent = (event, groupIds) => unique([...event.linkedGroups, ...event.relevantGroups]).some(groupId => groupIds.includes(groupId));
    const userHelpsHoldEvent = event =>
      event.hostId === person.id ||
      (event.cohostIds || []).includes(person.id) ||
      (event.volunteerIds || []).includes(person.id);
    const pull = predicate => data.events.filter(event => {
      if (used.has(event.id) || !predicate(event)) return false;
      used.add(event.id);
      return true;
    });

    const activeEvents = pull(userHelpsHoldEvent);
    const committedEvents = pull(event => event.attendance.attending.includes(person.id));
    const memberEvents = pull(event => groupTouchesEvent(event, memberGroupIds));
    const followedEvents = pull(event => groupTouchesEvent(event, followedGroupIds));
    const personTagSet = new Set(person.tags);
    const expansionCandidates = [
      ...eventRecs.map(item => item.event),
      ...data.events.filter(event => event.tags.some(tag => personTagSet.has(tag)))
    ];
    const expansionEvents = uniqueById(expansionCandidates)
      .filter(event => {
        if (used.has(event.id)) return false;
        used.add(event.id);
        return true;
      });

    return [
      {
        id: "active",
        eyebrow: "Actively held",
        title: "You are offering, hosting, or helping hold",
        copy: "These sit closest to your agency in the field.",
        events: activeEvents,
        empty: "No events are currently held by you in the demo data."
      },
      {
        id: "committed",
        eyebrow: "Committed",
        title: "You have marked yourself as participating",
        copy: "These are clear next commitments rather than general suggestions.",
        events: committedEvents,
        empty: "No events are marked as attending yet."
      },
      {
        id: "member",
        eyebrow: "Clearly relevant",
        title: "Events in groups where membership or trust is granted",
        copy: "These come from communities where you have explicit access or trust.",
        events: memberEvents,
        empty: "No member-group events are currently surfaced."
      },
      {
        id: "following",
        eyebrow: "Followed field",
        title: "Events from groups you are following or lightly tracking",
        copy: "These stay in view without assuming deeper belonging.",
        events: followedEvents,
        empty: "No followed-group events are currently surfaced."
      },
      {
        id: "expansion",
        eyebrow: "Expansion edge",
        title: "Larger overlap with your involvements and interests",
        copy: "These are softer invitations based on shared tags, adjacent groups, and overlap.",
        events: expansionEvents,
        empty: "No expansion-edge events are currently suggested."
      }
    ];
  }

  function renderOrientationBoard(tiers) {
    return `
      <div class="orientation-board">
        ${tiers.map(renderOrientationTier).join("")}
      </div>
    `;
  }

  function renderOrientationTier(tier, index) {
    return `
      <section class="orientation-tier orientation-${tier.id}">
        <div class="orientation-tier-heading">
          <span class="orientation-step">${index + 1}</span>
          <div>
            <div class="eyebrow">${escapeHtml(tier.eyebrow)}</div>
            <h2>${escapeHtml(tier.title)}</h2>
            <p class="muted">${escapeHtml(tier.copy)}</p>
          </div>
        </div>
        <div class="orientation-event-stack">
          ${tier.events.length ? tier.events.slice(0, 3).map(event => renderOrientationEvent(event, tier.id)).join("") : `<div class="orientation-empty">${escapeHtml(tier.empty)}</div>`}
        </div>
      </section>
    `;
  }

  function renderOrientationEvent(event, tierId) {
    const venue = FieldMath.getVenue(data, event.venueId);
    const linkedGroups = unique([...event.linkedGroups, ...event.relevantGroups])
      .slice(0, 3)
      .map(groupId => FieldMath.getGroup(data, groupId))
      .filter(Boolean);
    return `
      <article class="orientation-event orientation-event-${tierId}">
        <div class="orientation-event-time">${escapeHtml(event.time)}</div>
        <div class="orientation-event-main">
          <h3>${escapeHtml(event.title)}</h3>
          <p class="muted">${escapeHtml(venue.name)}. ${escapeHtml(event.audience)}.</p>
          <div class="tag-row">
            ${linkedGroups.map(group => chip(group.name, "field-chip")).join("")}
            ${event.tags.slice(0, 3).map(tag).join("")}
          </div>
        </div>
        <div class="orientation-event-actions">
          <button class="primary-button" onclick="DemoApp.attendEvent('${event.id}')">Attend</button>
          <button class="ghost-button" onclick="DemoApp.markInterested('${event.id}')">Interested</button>
        </div>
      </article>
    `;
  }

  function renderCommunityPage(groupId) {
    const group = FieldMath.getGroup(data, groupId) || data.groups[0];
    const person = FieldMath.getPerson(data, data.currentPersonId);
    const edge = FieldMath.getEdgesForPerson(data, person.id).find(item => item.groupId === group.id) || {
      personId: person.id,
      groupId: group.id,
      relationshipState: "observing",
      accessLevel: group.state === "public" ? "public" : "requested",
      roleModes: [],
      decayState: "active",
      visibility: "privateToUser"
    };
    const metrics = FieldMath.computePersonalGroupMetrics(data, person.id, group.id);
    const events = eventsForGroup(group.id);
    const bridgeEvents = events.filter(item => item.mode === "Bridge");
    const depthEvents = events.filter(item => item.mode === "Deepen");

    return `
      <section class="hero">
        <div>
          <button class="ghost-button back-button" onclick="DemoApp.backToParticipant()">Back to my orientation</button>
          <div class="eyebrow">Community view</div>
          <h1>${escapeHtml(group.name)}</h1>
          <p class="hero-copy">${escapeHtml(group.description)}</p>
          <div class="tag-row">
            ${chip(group.state, "access-chip")}
            ${group.tags.slice(0, 5).map(tag).join("")}
          </div>
        </div>
        <div class="card participation-panel">
          <h2>How you relate here</h2>
          <div class="state-pair">
            ${chip(edge.relationshipState, "state-chip")}
            ${chip(edge.accessLevel, "access-chip")}
            ${chip(edge.decayState, "field-chip")}
            ${edge.roleModes.map(item => chip(item, "role-chip")).join("")}
          </div>
          ${metricCard("Participation", metrics.participationScore, "How often and how deeply your edge currently participates.")}
          ${metricCard("Shared exposure", metrics.exposureScore, "Overlap from other communities, event tags, and relevant events.")}
        </div>
      </section>

      <div class="layout-main">
        <div>
          <section class="section">
            <div class="eyebrow">Ways in</div>
            <h2>Explore how to participate</h2>
            <div class="grid-2">
              <article class="card"><h3>Follow lightly</h3><p class="muted">${escapeHtml(group.entryGuidance)}</p><button class="secondary-button" onclick="DemoApp.followGroup('${group.id}')">Follow group</button></article>
              <article class="card"><h3>Ask for membership</h3><p class="muted">${escapeHtml(group.accessRules)}</p><button class="secondary-button" onclick="DemoApp.requestMembership('${group.id}')">Request membership</button></article>
              <article class="card"><h3>Commit or serve</h3><p class="muted">Move from attendance into a visible contribution layer when that fits.</p><button class="secondary-button" onclick="DemoApp.volunteer('${group.id}')">Volunteer</button></article>
              <article class="card"><h3>Let it rest</h3><p class="muted">Dormant means this community is temporarily muted in your orientation.</p><button class="danger-soft" onclick="DemoApp.becomeDormant('${group.id}')">Become dormant</button></article>
            </div>
          </section>

          <section class="section">
            <div class="section-header">
              <div>
                <div class="eyebrow">Bridge participation</div>
                <h2>Shallow or low-threshold doorways</h2>
              </div>
            </div>
            <div class="grid-2">${bridgeEvents.map(item => renderCommunityEvent(item)).join("") || `<div class="empty-state">No bridge events in this demo moment.</div>`}</div>
          </section>

          <section class="section">
            <div class="section-header">
              <div>
                <div class="eyebrow">Deeper connection</div>
                <h2>Community-specific or commitment-supported events</h2>
              </div>
            </div>
            <div class="grid-2">${depthEvents.map(item => renderCommunityEvent(item)).join("") || `<div class="empty-state">No deeper events in this demo moment.</div>`}</div>
          </section>
        </div>

        <aside class="inspector">
          <div class="eyebrow">Community self-description</div>
          <h2>Rhythm and norms</h2>
          <p>${escapeHtml(group.rhythm)}</p>
          <div class="mini-note">${escapeHtml(group.norms.join(". "))}.</div>
          <hr>
          <h3>Overlap signals</h3>
          <p class="muted">${metrics.sharedCommunities} adjacent communities above light overlap.</p>
          <div class="tag-row">${metrics.sharedEventTags.map(tag).join("") || chip("low tag overlap", "explain-chip")}</div>
        </aside>
      </div>
    `;
  }

  function renderGeneratedFieldPage(fieldId) {
    const field = FieldMath.generateEmergentFields(data).find(item => item.id === fieldId) || FieldMath.generateEmergentFields(data)[0];
    const events = data.events
      .filter(event => event.relevantGroups.some(groupId => field.groups.includes(groupId)))
      .map(event => classifyEventForParticipation(event, field.groups[0]))
      .sort((a, b) => a.sort - b.sort);
    const bridgeEvents = events.filter(item => item.mode === "Bridge");
    const depthEvents = events.filter(item => item.mode === "Deepen");

    return `
      <section class="hero">
        <div>
          <button class="ghost-button back-button" onclick="DemoApp.backToParticipant()">Back to my orientation</button>
          <div class="eyebrow">Generated field view</div>
          <h1>${escapeHtml(field.name)}</h1>
          <p class="hero-copy">${escapeHtml(field.description)} This page is generated from shared tags, venues, rhythm, and participation overlap rather than managed by representatives.</p>
          <div class="tag-row">
            ${chip(field.generatedFrom, "field-chip")}
            ${chip(field.clarity, "state-chip")}
            ${field.tags.map(tag).join("")}
          </div>
        </div>
        <div class="card participation-panel">
          <h2>What this field captures</h2>
          ${metricCard("Field strength", field.strength, "Computed from overlapping groups and aggregate participation edges.")}
          <p class="muted">Groups involved: ${escapeHtml(field.groups.map(groupId => FieldMath.getGroup(data, groupId).name).join(", "))}.</p>
          <p class="tiny">People are only represented as aggregate edges here: ${field.peopleCount}.</p>
        </div>
      </section>

      <div class="layout-main">
        <div>
          <section class="section">
            <div class="eyebrow">Sparse generated page</div>
            <h2>Named communities inside this field</h2>
            <div class="grid-2">
              ${field.groups.map(groupId => {
                const group = FieldMath.getGroup(data, groupId);
                return `<article class="card" style="border-left:6px solid ${group.color};"><h3>${escapeHtml(group.name)}</h3><p class="muted">${escapeHtml(group.description)}</p><button class="secondary-button" onclick="DemoApp.openGroupView('${group.id}')">Explore how to participate</button></article>`;
              }).join("")}
            </div>
          </section>
          <section class="section">
            <div class="eyebrow">Bridge participation</div>
            <h2>Shallow ways into the field</h2>
            <div class="grid-2">${bridgeEvents.map(item => renderCommunityEvent(item)).join("") || `<div class="empty-state">No bridge events in this demo moment.</div>`}</div>
          </section>
          <section class="section">
            <div class="eyebrow">Deeper connection</div>
            <h2>Events closer to a named community container</h2>
            <div class="grid-2">${depthEvents.map(item => renderCommunityEvent(item)).join("") || `<div class="empty-state">No deeper events in this demo moment.</div>`}</div>
          </section>
        </div>
        <aside class="inspector">
          <div class="eyebrow">Generated, not managed</div>
          <h2>Why it is sparse</h2>
          <p>This view describes the pattern the field is trying to capture. A community page can speak in a specific voice; this page stays closer to computed evidence.</p>
        </aside>
      </div>
    `;
  }

  function renderFieldMap(edges, eventRecs, fields) {
    const center = { x: 500, y: 270 };
    const groupEdges = edges.slice(0, 7);
    const groupNodes = groupEdges.map((edge, index) => {
      const group = FieldMath.getGroup(data, edge.groupId);
      const angle = (-135 + index * (270 / Math.max(1, groupEdges.length - 1))) * Math.PI / 180;
      const strength = edge.computedStrength;
      return {
        group,
        edge,
        x: Math.round(center.x + Math.cos(angle) * 250),
        y: Math.round(center.y + Math.sin(angle) * 165),
        r: Math.round(30 + strength * 0.28)
      };
    });
    const groupPositions = Object.fromEntries(groupNodes.map(node => [node.group.id, node]));
    const eventNodes = eventRecs.slice(0, 5).map((item, index) => {
      const anchors = item.event.relevantGroups.filter(groupId => groupPositions[groupId]);
      const anchor = anchors[0] ? groupPositions[anchors[0]] : groupNodes[index % Math.max(1, groupNodes.length)];
      const side = index % 2 === 0 ? 1 : -1;
      return {
        item,
        anchors,
        x: Math.round(anchor.x + side * (86 + index * 8)),
        y: Math.round(anchor.y + (index % 3 - 1) * 42),
        color: FieldMath.getGroup(data, item.event.relevantGroups[0]).color
      };
    });

    const egoLinks = groupNodes.map(node => `
      <line class="sociogram-link strength-link" x1="${center.x}" y1="${center.y}" x2="${node.x}" y2="${node.y}" stroke="${node.group.color}" stroke-width="${Math.max(2, Math.round(node.edge.computedStrength / 18))}" />
    `).join("");
    const eventLinks = eventNodes.flatMap(node => node.anchors.map(groupId => {
      const groupNode = groupPositions[groupId];
      return `<line class="sociogram-link event-link" x1="${node.x}" y1="${node.y}" x2="${groupNode.x}" y2="${groupNode.y}" stroke="${groupNode.group.color}" />`;
    })).join("");
    const groupSvg = groupNodes.map(node => `
      <g class="sociogram-group" transform="translate(${node.x} ${node.y})">
        <circle r="${node.r}" fill="${node.group.color}" />
        <text y="-2">${escapeHtml(shortGroupLabel(node.group.name))}</text>
        <text class="sociogram-small-label" y="15">${node.edge.computedStrength}</text>
      </g>
    `).join("");
    const eventSvg = eventNodes.map(node => `
      <g class="sociogram-event" role="button" tabindex="0" onclick="DemoApp.markInterested('${node.item.event.id}')" transform="translate(${node.x} ${node.y})">
        <title>${escapeHtml(node.item.event.title)}</title>
        <rect x="-18" y="-18" width="36" height="36" rx="7" fill="#fffdf8" stroke="${node.color}" />
        <text class="sociogram-event-mark" y="5">+</text>
      </g>
    `).join("");
    const fieldBands = fields.slice(0, 3).map((field, index) => {
      const groupColor = FieldMath.getGroup(data, field.groups[0]).color;
      return `<circle class="sociogram-field-ring" cx="${center.x}" cy="${center.y}" r="${208 + index * 38}" stroke="${groupColor}" />`;
    }).join("");
    const legend = fields.slice(0, 4).map(field => `<span class="legend-row"><span class="swatch" style="background:${FieldMath.getGroup(data, field.groups[0]).color}"></span>${escapeHtml(field.name)}</span>`).join("");

    return `
      <div class="field-panel">
        <div class="field-map sociogram-map">
          <svg class="sociogram-svg" viewBox="0 0 1000 540" role="img" aria-label="Sociogram showing your relationship to groups and event opportunities">
            ${fieldBands}
            ${egoLinks}
            ${eventLinks}
            ${groupSvg}
            ${eventSvg}
            <g class="sociogram-ego" transform="translate(${center.x} ${center.y})">
              <circle r="43" />
              <text y="5">You</text>
            </g>
          </svg>
          <div class="field-legend">${legend}</div>
        </div>
      </div>
    `;
  }

  function renderRelationshipSections(edges) {
    const following = edges.filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState) && !isDormant(edge));
    const memberships = edges.filter(edge => ["member", "trusted", "core"].includes(edge.accessLevel) && !isDormant(edge));
    const commitments = edges.filter(edge => ["contributor", "facilitator", "steward"].includes(edge.relationshipState) || edge.roleModes.some(role => ["volunteers", "hosts", "organizes", "facilitates", "teaches"].includes(role)));
    const dormant = edges.filter(isDormant);

    return `
      <div class="relationship-layers">
        ${renderLayerColumn("Following", "Groups kept in view without a strong claim of belonging.", following)}
        ${renderLayerColumn("Granted membership", "Places where an explicit access or trust layer exists.", memberships)}
        ${renderLayerColumn("Committed", "Stewarding, volunteering, hosting, or other chosen service.", commitments)}
        ${renderLayerColumn("Dormant", "Communities you want to temporarily mute or hold at rest.", dormant)}
      </div>

      <div class="section-subheader">
        <div>
          <div class="eyebrow">Gradient signals</div>
          <h3>Participation frequency and shared exposure</h3>
        </div>
      </div>
      <div class="edge-strip">
        ${edges.map(renderEdgeCard).join("")}
      </div>
    `;
  }

  function renderLayerColumn(title, copy, layerEdges) {
    return `
      <article class="relationship-layer">
        <h3>${escapeHtml(title)}</h3>
        <p class="tiny">${escapeHtml(copy)}</p>
        <strong>${layerEdges.length}</strong>
        <div class="mini-card-list">
          ${layerEdges.slice(0, 3).map(edge => renderLayerMiniCard(edge)).join("") || `<div class="empty-mini">None right now</div>`}
        </div>
      </article>
    `;
  }

  function renderLayerMiniCard(edge) {
    const group = FieldMath.getGroup(data, edge.groupId);
    return `
      <button class="mini-link-card" onclick="DemoApp.openGroupView('${group.id}')">
        <span class="swatch" style="background:${group.color}"></span>
        <span>${escapeHtml(group.name)}</span>
      </button>
    `;
  }

  function renderEdgeCard(edge) {
    const group = FieldMath.getGroup(data, edge.groupId);
    const metrics = FieldMath.computePersonalGroupMetrics(data, data.currentPersonId, group.id);
    return `
      <article class="card edge-card" style="border-left-color:${group.color}">
        <div class="card-head">
          <h3>${escapeHtml(group.name)}</h3>
          <strong>${edge.computedStrength}/100</strong>
        </div>
        <div class="metric-row compact-metric"><span>Participation</span><strong>${metrics.participationScore}</strong></div>
        <div class="meter"><span style="width:${metrics.participationScore}%;background:${group.color};"></span></div>
        <div class="metric-row compact-metric"><span>Shared exposure</span><strong>${metrics.exposureScore}</strong></div>
        <div class="meter exposure-meter"><span style="width:${metrics.exposureScore}%;"></span></div>
        <div class="state-pair">
          ${chip(edge.relationshipState, "state-chip")}
          ${chip(edge.accessLevel, "access-chip")}
          ${chip(edge.visibility, "visibility-chip")}
          ${chip(edge.decayState, "field-chip")}
          ${edge.roleModes.map(item => chip(item, "role-chip")).join("")}
        </div>
        <p class="muted">${edgeCopy(edge)}</p>
        <p class="tiny">${relationshipMetricCopy(metrics)}</p>
        <div class="button-row">
          <button class="primary-button" onclick="DemoApp.openGroupView('${group.id}')">Explore how to participate</button>
          <button class="ghost-button" onclick="DemoApp.followGroup('${group.id}')">Follow group</button>
          <button class="ghost-button" onclick="DemoApp.requestMembership('${group.id}')">Request membership</button>
          <button class="ghost-button" onclick="DemoApp.becomeRecurring('${group.id}')">Become recurring</button>
          <button class="ghost-button" onclick="DemoApp.volunteer('${group.id}')">Volunteer</button>
          <button class="danger-soft" onclick="DemoApp.becomeDormant('${group.id}')">Become dormant</button>
          <button class="secondary-button" onclick="DemoApp.reactivate('${group.id}')">Reactivate</button>
        </div>
      </article>
    `;
  }

  function eventsForGroup(groupId) {
    return data.events
      .filter(event => event.linkedGroups.includes(groupId) || event.relevantGroups.includes(groupId))
      .map(event => classifyEventForParticipation(event, groupId))
      .sort((a, b) => a.sort - b.sort);
  }

  function classifyEventForParticipation(event, groupId) {
    const bridgeSignals = [
      event.access === "public",
      event.tags.includes("beginner-friendly"),
      event.tags.includes("low-threshold"),
      event.relevantGroups.length > 1
    ].filter(Boolean).length;
    const deepSignals = [
      event.linkedGroups.includes(groupId),
      event.access !== "public",
      !event.tags.includes("beginner-friendly") && !event.tags.includes("low-threshold")
    ].filter(Boolean).length;
    const mode = bridgeSignals >= deepSignals ? "Bridge" : "Deepen";
    return { event, mode, bridgeSignals, deepSignals, sort: mode === "Bridge" ? 0 : 1 };
  }

  function renderCommunityEvent(item) {
    const event = item.event;
    const venue = FieldMath.getVenue(data, event.venueId);
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(event.title)}</h3>
          ${chip(item.mode, item.mode === "Bridge" ? "access-chip" : "state-chip")}
        </div>
        <p class="muted">${escapeHtml(event.time)} at ${escapeHtml(venue.name)}. ${escapeHtml(event.audience)}.</p>
        <div class="tag-row">
          ${chip(event.access, "field-chip")}
          ${event.tags.slice(0, 4).map(tag).join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" onclick="DemoApp.attendEvent('${event.id}')">Attend event</button>
          <button class="ghost-button" onclick="DemoApp.markInterested('${event.id}')">Mark interested</button>
          <button class="secondary-button" onclick="DemoApp.suggestEventPrompt('${event.id}')">Suggest to group</button>
        </div>
      </article>
    `;
  }

  function renderEventRecommendation(item) {
    const event = item.event;
    const venue = FieldMath.getVenue(data, event.venueId);
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(event.title)}</h3>
          <strong>${item.score}</strong>
        </div>
        <p class="muted">${escapeHtml(event.time)} at ${escapeHtml(venue.name)}. ${escapeHtml(event.audience)}.</p>
        <div class="tag-row">
          ${chip(event.access, "access-chip")}
          ${event.tags.slice(0, 4).map(tag).join("")}
        </div>
        <div class="tag-row">${item.reasons.map(reason => chip(reason, "explain-chip")).join("")}</div>
        <div class="button-row">
          <button class="primary-button" onclick="DemoApp.attendEvent('${event.id}')">Attend event</button>
          <button class="ghost-button" onclick="DemoApp.markInterested('${event.id}')">Mark interested</button>
          <button class="secondary-button" onclick="DemoApp.suggestEventPrompt('${event.id}')">Suggest to group</button>
        </div>
      </article>
    `;
  }

  function renderNextSteps(edges, groupRecs, eventRecs) {
    const lightEdges = edges.filter(edge => ["curious", "observing", "occasional"].includes(edge.relationshipState));
    return `
      <div class="card">
        <strong>Deep roots</strong>
        <p class="muted">${edges.filter(edge => edge.computedStrength > 65).map(edge => FieldMath.getGroup(data, edge.groupId).name).join(", ") || "No strong commitment layer yet."}</p>
      </div>
      <div class="card">
        <strong>Light overlap</strong>
        <p class="muted">${lightEdges.map(edge => FieldMath.getGroup(data, edge.groupId).name).join(", ") || "No light edge in this persona."}</p>
      </div>
      <div class="card">
        <strong>Possible next entry</strong>
        <p class="muted">${eventRecs[0] ? escapeHtml(eventRecs[0].event.title) : "No event recommendation yet."}</p>
      </div>
      <div class="card">
        <strong>Group to learn about</strong>
        <p class="muted">${groupRecs[0] ? escapeHtml(groupRecs[0].group.name) : "Nothing new suggested."}</p>
      </div>
    `;
  }

  function renderEmergentFieldSmall(field) {
    const groups = field.groups.map(groupId => FieldMath.getGroup(data, groupId).name).join(", ");
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(field.name)}</h3>
          <strong>${Math.round(field.strength)}</strong>
        </div>
        <div class="tag-row">
          ${chip(field.generatedFrom, "field-chip")}
          ${chip(field.clarity, "state-chip")}
          ${field.tags.slice(0, 3).map(tag).join("")}
        </div>
        <p class="muted">${escapeHtml(field.description)}</p>
        <p class="tiny">Groups involved: ${escapeHtml(groups)}. People are shown as aggregate only: ${field.peopleCount} edges.</p>
        <div class="button-row">
          <button class="secondary-button" onclick="DemoApp.openFieldView('${field.id}')">Explore field</button>
          ${data.currentView === "steward" ? `<button class="secondary-button" onclick="DemoApp.noticeField('${field.id}')">Notice emerging field</button>` : ""}
        </div>
      </article>
    `;
  }

  function renderDistribution(distribution) {
    const states = ["observing", "curious", "occasional", "recurring", "contributor", "facilitator", "steward", "dormant", "alumnus"];
    const total = Math.max(1, Object.values(distribution).reduce((sum, count) => sum + count, 0));
    return `
      <div>
        ${states.map(state => {
          const count = distribution[state] || 0;
          const width = Math.round(count / total * 100);
          return `
            <div class="chart-row">
              <span>${state}</span>
              <div class="bar-track"><div class="bar-fill" style="width:${width}%;"></div></div>
              <strong>${count}</strong>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderStewardSuggestions(summary) {
    const topOverlap = summary.overlaps[0];
    const topGroup = FieldMath.getGroup(data, topOverlap.groupBId);
    const suggestions = [
      summary.dropoff.message,
      `Recurring participants often also show up around ${escapeHtml(topGroup.name)}.`,
      `Your strongest bridge is currently with ${escapeHtml(topGroup.name)}.`,
      summary.bridgingScore > summary.bondingScore ? "The group is bridge-rich right now; consider clearer entry guidance so weak ties can land." : "The group has a strong commitment layer; consider one low-threshold doorway this month.",
      summary.dormant.length ? "Several dormant or fading participants appear to be reactivating through beginner-friendly events." : "Dormant participation is low in this demo moment."
    ];
    return suggestions.map(item => `<div class="mini-note">${item}</div>`).join("");
  }

  function renderOverlapCard(overlap) {
    const other = FieldMath.getGroup(data, overlap.groupBId);
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(other.name)}</h3>
          <strong>${overlap.score}</strong>
        </div>
        <p class="muted">${overlap.explanation.join(". ")}.</p>
        <div class="tag-row">
          ${overlap.sharedTags.slice(0, 3).map(tag).join("")}
          ${overlap.sharedVenues.map(venueId => chip(FieldMath.getVenue(data, venueId).name, "field-chip")).join("")}
        </div>
      </article>
    `;
  }

  function renderStewardingControls(group, requests, suggested) {
    return `
      <div class="grid-2">
        <article class="card">
          <h3>Edit norms and entry guidance</h3>
          <textarea id="entryGuidanceInput">${escapeHtml(group.entryGuidance)}</textarea>
          <textarea id="normsInput">${escapeHtml(group.norms.join("; "))}</textarea>
          <div class="button-row">
            <button class="secondary-button" onclick="DemoApp.saveGroupGuidance()">Save guidance</button>
          </div>
        </article>
        <article class="card">
          <h3>Access rules</h3>
          <select id="groupStateInput">
            ${["public", "semi-private", "private"].map(state => `<option value="${state}" ${group.state === state ? "selected" : ""}>${state}</option>`).join("")}
          </select>
          <textarea id="accessRulesInput">${escapeHtml(group.accessRules)}</textarea>
          <div class="button-row">
            <button class="secondary-button" onclick="DemoApp.saveAccessRules()">Adjust access rules</button>
          </div>
        </article>
        <article class="card">
          <h3>Membership requests</h3>
          ${requests.length ? requests.map(request => {
            const person = FieldMath.getPerson(data, request.personId);
            return `<div class="mini-note"><strong>${escapeHtml(person.name)}</strong><br>${escapeHtml(request.note)}<div class="button-row"><button class="primary-button" onclick="DemoApp.approveMembership('${request.id}')">Approve/request membership</button></div></div>`;
          }).join("") : `<div class="empty-state">No pending requests.</div>`}
        </article>
        <article class="card">
          <h3>Suggested events queue</h3>
          ${suggested.length ? suggested.map(share => {
            const event = data.events.find(item => item.id === share.eventId);
            const person = FieldMath.getPerson(data, share.suggestedBy);
            return `<div class="mini-note"><strong>${escapeHtml(event.title)}</strong><br>Suggested by ${escapeHtml(person.name)}. ${escapeHtml(share.note)}<div class="button-row"><button class="primary-button" onclick="DemoApp.featureEvent('${share.id}')">Feature as relevant</button></div></div>`;
          }).join("") : `<div class="empty-state">No suggested events waiting.</div>`}
        </article>
        <article class="card full">
          <h3>Mark relationship to another group</h3>
          <div class="form-grid">
            <select id="relationshipTarget">
              ${data.groups.filter(item => item.id !== group.id).map(item => `<option value="${item.id}">${escapeHtml(item.name)}</option>`).join("")}
            </select>
            <select id="relationshipType">
              ${["overlapsWith", "sharesVenueWith", "sharesParticipantsWith", "sharesFacilitatorsWith", "emergedFrom", "branchOf", "collaboratesWith", "formerlyPartOf", "sisterGroupOf", "localExpressionOf"].map(item => `<option value="${item}">${item}</option>`).join("")}
            </select>
          </div>
          <div class="button-row">
            <button class="secondary-button" onclick="DemoApp.markGroupRelationship()">Mark group relationship</button>
          </div>
        </article>
      </div>
    `;
  }

  function renderCreatorForm() {
    return `
      <div class="form-grid">
        <label class="full">Title<input id="draftTitle" value="${escapeHtml(creatorDraft.title)}"></label>
        <label>Host/facilitator
          <select id="draftHost">${data.people.map(person => `<option value="${person.id}" ${creatorDraft.hostId === person.id ? "selected" : ""}>${escapeHtml(person.name)}</option>`).join("")}</select>
        </label>
        <label>Venue
          <select id="draftVenue">${data.venues.map(venue => `<option value="${venue.id}" ${creatorDraft.venueId === venue.id ? "selected" : ""}>${escapeHtml(venue.name)}</option>`).join("")}</select>
        </label>
        <label>Access level
          <select id="draftAccess">${["public", "member-only", "visible-but-member-signup-only"].map(access => `<option value="${access}" ${creatorDraft.access === access ? "selected" : ""}>${access}</option>`).join("")}</select>
        </label>
        <label>Price/access note<input id="draftPrice" value="${escapeHtml(creatorDraft.price)}"></label>
        <label class="full">Tags, comma separated<input id="draftTags" value="${escapeHtml(creatorDraft.tags.join(", "))}"></label>
        <label class="full">Intended audience<textarea id="draftAudience">${escapeHtml(creatorDraft.audience)}</textarea></label>
        <label class="check-row full"><input id="draftBeginner" type="checkbox" ${creatorDraft.beginnerFriendly ? "checked" : ""}><span>Beginner-friendly / low-threshold entry</span></label>
      </div>
      <div class="button-row">
        <button class="primary-button" onclick="DemoApp.updateCreatorDraft()">Recalculate fit</button>
      </div>
    `;
  }

  function renderCreatorHotspots(recommendations) {
    const top = recommendations.slice(0, 6);
    return `
      <div class="field-map">
        ${top.map((item, index) => {
          const x = [24, 46, 72, 33, 62, 80][index];
          const y = [38, 22, 41, 70, 72, 62][index];
          const size = 48 + item.score;
          return `<div class="field-node" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${item.group.color};">${escapeHtml(item.group.name.split(" ")[0])}</div>`;
        }).join("")}
        <div class="field-legend">
          ${top.map(item => `<span class="legend-row"><span class="swatch" style="background:${item.group.color}"></span>${escapeHtml(item.group.name)} fit ${item.score}</span>`).join("")}
        </div>
      </div>
    `;
  }

  function renderEventGroupFit(item) {
    const signal = FieldMath.computeCreatorGroupSignal(data, creatorDraft.hostId, item.group.id, creatorDraft);
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(item.group.name)}</h3>
          <strong>${item.score}</strong>
        </div>
        <p class="muted">${fitLanguage(item)}</p>
        <div class="creator-signal-grid">
          <div>
            <span class="tiny">Participant overlap</span>
            <strong>${signal.participantOverlapScore}</strong>
            <div class="meter"><span style="width:${signal.participantOverlapScore}%;background:${item.group.color};"></span></div>
          </div>
          <div>
            <span class="tiny">Community relevance</span>
            <strong>${signal.proportionalRelevance}</strong>
            <div class="meter exposure-meter"><span style="width:${signal.proportionalRelevance}%;"></span></div>
          </div>
        </div>
        <div class="tag-row">
          ${chip(signal.hasHostedOrMarkedRelevant ? "has hosted/marked before" : "no prior host mark", signal.hasHostedOrMarkedRelevant ? "access-chip" : "explain-chip")}
          ${chip(`${signal.sharedParticipantsCount}/${signal.creatorAudienceCount} shared participants`, "field-chip")}
          ${chip(`${signal.relevantCreatorEventsCount} prior relevant events`, "field-chip")}
        </div>
        <p class="tiny">${escapeHtml(creatorSignalCopy(signal))}</p>
        <div class="tag-row">${item.reasons.map(reason => chip(reason, "explain-chip")).join("")}</div>
        <div class="button-row"><button class="secondary-button" onclick="DemoApp.openGroupView('${item.group.id}')">Explore how to participate</button></div>
      </article>
    `;
  }

  function renderFieldFit(item) {
    return `
      <article class="card">
        <div class="card-head">
          <h3>${escapeHtml(item.field.name)}</h3>
          <strong>${item.score}</strong>
        </div>
        <p class="muted">Emergent field suggestion based on ${escapeHtml(item.field.generatedFrom)}. People involved are kept aggregate.</p>
        <div class="tag-row">${item.field.tags.slice(0, 4).map(tag).join("")}</div>
      </article>
    `;
  }

  function renderModelSummary(panel, value) {
    if (!Array.isArray(value)) return `<div class="mini-note">Reference object showing the readable formulas used by the mockup.</div>`;
    if (!value.length) return `<div class="empty-state">No records in this panel.</div>`;
    return `
      <div class="grid-2">
        <div class="card"><strong>${value.length}</strong><br><span class="muted">records</span></div>
        <div class="card"><strong>${Object.keys(value[0]).length}</strong><br><span class="muted">top-level fields on first record</span></div>
      </div>
    `;
  }

  function updateCreatorDraft(shouldRender = true) {
    creatorDraft = {
      title: valueOf("draftTitle") || "Untitled offering",
      hostId: valueOf("draftHost"),
      venueId: valueOf("draftVenue"),
      access: valueOf("draftAccess"),
      price: valueOf("draftPrice"),
      tags: valueOf("draftTags").split(",").map(item => item.trim()).filter(Boolean),
      audience: valueOf("draftAudience"),
      beginnerFriendly: document.getElementById("draftBeginner").checked
    };
    if (shouldRender) render();
  }

  function createEventFromDraft() {
    updateCreatorDraft(false);
    const selectedGroups = selectedShareTargets();
    const event = {
      id: `e_created_${Date.now()}`,
      title: creatorDraft.title,
      hostId: creatorDraft.hostId,
      linkedGroups: [],
      relevantGroups: selectedGroups.length ? selectedGroups : FieldMath.recommendGroupsForEvent(data, creatorDraft).slice(0, 3).map(item => item.group.id),
      venueId: creatorDraft.venueId,
      time: "Draft date",
      tags: creatorDraft.tags,
      audience: creatorDraft.audience,
      access: creatorDraft.access,
      price: creatorDraft.price,
      attendance: { interested: [], attending: [] }
    };
    data.events.push(event);
    data.createdEvents.push(event.id);
    selectedGroups.forEach(groupId => {
      data.suggestedEventShares.push({
        id: `share_${Date.now()}_${groupId}`,
        eventId: event.id,
        groupId,
        suggestedBy: creatorDraft.hostId,
        status: "pending",
        note: "Creator suggested this offering through the field discovery flow."
      });
    });
    saveData();
    render();
    openDrawer("Event Created", `
      <p><strong>${escapeHtml(event.title)}</strong> was added to the fake event list.</p>
      <div class="drawer-card">Relevant groups: ${event.relevantGroups.map(groupId => escapeHtml(FieldMath.getGroup(data, groupId).name)).join(", ")}</div>
      <div class="drawer-card">This also shifts event recommendations and steward suggestion queues.</div>
    `);
  }

  function shareDraftToSelected() {
    updateCreatorDraft(false);
    const selected = selectedShareTargets();
    selected.forEach(groupId => {
      data.suggestedEventShares.push({
        id: `share_${Date.now()}_${groupId}`,
        eventId: "draft",
        groupId,
        suggestedBy: creatorDraft.hostId,
        status: "pending",
        note: `Draft suggestion: ${creatorDraft.title}`
      });
    });
    saveData();
    openDrawer("Draft Suggested", `
      <p>The draft was suggested to ${selected.length} group(s).</p>
      <div class="drawer-card">This models a facilitator asking the field where an offering belongs before treating it as owned by a group.</div>
    `);
  }

  function followGroup(groupId) {
    mutateEdge(groupId, edge => {
      edge.relationshipState = edge.relationshipState === "observing" ? "curious" : edge.relationshipState;
      edge.accessLevel = edge.accessLevel === "public" ? "known" : edge.accessLevel;
      edge.recency = clamp(edge.recency + 12);
      edge.engagementStrength = FieldMath.computeEngagementStrength(edge);
    }, "Follow group");
  }

  function requestMembership(groupId) {
    const personId = data.currentPersonId;
    mutateEdge(groupId, edge => {
      edge.accessLevel = "requested";
      edge.visibility = "visibleToStewards";
      edge.recency = clamp(edge.recency + 16);
      edge.engagementStrength = FieldMath.computeEngagementStrength(edge);
    }, "Request membership");
    data.membershipRequests.push({
      id: `req_${Date.now()}`,
      personId,
      groupId,
      status: "pending",
      note: "Requested from participant orientation flow."
    });
    saveData();
  }

  function attendEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event.attendance.attending.includes(data.currentPersonId)) event.attendance.attending.push(data.currentPersonId);
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    const changedGroups = unique([...event.linkedGroups, ...event.relevantGroups]);
    const before = changedGroups.map(groupId => cloneEdge(ensureEdge(data.currentPersonId, groupId)));
    changedGroups.forEach(groupId => {
      const edge = ensureEdge(data.currentPersonId, groupId);
      if (["observing", "curious"].includes(edge.relationshipState)) edge.relationshipState = "occasional";
      edge.recency = clamp(edge.recency + 28);
      edge.frequency = clamp(edge.frequency + 14);
      edge.roleModes = unique([...edge.roleModes, "attends"]);
      edge.decayState = "active";
      edge.engagementStrength = FieldMath.computeEngagementStrength(edge);
    });
    saveData();
    render();
    showChange("Attend event", before, changedGroups);
  }

  function markInterested(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    const changedGroups = event.relevantGroups.slice(0, 2);
    const before = changedGroups.map(groupId => cloneEdge(ensureEdge(data.currentPersonId, groupId)));
    changedGroups.forEach(groupId => {
      const edge = ensureEdge(data.currentPersonId, groupId);
      if (edge.relationshipState === "observing") edge.relationshipState = "curious";
      edge.recency = clamp(edge.recency + 10);
      edge.engagementStrength = FieldMath.computeEngagementStrength(edge);
    });
    saveData();
    render();
    showChange("Mark interested", before, changedGroups);
  }

  function suggestEventPrompt(eventId) {
    const event = data.events.find(item => item.id === eventId);
    const personEdges = FieldMath.getEdgesForPerson(data, data.currentPersonId);
    const groupId = personEdges[0]?.groupId || event.relevantGroups[0];
    data.suggestedEventShares.push({
      id: `share_${Date.now()}`,
      eventId,
      groupId,
      suggestedBy: data.currentPersonId,
      status: "pending",
      note: "Participant marked this as relevant to a group they relate to."
    });
    mutateEdge(groupId, edge => {
      edge.roleModes = unique([...edge.roleModes, "suggests"]);
      edge.contributionLevel = clamp(edge.contributionLevel + 8);
    }, "Suggest event to group");
  }

  function becomeRecurring(groupId) {
    mutateEdge(groupId, edge => {
      edge.relationshipState = "recurring";
      edge.accessLevel = ["public", "known", "requested"].includes(edge.accessLevel) ? "member" : edge.accessLevel;
      edge.frequency = clamp(edge.frequency + 30);
      edge.recency = clamp(edge.recency + 20);
      edge.socialEmbeddedness = edge.socialEmbeddedness === "none" ? "light" : "moderate";
      edge.normFamiliarity = edge.normFamiliarity === "new" ? "familiar" : edge.normFamiliarity;
      edge.decayState = "active";
    }, "Become recurring participant");
  }

  function volunteer(groupId) {
    mutateEdge(groupId, edge => {
      edge.relationshipState = ["steward", "facilitator"].includes(edge.relationshipState) ? edge.relationshipState : "contributor";
      edge.roleModes = unique([...edge.roleModes, "volunteers"]);
      edge.contributionLevel = clamp(edge.contributionLevel + 28);
      edge.trustLevel = clamp(edge.trustLevel + 14);
      edge.visibility = "visibleToMembers";
    }, "Volunteer");
  }

  function becomeDormant(groupId) {
    mutateEdge(groupId, edge => {
      edge.relationshipState = "dormant";
      edge.decayState = "dormant";
      edge.recency = clamp(edge.recency - 55);
      edge.frequency = clamp(edge.frequency - 35);
    }, "Become dormant");
  }

  function reactivate(groupId) {
    mutateEdge(groupId, edge => {
      edge.relationshipState = edge.relationshipState === "dormant" ? "curious" : edge.relationshipState;
      edge.decayState = "reactivating";
      edge.recency = clamp(edge.recency + 30);
      edge.frequency = clamp(edge.frequency + 8);
    }, "Reactivate edge");
  }

  function saveGroupGuidance() {
    const group = FieldMath.getGroup(data, data.stewardGroupId);
    const before = { entryGuidance: group.entryGuidance, norms: group.norms.slice() };
    group.entryGuidance = valueOf("entryGuidanceInput");
    group.norms = valueOf("normsInput").split(";").map(item => item.trim()).filter(Boolean);
    saveData();
    render();
    openDrawer("Guidance Updated", `
      <p>Entry guidance and norms were changed for <strong>${escapeHtml(group.name)}</strong>.</p>
      <div class="drawer-card"><strong>Before:</strong> ${escapeHtml(before.entryGuidance)}</div>
      <div class="drawer-card"><strong>After:</strong> ${escapeHtml(group.entryGuidance)}</div>
    `);
  }

  function saveAccessRules() {
    const group = FieldMath.getGroup(data, data.stewardGroupId);
    const before = { state: group.state, accessRules: group.accessRules };
    group.state = valueOf("groupStateInput");
    group.accessRules = valueOf("accessRulesInput");
    saveData();
    render();
    openDrawer("Access Rules Updated", `
      <p>Formal access changed from <strong>${escapeHtml(before.state)}</strong> to <strong>${escapeHtml(group.state)}</strong>.</p>
      <div class="drawer-card">The living participation field remains separate from this formal setting.</div>
    `);
  }

  function approveMembership(requestId) {
    const request = data.membershipRequests.find(item => item.id === requestId);
    if (!request) return;
    request.status = "approved";
    const previousPerson = data.currentPersonId;
    data.currentPersonId = request.personId;
    mutateEdge(request.groupId, edge => {
      edge.accessLevel = "member";
      edge.relationshipState = edge.relationshipState === "observing" ? "curious" : edge.relationshipState;
      edge.visibility = "visibleToMembers";
      edge.trustLevel = clamp(edge.trustLevel + 10);
    }, "Approve membership request");
    data.currentPersonId = previousPerson;
    saveData();
    renderPersonaSelect();
    render();
  }

  function featureEvent(shareId) {
    const share = data.suggestedEventShares.find(item => item.id === shareId);
    if (!share) return;
    share.status = "featured";
    data.featuredEvents.push(share.eventId);
    saveData();
    render();
    const event = data.events.find(item => item.id === share.eventId);
    openDrawer("Event Featured", `
      <p><strong>${event ? escapeHtml(event.title) : "Draft event"}</strong> is now featured as relevant to this group.</p>
      <div class="drawer-card">This is a formal steward overlay on top of participant-suggested relevance.</div>
    `);
  }

  function markGroupRelationship() {
    const target = valueOf("relationshipTarget");
    const type = valueOf("relationshipType");
    data.groupRelationships.push({
      fromGroupId: data.stewardGroupId,
      toGroupId: target,
      type,
      note: "Marked manually by a steward in the mockup."
    });
    saveData();
    render();
    openDrawer("Group Relationship Marked", `
      <p>${escapeHtml(FieldMath.getGroup(data, data.stewardGroupId).name)} now has a formal relationship <strong>${escapeHtml(type)}</strong> ${escapeHtml(FieldMath.getGroup(data, target).name)}.</p>
      <div class="drawer-card">This formal mark overlays computed overlap. It does not replace it.</div>
    `);
  }

  function noticeField(fieldId) {
    const field = FieldMath.generateEmergentFields(data).find(item => item.id === fieldId);
    if (!field) return;
    data.groupRelationships.push({
      fromGroupId: data.stewardGroupId,
      toGroupId: field.groups.find(groupId => groupId !== data.stewardGroupId) || field.groups[0],
      type: "emergedFrom",
      note: `Steward noticed the emergent field "${field.name}" as relevant context.`
    });
    saveData();
    render();
    openDrawer("Emerging Field Noticed", `
      <p><strong>${escapeHtml(field.name)}</strong> has been acknowledged by the steward.</p>
      <div class="drawer-card">This turns a computed overlap signal into a light formal note. It still does not create a member-owned group.</div>
    `);
  }

  function setStewardGroup(groupId) {
    data.stewardGroupId = groupId;
    saveData();
    render();
  }

  function setModelPanel(panel) {
    modelPanel = panel;
    render();
  }

  function openGroupView(groupId) {
    data.currentView = "community";
    data.focus = { type: "group", id: groupId };
    saveData();
    render();
  }

  function openFieldView(fieldId) {
    data.currentView = "community";
    data.focus = { type: "field", id: fieldId };
    saveData();
    render();
  }

  function backToParticipant() {
    data.currentView = "participant";
    saveData();
    render();
  }

  function mutateEdge(groupId, mutator, actionName) {
    const edge = ensureEdge(data.currentPersonId, groupId);
    const before = cloneEdge(edge);
    mutator(edge);
    edge.engagementStrength = FieldMath.computeEngagementStrength(edge);
    saveData();
    render();
    showChange(actionName, [before], [groupId]);
  }

  function ensureEdge(personId, groupId) {
    let edge = data.participationEdges.find(item => item.personId === personId && item.groupId === groupId);
    if (!edge) {
      edge = {
        personId,
        groupId,
        relationshipState: "observing",
        accessLevel: "public",
        engagementStrength: 0,
        recency: 0,
        frequency: 0,
        contributionLevel: 0,
        trustLevel: 0,
        roleModes: [],
        socialEmbeddedness: "none",
        normFamiliarity: "new",
        identitySalience: "low",
        visibility: "privateToUser",
        decayState: "active"
      };
      data.participationEdges.push(edge);
    }
    return edge;
  }

  function showChange(actionName, beforeEdges, groupIds) {
    const person = FieldMath.getPerson(data, beforeEdges[0].personId);
    const afterEdges = groupIds.map(groupId => cloneEdge(ensureEdge(beforeEdges[0].personId, groupId)));
    const changes = afterEdges.map(after => {
      const before = beforeEdges.find(item => item.groupId === after.groupId) || {};
      const group = FieldMath.getGroup(data, after.groupId);
      return `
        <div class="drawer-card">
          <h3>${escapeHtml(group.name)}</h3>
          <p><strong>State:</strong> ${escapeHtml(before.relationshipState || "none")} -> ${escapeHtml(after.relationshipState)}</p>
          <p><strong>Access:</strong> ${escapeHtml(before.accessLevel || "none")} -> ${escapeHtml(after.accessLevel)}</p>
          <p><strong>Strength:</strong> ${before.engagementStrength ?? FieldMath.computeEngagementStrength(before)} -> ${FieldMath.computeEngagementStrength(after)}</p>
          <p><strong>Visibility:</strong> ${escapeHtml(before.visibility || "none")} -> ${escapeHtml(after.visibility)}</p>
        </div>
      `;
    }).join("");

    const groupId = afterEdges[0].groupId;
    const summary = FieldMath.summarizeGroup(data, groupId);
    const eventRecs = FieldMath.recommendEventsForParticipant(data, person.id).slice(0, 2);
    openDrawer(actionName, `
      <p>${escapeHtml(person.name)} changed a participation edge. The demo recalculated participant orientation, steward aggregate signals, and recommendations.</p>
      ${changes}
      <div class="drawer-card">
        <strong>Steward aggregate changed</strong>
        <p>${escapeHtml(summary.group.name)} now has bonding ${summary.bondingScore}, bridging ${summary.bridgingScore}, and newcomer dropoff signal ${summary.dropoff.rate}.</p>
      </div>
      <div class="drawer-card">
        <strong>Recommendation shift</strong>
        <p>Now surfaced: ${eventRecs.map(item => escapeHtml(item.event.title)).join(", ")}</p>
      </div>
    `);
  }

  function openDrawer(title, content) {
    document.getElementById("changeContent").innerHTML = `<h2>${escapeHtml(title)}</h2>${content}`;
    document.getElementById("changeDrawer").classList.add("open");
  }

  function closeDrawer() {
    document.getElementById("changeDrawer").classList.remove("open");
  }

  function selectedShareTargets() {
    return Array.from(document.querySelectorAll(".share-target:checked")).map(input => input.value);
  }

  function defaultDraft() {
    return {
      title: "Embodied Boundaries for Relational Spaces",
      hostId: "p_samir",
      venueId: "v_attune",
      access: "public",
      price: "Sliding scale",
      tags: ["somatics", "boundaries", "presence", "beginner-friendly"],
      audience: "people curious about body-based consent, relational practice, and gentle group learning",
      beginnerFriendly: true
    };
  }

  function metricCard(label, value, copy) {
    return `
      <article class="card">
        <div class="card-head"><h3>${escapeHtml(label)}</h3><strong>${Math.round(value)}</strong></div>
        <div class="meter"><span style="width:${clamp(value)}%;"></span></div>
        <p class="muted">${escapeHtml(copy)}</p>
      </article>
    `;
  }

  function principle(title, copy) {
    return `<div class="principle"><strong>${escapeHtml(title)}</strong><span class="muted">${escapeHtml(copy)}</span></div>`;
  }

  function tag(text) {
    return chip(text, "tag");
  }

  function chip(text, className) {
    return `<span class="${className}">${escapeHtml(String(text))}</span>`;
  }

  function shortGroupLabel(name) {
    const clean = name.replaceAll("/", " ").split(" ").filter(Boolean);
    if (clean.length === 1) return clean[0].slice(0, 9);
    return clean.slice(0, 2).map(word => word[0]).join("").toUpperCase();
  }

  function edgeCopy(edge) {
    const parts = [];
    if (edge.relationshipState === "observing" || edge.relationshipState === "curious") parts.push("You have light overlap here.");
    if (edge.relationshipState === "recurring" || edge.relationshipState === "contributor" || edge.relationshipState === "steward") parts.push("This is a stronger commitment layer.");
    if (edge.accessLevel === "requested") parts.push("Access is requested, but that is not the same as belonging.");
    if (edge.visibility === "privateToUser") parts.push("This signal is private to you in the demo.");
    if (edge.decayState === "reactivating") parts.push("This edge is reactivating.");
    return parts.join(" ") || "This edge holds a specific relationship to the group, not a member/non-member truth.";
  }

  function relationshipMetricCopy(metrics) {
    const overlap = metrics.strongestOverlap ? `Strongest adjacent overlap: ${FieldMath.getGroup(data, metrics.strongestOverlap.groupBId).name} (${metrics.strongestOverlap.score}).` : "No adjacent group overlap yet.";
    const tagText = metrics.sharedEventTags.length ? `${metrics.sharedEventTags.length} shared event tags` : "low event-tag overlap";
    return `${overlap} ${metrics.sharedCommunities} community overlaps and ${tagText} shape the exposure score.`;
  }

  function creatorSignalCopy(signal) {
    const history = signal.hasHostedOrMarkedRelevant ? "There is already a formal relevance mark or hosted history." : "This would be a newer community relationship for the creator.";
    const tags = signal.tagOverlap.length ? `Tag overlap: ${signal.tagOverlap.slice(0, 4).join(", ")}.` : "Tag overlap is light.";
    return `${history} ${tags}`;
  }

  function isDormant(edge) {
    return edge.relationshipState === "dormant" || edge.decayState === "dormant" || edge.decayState === "fading";
  }

  function fitLanguage(item) {
    if (item.score > 66) return `Strong fit with ${item.group.name}: tag overlap plus existing participation history.`;
    if (item.score > 42) return `Adjacent to ${item.group.name}: shared patterns make it worth suggesting gently.`;
    return `Potential bridge to ${item.group.name}: low direct overlap, but some thematic fit.`;
  }

  function buildComputedRelationships() {
    const computed = [];
    data.groups.forEach((group, index) => {
      data.groups.slice(index + 1).forEach(other => {
        const overlap = FieldMath.computeGroupOverlap(data, group.id, other.id);
        if (overlap.score > 22) computed.push(overlap);
      });
    });
    return computed.sort((a, b) => b.score - a.score);
  }

  function formulaReference() {
    return {
      computeEngagementStrength: "clamp((recency*.22 + frequency*.24 + contribution*.16 + trust*.12 + stateWeight + accessWeight + embeddednessWeight + normWeight + decayWeight + roleModes*4) / 2.3)",
      computeBondingScore: "strongEdgeRatio*38 + averageTrust*.28 + normCarrierRatio*18 + embeddedRatio*16",
      computeBridgingScore: "bridgePeople*11 + formalRelationships*8 + multiRelevantEvents*5",
      computeGroupOverlap: "sharedPeople/minGroupSize*48 + sharedTags*7 + sharedVenues*10",
      generateEmergentFields: "tag fields + venue fields + custom overlap/rhythm fields, sorted by strength",
      recommendGroupsForParticipant: "tagMatch*14 + availableEvents*4 + overlapSignal*.18 + publicEntryBonus",
      recommendEventsForParticipant: "linkedGroupSignal*24 + tagSignal*12 + lowThresholdBonus",
      recommendGroupsForEvent: "tagOverlap*18 + venueFit*16 + facilitatorEdge*.22 + adjacentEvents*6 + beginnerFitBonus",
      detectDormantParticipants: "edges where relationshipState is dormant or decayState is fading/dormant/reactivating",
      detectNewcomerDropoff: "(observing+curious+occasional+fading)/allEdges",
      detectBridgePeople: "people with engagement above light threshold in two or more groups"
    };
  }

  function labelFor(key) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, char => char.toUpperCase());
  }

  function valueOf(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
  }

  function cloneEdge(edge) {
    return JSON.parse(JSON.stringify(edge));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function unique(items) {
    return Array.from(new Set(items));
  }

  function uniqueById(items) {
    const seen = new Set();
    return items.filter(item => {
      if (!item || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  return {
    init,
    resetData,
    setStewardGroup,
    setModelPanel,
    openGroupView,
    openFieldView,
    backToParticipant,
    updateCreatorDraft,
    createEventFromDraft,
    shareDraftToSelected,
    followGroup,
    requestMembership,
    attendEvent,
    markInterested,
    suggestEventPrompt,
    becomeRecurring,
    volunteer,
    becomeDormant,
    reactivate,
    saveGroupGuidance,
    saveAccessRules,
    approveMembership,
    featureEvent,
    markGroupRelationship,
    noticeField
  };
})();

document.addEventListener("DOMContentLoaded", DemoApp.init);

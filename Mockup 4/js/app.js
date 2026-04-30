const ParticipationMockup4 = (() => {
  const STORAGE_KEY = "field_mockup_4_state";

  let data = loadData();
  let draft = {
    title: "Consentful Movement and Tea Landing",
    hostId: "p_casey",
    venueId: "v_dome",
    access: "public",
    price: "Sliding scale",
    audience: "curious movers and people who want a low-pressure social landing",
    tagsText: "movement, consent, beginner-friendly, tea",
    beginnerFriendly: true
  };

  const productViews = ["participant", "community", "creator", "steward"];

  const flows = {
    participant: [
      ["Flow 1", "Orient to what is live", "Events are layered by commitment, access, followed edges, and expansion relevance."],
      ["Flow 2", "Read group relationships", "Belonging is split into following, access, contribution, dormant, and gradient signals."],
      ["Flow 5", "Suggest relevance", "A participant can propose that an event belongs in a group's steward queue."]
    ],
    community: [
      ["Flow 3", "Explore a community", "A managed community page shows self-description, entry guidance, relationship state, and ways in."],
      ["Flow 4", "Explore a generated field", "A field page explains computed evidence without pretending to speak as a community."]
    ],
    creator: [
      ["Flow 6", "Draft an offering", "The fit panel recalculates as the creator edits tags, venue, access, and host."]
    ],
    steward: [
      ["Flow 7", "Review community health", "Aggregate participation patterns come first, not a member roster."],
      ["Flow 8", "Act on structure", "Stewards can adjust guidance, handle requests, feature suggestions, and mark relationships."]
    ],
    model: [
      ["Flow 9", "Inspect the model", "A development aid for objects, computed outputs, and formulas."]
    ]
  };

  const formulaRows = [
    ["Engagement strength", "recency, frequency, contribution, trust, state, access, embeddedness, norms, decay, role modes"],
    ["Bonding score", "strong edge ratio, trust average, norm carriers, embeddedness"],
    ["Bridging score", "bridge people, formal relationships, cross-community event relevance"],
    ["Group overlap", "shared active people, shared tags, shared venues"],
    ["Generated fields", "repeated tags, venue clusters, rhythm or overlap patterns"],
    ["Participant recommendations", "current edges, group relevance, tags, low-threshold access"],
    ["Creator recommendations", "draft tags, venue fit, host edge, prior relevance, beginner fit"],
    ["Dormant detection", "dormant, fading, and reactivating edge states"],
    ["Newcomer dropoff", "light/newcomer edges plus fading edges compared with recurring edges"],
    ["Bridge people", "people with multiple active participation edges above light engagement"]
  ];

  function loadData() {
    const fresh = window.createInitialDemoData();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...fresh, currentView: "participant", currentModelTab: "people" };
    try {
      const parsed = JSON.parse(stored);
      return {
        ...fresh,
        ...parsed,
        people: fresh.people,
        groups: fresh.groups,
        venues: fresh.venues,
        events: parsed.events || fresh.events,
        festivals: fresh.festivals || parsed.festivals || [],
        forumThreads: fresh.forumThreads || parsed.forumThreads || [],
        participationEdges: parsed.participationEdges || fresh.participationEdges,
        groupRelationships: parsed.groupRelationships || fresh.groupRelationships,
        membershipRequests: parsed.membershipRequests || fresh.membershipRequests,
        suggestedEventShares: parsed.suggestedEventShares || fresh.suggestedEventShares,
        createdEvents: parsed.createdEvents || fresh.createdEvents || [],
        featuredEvents: parsed.featuredEvents || fresh.featuredEvents || [],
        currentView: parsed.currentView || "participant",
        currentModelTab: parsed.currentModelTab || "people",
        focus: parsed.focus || fresh.focus
      };
    } catch {
      return { ...fresh, currentView: "participant", currentModelTab: "people" };
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function init() {
    const query = new URLSearchParams(window.location.search);
    const requestedView = query.get("view");
    if ([...productViews, "model"].includes(requestedView)) data.currentView = requestedView;
    const requestedModelTab = query.get("model");
    if (requestedModelTab) data.currentModelTab = requestedModelTab;

    if (!data.focus) data.focus = { type: "group", id: "ci" };
    if (!data.currentView) data.currentView = "participant";

    document.querySelectorAll(".nav-button").forEach(button => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });
    document.getElementById("devButton").addEventListener("click", () => setView("model"));
    document.getElementById("resetButton").addEventListener("click", reset);
    document.getElementById("closeDrawer").addEventListener("click", closeDrawer);

    renderPersonaSelect();
    render();
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    data = { ...window.createInitialDemoData(), currentView: "participant", currentModelTab: "people" };
    renderPersonaSelect();
    render();
    openDrawer("Reset complete", "<p>Mockup 4 has returned to the seeded demo state.</p>");
  }

  function setView(view) {
    data.currentView = view;
    saveData();
    closeDrawer();
    render();
  }

  function renderPersonaSelect() {
    const select = document.getElementById("personaSelect");
    select.innerHTML = data.personas.map(personId => {
      const person = FieldMath.getPerson(data, personId);
      return `<option value="${person.id}">${escapeHtml(person.name)}</option>`;
    }).join("");
    select.value = data.currentPersonId;
    select.onchange = event => {
      data.currentPersonId = event.target.value;
      saveData();
      render();
    };
  }

  function render() {
    document.querySelectorAll(".nav-button").forEach(button => {
      button.classList.toggle("active", button.dataset.view === data.currentView);
    });
    document.getElementById("devButton").classList.toggle("active", data.currentView === "model");
    document.getElementById("personaSelect").value = data.currentPersonId;

    const app = document.getElementById("app");
    if (data.currentView === "community") app.innerHTML = renderCommunityAndFieldView();
    else if (data.currentView === "creator") app.innerHTML = renderCreatorView();
    else if (data.currentView === "steward") app.innerHTML = renderStewardView();
    else if (data.currentView === "model") app.innerHTML = renderModelExplorer();
    else app.innerHTML = renderParticipantView();
  }

  function renderParticipantView() {
    const person = FieldMath.getPerson(data, data.currentPersonId);
    const edges = personEdges(person.id);
    const grouped = groupEdgesForParticipant(edges);
    const eventLayers = buildParticipantEventLayers(person.id, edges);
    const nextSteps = buildNextSteps(person.id, edges);
    const fields = FieldMath.generateEmergentFields(data).slice(0, 4);

    return `
      <section class="workspace participant-workspace">
        ${renderFlowRail("participant")}
        <div class="view-body">
          ${renderViewHero(
            "Participant orientation",
            `Help ${firstName(person)} understand where participation is already strong, where it is light, and what would be an appropriate next step.`,
            [
              ["active edges", edges.filter(edge => !isDormant(edge)).length],
              ["dormant edges", grouped.dormant.length],
              ["event layers", eventLayers.filter(layer => layer.events.length).length]
            ],
            "participant"
          )}

          <section class="orientation-grid">
            <div class="panel wide-panel">
              <div class="panel-head">
                <div>
                  <span class="kicker">My Orientation</span>
                  <h2>Upcoming events by degree of relevance</h2>
                </div>
                <span class="person-pill">${escapeHtml(person.name)}</span>
              </div>
              <div class="layer-list">
                ${eventLayers.map(layer => renderEventLayer(layer, person.id)).join("")}
              </div>
            </div>

            <aside class="panel profile-panel">
              <span class="kicker">Participation edge model</span>
              <h2>${escapeHtml(firstName(person))}'s edge summary</h2>
              <p>${escapeHtml(person.lifeContext)}</p>
              <div class="edge-legend">
                ${renderEdgeDimension("Access", "separate from attendance", grouped.access.length)}
                ${renderEdgeDimension("Commitment", "roles and contribution", grouped.committed.length)}
                ${renderEdgeDimension("Visibility", "private, stewards, members, public", countVisibilityModes(edges))}
                ${renderEdgeDimension("Dormancy", "muted or fading ties", grouped.dormant.length)}
              </div>
            </aside>
          </section>

          <section class="relationship-board">
            <div class="section-title">
              <span class="kicker">My relationships to groups</span>
              <h2>Belonging is not compressed into membership.</h2>
            </div>
            <div class="relationship-columns">
              ${renderRelationshipColumn("Following or observing", grouped.following)}
              ${renderRelationshipColumn("Member or access", grouped.access)}
              ${renderRelationshipColumn("Committed contribution", grouped.committed)}
              ${renderRelationshipColumn("Dormant or muted", grouped.dormant)}
            </div>
          </section>

          <section class="split-band">
            <div class="panel">
              <span class="kicker">Possible next steps</span>
              <h2>Move at a matching depth</h2>
              <div class="step-list">${nextSteps.map(renderNextStep).join("")}</div>
            </div>
            <div class="panel">
              <span class="kicker">Generated fields around me</span>
              <h2>Useful patterns, not managed communities</h2>
              <div class="field-card-list">${fields.map(renderGeneratedFieldMini).join("")}</div>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderCommunityAndFieldView() {
    const selectedGroup = FieldMath.getGroup(data, data.focus?.type === "group" ? data.focus.id : "ci") || data.groups[0];
    const fields = FieldMath.generateEmergentFields(data);
    const selectedField = fields.find(field => data.focus?.type === "field" && field.id === data.focus.id) || fields[0];
    const person = FieldMath.getPerson(data, data.currentPersonId);

    return `
      <section class="workspace community-workspace">
        ${renderFlowRail("community")}
        <div class="view-body">
          ${renderViewHero(
            "Communities and generated fields",
            "Managed community pages and computed field pages are placed side by side so the distinction is always visible.",
            [
              ["communities", data.groups.length],
              ["generated fields", fields.length],
              ["selected persona", firstName(person)]
            ],
            "community"
          )}

          <section class="dual-explorer">
            <article class="community-pane">
              <div class="pane-toolbar">
                <div>
                  <span class="kicker">Community page</span>
                  <h2>Represented by stewards</h2>
                </div>
                <select onchange="ParticipationMockup4.focusGroup(this.value)">
                  ${data.groups.map(group => `<option value="${group.id}" ${group.id === selectedGroup.id ? "selected" : ""}>${escapeHtml(group.name)}</option>`).join("")}
                </select>
              </div>
              ${renderCommunityPage(selectedGroup, person.id)}
            </article>

            <article class="field-pane">
              <div class="pane-toolbar">
                <div>
                  <span class="kicker">Generated field page</span>
                  <h2>Computed from evidence</h2>
                </div>
                <select onchange="ParticipationMockup4.focusField(this.value)">
                  ${fields.map(field => `<option value="${field.id}" ${field.id === selectedField.id ? "selected" : ""}>${escapeHtml(field.name)}</option>`).join("")}
                </select>
              </div>
              ${renderGeneratedFieldPage(selectedField)}
            </article>
          </section>
        </div>
      </section>
    `;
  }

  function renderCreatorView() {
    const draftEvent = getDraftEvent();
    const groupFits = FieldMath.recommendGroupsForEvent(data, draftEvent);
    const fields = FieldMath.generateEmergentFields(data)
      .map(field => ({
        field,
        score: Math.round(Math.min(100, field.tags.filter(tag => draftEvent.tags.includes(tag)).length * 22 + field.groups.filter(groupId => groupFits.slice(0, 3).some(item => item.group.id === groupId)).length * 12 + (draftEvent.beginnerFriendly ? 8 : 0)))
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
    const host = FieldMath.getPerson(data, draft.hostId);

    return `
      <section class="workspace creator-workspace">
        ${renderFlowRail("creator")}
        <div class="view-body">
          ${renderViewHero(
            "Creator guided field discovery",
            "Drafting an offering recalculates fit without turning communities into marketing segments.",
            [
              ["group fits", groupFits.length],
              ["field fits", fields.length],
              ["host", firstName(host)]
            ],
            "creator"
          )}

          <section class="creator-grid">
            <form class="panel draft-panel" oninput="ParticipationMockup4.captureDraft(this)" onchange="ParticipationMockup4.captureDraft(this)">
              <span class="kicker">Draft offering flow</span>
              <h2>Offering details</h2>
              ${inputField("Title", "title", draft.title)}
              <label class="form-field">
                <span>Host or facilitator</span>
                <select name="hostId">
                  ${data.people.filter(person => person.tags.includes("facilitator") || person.tags.includes("hosting") || person.tags.includes("steward")).map(person => `<option value="${person.id}" ${person.id === draft.hostId ? "selected" : ""}>${escapeHtml(person.name)}</option>`).join("")}
                </select>
              </label>
              <label class="form-field">
                <span>Venue</span>
                <select name="venueId">
                  ${data.venues.map(venue => `<option value="${venue.id}" ${venue.id === draft.venueId ? "selected" : ""}>${escapeHtml(venue.name)}</option>`).join("")}
                </select>
              </label>
              <label class="form-field">
                <span>Access level</span>
                <select name="access">
                  ${["public", "visible-but-member-signup-only", "requested", "member"].map(access => `<option value="${access}" ${access === draft.access ? "selected" : ""}>${escapeHtml(access)}</option>`).join("")}
                </select>
              </label>
              ${inputField("Price or access note", "price", draft.price)}
              ${inputField("Intended audience", "audience", draft.audience)}
              ${inputField("Tags", "tagsText", draft.tagsText)}
              <label class="check-field">
                <input type="checkbox" name="beginnerFriendly" ${draft.beginnerFriendly ? "checked" : ""} />
                <span>Beginner-friendly or low-threshold entry</span>
              </label>
              <div class="form-actions">
                <button type="button" onclick="ParticipationMockup4.createEvent()">Create event</button>
                <button type="button" class="secondary-action" onclick="ParticipationMockup4.suggestDraftToTopGroups()">Suggest to top groups</button>
              </div>
            </form>

            <div class="creator-results">
              <section class="panel">
                <span class="kicker">Suggested groups</span>
                <h2>Fit reasons stay visible</h2>
                <div class="fit-list">${groupFits.map(item => renderCreatorGroupFit(item, draftEvent)).join("")}</div>
              </section>
              <section class="panel">
                <span class="kicker">Suggested generated fields</span>
                <h2>Broader patterns for the offering</h2>
                <div class="field-card-list">${fields.map(item => renderCreatorFieldFit(item)).join("")}</div>
              </section>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderStewardView() {
    const group = FieldMath.getGroup(data, data.stewardGroupId) || data.groups[0];
    const summary = FieldMath.summarizeGroup(data, group.id);
    const fields = FieldMath.generateEmergentFields(data).filter(field => field.groups.includes(group.id));
    const suggestions = data.suggestedEventShares.filter(share => share.groupId === group.id);
    const requests = data.membershipRequests.filter(request => request.groupId === group.id);

    return `
      <section class="workspace steward-workspace">
        ${renderFlowRail("steward")}
        <div class="view-body">
          ${renderViewHero(
            "Steward aggregate field view",
            "Community health, adjacent fields, and governance controls are shown without making individual monitoring the center.",
            [
              ["bonding", summary.bondingScore],
              ["bridging", summary.bridgingScore],
              ["dropoff", `${summary.dropoff.rate}%`]
            ],
            "steward"
          )}

          <section class="steward-toolbar panel">
            <div>
              <span class="kicker">Selected stewarded group</span>
              <h2>${escapeHtml(group.name)}</h2>
            </div>
            <select onchange="ParticipationMockup4.setStewardGroup(this.value)">
              ${data.groups.map(item => `<option value="${item.id}" ${item.id === group.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
            </select>
          </section>

          <section class="steward-grid">
            <div class="panel health-panel">
              <span class="kicker">Community health</span>
              <h2>Aggregate participation signals</h2>
              <div class="metric-grid">
                ${renderMetricCard("Bonding capacity", summary.bondingScore, "Strong internal ties, trust, and norm carriers")}
                ${renderMetricCard("Bridging capacity", summary.bridgingScore, "People and events connecting this group outward")}
                ${renderMetricCard("Newcomer dropoff", `${summary.dropoff.rate}%`, summary.dropoff.message)}
                ${renderMetricCard("Dormant or reactivating", summary.dormant.length, "Shown as a pattern to respond to, not a target list")}
              </div>
              <div class="distribution">
                <span class="kicker">Participation distribution</span>
                ${renderDistribution(summary.distribution)}
              </div>
            </div>

            <aside class="panel">
              <span class="kicker">Aggregate suggestions</span>
              <h2>Field hints</h2>
              ${renderStewardHints(group, summary, fields)}
            </aside>
          </section>

          <section class="split-band">
            <div class="panel">
              <span class="kicker">Formal structure controls</span>
              <h2>Governance actions</h2>
              ${renderStructureControls(group)}
            </div>
            <div class="panel">
              <span class="kicker">Queues</span>
              <h2>Requests and suggested relevance</h2>
              ${renderMembershipRequests(requests)}
              ${renderSuggestedShares(suggestions)}
            </div>
          </section>

          <section class="split-band">
            <div class="panel">
              <span class="kicker">Adjacent groups</span>
              <h2>Computed overlap above light signal</h2>
              <div class="overlap-list">${summary.overlaps.map(renderOverlapRow).join("")}</div>
            </div>
            <div class="panel">
              <span class="kicker">Generated fields involving this group</span>
              <h2>Emerging patterns to notice</h2>
              <div class="field-card-list">${fields.map(renderGeneratedFieldMini).join("") || emptyState("No generated fields include this group yet.")}</div>
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderModelExplorer() {
    const tabs = ["people", "groups", "edges", "events", "venues", "relationships", "fields", "relevance", "formulas"];
    const active = data.currentModelTab || "people";
    return `
      <section class="workspace model-workspace">
        ${renderFlowRail("model")}
        <div class="view-body">
          ${renderViewHero(
            "Data model explorer",
            "This partition is a development aid for inspecting assumptions. It is not part of the intended participant, creator, or steward product.",
            [
              ["objects", tabs.length],
              ["edges", data.participationEdges.length],
              ["formulas", formulaRows.length]
            ],
            "model"
          )}
          <section class="model-shell panel">
            <nav class="model-tabs" aria-label="Model explorer objects">
              ${tabs.map(tab => `<button class="${active === tab ? "active" : ""}" onclick="ParticipationMockup4.setModelTab('${tab}')">${escapeHtml(tab)}</button>`).join("")}
            </nav>
            <div class="model-content">
              ${renderModelTab(active)}
            </div>
          </section>
        </div>
      </section>
    `;
  }

  function renderFlowRail(view) {
    return `
      <aside class="flow-rail">
        <span class="rail-label">${view === "model" ? "Development" : "User flows"}</span>
        ${flows[view].map(([label, title, copy]) => `
          <article class="flow-card">
            <strong>${escapeHtml(label)}</strong>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(copy)}</p>
          </article>
        `).join("")}
        ${view !== "model" ? `
          <button class="rail-dev-link" onclick="ParticipationMockup4.setView('model')">
            Open dev-only model explorer
          </button>
        ` : `
          <button class="rail-dev-link" onclick="ParticipationMockup4.setView('participant')">
            Return to product mockup
          </button>
        `}
      </aside>
    `;
  }

  function renderViewHero(title, copy, metrics, tone) {
    return `
      <header class="view-hero ${tone}-hero">
        <div>
          <span class="kicker">${escapeHtml(title.split(" ")[0])}</span>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(copy)}</p>
        </div>
        <div class="hero-metrics">
          ${metrics.map(([label, value]) => `
            <div>
              <strong>${escapeHtml(value)}</strong>
              <span>${escapeHtml(label)}</span>
            </div>
          `).join("")}
        </div>
      </header>
    `;
  }

  function buildParticipantEventLayers(personId, edges) {
    const helped = data.events.filter(event => userHelpsHoldEvent(event, personId));
    const committed = data.events.filter(event => event.attendance.attending.includes(personId) && !helped.some(item => item.id === event.id));
    const memberGroups = edges.filter(edge => ["member", "trusted", "core"].includes(edge.accessLevel) && !isDormant(edge)).map(edge => edge.groupId);
    const followedGroups = edges.filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState) && !isDormant(edge)).map(edge => edge.groupId);
    const memberEvents = data.events.filter(event => touchesGroups(event, memberGroups) && !includesEvent(helped, event) && !includesEvent(committed, event));
    const followedEvents = data.events.filter(event => touchesGroups(event, followedGroups) && !includesEvent(helped, event) && !includesEvent(committed, event) && !includesEvent(memberEvents, event));
    const expansion = FieldMath.recommendEventsForParticipant(data, personId).map(item => item.event).filter(event => !includesEvent(helped, event) && !includesEvent(committed, event) && !includesEvent(memberEvents, event) && !includesEvent(followedEvents, event));

    return [
      { label: "Holding", title: "Actively helping hold", events: helped, note: "hosting, cohosting, stewarding, volunteering, or facilitating" },
      { label: "Committed", title: "Marked participation", events: committed, note: "events the person is attending, not merely watching" },
      { label: "Member/core", title: "Member, trusted, or core communities", events: memberEvents, note: "access is separate from attendance and identity" },
      { label: "Following", title: "Followed or lightly tracked communities", events: followedEvents, note: "low pressure relevance from observing or curious edges" },
      { label: "Expansion", title: "Expansion edge", events: expansion, note: "overlap through tags, venues, low-threshold access, and related groups" }
    ];
  }

  function renderEventLayer(layer, personId) {
    return `
      <section class="event-layer">
        <div class="layer-heading">
          <span>${escapeHtml(layer.label)}</span>
          <div>
            <h3>${escapeHtml(layer.title)}</h3>
            <p>${escapeHtml(layer.note)}</p>
          </div>
          <strong>${layer.events.length}</strong>
        </div>
        <div class="event-row-list">
          ${layer.events.slice(0, 3).map(event => renderEventCompact(event, personId)).join("") || emptyState("No matching events in this layer.")}
        </div>
      </section>
    `;
  }

  function renderEventCompact(event, personId) {
    const venue = FieldMath.getVenue(data, event.venueId);
    const relevance = FieldMath.eventRelevanceCalculation(data, event, personId);
    const bridge = event.access === "public" || event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold");
    return `
      <article class="event-compact">
        <button class="event-main" onclick="ParticipationMockup4.openEvent('${event.id}')">
          <time>${escapeHtml(event.time)}</time>
          <span class="${bridge ? "bridge-pill" : "depth-pill"}">${bridge ? "bridge" : "depth"}</span>
          <div>
            <h4>${escapeHtml(event.title)}</h4>
            <p>${escapeHtml(venue.name)} - ${escapeHtml(eventReasonText(relevance))}</p>
          </div>
        </button>
        <div class="inline-actions">
          <button onclick="ParticipationMockup4.attendEvent('${event.id}')">Attend</button>
          <button onclick="ParticipationMockup4.markInterested('${event.id}')">Interested</button>
          <button onclick="ParticipationMockup4.openSuggestEvent('${event.id}')">Suggest</button>
        </div>
      </article>
    `;
  }

  function groupEdgesForParticipant(edges) {
    return {
      following: edges.filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState) && !isDormant(edge)),
      access: edges.filter(edge => ["member", "trusted", "core", "requested"].includes(edge.accessLevel) && !isDormant(edge)),
      committed: edges.filter(edge => ["recurring", "contributor", "facilitator", "steward"].includes(edge.relationshipState) || edge.roleModes.some(role => ["hosts", "volunteers", "facilitates", "organizes", "teaches"].includes(role))),
      dormant: edges.filter(isDormant)
    };
  }

  function renderRelationshipColumn(title, edges) {
    return `
      <section class="relationship-column">
        <h3>${escapeHtml(title)}</h3>
        ${edges.map(renderRelationshipCard).join("") || emptyState("No edges in this category.")}
      </section>
    `;
  }

  function renderRelationshipCard(edge) {
    const group = FieldMath.getGroup(data, edge.groupId);
    const metrics = FieldMath.computePersonalGroupMetrics(data, edge.personId, edge.groupId);
    return `
      <article class="relationship-card" style="--group-color:${group.color}">
        <button onclick="ParticipationMockup4.openCommunity('${group.id}')">
          <span class="group-dot"></span>
          <strong>${escapeHtml(group.name)}</strong>
        </button>
        <p>${escapeHtml(edge.relationshipState)} - ${escapeHtml(edge.accessLevel)} access - ${escapeHtml(edge.visibility)}</p>
        <div class="meter-pair">
          ${meter("strength", metrics.participationScore, group.color)}
          ${meter("shared exposure", metrics.exposureScore, "#587c8d")}
        </div>
        <small>${relationshipExplanation(edge, metrics)}</small>
      </article>
    `;
  }

  function relationshipExplanation(edge, metrics) {
    const parts = [
      `${edge.recency}% recency`,
      `${edge.frequency}% frequency`,
      `${edge.contributionLevel}% contribution`,
      `${metrics.sharedEventsCount} shared relevant events`
    ];
    return parts.join(" - ");
  }

  function buildNextSteps(personId, edges) {
    const eventRec = FieldMath.recommendEventsForParticipant(data, personId)[0];
    const groupRec = FieldMath.recommendGroupsForParticipant(data, personId)[0];
    const strongRoot = edges
      .filter(edge => FieldMath.computeEngagementStrength(edge) > 55 && !isDormant(edge))
      .sort((a, b) => FieldMath.computeEngagementStrength(b) - FieldMath.computeEngagementStrength(a))[0];
    const dormant = edges.find(isDormant);
    return [
      strongRoot ? { label: "Strong root", title: FieldMath.getGroup(data, strongRoot.groupId).name, copy: "Make the current contribution visible or volunteer for a bridge role.", action: "Commit or serve", onclick: `ParticipationMockup4.openCommunity('${strongRoot.groupId}')` } : null,
      eventRec ? { label: "Possible next event", title: eventRec.event.title, copy: eventRec.reasons.join(" - "), action: "Attend or mark interested", onclick: `ParticipationMockup4.openEvent('${eventRec.event.id}')` } : null,
      groupRec ? { label: "Group to learn about", title: groupRec.group.name, copy: groupRec.reasons.join(" - "), action: "Explore how to participate", onclick: `ParticipationMockup4.openCommunity('${groupRec.group.id}')` } : null,
      dormant ? { label: "Dormant edge", title: FieldMath.getGroup(data, dormant.groupId).name, copy: "The relationship can remain quiet, or be reactivated through a low-threshold step.", action: "Reactivate or keep dormant", onclick: `ParticipationMockup4.openCommunity('${dormant.groupId}')` } : null
    ].filter(Boolean);
  }

  function renderNextStep(step) {
    return `
      <article class="next-step">
        <span>${escapeHtml(step.label)}</span>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.copy)}</p>
        <button onclick="${step.onclick}">${escapeHtml(step.action)}</button>
      </article>
    `;
  }

  function renderCommunityPage(group, personId) {
    const edge = personEdges(personId).find(item => item.groupId === group.id);
    const metrics = FieldMath.computePersonalGroupMetrics(data, personId, group.id);
    const bridgeEvents = data.events.filter(event => touchesGroups(event, [group.id]) && isBridgeEvent(event));
    const deeperEvents = data.events.filter(event => touchesGroups(event, [group.id]) && !isBridgeEvent(event));
    const overlaps = data.groups
      .filter(other => other.id !== group.id)
      .map(other => FieldMath.computeGroupOverlap(data, group.id, other.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return `
      <div class="community-summary" style="--group-color:${group.color}">
        <div class="community-title-block">
          <span class="status-pill">${escapeHtml(group.state)}</span>
          <h3>${escapeHtml(group.name)}</h3>
          <p>${escapeHtml(group.description)}</p>
        </div>
        <div class="tag-row">${group.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <div class="community-detail-grid">
        <section>
          <h4>Self-description and entry</h4>
          <p><strong>Rhythm:</strong> ${escapeHtml(group.rhythm)}</p>
          <p><strong>Access:</strong> ${escapeHtml(group.accessRules)}</p>
          <p><strong>Entry guidance:</strong> ${escapeHtml(group.entryGuidance)}</p>
          <div class="norm-list">${group.norms.map(norm => `<span>${escapeHtml(norm)}</span>`).join("")}</div>
        </section>
        <section class="relationship-panel">
          <h4>My relationship here</h4>
          ${edge ? `
            <p>${escapeHtml(edge.relationshipState)} - ${escapeHtml(edge.accessLevel)} access - ${escapeHtml(edge.decayState)}</p>
            ${meter("participation", metrics.participationScore, group.color)}
            ${meter("shared exposure", metrics.exposureScore, "#587c8d")}
            <small>Role modes: ${escapeHtml(edge.roleModes.join(", ") || "none yet")} - visibility: ${escapeHtml(edge.visibility)}</small>
          ` : `
            <p>No direct participation edge yet. Shared exposure is ${metrics.exposureScore}% from events, tags, and adjacent communities.</p>
          `}
        </section>
      </div>
      <div class="ways-in">
        <button onclick="ParticipationMockup4.followGroup('${group.id}')">Follow lightly</button>
        <button onclick="ParticipationMockup4.requestMembership('${group.id}')">Request membership</button>
        <button onclick="ParticipationMockup4.commitToGroup('${group.id}')">Commit or serve</button>
        <button onclick="ParticipationMockup4.makeDormant('${group.id}')">Become dormant</button>
      </div>
      <div class="community-events">
        <section>
          <h4>Bridge participation</h4>
          ${bridgeEvents.map(event => renderEventCompact(event, personId)).join("") || emptyState("No bridge events found.")}
        </section>
        <section>
          <h4>Deeper connection</h4>
          ${deeperEvents.map(event => renderEventCompact(event, personId)).join("") || emptyState("No deeper events found.")}
        </section>
      </div>
      <div class="overlap-list">
        <h4>Community overlap signals</h4>
        ${overlaps.map(renderOverlapRow).join("")}
      </div>
    `;
  }

  function renderGeneratedFieldPage(field) {
    const groups = field.groups.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean);
    const bridgeEvents = data.events.filter(event => touchesGroups(event, field.groups) && isBridgeEvent(event));
    const deeperEvents = data.events.filter(event => touchesGroups(event, field.groups) && !isBridgeEvent(event));
    const bridgePeople = FieldMath.detectBridgePeople(data, field.id);

    return `
      <div class="generated-summary">
        <span class="status-pill computed">computed ${escapeHtml(field.generatedFrom)}</span>
        <h3>${escapeHtml(field.name)}</h3>
        <p>${escapeHtml(field.description)}</p>
        <div class="evidence-grid">
          ${renderMetricCard("Strength", field.strength, "Calculated from repeated signal")}
          ${renderMetricCard("People count", field.peopleCount, "Aggregate edges only")}
          ${renderMetricCard("Clarity", field.clarity, "Generated field confidence")}
        </div>
      </div>
      <section class="field-evidence">
        <h4>Why this field exists</h4>
        <div class="tag-row">${field.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="community-mini-grid">${groups.map(renderCommunityMiniButton).join("")}</div>
      </section>
      <section class="field-events">
        <h4>Bridge events</h4>
        ${bridgeEvents.slice(0, 3).map(event => renderEventCompact(event, data.currentPersonId)).join("") || emptyState("No bridge events in this field.")}
        <h4>Deeper events</h4>
        ${deeperEvents.slice(0, 3).map(event => renderEventCompact(event, data.currentPersonId)).join("") || emptyState("No deeper events in this field.")}
      </section>
      <section class="field-evidence">
        <h4>Aggregate bridge edges</h4>
        ${bridgePeople.map(item => `
          <article class="aggregate-row">
            <strong>${escapeHtml(item.person.name)}</strong>
            <span>${item.edges.length} active edges - bridge score ${item.bridgeScore}</span>
          </article>
        `).join("") || emptyState("No aggregate bridge signal yet.")}
      </section>
    `;
  }

  function renderGeneratedFieldMini(field) {
    return `
      <article class="field-mini" onclick="ParticipationMockup4.openField('${field.id}')">
        <span>${escapeHtml(field.generatedFrom)} - ${escapeHtml(field.clarity)}</span>
        <h3>${escapeHtml(field.name)}</h3>
        <p>${escapeHtml(field.description)}</p>
        <div class="mini-meter"><i style="width:${field.strength}%"></i></div>
      </article>
    `;
  }

  function renderCreatorGroupFit(item, draftEvent) {
    const signal = FieldMath.computeCreatorGroupSignal(data, draftEvent.hostId, item.group.id, draftEvent);
    return `
      <article class="fit-card" style="--group-color:${item.group.color}">
        <div class="fit-head">
          <h3>${escapeHtml(item.group.name)}</h3>
          <strong>${item.score}%</strong>
        </div>
        <p>${item.reasons.join(" - ")}</p>
        <div class="signal-row">
          <span>${signal.participantOverlapScore}% audience overlap</span>
          <span>${signal.sharedParticipantsCount} shared participants</span>
          <span>${signal.tagOverlap.length} tag overlaps</span>
        </div>
        <button onclick="ParticipationMockup4.suggestDraftToGroup('${item.group.id}')">Suggest to steward queue</button>
      </article>
    `;
  }

  function renderCreatorFieldFit(item) {
    return `
      <article class="field-mini" onclick="ParticipationMockup4.openField('${item.field.id}')">
        <span>field fit ${item.score}%</span>
        <h3>${escapeHtml(item.field.name)}</h3>
        <p>${escapeHtml(item.field.description)}</p>
      </article>
    `;
  }

  function renderStewardHints(group, summary, fields) {
    const hints = [
      summary.dropoff.rate > 40 ? "Clarify second-step entry after first events." : "Newcomer continuation is not the loudest signal.",
      summary.bridgingScore > summary.bondingScore ? "Bridge-rich activity is high; protect core rhythm while welcoming adjacency." : "Bonding is stronger than bridging; look for gentle public doorways.",
      fields.length ? `${fields.length} generated fields include this group.` : "No generated fields need attention yet.",
      summary.dormant.length ? "Dormant or reactivating edges suggest a return path could be named." : "Dormancy signal is quiet."
    ];
    return `<div class="hint-list">${hints.map(hint => `<p>${escapeHtml(hint)}</p>`).join("")}</div>`;
  }

  function renderStructureControls(group) {
    return `
      <div class="control-list">
        <label>
          <span>Entry guidance</span>
          <textarea readonly>${escapeHtml(group.entryGuidance)}</textarea>
        </label>
        <label>
          <span>Access rules</span>
          <textarea readonly>${escapeHtml(group.accessRules)}</textarea>
        </label>
        <div class="control-actions">
          <button onclick="ParticipationMockup4.openDrawerMessage('Structure note', 'In this mockup, editing is represented as a governance action without changing the seed text.')">Edit guidance</button>
          <button onclick="ParticipationMockup4.openRelationshipMarking('${group.id}')">Mark formal relationship</button>
        </div>
      </div>
    `;
  }

  function renderMembershipRequests(requests) {
    return `
      <section class="queue-section">
        <h3>Membership requests</h3>
        ${requests.map(request => {
          const person = FieldMath.getPerson(data, request.personId);
          return `
            <article class="queue-row">
              <div>
                <strong>${escapeHtml(person.name)}</strong>
                <p>${escapeHtml(request.note)} - ${escapeHtml(request.status)}</p>
              </div>
              <button onclick="ParticipationMockup4.approveRequest('${request.id}')">Approve</button>
            </article>
          `;
        }).join("") || emptyState("No membership requests for this group.")}
      </section>
    `;
  }

  function renderSuggestedShares(suggestions) {
    return `
      <section class="queue-section">
        <h3>Suggested event shares</h3>
        ${suggestions.map(share => {
          const event = data.events.find(item => item.id === share.eventId) || data.createdEvents.find(item => item.id === share.eventId);
          const person = FieldMath.getPerson(data, share.suggestedBy);
          return `
            <article class="queue-row">
              <div>
                <strong>${escapeHtml(event ? event.title : "Draft offering")}</strong>
                <p>Suggested by ${escapeHtml(person ? person.name : "unknown")} - ${escapeHtml(share.status)}</p>
              </div>
              <button onclick="ParticipationMockup4.featureShare('${share.id}')">Feature</button>
            </article>
          `;
        }).join("") || emptyState("No suggested event shares for this group.")}
      </section>
    `;
  }

  function renderModelTab(tab) {
    if (tab === "people") return renderObjectTable(data.people, ["id", "name", "lifeContext", "tags"]);
    if (tab === "groups") return renderObjectTable(data.groups, ["id", "name", "state", "rhythm", "tags"]);
    if (tab === "edges") return renderObjectTable(data.participationEdges.map(edge => ({ ...edge, strength: FieldMath.computeEngagementStrength(edge) })), ["personId", "groupId", "relationshipState", "accessLevel", "strength", "visibility", "decayState"]);
    if (tab === "events") return renderObjectTable([...data.events, ...data.createdEvents], ["id", "title", "time", "access", "linkedGroups", "relevantGroups", "tags"]);
    if (tab === "venues") return renderObjectTable(data.venues, ["id", "name", "type", "location", "associatedGroups"]);
    if (tab === "relationships") return renderObjectTable(data.groupRelationships, ["fromGroupId", "toGroupId", "type", "note"]);
    if (tab === "fields") return renderObjectTable(FieldMath.generateEmergentFields(data), ["id", "name", "generatedFrom", "groups", "peopleCount", "strength", "clarity"]);
    if (tab === "relevance") {
      const rows = data.events.slice(0, 8).map(event => FieldMath.eventRelevanceCalculation(data, event, data.currentPersonId));
      return renderObjectTable(rows, ["eventId", "personId", "groupSignal", "tagSignal", "accessSignal", "score", "formula"]);
    }
    return `
      <div class="formula-list">
        ${formulaRows.map(([name, explanation]) => `
          <article>
            <strong>${escapeHtml(name)}</strong>
            <p>${escapeHtml(explanation)}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderObjectTable(rows, columns) {
    return `
      <div class="object-table-wrap">
        <table class="object-table">
          <thead><tr>${columns.map(column => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map(row => `
              <tr>${columns.map(column => `<td>${escapeHtml(formatCell(row[column]))}</td>`).join("")}</tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function inputField(label, name, value) {
    return `
      <label class="form-field">
        <span>${escapeHtml(label)}</span>
        <input name="${escapeHtml(name)}" value="${escapeHtml(value)}" />
      </label>
    `;
  }

  function renderEdgeDimension(label, note, value) {
    return `
      <div>
        <strong>${escapeHtml(value)}</strong>
        <span>${escapeHtml(label)}</span>
        <small>${escapeHtml(note)}</small>
      </div>
    `;
  }

  function renderMetricCard(label, value, note) {
    return `
      <div class="metric-card">
        <strong>${escapeHtml(value)}</strong>
        <span>${escapeHtml(label)}</span>
        <p>${escapeHtml(note)}</p>
      </div>
    `;
  }

  function renderDistribution(distribution) {
    const states = ["observing", "curious", "occasional", "recurring", "contributor", "facilitator", "steward", "dormant", "alumnus"];
    const max = Math.max(1, ...Object.values(distribution));
    return states.map(state => `
      <div class="distribution-row">
        <span>${escapeHtml(state)}</span>
        <i><b style="width:${((distribution[state] || 0) / max) * 100}%"></b></i>
        <strong>${distribution[state] || 0}</strong>
      </div>
    `).join("");
  }

  function renderOverlapRow(overlap) {
    const otherId = overlap.toGroupId || overlap.groupBId;
    const group = FieldMath.getGroup(data, otherId);
    return `
      <article class="overlap-row">
        <div>
          <strong>${escapeHtml(group ? group.name : otherId)}</strong>
          <p>${overlap.explanation.map(escapeHtml).join(" - ")}</p>
        </div>
        <span>${overlap.score}%</span>
      </article>
    `;
  }

  function renderCommunityMiniButton(group) {
    return `
      <button class="community-mini" onclick="ParticipationMockup4.openCommunity('${group.id}')" style="--group-color:${group.color}">
        <span></span>
        ${escapeHtml(group.name)}
      </button>
    `;
  }

  function meter(label, value, color) {
    return `
      <div class="meter">
        <span>${escapeHtml(label)}</span>
        <i><b style="width:${Math.max(0, Math.min(100, value))}%;background:${color}"></b></i>
        <strong>${escapeHtml(value)}%</strong>
      </div>
    `;
  }

  function captureDraft(form) {
    const formData = new FormData(form);
    draft = {
      title: formData.get("title") || draft.title,
      hostId: formData.get("hostId") || draft.hostId,
      venueId: formData.get("venueId") || draft.venueId,
      access: formData.get("access") || draft.access,
      price: formData.get("price") || draft.price,
      audience: formData.get("audience") || draft.audience,
      tagsText: formData.get("tagsText") || "",
      beginnerFriendly: formData.get("beginnerFriendly") === "on"
    };
    render();
  }

  function getDraftEvent() {
    return {
      id: "draft_event",
      title: draft.title,
      hostId: draft.hostId,
      linkedGroups: [],
      relevantGroups: [],
      venueId: draft.venueId,
      time: "Draft",
      tags: splitTags(draft.tagsText),
      audience: draft.audience,
      access: draft.access,
      price: draft.price,
      beginnerFriendly: draft.beginnerFriendly,
      attendance: { interested: [], attending: [] }
    };
  }

  function createEvent() {
    const event = {
      ...getDraftEvent(),
      id: `created_${Date.now()}`,
      time: "Drafted now",
      linkedGroups: [],
      relevantGroups: FieldMath.recommendGroupsForEvent(data, getDraftEvent()).slice(0, 3).map(item => item.group.id),
      attendance: { interested: [], attending: [data.currentPersonId] }
    };
    data.createdEvents.push(event);
    data.events.push(event);
    saveData();
    render();
    openDrawer("Event created", `<p>${escapeHtml(event.title)} has been added as a draft/published offering in the mock data.</p>`);
  }

  function suggestDraftToTopGroups() {
    FieldMath.recommendGroupsForEvent(data, getDraftEvent()).slice(0, 3).forEach(item => suggestDraftToGroup(item.group.id, true));
    saveData();
    render();
    openDrawer("Suggestions created", "<p>The draft has been suggested to the top group steward queues.</p>");
  }

  function suggestDraftToGroup(groupId, silent = false) {
    const event = getDraftEvent();
    data.suggestedEventShares.push({
      id: `share_${Date.now()}_${groupId}`,
      eventId: event.id,
      groupId,
      suggestedBy: data.currentPersonId,
      status: "pending",
      note: `Draft suggestion: ${event.title}`
    });
    if (!silent) {
      saveData();
      render();
      openDrawer("Suggested to steward queue", `<p>${escapeHtml(event.title)} is now pending for ${escapeHtml(FieldMath.getGroup(data, groupId).name)}.</p>`);
    }
  }

  function openSuggestEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    const options = data.groups.map(group => `<button onclick="ParticipationMockup4.suggestEventToGroup('${eventId}', '${group.id}')">${escapeHtml(group.name)}</button>`).join("");
    openDrawer("Suggest event relevance", `
      <p>${escapeHtml(event.title)}</p>
      <div class="drawer-button-list">${options}</div>
    `);
  }

  function suggestEventToGroup(eventId, groupId) {
    data.suggestedEventShares.push({
      id: `share_${Date.now()}`,
      eventId,
      groupId,
      suggestedBy: data.currentPersonId,
      status: "pending",
      note: "Participant suggested relevance from an event recommendation."
    });
    saveData();
    render();
    openDrawer("Suggestion sent", `<p>The event is now in ${escapeHtml(FieldMath.getGroup(data, groupId).name)}'s steward queue.</p>`);
  }

  function followGroup(groupId) {
    upsertEdge(groupId, { relationshipState: "observing", accessLevel: "public", recency: 12, frequency: 8, contributionLevel: 0, trustLevel: 8, roleModes: [], socialEmbeddedness: "none", normFamiliarity: "new", identitySalience: "low", visibility: "privateToUser", decayState: "active" });
    openCommunity(groupId);
  }

  function requestMembership(groupId) {
    data.membershipRequests.push({
      id: `req_${Date.now()}`,
      personId: data.currentPersonId,
      groupId,
      status: "pending",
      note: "Requested through the Mockup 4 community page."
    });
    upsertEdge(groupId, { relationshipState: "curious", accessLevel: "requested", visibility: "visibleToStewards" });
    saveData();
    render();
    openCommunity(groupId);
  }

  function commitToGroup(groupId) {
    upsertEdge(groupId, { relationshipState: "contributor", accessLevel: "trusted", contributionLevel: 45, roleModes: ["volunteers"], socialEmbeddedness: "moderate", normFamiliarity: "familiar", visibility: "visibleToMembers", decayState: "active" });
    openCommunity(groupId);
  }

  function makeDormant(groupId) {
    upsertEdge(groupId, { relationshipState: "dormant", decayState: "dormant", visibility: "privateToUser" });
    openCommunity(groupId);
  }

  function upsertEdge(groupId, patch) {
    let edge = data.participationEdges.find(item => item.personId === data.currentPersonId && item.groupId === groupId);
    if (!edge) {
      edge = {
        personId: data.currentPersonId,
        groupId,
        relationshipState: "observing",
        accessLevel: "public",
        engagementStrength: 12,
        recency: 10,
        frequency: 5,
        contributionLevel: 0,
        trustLevel: 5,
        roleModes: [],
        socialEmbeddedness: "none",
        normFamiliarity: "new",
        identitySalience: "low",
        visibility: "privateToUser",
        decayState: "active"
      };
      data.participationEdges.push(edge);
    }
    Object.assign(edge, patch);
    saveData();
    render();
  }

  function attendEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event) return;
    if (!event.attendance.attending.includes(data.currentPersonId)) event.attendance.attending.push(data.currentPersonId);
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    saveData();
    render();
  }

  function markInterested(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event) return;
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    saveData();
    render();
  }

  function approveRequest(requestId) {
    const request = data.membershipRequests.find(item => item.id === requestId);
    if (!request) return;
    request.status = "approved";
    const previousPerson = data.currentPersonId;
    data.currentPersonId = request.personId;
    upsertEdge(request.groupId, { relationshipState: "recurring", accessLevel: "member", visibility: "visibleToMembers" });
    data.currentPersonId = previousPerson;
    saveData();
    render();
  }

  function featureShare(shareId) {
    const share = data.suggestedEventShares.find(item => item.id === shareId);
    if (!share) return;
    share.status = "featured";
    if (!data.featuredEvents.includes(share.eventId)) data.featuredEvents.push(share.eventId);
    saveData();
    render();
  }

  function openEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event) return;
    const venue = FieldMath.getVenue(data, event.venueId);
    const groups = unique([...event.linkedGroups, ...event.relevantGroups]).map(id => FieldMath.getGroup(data, id)).filter(Boolean);
    openDrawer(event.title, `
      <p>${escapeHtml(event.time)} at ${escapeHtml(venue.name)} - ${escapeHtml(event.access)}</p>
      <p>${escapeHtml(event.audience)}</p>
      <div class="tag-row">${event.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <section class="drawer-section">
        <h3>Why it appears</h3>
        <p>${escapeHtml(eventReasonText(FieldMath.eventRelevanceCalculation(data, event, data.currentPersonId)))}</p>
        <p>${escapeHtml(FieldMath.eventRelevanceCalculation(data, event, data.currentPersonId).formula)}</p>
      </section>
      <section class="drawer-section">
        <h3>Relevant groups</h3>
        ${groups.map(renderCommunityMiniButton).join("")}
      </section>
      <div class="drawer-actions">
        <button onclick="ParticipationMockup4.attendEvent('${event.id}')">Attend</button>
        <button onclick="ParticipationMockup4.markInterested('${event.id}')">Mark interested</button>
        <button onclick="ParticipationMockup4.openSuggestEvent('${event.id}')">Suggest to group</button>
      </div>
    `);
  }

  function openCommunity(groupId) {
    const group = FieldMath.getGroup(data, groupId);
    openDrawer(group.name, renderCommunityPage(group, data.currentPersonId));
  }

  function openField(fieldId) {
    const field = FieldMath.generateEmergentFields(data).find(item => item.id === fieldId);
    openDrawer(field.name, renderGeneratedFieldPage(field));
  }

  function openRelationshipMarking(groupId) {
    const otherGroups = data.groups.filter(group => group.id !== groupId).slice(0, 5);
    openDrawer("Mark formal relationship", `
      <p>Choose a group to mark as formally related in the demo data.</p>
      <div class="drawer-button-list">
        ${otherGroups.map(group => `<button onclick="ParticipationMockup4.markRelationship('${groupId}', '${group.id}')">${escapeHtml(group.name)}</button>`).join("")}
      </div>
    `);
  }

  function markRelationship(fromGroupId, toGroupId) {
    data.groupRelationships.push({
      fromGroupId,
      toGroupId,
      type: "markedBySteward",
      note: "Formal relationship marked from Mockup 4 steward controls."
    });
    saveData();
    render();
    openDrawer("Relationship marked", "<p>The formal relationship now contributes to computed field signals.</p>");
  }

  function openDrawerMessage(title, message) {
    openDrawer(title, `<p>${escapeHtml(message)}</p>`);
  }

  function focusGroup(groupId) {
    data.focus = { type: "group", id: groupId };
    saveData();
    render();
  }

  function focusField(fieldId) {
    data.focus = { type: "field", id: fieldId };
    saveData();
    render();
  }

  function setStewardGroup(groupId) {
    data.stewardGroupId = groupId;
    saveData();
    render();
  }

  function setModelTab(tab) {
    data.currentModelTab = tab;
    saveData();
    render();
  }

  function personEdges(personId) {
    return FieldMath.getEdgesForPerson(data, personId)
      .map(edge => ({ ...edge, computedStrength: FieldMath.computeEngagementStrength(edge) }))
      .sort((a, b) => b.computedStrength - a.computedStrength);
  }

  function isBridgeEvent(event) {
    return event.access === "public" || event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold") || event.tags.includes("drop-in");
  }

  function eventReasonText(relevance) {
    const reasons = [];
    if (relevance.groupSignal.length) reasons.push(`${relevance.groupSignal.length} current group signals`);
    if (relevance.tagSignal.length) reasons.push(`${relevance.tagSignal.length} tag matches`);
    if (relevance.accessSignal >= 10) reasons.push("public access");
    else if (relevance.accessSignal > 0) reasons.push("visible access with commitment layer");
    return reasons.join(" - ") || "light adjacent recommendation";
  }

  function isDormant(edge) {
    return edge.relationshipState === "dormant" || edge.decayState === "dormant" || edge.decayState === "fading";
  }

  function userHelpsHoldEvent(event, personId) {
    return event.hostId === personId || (event.cohostIds || []).includes(personId) || (event.volunteerIds || []).includes(personId);
  }

  function touchesGroups(event, groupIds) {
    return unique([...event.linkedGroups, ...event.relevantGroups]).some(groupId => groupIds.includes(groupId));
  }

  function includesEvent(events, event) {
    return events.some(item => item.id === event.id);
  }

  function countVisibilityModes(edges) {
    return unique(edges.map(edge => edge.visibility)).length;
  }

  function splitTags(text) {
    return text.split(",").map(tag => tag.trim()).filter(Boolean);
  }

  function firstName(person) {
    return person ? person.name.split(" ")[0] : "";
  }

  function formatCell(value) {
    if (Array.isArray(value)) return value.join(", ");
    if (value && typeof value === "object") return JSON.stringify(value);
    return value ?? "";
  }

  function emptyState(copy) {
    return `<div class="empty-state">${escapeHtml(copy)}</div>`;
  }

  function openDrawer(title, content) {
    document.getElementById("drawerContent").innerHTML = `<h2>${escapeHtml(title)}</h2>${content}`;
    document.getElementById("drawer").classList.remove("hidden");
  }

  function closeDrawer() {
    document.getElementById("drawer").classList.add("hidden");
  }

  function unique(items) {
    return Array.from(new Set(items));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  return {
    init,
    setView,
    focusGroup,
    focusField,
    setStewardGroup,
    setModelTab,
    captureDraft,
    createEvent,
    suggestDraftToTopGroups,
    suggestDraftToGroup,
    suggestEventToGroup,
    openSuggestEvent,
    openEvent,
    openCommunity,
    openField,
    followGroup,
    requestMembership,
    commitToGroup,
    makeDormant,
    attendEvent,
    markInterested,
    approveRequest,
    featureShare,
    openRelationshipMarking,
    markRelationship,
    openDrawerMessage
  };
})();

document.addEventListener("DOMContentLoaded", ParticipationMockup4.init);

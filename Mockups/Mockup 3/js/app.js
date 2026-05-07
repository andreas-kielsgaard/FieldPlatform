const FieldLensApp = (() => {
  const STORAGE_KEY = "field_mockup_3_state";
  let data = loadData();

  const modes = {
    involvements: {
      eyebrow: "Lens 1",
      title: "Viewing current involvements",
      prompt: "What am I already carrying, attending, or mutually connected to right now?",
      tone: "solid"
    },
    connected: {
      eyebrow: "Lens 2",
      title: "Exploring connected field",
      prompt: "What is alive around the communities and events I have already shown interest in?",
      tone: "woven"
    },
    edge: {
      eyebrow: "Lens 3",
      title: "Exploring connection edge",
      prompt: "Where are relevant overlaps, light bridges, and possible new entries forming?",
      tone: "edge"
    }
  };

  function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return window.createInitialDemoData();
    try {
      const parsed = JSON.parse(stored);
      const fresh = window.createInitialDemoData();
      return {
        ...fresh,
        ...parsed,
        festivals: parsed.festivals || fresh.festivals,
        forumThreads: parsed.forumThreads || fresh.forumThreads
      };
    } catch {
      return window.createInitialDemoData();
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function resetData() {
    data = window.createInitialDemoData();
    saveData();
    renderPersonaSelect();
    render();
    openDrawer("Reset complete", "<p>The Mockup 3 field lenses are back to the seeded demo state.</p>");
  }

  function init() {
    if (!data.currentMode) data.currentMode = "involvements";
    document.querySelectorAll(".lens-tab").forEach(button => {
      button.addEventListener("click", () => {
        data.currentMode = button.dataset.mode;
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
    select.onchange = event => {
      data.currentPersonId = event.target.value;
      saveData();
      render();
    };
  }

  function render() {
    document.querySelectorAll(".lens-tab").forEach(button => {
      button.classList.toggle("active", button.dataset.mode === data.currentMode);
    });
    document.getElementById("personaSelect").value = data.currentPersonId;

    const person = FieldMath.getPerson(data, data.currentPersonId);
    const edges = FieldMath.getEdgesForPerson(data, person.id)
      .map(edge => ({ ...edge, computedStrength: FieldMath.computeEngagementStrength(edge) }))
      .sort((a, b) => b.computedStrength - a.computedStrength);
    const context = buildLensContext(person, edges);
    document.getElementById("app").innerHTML = renderModeView(person, edges, context);
  }

  function renderModeView(person, edges, context) {
    if (context.mode === "connected") return renderConnectedWorkspace(person, edges, context);
    if (context.mode === "edge") return renderEdgeExpedition(person, edges, context);
    return renderInvolvementHome(person, edges, context);
  }

  function buildLensContext(person, edges) {
    const mode = data.currentMode || "involvements";
    const activeRoles = ["contributor", "facilitator", "steward"];
    const activeGroupIds = edges
      .filter(edge => activeRoles.includes(edge.relationshipState) || edge.roleModes.some(role => ["hosts", "volunteers", "organizes", "facilitates", "teaches"].includes(role)))
      .map(edge => edge.groupId);
    const memberGroupIds = edges
      .filter(edge => ["member", "trusted", "core"].includes(edge.accessLevel) && !isDormant(edge))
      .map(edge => edge.groupId);
    const followedGroupIds = edges
      .filter(edge => ["observing", "curious", "occasional"].includes(edge.relationshipState) && !isDormant(edge))
      .map(edge => edge.groupId);
    const interestedEventIds = new Set(data.events
      .filter(event => event.attendance.interested.includes(person.id) || event.attendance.attending.includes(person.id))
      .map(event => event.id));
    const connectedGroupIds = unique([
      ...activeGroupIds,
      ...memberGroupIds,
      ...followedGroupIds,
      ...data.events.filter(event => interestedEventIds.has(event.id)).flatMap(event => [...event.linkedGroups, ...event.relevantGroups])
    ]);
    const personTags = new Set([
      ...person.tags,
      ...edges.flatMap(edge => {
        const group = FieldMath.getGroup(data, edge.groupId);
        return group ? group.tags : [];
      })
    ]);
    const eventRecs = FieldMath.recommendEventsForParticipant(data, person.id);
    const groupRecs = FieldMath.recommendGroupsForParticipant(data, person.id);

    if (mode === "connected") {
      return {
        mode,
        primaryEvents: data.events.filter(event => interestedEventIds.has(event.id) || touchesGroups(event, connectedGroupIds)),
        primaryGroups: connectedGroupIds.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean),
        sideEvents: eventRecs.map(item => item.event).filter(event => touchesGroups(event, connectedGroupIds)),
        sideGroups: groupRecs.map(item => item.group).filter(group => connectedGroupIds.includes(group.id) || group.tags.some(tag => personTags.has(tag))),
        message: "Built from followed groups, attended events, interested events, and related community context."
      };
    }

    if (mode === "edge") {
      const known = new Set(connectedGroupIds);
      const expansionGroups = groupRecs.map(item => item.group).filter(group => !known.has(group.id) || followedGroupIds.includes(group.id));
      const expansionIds = expansionGroups.map(group => group.id);
      const expansionEvents = data.events.filter(event =>
        touchesGroups(event, expansionIds) ||
        event.tags.some(tag => personTags.has(tag)) && !event.attendance.attending.includes(person.id)
      );
      return {
        mode,
        primaryEvents: expansionEvents,
        primaryGroups: expansionGroups,
        sideEvents: eventRecs.map(item => item.event),
        sideGroups: expansionGroups,
        message: "Built from overlapping tags, shared venues, light edges, and recommended group fit."
      };
    }

    const helpedEvents = data.events.filter(event => userHelpsHoldEvent(event, person.id));
    const committedEvents = data.events.filter(event => event.attendance.attending.includes(person.id) && !helpedEvents.some(item => item.id === event.id));
    const memberEvents = data.events.filter(event => touchesGroups(event, memberGroupIds) && !helpedEvents.some(item => item.id === event.id) && !committedEvents.some(item => item.id === event.id));
    return {
      mode,
      primaryEvents: [...helpedEvents, ...committedEvents, ...memberEvents],
      primaryGroups: unique([...activeGroupIds, ...memberGroupIds]).map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean),
      sideEvents: committedEvents,
      sideGroups: memberGroupIds.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean),
      message: "Built from events you help hold, events you are attending, and mutually reciprocated community edges."
    };
  }

  function renderInvolvementHome(person, edges, context) {
    const firstName = person.name.split(" ")[0];
    const holdingEvents = context.primaryEvents.filter(event => userHelpsHoldEvent(event, person.id));
    const attendingEvents = context.primaryEvents.filter(event => event.attendance.attending.includes(person.id) && !userHelpsHoldEvent(event, person.id));
    const memberEdges = edges.filter(edge => ["member", "trusted", "core"].includes(edge.accessLevel) && !isDormant(edge));
    const recentVenues = unique(context.primaryEvents.map(event => event.venueId)).map(id => FieldMath.getVenue(data, id)).filter(Boolean);
    const festivals = getRelevantFestivalsForPerson(person.id, context.primaryGroups.map(group => group.id));

    return `
      <section class="involvement-home">
        <div class="home-hero-panel">
          <div class="home-copy">
            <div class="eyebrow">Lens 1 - Current involvements</div>
            <h1>What is already here, ${escapeHtml(firstName)}?</h1>
            <p>${escapeHtml(modes.involvements.prompt)}</p>
          </div>
          <div class="home-person-card">
            <span class="avatar">${escapeHtml(person.name[0])}</span>
            <strong>${escapeHtml(person.name)}</strong>
            <small>${escapeHtml(person.lifeContext)}</small>
          </div>
        </div>

        ${renderLensSwitcher(context.mode)}

        <div class="home-dashboard">
          <section class="home-main-column">
            <div class="overview-strip">
              ${metric("holding soon", holdingEvents.length)}
              ${metric("participating", attendingEvents.length)}
              ${metric("member communities", memberEdges.length)}
            </div>

            <div class="mini-field-banner">
              <div class="mini-field-map">
                ${context.primaryGroups.slice(0, 6).map((group, index) => {
                  const positions = [[18, 42], [34, 22], [48, 58], [66, 34], [78, 62], [56, 18]];
                  const [x, y] = positions[index];
                  return `<button style="left:${x}%;top:${y}%;background:${group.color}" onclick="FieldLensApp.openGroup('${group.id}')">${escapeHtml(shortLabel(group.name))}</button>`;
                }).join("")}
              </div>
              <div>
                <div class="section-kicker">This field is already mutual</div>
                <h2>Events, rooms, and communities where the relationship is not just imagined.</h2>
                <p>${escapeHtml(context.message)}</p>
              </div>
            </div>

            <section class="commitment-band holding-band">
              <div class="band-header">
                <span>Actively involved</span>
                <strong>Offering, co-hosting, volunteering</strong>
              </div>
              ${holdingEvents.map(event => renderEventRow(event)).join("") || emptyState("No events you are holding in the current data.")}
            </section>

            <section class="commitment-band attending-band">
              <div class="band-header">
                <span>Marked commitment</span>
                <strong>Participating soon</strong>
              </div>
              ${attendingEvents.map(event => renderEventRow(event)).join("") || emptyState("No committed events beyond what you are holding.")}
            </section>

            <section class="festival-band">
              <div class="band-header">
                <span>Festivals in view</span>
                <strong>Multi-event gatherings</strong>
              </div>
              ${festivals.map(renderFestivalCard).join("") || emptyState("No festivals connected to your current field yet.")}
            </section>
          </section>

          <aside class="home-side-column">
            <section class="today-stack">
              <div class="section-kicker">Mutual communities</div>
              ${context.primaryGroups.slice(0, 5).map(renderCommunityRow).join("") || emptyState("No mutual communities yet.")}
            </section>
            <section class="venue-stack">
              <div class="section-kicker">Places in your week</div>
              ${recentVenues.slice(0, 4).map(venue => `
                <article class="venue-row">
                  <strong>${escapeHtml(venue.name)}</strong>
                  <span>${escapeHtml(venue.type)} - ${escapeHtml(venue.location)}</span>
                </article>
              `).join("") || emptyState("No venue anchors yet.")}
            </section>
          </aside>
        </div>
      </section>
    `;
  }

  function renderConnectedWorkspace(person, edges, context) {
    const connectedEdges = context.primaryGroups
      .map(group => ({ group, edge: edges.find(edge => edge.groupId === group.id) }))
      .filter(item => item.edge && !isDormant(item.edge))
      .sort((a, b) => b.edge.computedStrength - a.edge.computedStrength);
    const warmEvents = context.primaryEvents
      .filter(event => !userHelpsHoldEvent(event, person.id))
      .slice(0, 6);
    const festivals = getRelevantFestivalsForPerson(person.id, context.primaryGroups.map(group => group.id));

    return `
      <section class="connected-workspace">
        <header class="connected-header">
          <div>
            <div class="eyebrow">Lens 2 - Connected field</div>
            <h1>Keep the nearby field warm.</h1>
            <p>${escapeHtml(modes.connected.prompt)}</p>
          </div>
          <div class="connection-meter">
            <strong>${connectedEdges.length}</strong>
            <span>known community edges shaping this view</span>
          </div>
        </header>

        ${renderLensSwitcher(context.mode)}

        <section class="reinforcement-board">
          <div class="rhythm-column">
            <div class="section-kicker">Community rhythms within reach</div>
            ${connectedEdges.slice(0, 6).map(item => renderRhythmCard(item.group, item.edge)).join("") || emptyState("Follow or join a group to form connected rhythms.")}
          </div>
          <div class="warm-column">
            <div class="section-kicker">Offerings to reinforce connection</div>
            <div class="warm-event-list">
              ${warmEvents.map(event => renderWarmEvent(event, person.id)).join("") || emptyState("No connected offerings found.")}
            </div>
          </div>
        </section>

        <section class="doorway-band">
          <div>
            <div class="section-kicker">Doors already open</div>
            <h2>These are not expansion edges yet. They are places where your existing attention can become steadier.</h2>
          </div>
          <div class="doorway-grid">
            ${context.sideGroups.slice(0, 4).map(renderDoorRow).join("") || emptyState("No extra open doors in this lens.")}
          </div>
        </section>

        <section class="festival-workspace-band">
          <div>
            <div class="section-kicker">Festival orientation</div>
            <h2>Festivals gather several community threads in one temporary field.</h2>
          </div>
          <div class="festival-list">
            ${festivals.map(renderFestivalCard).join("") || emptyState("No connected festivals in this lens.")}
          </div>
        </section>
      </section>
    `;
  }

  function renderEdgeExpedition(person, edges, context) {
    const knownGroupIds = new Set(edges.map(edge => edge.groupId));
    const expansionCards = context.primaryGroups.slice(0, 5).map(group => {
      const existingEdge = edges.find(edge => edge.groupId === group.id);
      const anchor = strongestKnownOverlap(group.id, edges);
      return { group, existingEdge, anchor };
    });
    const festivals = getRelevantFestivalsForPerson(person.id, context.primaryGroups.map(group => group.id));

    return `
      <section class="edge-expedition">
        <header class="edge-hero-panel">
          <div class="edge-hero-copy">
            <div class="eyebrow">Lens 3 - Connection edge</div>
            <h1>Expand the field without pretending you already belong.</h1>
            <p>${escapeHtml(modes.edge.prompt)}</p>
          </div>
          <div class="edge-signal-card">
            <strong>${context.primaryGroups.filter(group => !knownGroupIds.has(group.id)).length}</strong>
            <span>new or lightly held communities surfaced by overlap</span>
          </div>
        </header>

        ${renderLensSwitcher(context.mode)}

        <section class="expansion-gallery">
          ${expansionCards.map(item => renderExpansionCard(item.group, item.existingEdge, item.anchor)).join("") || emptyState("No expansion communities surfaced yet.")}
        </section>

        <section class="edge-map-band">
          <div class="edge-map-copy">
            <div class="section-kicker">How to enter</div>
            <h2>Expansion is shown as thresholds: bridge, try, request, or simply observe.</h2>
            <p>${escapeHtml(context.message)}</p>
          </div>
          <div class="edge-path-list">
            ${context.primaryEvents.slice(0, 6).map(event => renderEdgeEvent(event, person.id)).join("") || emptyState("No events on the edge right now.")}
          </div>
        </section>

        <section class="edge-festival-band">
          <div class="section-kicker">Temporary fields</div>
          <h2>Festivals can be a way to sample several adjacent communities without pretending they are one thing.</h2>
          ${festivals.map(renderFestivalCard).join("") || emptyState("No edge festivals surfaced yet.")}
        </section>
      </section>
    `;
  }

  function renderLensSwitcher(currentMode) {
    return `
      <nav class="lens-switcher-strip" aria-label="Lens stories">
        ${Object.entries(modes).map(([id, mode]) => `
          <button class="${currentMode === id ? "active" : ""}" onclick="FieldLensApp.setMode('${id}')">
            <span>${mode.eyebrow}</span>
            <strong>${escapeHtml(mode.title)}</strong>
          </button>
        `).join("")}
      </nav>
    `;
  }

  function renderRhythmCard(group, edge) {
    return `
      <article class="rhythm-card" onclick="FieldLensApp.openGroup('${group.id}')">
        <div class="rhythm-color" style="background:${group.color}"></div>
        <div>
          <h3>${escapeHtml(group.name)}</h3>
          <p>${escapeHtml(group.rhythm)}</p>
          <div class="rhythm-meter"><i style="width:${edge.computedStrength}%;background:${group.color}"></i></div>
          <small>${escapeHtml(edge.relationshipState)} - ${escapeHtml(edge.accessLevel)} access - ${edge.computedStrength}% strength</small>
        </div>
      </article>
    `;
  }

  function renderWarmEvent(event, personId) {
    const relevantGroups = unique([...event.linkedGroups, ...event.relevantGroups]).map(id => FieldMath.getGroup(data, id)).filter(Boolean);
    const shallow = event.access === "public" || event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold");
    const state = event.attendance.attending.includes(personId) ? "committed" : event.attendance.interested.includes(personId) ? "saved" : "nearby";
    return `
      <article class="warm-event" onclick="FieldLensApp.openEvent('${event.id}')">
        <time>${escapeHtml(event.time)}</time>
        <div>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${shallow ? "Bridge-friendly participation" : "Deeper community layer"} - ${escapeHtml(state)}</p>
          <div class="chip-line">${relevantGroups.slice(0, 3).map(group => `<span style="border-color:${group.color};color:${group.color}">${escapeHtml(group.name)}</span>`).join("")}</div>
        </div>
      </article>
    `;
  }

  function renderExpansionCard(group, existingEdge, anchor) {
    const signal = existingEdge ? `${existingEdge.relationshipState} edge already exists` : "new community edge";
    const threshold = group.state === "public" ? "try a public room" : "read agreement, then request access";
    return `
      <article class="expansion-card" onclick="FieldLensApp.openGroup('${group.id}')" style="--group-color:${group.color}">
        <div class="expansion-topline">
          <span>${escapeHtml(signal)}</span>
          <strong>${anchor ? `${anchor.score}% overlap` : "fresh"}</strong>
        </div>
        <h2>${escapeHtml(group.name)}</h2>
        <p>${escapeHtml(group.description)}</p>
        <div class="expansion-route">
          <span>${escapeHtml(threshold)}</span>
          <small>${anchor ? `Nearest anchor: ${escapeHtml(anchor.name)}` : "No strong known anchor yet"}</small>
        </div>
      </article>
    `;
  }

  function renderEdgeEvent(event, personId) {
    const shallow = event.access === "public" || event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold");
    const commitment = event.attendance.attending.includes(personId) ? "already participating" : event.attendance.interested.includes(personId) ? "interest marked" : "possible first step";
    return `
      <article class="edge-event" onclick="FieldLensApp.openEvent('${event.id}')">
        <span class="${shallow ? "bridge" : "depth"}">${shallow ? "bridge" : "depth"}</span>
        <div>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(event.time)} - ${escapeHtml(commitment)}</p>
        </div>
      </article>
    `;
  }

  function strongestKnownOverlap(groupId, edges) {
    return edges
      .filter(edge => edge.groupId !== groupId)
      .map(edge => {
        const other = FieldMath.getGroup(data, edge.groupId);
        const overlap = FieldMath.computeGroupOverlap(data, edge.groupId, groupId);
        return other ? { name: other.name, score: overlap.score } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)[0] || null;
  }

  function renderLensHero(person, context) {
    const mode = modes[context.mode];
    return `
      <section class="lens-hero lens-${mode.tone}">
        <div class="hero-copy-block">
          <div class="eyebrow">${mode.eyebrow}</div>
          <h1>${mode.title}</h1>
          <p>${mode.prompt}</p>
        </div>
        <div class="hero-status">
          <div class="avatar">${escapeHtml(person.name[0])}</div>
          <div>
            <strong>${escapeHtml(person.name)}</strong>
            <span>${escapeHtml(person.lifeContext)}</span>
          </div>
        </div>
        <div class="hero-metrics">
          ${metric("events", context.primaryEvents.length)}
          ${metric("communities", context.primaryGroups.length)}
          ${metric("mode", context.mode.replace("-", " "))}
        </div>
      </section>
    `;
  }

  function renderLensStage(person, edges, context) {
    const nodes = buildStageNodes(person, edges, context);
    return `
      <section class="field-stage lens-${modes[context.mode].tone}">
        <div class="mode-panel">
          ${Object.entries(modes).map(([id, mode]) => `
            <button class="mode-button ${context.mode === id ? "active" : ""}" onclick="FieldLensApp.setMode('${id}')">
              <span>${mode.eyebrow}</span>
              <strong>${mode.title.replace("Exploring ", "").replace("Viewing ", "")}</strong>
            </button>
          `).join("")}
        </div>
        <div class="field-canvas" aria-label="Field lens visualization">
          ${nodes.links}
          ${nodes.groups}
          ${nodes.events}
          <div class="ego-node">You</div>
        </div>
        <aside class="field-panel">
          <div class="panel-label">How this lens is composed</div>
          <p>${escapeHtml(context.message)}</p>
          <div class="field-legend">
            <span><i class="legend-dot solid"></i>direct commitment</span>
            <span><i class="legend-dot woven"></i>connected relevance</span>
            <span><i class="legend-dot edge"></i>expansion edge</span>
          </div>
        </aside>
      </section>
    `;
  }

  function buildStageNodes(person, edges, context) {
    const groupSlots = [
      [18, 26], [32, 66], [52, 22], [70, 58], [84, 31], [48, 76]
    ];
    const eventSlots = [
      [20, 54], [38, 35], [58, 64], [76, 43], [67, 18], [32, 82]
    ];
    const groups = context.primaryGroups.slice(0, 6).map((group, index) => {
      const edge = edges.find(item => item.groupId === group.id);
      const [x, y] = groupSlots[index];
      const size = 50 + (edge ? edge.computedStrength * 0.35 : 10);
      return { group, x, y, size };
    });
    const groupIndex = Object.fromEntries(groups.map(item => [item.group.id, item]));
    const events = context.primaryEvents.slice(0, 6).map((event, index) => {
      const [x, y] = eventSlots[index];
      const colorGroup = FieldMath.getGroup(data, event.relevantGroups[0] || event.linkedGroups[0]);
      return { event, x, y, color: colorGroup ? colorGroup.color : "#4a7c59" };
    });
    const groupHtml = groups.map(item => `
      <button class="stage-node group-node" style="left:${item.x}%;top:${item.y}%;width:${item.size}px;height:${item.size}px;background:${item.group.color};" onclick="FieldLensApp.openGroup('${item.group.id}')">
        ${escapeHtml(shortLabel(item.group.name))}
      </button>
    `).join("");
    const eventHtml = events.map(item => `
      <button class="stage-node event-node-lens" style="left:${item.x}%;top:${item.y}%;border-color:${item.color};" onclick="FieldLensApp.openEvent('${item.event.id}')">
        <span>${escapeHtml(item.event.time.split(" ")[0])}</span>
      </button>
    `).join("");
    const linkHtml = [
      ...groups.map(item => linkStyle(50, 50, item.x, item.y, item.group.color, "group-link")),
      ...events.flatMap(item => unique([...item.event.linkedGroups, ...item.event.relevantGroups]).slice(0, 2).map(groupId => {
        const target = groupIndex[groupId];
        return target ? linkStyle(item.x, item.y, target.x, target.y, target.group.color, "event-link") : "";
      }))
    ].join("");
    return { groups: groupHtml, events: eventHtml, links: linkHtml };
  }

  function renderLensDetails(context) {
    return `
      <section class="lens-details">
        <div class="detail-column">
          <div class="section-kicker">Offerings and events</div>
          ${context.primaryEvents.slice(0, 7).map(renderEventRow).join("") || emptyState("No events in this lens yet.")}
        </div>
        <div class="detail-column">
          <div class="section-kicker">Communities in view</div>
          ${context.primaryGroups.slice(0, 7).map(renderCommunityRow).join("") || emptyState("No communities in this lens yet.")}
        </div>
        <div class="detail-column quiet">
          <div class="section-kicker">Next doors</div>
          ${context.sideGroups.slice(0, 4).map(renderDoorRow).join("") || context.sideEvents.slice(0, 4).map(renderEventRow).join("") || emptyState("No extra doors in this mode.")}
        </div>
      </section>
    `;
  }

  function renderEventRow(event) {
    const venue = FieldMath.getVenue(data, event.venueId);
    const groups = unique([...event.linkedGroups, ...event.relevantGroups]).map(id => FieldMath.getGroup(data, id)).filter(Boolean).slice(0, 3);
    return `
      <article class="event-row" onclick="FieldLensApp.openEvent('${event.id}')">
        <time>${escapeHtml(event.time)}</time>
        <div>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(venue.name)} - ${escapeHtml(event.audience)}</p>
          <div class="chip-line">${groups.map(group => `<span style="border-color:${group.color};color:${group.color}">${escapeHtml(group.name)}</span>`).join("")}</div>
        </div>
      </article>
    `;
  }

  function renderCommunityRow(group) {
    return `
      <article class="community-row" onclick="FieldLensApp.openGroup('${group.id}')">
        <i style="background:${group.color}"></i>
        <div>
          <h3>${escapeHtml(group.name)}</h3>
          <p>${escapeHtml(group.entryGuidance)}</p>
        </div>
      </article>
    `;
  }

  function renderDoorRow(group) {
    return `
      <button class="door-row" onclick="FieldLensApp.openGroup('${group.id}')">
        <span style="background:${group.color}"></span>
        Explore ${escapeHtml(group.name)}
      </button>
    `;
  }

  function renderFestivalCard(festival) {
    const hostGroups = festival.hostGroupIds.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean);
    return `
      <article class="festival-card" onclick="FieldLensApp.openFestival('${festival.id}')">
        <div class="festival-card-head">
          <span>${escapeHtml(festival.time)}</span>
          <strong>${festival.subEvents.length} sub-events</strong>
        </div>
        <h3>${escapeHtml(festival.title)}</h3>
        <p>${escapeHtml(festival.summary)}</p>
        <div class="chip-line">${hostGroups.slice(0, 4).map(group => `<span style="border-color:${group.color};color:${group.color}">${escapeHtml(group.name)}</span>`).join("")}</div>
      </article>
    `;
  }

  function openEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event) return;
    const venue = FieldMath.getVenue(data, event.venueId);
    const linkedFestivals = (data.festivals || []).filter(festival => festival.subEvents.some(subEvent => subEvent.hostGroupIds.some(groupId => event.relevantGroups.includes(groupId) || event.linkedGroups.includes(groupId))));
    openDrawer(event.title, `
      <p>${escapeHtml(event.time)} at ${escapeHtml(venue.name)}</p>
      <p>${escapeHtml(event.audience)}</p>
      ${renderParticipantOrigins("event", event)}
      ${linkedFestivals.length ? `
        <section class="drawer-section">
          <div class="section-kicker">Festival context</div>
          ${linkedFestivals.map(renderFestivalMiniLink).join("")}
        </section>
      ` : ""}
      <div class="drawer-actions">
        <button onclick="FieldLensApp.attendEvent('${event.id}')">Mark participating</button>
        <button onclick="FieldLensApp.markInterested('${event.id}')">Follow interest</button>
      </div>
    `);
  }

  function openGroup(groupId) {
    const group = FieldMath.getGroup(data, groupId);
    if (!group) return;
    openDrawer(group.name, `
      <p>${escapeHtml(group.description)}</p>
      <p><strong>Entry:</strong> ${escapeHtml(group.entryGuidance)}</p>
      <div class="chip-line">${group.tags.slice(0, 5).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      ${renderParticipantOrigins("group", group)}
      ${renderForumThreads("community", group.id)}
    `);
  }

  function openFestival(festivalId) {
    const festival = (data.festivals || []).find(item => item.id === festivalId);
    if (!festival) return;
    const hostGroups = festival.hostGroupIds.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean);
    const venues = festival.venueIds.map(venueId => FieldMath.getVenue(data, venueId)).filter(Boolean);
    openDrawer(festival.title, `
      <p>${escapeHtml(festival.time)} - ${escapeHtml(festival.summary)}</p>
      <div class="chip-line">${hostGroups.map(group => `<span style="border-color:${group.color};color:${group.color}">${escapeHtml(group.name)}</span>`).join("")}</div>
      <section class="drawer-section">
        <div class="section-kicker">Where it happens</div>
        ${venues.map(venue => `<div class="drawer-card"><strong>${escapeHtml(venue.name)}</strong><br><span>${escapeHtml(venue.type)} - ${escapeHtml(venue.location)}</span></div>`).join("")}
      </section>
      ${renderParticipantOrigins("festival", festival)}
      <section class="drawer-section">
        <div class="section-kicker">Festival program</div>
        ${festival.subEvents.map(renderSubEventRow).join("")}
      </section>
      ${renderForumThreads("festival", festival.id)}
    `);
  }

  function attendEvent(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event.attendance.attending.includes(data.currentPersonId)) event.attendance.attending.push(data.currentPersonId);
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    saveData();
    render();
    openDrawer("Participation marked", `<p>${escapeHtml(event.title)} is now in your current involvements.</p>`);
  }

  function markInterested(eventId) {
    const event = data.events.find(item => item.id === eventId);
    if (!event.attendance.interested.includes(data.currentPersonId)) event.attendance.interested.push(data.currentPersonId);
    saveData();
    render();
    openDrawer("Interest followed", `<p>${escapeHtml(event.title)} now shapes your connected field.</p>`);
  }

  function renderParticipantOrigins(type, item) {
    const peopleIds = getParticipantIdsFor(type, item);
    const origins = buildParticipantOrigins(peopleIds, type === "group" ? item.id : null);
    return `
      <section class="drawer-section">
        <div class="section-kicker">Where people are coming from</div>
        <div class="origin-summary">
          ${metric("people", peopleIds.length)}
          ${metric("source groups", origins.length)}
          ${metric("strong ties", origins.filter(origin => origin.strongCount > 0).length)}
        </div>
        <div class="origin-list">
          ${origins.slice(0, 5).map(renderOriginRow).join("") || emptyState("No participant source signal yet.")}
        </div>
      </section>
    `;
  }

  function renderOriginRow(origin) {
    return `
      <article class="origin-row">
        <span style="background:${origin.group.color}"></span>
        <div>
          <strong>${escapeHtml(origin.group.name)}</strong>
          <p>${origin.peopleCount} people - ${origin.strongCount} strong or trusted ties - ${origin.states.map(escapeHtml).join(", ")}</p>
        </div>
      </article>
    `;
  }

  function renderSubEventRow(subEvent) {
    const venue = FieldMath.getVenue(data, subEvent.venueId);
    const groups = subEvent.hostGroupIds.map(groupId => FieldMath.getGroup(data, groupId)).filter(Boolean);
    return `
      <article class="sub-event-row">
        <span class="${escapeHtml(subEvent.participationMode)}">${escapeHtml(subEvent.participationMode)}</span>
        <div>
          <h3>${escapeHtml(subEvent.title)}</h3>
          <p>${escapeHtml(subEvent.time)} at ${escapeHtml(venue.name)} - ${escapeHtml(subEvent.note)}</p>
          <div class="chip-line">${groups.map(group => `<span style="border-color:${group.color};color:${group.color}">${escapeHtml(group.name)}</span>`).join("")}</div>
        </div>
      </article>
    `;
  }

  function renderForumThreads(scopeType, scopeId) {
    const threads = (data.forumThreads || []).filter(thread => thread.scopeType === scopeType && thread.scopeId === scopeId);
    return `
      <section class="drawer-section forum-block">
        <div class="section-kicker">${scopeType === "festival" ? "Festival forum" : "Community forum"}</div>
        ${threads.map(thread => {
          const author = FieldMath.getPerson(data, thread.authorId);
          return `
            <article class="forum-thread">
              <h3>${escapeHtml(thread.title)}</h3>
              <p>${escapeHtml(author ? author.name : "Unknown")} - ${escapeHtml(thread.lastActivity)} - ${thread.replies} replies</p>
              <div class="chip-line">${thread.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            </article>
          `;
        }).join("") || emptyState("No forum threads in this scope yet.")}
      </section>
    `;
  }

  function renderFestivalMiniLink(festival) {
    return `
      <button class="festival-mini-link" onclick="FieldLensApp.openFestival('${festival.id}')">
        <strong>${escapeHtml(festival.title)}</strong>
        <span>${escapeHtml(festival.time)} - ${festival.subEvents.length} sub-events</span>
      </button>
    `;
  }

  function getParticipantIdsFor(type, item) {
    if (type === "event") return unique([...(item.attendance.interested || []), ...(item.attendance.attending || [])]);
    if (type === "festival") return unique([...(item.attendance.interested || []), ...(item.attendance.attending || [])]);
    if (type === "group") {
      const edgePeople = FieldMath.getEdgesForGroup(data, item.id).map(edge => edge.personId);
      const eventPeople = data.events
        .filter(event => event.linkedGroups.includes(item.id) || event.relevantGroups.includes(item.id))
        .flatMap(event => [...event.attendance.interested, ...event.attendance.attending]);
      const festivalPeople = (data.festivals || [])
        .filter(festival => festival.hostGroupIds.includes(item.id))
        .flatMap(festival => [...festival.attendance.interested, ...festival.attendance.attending]);
      return unique([...edgePeople, ...eventPeople, ...festivalPeople]);
    }
    return [];
  }

  function buildParticipantOrigins(personIds, currentGroupId = null) {
    const origins = {};
    personIds.forEach(personId => {
      FieldMath.getEdgesForPerson(data, personId).forEach(edge => {
        if (edge.groupId === currentGroupId) return;
        const group = FieldMath.getGroup(data, edge.groupId);
        if (!group) return;
        if (!origins[group.id]) {
          origins[group.id] = { group, people: new Set(), strongCount: 0, states: new Set() };
        }
        origins[group.id].people.add(personId);
        origins[group.id].states.add(edge.relationshipState);
        if (FieldMath.computeEngagementStrength(edge) >= 45 || ["member", "trusted", "core"].includes(edge.accessLevel)) {
          origins[group.id].strongCount += 1;
        }
      });
    });
    return Object.values(origins)
      .map(origin => ({
        group: origin.group,
        peopleCount: origin.people.size,
        strongCount: origin.strongCount,
        states: Array.from(origin.states).slice(0, 3)
      }))
      .sort((a, b) => b.peopleCount - a.peopleCount || b.strongCount - a.strongCount);
  }

  function getRelevantFestivalsForPerson(personId, groupIds = []) {
    const groupSet = new Set(groupIds);
    return (data.festivals || []).filter(festival =>
      festival.attendance.interested.includes(personId) ||
      festival.attendance.attending.includes(personId) ||
      festival.hostGroupIds.some(groupId => groupSet.has(groupId)) ||
      festival.subEvents.some(subEvent => subEvent.hostGroupIds.some(groupId => groupSet.has(groupId)))
    );
  }

  function setMode(mode) {
    data.currentMode = mode;
    saveData();
    render();
  }

  function metric(label, value) {
    return `<div><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function linkStyle(x1, y1, x2, y2, color, className) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return `<i class="stage-link ${className}" style="left:${x1}%;top:${y1}%;width:${length}%;transform:rotate(${angle}deg);background:${color};"></i>`;
  }

  function userHelpsHoldEvent(event, personId) {
    return event.hostId === personId || (event.cohostIds || []).includes(personId) || (event.volunteerIds || []).includes(personId);
  }

  function touchesGroups(event, groupIds) {
    return unique([...event.linkedGroups, ...event.relevantGroups]).some(groupId => groupIds.includes(groupId));
  }

  function isDormant(edge) {
    return edge.relationshipState === "dormant" || edge.decayState === "dormant" || edge.decayState === "fading";
  }

  function shortLabel(name) {
    return name.split(/[ /]+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
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
    setMode,
    openEvent,
    openGroup,
    openFestival,
    attendEvent,
    markInterested
  };
})();

document.addEventListener("DOMContentLoaded", FieldLensApp.init);

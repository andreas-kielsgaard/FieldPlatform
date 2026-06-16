(function () {
  const state = {
    demo: window.ConsciousTribeSeed.createDemoState(),
    view: "square",
    stance: "arrive",
    selected: { type: "invitation", id: "inv_post_dance_tea" },
    namingPathId: "",
    lastAction: ""
  };

  const els = {
    viewStage: byId("viewStage"),
    contextPanel: byId("contextPanel"),
    stanceButtons: byId("stanceButtons"),
    stanceCopy: byId("stanceCopy"),
    toastRegion: byId("toastRegion"),
    resetDemo: byId("resetDemo")
  };

  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  els.resetDemo.addEventListener("click", resetDemo);

  render();

  function handleClick(event) {
    const nav = event.target.closest("[data-nav-view]");
    if (nav) {
      state.view = nav.dataset.navView;
      state.namingPathId = "";
      ensureSelectionForView();
      render();
      return;
    }

    const stance = event.target.closest("[data-stance]");
    if (stance) {
      state.stance = stance.dataset.stance;
      render();
      return;
    }

    const selector = event.target.closest("[data-select-type]");
    if (selector) {
      state.selected = {
        type: selector.dataset.selectType,
        id: selector.dataset.selectId
      };
      state.namingPathId = "";
      render();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      handleAction(actionButton.dataset.action, {
        id: actionButton.dataset.id || "",
        pathId: actionButton.dataset.pathId || "",
        thresholdId: actionButton.dataset.thresholdId || ""
      });
    }
  }

  function handleSubmit(event) {
    const form = event.target.closest("#namePathForm");
    if (!form) return;
    event.preventDefault();
    const path = findPath(form.elements.pathId.value);
    if (!path) return;

    const name = form.elements.pathName.value.trim() || path.suggestedName || path.title;
    path.title = name;
    path.named = true;
    path.status = path.status === "threshold" ? "threshold-open" : "open";
    path.visibility = path.visibilityTone === "member"
      ? "Named for members and stewards, public outline remains gentle"
      : "Public path with care note attached";
    path.openedBy = "Named in this demo";
    state.namingPathId = "";
    state.selected = { type: "path", id: path.id };
    pushActivity(`Opened path: ${name}`);
    flash("Path named and opened in the field.");
    render();
  }

  function handleAction(action, payload) {
    const selected = getSelected();
    const targetPathId = payload.pathId || selected.pathId || selected.id;
    const thresholdId = payload.thresholdId || selected.thresholdId || selected.id;

    if (action === "namePath") {
      const path = findPath(targetPathId) || findFirstPathForSelected(selected);
      if (path) {
        state.namingPathId = path.id;
        state.selected = { type: "path", id: path.id };
        render();
      }
      return;
    }

    if (action === "returnDormant") {
      const dormant = state.demo.myField.dormantThread;
      dormant.status = "returning";
      const path = findPath("path_dormant_ecstatic");
      if (path) {
        path.status = "returning";
        path.summary = "The old dance thread is now a gentle maybe, with tea named as the softest re-entry.";
      }
      pushActivity("Dormant dance thread moved into gentle return.");
      flash("Dormant thread marked as gently returning.");
      render();
      return;
    }

    if (action === "askEdge") {
      const threshold = findThreshold(thresholdId) || thresholdForSelected(selected);
      if (threshold) {
        threshold.status = "Question sent at the edge";
        threshold.lastCare = "A steward sees a practical question, not a private identity story.";
        pushActivity(`Asked at the edge: ${threshold.title}`);
        flash("A careful question was placed at the edge.");
        state.selected = { type: "threshold", id: threshold.id };
        render();
      }
      return;
    }

    if (action === "openToMembers") {
      const threshold = findThreshold(thresholdId);
      if (threshold) {
        threshold.status = "Opened to members with care";
        threshold.visibilityChoice = "Member-visible, public outline unchanged";
        threshold.lastCare = "The doorway is clearer for trusted members; public copy stays bounded.";
        const relatedPath = threshold.id === "th_somatic_lab" ? findPath("path_ci_somatic") : null;
        if (relatedPath) relatedPath.status = "threshold-open";
        pushActivity(`Opened threshold to members: ${threshold.title}`);
        flash("Threshold opened to members while the public edge stays protected.");
        render();
      }
      return;
    }

    if (action === "keepHeld") {
      const threshold = findThreshold(thresholdId) || thresholdForSelected(selected);
      if (threshold) {
        threshold.status = "Kept held";
        threshold.lastCare = "The useful public signal remains; intimate detail stays out of view.";
        pushActivity(`Kept held: ${threshold.title}`);
        flash("Kept held with a clearer care note.");
        state.selected = { type: "threshold", id: threshold.id };
        render();
      }
      return;
    }

    const messages = {
      sitFire: "This fire is now marked as a possible landing.",
      followGrove: "This grove will stay visible in your forest.",
      keepWatching: "Kept at the edge without pressure.",
      helpTend: "A tending offer was added to the demo state.",
      comeSupport: "The path will look for a bridge person or softer doorway.",
      inviteFriend: "Prepared a public path invite without private traces."
    };

    if (messages[action]) {
      selected[action] = true;
      pushActivity(`${messages[action]} ${selected.title ? selected.title : ""}`.trim());
      flash(messages[action]);
      render();
    }
  }

  function render() {
    renderNav();
    renderStances();
    renderView();
    renderContextPanel();
  }

  function renderNav() {
    document.querySelectorAll("[data-nav-view]").forEach(button => {
      const isSelected = button.dataset.navView === state.view;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-current", isSelected ? "page" : "false");
    });
  }

  function renderStances() {
    const stance = currentStance();
    els.stanceCopy.textContent = stance.copy;
    els.stanceButtons.innerHTML = state.demo.stances.map(item => `
      <button class="stance-button ${item.id === state.stance ? "is-selected" : ""}" type="button" data-stance="${esc(item.id)}">
        <span>${esc(item.label)}</span>
        <small>${esc(item.question)}</small>
      </button>
    `).join("");
  }

  function renderView() {
    if (state.view === "square") renderVillageSquare();
    if (state.view === "my-field") renderMyField();
    if (state.view === "map") renderFieldMap();
    if (state.view === "edges") renderStewardedEdges();
  }

  function renderVillageSquare() {
    const invitations = sortedInvitations();
    const openedPaths = state.demo.paths.filter(path => path.named || path.status === "threshold-open");

    els.viewStage.innerHTML = `
      <section class="surface-heading">
        <div>
          <p class="eyebrow">Village square</p>
          <h2>What is being shared around the fire?</h2>
        </div>
        <p>The square is not a feed. It is the part of the field people are intentionally making visible today.</p>
      </section>

      ${openedPaths.length ? `
        <section class="opened-path-band">
          <div>
            <p class="eyebrow">Newly opened path</p>
            <h3>${esc(openedPaths[0].title)}</h3>
            <p>${esc(openedPaths[0].summary)}</p>
          </div>
          <button class="button primary" type="button" data-select-type="path" data-select-id="${esc(openedPaths[0].id)}">See path</button>
        </section>
      ` : ""}

      <section class="invitation-grid">
        ${invitations.map(invitationCard).join("")}
      </section>

      <section class="field-note-row" aria-label="Field notes">
        ${fieldNoteMarkup("Warm meeting points", "The strongest arrivals today are tea, beginner landing, and the public intro. Each has a named person carrying the room.")}
        ${fieldNoteMarkup("Adjacent world", "Ecstatic Dance -> Harbor Tea -> Authentic Relating is visible as a possible path, not a required funnel.")}
        ${fieldNoteMarkup("Held detail", "Returning dancers are visible only as a general care pattern. Names and reasons remain private.")}
      </section>
    `;
  }

  function invitationCard(item) {
    const selected = isSelected("invitation", item.id);
    const groves = item.groveIds.map(id => findGrove(id)?.title).filter(Boolean).join(" + ");
    return `
      <article class="invitation-card ${selected ? "is-selected" : ""}" data-tone="${esc(item.visibilityTone)}">
        <button class="card-button" type="button" data-select-type="invitation" data-select-id="${esc(item.id)}">
          <span class="kind-label">${esc(item.kind)}</span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.summary)}</p>
          <dl class="meta-grid">
            <div><dt>Carried by</dt><dd>${esc(item.carrier)}</dd></div>
            <div><dt>Grove</dt><dd>${esc(groves)}</dd></div>
            <div><dt>When</dt><dd>${esc(item.time)} at ${esc(item.venue)}</dd></div>
            <div><dt>Visibility</dt><dd>${esc(item.visibility)}</dd></div>
          </dl>
          <div class="care-line">
            <strong>Threshold care</strong>
            <span>${esc(item.threshold)}</span>
          </div>
        </button>
      </article>
    `;
  }

  function renderMyField() {
    const field = state.demo.myField;
    els.viewStage.innerHTML = `
      <section class="surface-heading">
        <div>
          <p class="eyebrow">My field</p>
          <h2>How am I held in the forest?</h2>
        </div>
        <p>${esc(state.demo.currentPerson.note)}</p>
      </section>

      <section class="person-season">
        <div>
          <p class="eyebrow">Viewing as ${esc(state.demo.currentPerson.name)}</p>
          <h3>${esc(state.demo.currentPerson.season)}</h3>
        </div>
        <button class="button secondary" type="button" data-select-type="fieldItem" data-select-id="field_self">See whole ecology</button>
      </section>

      <section class="ecology-grid">
        ${field.layers.map(layerCard).join("")}
      </section>

      <section class="nourishment-band">
        <div>
          <p class="eyebrow">Nourishment rhythm</p>
          <h3>Receive, contribute, rest, bridge</h3>
        </div>
        <div class="meter-grid">
          ${field.nourishment.map(meterMarkup).join("")}
        </div>
      </section>

      <section class="dormant-card ${field.dormantThread.status === "returning" ? "is-returning" : ""}">
        <div>
          <span class="kind-label">Dormant relation</span>
          <h3>${esc(field.dormantThread.title)}</h3>
          <p>${esc(field.dormantThread.summary)}</p>
          <p class="visibility-copy">${esc(field.dormantThread.visibility)}. Status: ${esc(field.dormantThread.status)}.</p>
        </div>
        <div class="button-row">
          <button class="button primary" type="button" data-action="returnDormant" data-id="${esc(field.dormantThread.id)}">Return to thread</button>
          <button class="button secondary" type="button" data-select-type="path" data-select-id="path_dormant_ecstatic">See path</button>
        </div>
      </section>
    `;
  }

  function layerCard(layer) {
    const selected = isSelected("fieldLayer", layer.id);
    return `
      <article class="layer-card ${selected ? "is-selected" : ""}">
        <button class="card-button" type="button" data-select-type="fieldLayer" data-select-id="${esc(layer.id)}">
          <span class="kind-label">${esc(layer.tone)}</span>
          <h3>${esc(layer.title)}</h3>
          <p>${esc(layer.summary)}</p>
          <ul>
            ${layer.items.map(item => `<li>${esc(item)}</li>`).join("")}
          </ul>
          <p class="visibility-copy">${esc(layer.visibleTo)}</p>
        </button>
      </article>
    `;
  }

  function meterMarkup(item) {
    return `
      <article class="meter-card">
        <div class="meter-head">
          <strong>${esc(item.label)}</strong>
          <span>${esc(item.value)}%</span>
        </div>
        <div class="meter-track"><span style="width: ${Number(item.value)}%"></span></div>
        <p>${esc(item.detail)}</p>
      </article>
    `;
  }

  function renderFieldMap() {
    els.viewStage.innerHTML = `
      <section class="surface-heading">
        <div>
          <p class="eyebrow">Field map</p>
          <h2>Campfires, groves, paths, and mycelium.</h2>
        </div>
        <p>Lines show visible ways between rooms. Some are open, some are subtle, and some stop at a threshold.</p>
      </section>

      <section class="map-shell">
        <div class="map-legend" aria-label="Map legend">
          <span><i class="legend-open"></i>Open path</span>
          <span><i class="legend-mycelium"></i>Mycelium trace</span>
          <span><i class="legend-threshold"></i>Threshold</span>
          <span><i class="legend-dormant"></i>Dormant</span>
        </div>
        <div class="field-canvas" id="fieldCanvas">
          ${mapSvg()}
          ${state.demo.mapNodes.map(mapNodeMarkup).join("")}
          ${pathLabelsMarkup()}
        </div>
      </section>
    `;
  }

  function mapSvg() {
    const lines = state.demo.mapLinks.map(link => {
      const from = findNode(link.from);
      const to = findNode(link.to);
      if (!from || !to) return "";
      const path = link.pathId ? findPath(link.pathId) : null;
      const className = path ? `map-line ${pathLineClass(path)}` : `map-line ${link.type}`;
      return `<line class="${esc(className)}" x1="${from.x}%" y1="${from.y}%" x2="${to.x}%" y2="${to.y}%" />`;
    }).join("");
    return `<svg class="map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>`;
  }

  function mapNodeMarkup(node) {
    const selected = isSelected(node.refType, node.refId);
    return `
      <button class="map-node node-${esc(node.type)} ${selected ? "is-selected" : ""}" style="left: ${node.x}%; top: ${node.y}%;" type="button" data-select-type="${esc(node.refType)}" data-select-id="${esc(node.refId)}">
        <span>${esc(node.label)}</span>
        <small>${esc(node.type)}</small>
      </button>
    `;
  }

  function pathLabelsMarkup() {
    return state.demo.mapLinks
      .filter(link => link.pathId)
      .map(link => {
        const from = findNode(link.from);
        const to = findNode(link.to);
        const path = findPath(link.pathId);
        if (!from || !to || !path) return "";
        const x = (from.x + to.x) / 2;
        const y = (from.y + to.y) / 2;
        return `
          <button class="path-label ${pathLineClass(path)}" style="left: ${x}%; top: ${y}%;" type="button" data-select-type="path" data-select-id="${esc(path.id)}">
            ${esc(path.named ? path.title : link.label)}
          </button>
        `;
      }).join("");
  }

  function renderStewardedEdges() {
    els.viewStage.innerHTML = `
      <section class="surface-heading">
        <div>
          <p class="eyebrow">Stewarded edges</p>
          <h2>Visibility is careful, contextual, and consent-aware.</h2>
        </div>
        <p>Some things should be findable. Some should be held. This surface shows the edge work between those truths.</p>
      </section>

      <section class="threshold-list">
        ${state.demo.thresholds.map(thresholdCard).join("")}
      </section>
    `;
  }

  function thresholdCard(threshold) {
    const selected = isSelected("threshold", threshold.id);
    return `
      <article class="threshold-card ${selected ? "is-selected" : ""}">
        <button class="card-button" type="button" data-select-type="threshold" data-select-id="${esc(threshold.id)}">
          <div class="threshold-topline">
            <span class="kind-label">${esc(threshold.status)}</span>
            <span class="visibility-pill">${esc(threshold.visibilityChoice)}</span>
          </div>
          <h3>${esc(threshold.title)}</h3>
          <p>${esc(threshold.careQuestion)}</p>
          <dl class="meta-grid">
            <div><dt>Steward</dt><dd>${esc(threshold.steward)}</dd></div>
            <div><dt>Who may see</dt><dd>${esc(threshold.whoCanSee)}</dd></div>
            <div><dt>Protected</dt><dd>${esc(threshold.whatProtected)}</dd></div>
          </dl>
          ${threshold.lastCare ? `<p class="care-note">${esc(threshold.lastCare)}</p>` : ""}
        </button>
        <div class="threshold-actions">
          ${threshold.actions.map(action => actionButton(action, threshold)).join("")}
        </div>
      </article>
    `;
  }

  function renderContextPanel() {
    const selected = getSelected();
    const normalized = normalizeItem(selected);
    const paths = relatedPaths(selected);
    const actions = normalized.actions || [];

    els.contextPanel.innerHTML = `
      <section class="context-header">
        <p class="eyebrow">Paths open from here</p>
        <h2>${esc(normalized.title)}</h2>
        <p>${esc(normalized.summary)}</p>
      </section>

      <section class="visibility-box" data-tone="${esc(normalized.visibilityTone || "public")}">
        <span class="kind-label">${esc(normalized.kind || "field context")}</span>
        <h3>${esc(normalized.visibility || "Visible with context")}</h3>
        <p>${esc(normalized.whatVisible || normalized.whyVisible || "This appears because it has been intentionally made visible in this context.")}</p>
      </section>

      <section class="context-section">
        <h3>Why this appears</h3>
        <p>${esc(normalized.whyVisible || normalized.whyMatters || "A visible path, grove, or stewarded signal makes this relevant here.")}</p>
      </section>

      <section class="context-section">
        <h3>What stays held</h3>
        <p>${esc(normalized.heldBack || normalized.whatHeld || normalized.care || normalized.threshold || "Private ties, consent, and intimate room details are not flattened into public content.")}</p>
      </section>

      ${paths.length ? `
        <section class="context-section">
          <h3>Open paths nearby</h3>
          <div class="path-chip-list">
            ${paths.map(path => `
              <button class="path-chip ${isSelected("path", path.id) ? "is-selected" : ""}" type="button" data-select-type="path" data-select-id="${esc(path.id)}">
                <span>${esc(path.title)}</span>
                <small>${esc(path.kind)}</small>
              </button>
            `).join("")}
          </div>
        </section>
      ` : ""}

      <section class="context-section">
        <h3>Ways in</h3>
        <div class="action-list">
          ${actions.length ? actions.map(action => actionButton(action, selected)).join("") : emptyState("No direct move is offered here.", "Sometimes the right path is to keep watching.")}
        </div>
      </section>

      ${state.namingPathId ? renderNamePathForm() : ""}

      ${state.demo.activity.length ? `
        <section class="activity-log">
          <h3>Demo changes</h3>
          <ul>${state.demo.activity.slice(-3).reverse().map(item => `<li>${esc(item)}</li>`).join("")}</ul>
        </section>
      ` : ""}
    `;
  }

  function actionButton(action, owner) {
    const thresholdId = owner && owner.id && owner.id.indexOf("th_") === 0 ? owner.id : (owner.thresholdId || "");
    const pathId = action.pathId || (owner && owner.id && owner.id.indexOf("path_") === 0 ? owner.id : "");
    return `
      <button class="path-action" type="button" data-action="${esc(action.actionId)}" data-id="${esc(owner?.id || "")}" data-path-id="${esc(pathId)}" data-threshold-id="${esc(thresholdId)}">
        <span>${esc(action.label)}</span>
        <small>${esc(action.detail)}</small>
      </button>
    `;
  }

  function renderNamePathForm() {
    const path = findPath(state.namingPathId);
    if (!path) return "";
    return `
      <form class="name-path-form" id="namePathForm">
        <input type="hidden" name="pathId" value="${esc(path.id)}">
        <label>
          Name this path
          <input name="pathName" value="${esc(path.suggestedName || path.title)}" maxlength="70">
        </label>
        <p>${esc(path.care)}</p>
        <div class="button-row">
          <button class="button primary" type="submit">Open path</button>
          <button class="button secondary" type="button" data-select-type="path" data-select-id="${esc(path.id)}">Cancel</button>
        </div>
      </form>
    `;
  }

  function fieldNoteMarkup(title, body) {
    return `
      <article class="field-note">
        <h3>${esc(title)}</h3>
        <p>${esc(body)}</p>
      </article>
    `;
  }

  function emptyState(title, body) {
    return `
      <div class="empty-state">
        <strong>${esc(title)}</strong>
        <p>${esc(body)}</p>
      </div>
    `;
  }

  function sortedInvitations() {
    return [...state.demo.invitations].sort((a, b) => {
      const bScore = b.stanceFit[state.stance] || 0;
      const aScore = a.stanceFit[state.stance] || 0;
      return bScore - aScore || a.title.localeCompare(b.title);
    });
  }

  function relatedPaths(item) {
    if (!item) return [];
    if (item.id && item.id.indexOf("path_") === 0) return [item];
    if (item.pathIds) return item.pathIds.map(findPath).filter(Boolean);
    if (item.id && item.id.indexOf("grove_") === 0) {
      return state.demo.paths.filter(path => path.source === item.title || path.target === item.title);
    }
    if (item.relatedId) return relatedPaths(findItem(item.relatedType, item.relatedId));
    return [];
  }

  function normalizeItem(item) {
    if (!item) return {};
    if (item.id && item.id.indexOf("path_") === 0) {
      return {
        ...item,
        kind: item.kind,
        visibilityTone: item.visibilityTone,
        whatVisible: item.visibility,
        heldBack: item.care,
        whyVisible: item.whyVisible,
        actions: item.actions
      };
    }
    if (item.id && item.id.indexOf("th_") === 0) {
      return {
        ...item,
        kind: "threshold care",
        summary: item.careQuestion,
        visibility: item.visibilityChoice,
        visibilityTone: "stewarded",
        whatVisible: item.whoCanSee,
        heldBack: item.whatProtected,
        whyVisible: `Stewarded by ${item.steward}. ${item.status}.`,
        actions: item.actions
      };
    }
    if (item.id && item.id.indexOf("field_") === 0) {
      return {
        ...item,
        kind: item.title,
        visibilityTone: "held",
        whyVisible: item.summary,
        heldBack: item.visibleTo,
        actions: item.actions
      };
    }
    return item;
  }

  function ensureSelectionForView() {
    if (state.view === "edges" && state.selected.type !== "threshold") {
      state.selected = { type: "threshold", id: "th_somatic_lab" };
    }
    if (state.view === "my-field" && !["fieldItem", "fieldLayer", "path", "grove"].includes(state.selected.type)) {
      state.selected = { type: "fieldItem", id: "field_self" };
    }
    if (state.view === "square" && state.selected.type === "threshold") {
      state.selected = { type: "invitation", id: "inv_post_dance_tea" };
    }
  }

  function getSelected() {
    return findItem(state.selected.type, state.selected.id) || state.demo.invitations[0];
  }

  function findItem(type, id) {
    if (type === "invitation") return state.demo.invitations.find(item => item.id === id);
    if (type === "grove") return findGrove(id);
    if (type === "path") return findPath(id);
    if (type === "threshold") return findThreshold(id);
    if (type === "fieldItem") return state.demo.fieldItems.find(item => item.id === id) || state.demo.myField.dormantThread;
    if (type === "fieldLayer") return state.demo.myField.layers.find(item => item.id === id);
    return null;
  }

  function findGrove(id) {
    return state.demo.groves.find(item => item.id === id);
  }

  function findPath(id) {
    return state.demo.paths.find(item => item.id === id);
  }

  function findThreshold(id) {
    return state.demo.thresholds.find(item => item.id === id);
  }

  function findNode(id) {
    return state.demo.mapNodes.find(item => item.id === id);
  }

  function findFirstPathForSelected(item) {
    const paths = relatedPaths(item);
    return paths[0] || null;
  }

  function thresholdForSelected(item) {
    if (!item) return null;
    if (item.id === "field_edges") return findThreshold("th_private_queer_edge");
    if (item.thresholdId) return findThreshold(item.thresholdId);
    if (item.relatedType && item.relatedId) return findThreshold(item.id);
    return state.demo.thresholds.find(threshold => threshold.relatedId === item.id) || null;
  }

  function currentStance() {
    return state.demo.stances.find(item => item.id === state.stance) || state.demo.stances[0];
  }

  function pathLineClass(path) {
    if (path.status === "dormant") return "dormant";
    if (path.status === "returning") return "returning";
    if (path.status === "suggested") return "suggested";
    if (path.status === "threshold-open") return "threshold-open";
    if (path.status === "stewarded" || path.status === "threshold") return "threshold";
    if (path.named || path.status === "open") return "open";
    return "mycelium";
  }

  function isSelected(type, id) {
    return state.selected.type === type && state.selected.id === id;
  }

  function pushActivity(message) {
    state.demo.activity.push(message);
  }

  function flash(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    els.toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2400);
  }

  function resetDemo() {
    state.demo = window.ConsciousTribeSeed.createDemoState();
    state.view = "square";
    state.stance = "arrive";
    state.selected = { type: "invitation", id: "inv_post_dance_tea" };
    state.namingPathId = "";
    render();
    flash("Demo reset.");
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();

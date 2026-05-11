(function () {
  const calc = window.ParticipantOrientationCalculations;
  const sectionLabels = {
    continue: "Continue what already works",
    dormant: "Re-enter dormant threads",
    close: "Close to your current field",
    newConnected: "New but connected",
    openings: "Openings this week",
    places: "Places where your communities gather",
    softWays: "Soft ways into unfamiliar spaces"
  };

  const data = window.ParticipantOrientationSeed.createDemoData();
  const initialState = () => ({
    personaId: "newcomer",
    view: "home",
    selectedObjectId: null,
    objects: {}
  });
  let state = initialState();

  const els = {
    personaSelect: byId("personaSelect"),
    personaDescription: byId("personaDescription"),
    personaSignals: byId("personaSignals"),
    tabs: Array.from(document.querySelectorAll("[data-view]")),
    homeView: byId("homeView"),
    listView: byId("listView"),
    sectionStack: byId("sectionStack"),
    contextList: byId("contextList"),
    fieldPreviewNodes: byId("fieldPreviewNodes"),
    debugOutput: byId("debugOutput"),
    drawer: byId("threadDrawer"),
    backdrop: byId("drawerBackdrop"),
    threadTitle: byId("threadTitle"),
    threadBody: byId("threadBody")
  };

  bindEvents();
  render();

  function bindEvents() {
    els.personaSelect.addEventListener("change", () => {
      state.personaId = els.personaSelect.value;
      state.selectedObjectId = null;
      render();
    });

    els.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        state.view = tab.dataset.view;
        render();
      });
    });

    byId("resetDemo").addEventListener("click", () => {
      state = initialState();
      closeThread();
      render();
      flash("Demo data reset.");
    });

    byId("closeThread").addEventListener("click", closeThread);
    els.backdrop.addEventListener("click", closeThread);
  }

  function render() {
    renderPersonaControls();
    renderView();
    const opportunities = opportunitiesForCurrentPersona();
    renderFieldPreview(opportunities);
    renderHome(opportunities);
    renderList(opportunities);
    renderDebug();
    attachCardActions();
  }

  function renderPersonaControls() {
    els.personaSelect.innerHTML = data.personas.map(persona =>
      `<option value="${escapeHtml(persona.id)}">${escapeHtml(persona.name)}</option>`
    ).join("");
    els.personaSelect.value = state.personaId;

    const persona = currentPersona();
    els.personaDescription.textContent = persona.description;
    els.personaSignals.innerHTML = [
      ...persona.tags.slice(0, 4).map(tag => `<span>${escapeHtml(tag)}</span>`),
      ...persona.needs.slice(0, 3).map(need => `<span>${escapeHtml(readable(need))}</span>`)
    ].join("");
  }

  function renderView() {
    els.tabs.forEach(tab => tab.classList.toggle("is-selected", tab.dataset.view === state.view));
    els.homeView.classList.toggle("is-active", state.view === "home");
    els.listView.classList.toggle("is-active", state.view === "list");
  }

  function opportunitiesForCurrentPersona() {
    const persona = currentPersona();
    return calc.allObjects(data)
      .map(object => calc.makeOpportunity(persona, object, data, state))
      .sort((a, b) => b.score - a.score)
      .slice(0, 28);
  }

  function renderFieldPreview(opportunities) {
    const buckets = ["familiar", "dormant", "adjacent", "unfamiliar"].map(kind => ({
      kind,
      count: opportunities.filter(item => item.classification.familiarity === kind).length
    }));
    els.fieldPreviewNodes.innerHTML = buckets.map(bucket => `
      <div class="field-node field-${escapeHtml(bucket.kind)}">
        <strong>${escapeHtml(bucket.count)}</strong>
        <span>${escapeHtml(readable(bucket.kind))}</span>
      </div>
    `).join("");
  }

  function renderHome(opportunities) {
    const persona = currentPersona();
    const orderedSections = [
      ...persona.preferredSections,
      ...Object.keys(sectionLabels).filter(section => !persona.preferredSections.includes(section))
    ];
    const markup = orderedSections.map(section => {
      const items = opportunities
        .filter(item => item.classification.section === section)
        .slice(0, section === "openings" ? 5 : 4);
      if (!items.length) return "";
      return `
        <section class="opportunity-section">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${escapeHtml(sectionContext(section))}</p>
              <h3>${escapeHtml(sectionLabels[section])}</h3>
            </div>
            <span>${items.length}</span>
          </div>
          <div class="card-grid">
            ${items.map(cardMarkup).join("")}
          </div>
        </section>
      `;
    }).join("");

    els.sectionStack.innerHTML = markup || emptyState("Nothing surfaced yet.", "Try another persona or reset the demo.");
  }

  function renderList(opportunities) {
    els.contextList.innerHTML = opportunities.slice(0, 20).map(item => `
      <article class="list-row" data-object-id="${escapeHtml(item.object.id)}">
        <div>
          <span class="object-type">${escapeHtml(calc.typeLabel(item.object.type))}</span>
          <h4>${escapeHtml(item.object.name)}</h4>
          <p>${escapeHtml(item.why)}</p>
        </div>
        <div class="list-meta">
          ${pill(item.classification.familiarity, "familiarity")}
          ${pill(readable(item.classification.path), "path")}
          <span>${escapeHtml(item.threadSummary)}</span>
        </div>
        <button class="button compact secondary" type="button" data-action="thread" data-object-id="${escapeHtml(item.object.id)}">Open thread</button>
      </article>
    `).join("");
  }

  function cardMarkup(item) {
    const object = item.object;
    const objectState = item.state;
    return `
      <article class="opportunity-card" data-object-id="${escapeHtml(object.id)}">
        <div class="card-topline">
          <span class="object-type">${escapeHtml(calc.typeLabel(object.type))}</span>
          <span class="score">${escapeHtml(String(item.score))}</span>
        </div>
        <h4>${escapeHtml(object.name)}</h4>
        <p>${escapeHtml(object.description)}</p>
        ${object.when || object.venueId ? `<p class="card-place">${escapeHtml(whenWhere(object))}</p>` : ""}
        <div class="pill-row">
          ${pill(item.classification.familiarity, "familiarity")}
          ${pill(readable(item.classification.path), "path")}
          ${objectState.saved ? pill("saved", "state") : ""}
          ${objectState.interested ? pill("interested", "state") : ""}
          ${objectState.followed ? pill("following", "state") : ""}
          ${objectState.reactivated ? pill("reactivating", "state") : ""}
        </div>
        <div class="why-block">
          <strong>${escapeHtml(item.why)}</strong>
          <span>${escapeHtml(item.threadSummary)}</span>
        </div>
        <div class="card-actions">
          <button class="button compact primary" type="button" data-action="thread" data-object-id="${escapeHtml(object.id)}">Open thread</button>
          <button class="button compact secondary" type="button" data-action="view" data-object-id="${escapeHtml(object.id)}">View object</button>
          ${actionButtons(object, item.classification)}
        </div>
      </article>
    `;
  }

  function actionButtons(object, classification) {
    if (classification.familiarity === "dormant" || classification.path === "re-entry") {
      return `<button class="button compact secondary" type="button" data-action="reactivate" data-object-id="${escapeHtml(object.id)}">Reactivate thread</button>`;
    }
    if (object.type === "community" || object.type === "field" || object.type === "facilitator") {
      return `<button class="button compact secondary" type="button" data-action="follow" data-object-id="${escapeHtml(object.id)}">Follow</button>`;
    }
    if (object.type === "event") {
      return `<button class="button compact secondary" type="button" data-action="interest" data-object-id="${escapeHtml(object.id)}">Mark interested</button>`;
    }
    return `<button class="button compact secondary" type="button" data-action="save" data-object-id="${escapeHtml(object.id)}">Save</button>`;
  }

  function attachCardActions() {
    document.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        const objectId = button.dataset.objectId;
        if (action === "thread" || action === "view") {
          openThread(objectId, action === "view");
          return;
        }
        mutateObjectState(objectId, action);
      });
    });
  }

  function mutateObjectState(objectId, action) {
    state.objects[objectId] = state.objects[objectId] || {};
    if (action === "save") state.objects[objectId].saved = true;
    if (action === "interest") state.objects[objectId].interested = true;
    if (action === "follow") state.objects[objectId].followed = true;
    if (action === "reactivate") state.objects[objectId].reactivated = true;
    state.selectedObjectId = objectId;
    render();
    flash(`${readable(action)} noted.`);
  }

  function openThread(objectId, fromView) {
    state.selectedObjectId = objectId;
    const item = opportunitiesForCurrentPersona().find(entry => entry.object.id === objectId);
    if (!item) return;

    els.threadTitle.textContent = item.object.name;
    els.threadBody.innerHTML = `
      <div class="thread-summary">
        <span class="object-type">${escapeHtml(calc.typeLabel(item.object.type))}</span>
        ${pill(item.classification.familiarity, "familiarity")}
        ${pill(readable(item.classification.path), "path")}
        <p>${escapeHtml(fromView ? item.object.description : item.why)}</p>
      </div>
      ${item.threads.map(threadMarkup).join("")}
    `;
    els.drawer.classList.add("is-open");
    els.drawer.removeAttribute("aria-hidden");
    els.backdrop.hidden = false;
    renderDebug();
  }

  function threadMarkup(thread) {
    return `
      <section class="thread-card">
        <div class="thread-card-heading">
          <h3>${escapeHtml(thread.title)}</h3>
          <span>${escapeHtml(thread.confidence)}% soft confidence</span>
        </div>
        <ol class="thread-path">
          ${thread.nodes.map((node, index) => `
            <li>
              <span>${escapeHtml(node.type)}</span>
              <strong>${escapeHtml(node.label)}</strong>
              ${thread.relations[index] ? `<em>${escapeHtml(thread.relations[index])}</em>` : ""}
            </li>
          `).join("")}
        </ol>
        <p>${escapeHtml(thread.explanation)}</p>
        <div class="next-step">Possible next step: ${escapeHtml(thread.nextStep)}</div>
      </section>
    `;
  }

  function closeThread() {
    els.drawer.classList.remove("is-open");
    els.drawer.setAttribute("aria-hidden", "true");
    els.backdrop.hidden = true;
  }

  function renderDebug() {
    const persona = currentPersona();
    const item = state.selectedObjectId
      ? opportunitiesForCurrentPersona().find(entry => entry.object.id === state.selectedObjectId)
      : opportunitiesForCurrentPersona()[0];
    if (!item) return;

    els.debugOutput.textContent = JSON.stringify({
      selectedPersona: persona.name,
      selectedObject: {
        id: item.object.id,
        type: item.object.type,
        name: item.object.name
      },
      classification: item.classification,
      score: item.score,
      threads: item.threads,
      relevantParticipationEdges: calc.relevantEdges(persona, item.object, data),
      demoState: state.objects[item.object.id] || {}
    }, null, 2);
  }

  function currentPersona() {
    return data.personas.find(persona => persona.id === state.personaId) || data.personas[0];
  }

  function sectionContext(section) {
    return {
      continue: "Familiar rhythms",
      dormant: "Soft re-entry",
      close: "Adjacent openings",
      newConnected: "Readable horizon",
      openings: "Time-sensitive",
      places: "Venue threads",
      softWays: "Low threshold"
    }[section] || "Context";
  }

  function whenWhere(object) {
    if (object.type !== "event") return "";
    const venue = calc.getObject(data, "venue", object.venueId);
    return `${object.when || "Time not set"} - ${venue?.name || "Venue not shown"}`;
  }

  function pill(label, kind) {
    return `<span class="pill pill-${escapeHtml(kind)}">${escapeHtml(label)}</span>`;
  }

  function emptyState(title, detail) {
    return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></div>`;
  }

  function flash(message) {
    const notice = document.createElement("div");
    notice.className = "toast";
    notice.textContent = message;
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 2400);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function readable(value) {
    return String(value || "").replace(/-/g, " ").replace(/_/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
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

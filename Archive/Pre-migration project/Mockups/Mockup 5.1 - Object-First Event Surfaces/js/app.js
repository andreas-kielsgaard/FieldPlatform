(function () {
  const platform = window.FieldPlatformDomain.createPlatformDomain({
    storageKey: "field_platform_mockup_5_1"
  });
  platform.resetDatabase();

  const copy = window.Mockup51Copy;
  const vm = window.Mockup51ViewModel.createViewModel(platform, copy);
  vm.seedPrototypeRelations();
  const state = {
    surface: "public",
    reviewCommunityId: "ecstatic",
    reviewNotice: ""
  };

  const els = {
    publicSurface: byId("publicSurface"),
    stewardSurface: byId("stewardSurface"),
    surfaceTabs: Array.from(document.querySelectorAll("[data-surface]")),
    eventTitle: byId("publicTitle"),
    eventAudience: byId("eventAudience"),
    eventTime: byId("eventTime"),
    eventVenue: byId("eventVenue"),
    venuePreview: byId("venuePreview"),
    eventHost: byId("eventHost"),
    hostPreview: byId("hostPreview"),
    eventAccess: byId("eventAccess"),
    eventCost: byId("eventCost"),
    eventFor: byId("eventFor"),
    eventExperience: byId("eventExperience"),
    eventEntrySupport: byId("eventEntrySupport"),
    eventRequirements: byId("eventRequirements"),
    expectationList: byId("expectationList"),
    connectionCards: byId("connectionCards"),
    waysInGroups: byId("waysInGroups"),
    drawer: byId("suggestDrawer"),
    backdrop: byId("drawerBackdrop"),
    suggestForm: byId("suggestForm"),
    targetCommunity: byId("targetCommunity"),
    connectionType: byId("connectionType"),
    suggestVisibility: byId("suggestVisibility"),
    suggestReason: byId("suggestReason"),
    reviewCommunity: byId("reviewCommunity"),
    reviewingForText: byId("reviewingForText"),
    reviewCommunityTitle: byId("reviewCommunityTitle"),
    pendingCount: byId("pendingCount"),
    reviewNotice: byId("reviewNotice"),
    suggestionList: byId("suggestionList"),
    reviewedList: byId("reviewedList")
  };

  bindEvents();
  render();

  function bindEvents() {
    els.surfaceTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        state.surface = tab.dataset.surface;
        renderSurfaces();
      });
    });

    byId("resetDemo").addEventListener("click", () => {
      platform.resetDatabase();
      vm.seedPrototypeRelations();
      state.reviewNotice = "";
      render();
      flash("Demo data reset.");
    });
    byId("attendEvent").addEventListener("click", () => {
      platform.events.get(vm.currentEventId).registerUser(platform.users.get(vm.currentUserId));
      flash("Added Casey to attending for this event.");
      renderPublicEvent();
    });
    byId("markInterested").addEventListener("click", () => {
      platform.events.get(vm.currentEventId).markUserInterested(platform.users.get(vm.currentUserId));
      flash("Marked Casey as interested.");
      renderPublicEvent();
    });
    byId("askFacilitator").addEventListener("click", () => {
      flash("Question flow is a future expansion in this prototype.");
    });
    byId("openSuggest").addEventListener("click", openDrawer);
    byId("closeSuggest").addEventListener("click", closeDrawer);
    byId("cancelSuggest").addEventListener("click", closeDrawer);
    els.backdrop.addEventListener("click", closeDrawer);
    els.suggestForm.addEventListener("submit", submitSuggestion);
    els.reviewCommunity.addEventListener("change", () => {
      state.reviewCommunityId = els.reviewCommunity.value;
      state.reviewNotice = "";
      renderStewardSurface();
    });
  }

  function render() {
    renderSurfaces();
    renderPublicEvent();
    renderDrawerOptions();
    renderReviewCommunityOptions();
    renderStewardSurface();
  }

  function renderSurfaces() {
    els.surfaceTabs.forEach(tab => {
      tab.classList.toggle("is-selected", tab.dataset.surface === state.surface);
    });
    els.publicSurface.classList.toggle("is-active", state.surface === "public");
    els.stewardSurface.classList.toggle("is-active", state.surface === "steward");
  }

  function renderPublicEvent() {
    const page = vm.eventPage();
    els.eventTitle.textContent = page.title;
    els.eventAudience.textContent = `Facilitator's audience note: ${page.audienceNote}`;
    els.eventTime.textContent = page.time;
    els.eventVenue.textContent = page.venue;
    renderPreview(els.venuePreview, page.venuePreview);
    els.eventHost.textContent = page.host;
    renderPreview(els.hostPreview, page.hostPreview);
    els.eventAccess.textContent = page.access;
    els.eventCost.textContent = page.cost;
    els.eventFor.textContent = page.forText;
    els.eventExperience.textContent = page.experience;
    els.eventEntrySupport.textContent = page.entrySupport;
    els.eventRequirements.textContent = page.requirements;
    els.expectationList.innerHTML = page.practicalDetails.map(expectationMarkup).join("");

    const connections = vm.eventConnections();
    els.connectionCards.innerHTML = connections.length
      ? connections.map(connectionCardMarkup).join("")
      : emptyState("No related community context yet.", "You can suggest where this event may belong.");

    const ways = vm.waysInGroups();
    els.waysInGroups.innerHTML = ways.length
      ? ways.map(wayGroupMarkup).join("")
      : emptyState("No first step is shown yet.", "A community steward may need to review a connection first.");
  }

  function renderDrawerOptions() {
    els.targetCommunity.innerHTML = vm.targetCommunityChoices()
      .map(choice => `<option value="${escapeHtml(choice.id)}">${escapeHtml(choice.label)}</option>`)
      .join("");
    els.connectionType.innerHTML = copy.suggestionKinds
      .map(choice => `<option value="${escapeHtml(choice.value)}">${escapeHtml(choice.label)}</option>`)
      .join("");
    els.suggestVisibility.innerHTML = copy.visibilityOptions
      .map(choice => `<option value="${escapeHtml(choice.value)}">${escapeHtml(choice.label)}</option>`)
      .join("");
  }

  function renderReviewCommunityOptions() {
    els.reviewCommunity.innerHTML = vm.reviewCommunityChoices()
      .map(choice => `<option value="${escapeHtml(choice.id)}">${escapeHtml(choice.label)}</option>`)
      .join("");
    els.reviewCommunity.value = state.reviewCommunityId;
  }

  function renderStewardSurface() {
    els.reviewCommunity.value = state.reviewCommunityId;
    const communityName = vm.labelFor("community", state.reviewCommunityId);
    const pending = vm.pendingSuggestions(state.reviewCommunityId);
    const reviewed = vm.reviewedSuggestions(state.reviewCommunityId);

    els.reviewingForText.textContent = `Reviewing for ${communityName}.`;
    els.reviewCommunityTitle.textContent = `Reviewing for ${communityName}`;
    els.pendingCount.textContent = String(pending.length);
    els.reviewNotice.hidden = !state.reviewNotice;
    els.reviewNotice.textContent = state.reviewNotice;
    els.suggestionList.innerHTML = pending.length
      ? pending.map(suggestionCardMarkup).join("")
      : emptyState("No suggestions waiting.", "New community context suggestions will appear here.");

    els.reviewedList.innerHTML = reviewed.length
      ? `<h4>Recently decided</h4>${reviewed.map(reviewedCardMarkup).join("")}`
      : "";

    els.suggestionList.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => reviewSuggestion(button.dataset.action, button.dataset.relationId));
    });
  }

  function renderPreview(element, preview) {
    if (!preview) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    element.querySelector("summary").textContent = preview.summary || `Get to know ${preview.title}`;
    element.querySelector("p").innerHTML = preview.lines.map(line => escapeHtml(line)).join("<br>");
  }

  function expectationMarkup(item) {
    const body = item.items && item.items.length
      ? `<ul class="compact-list">${item.items.map(value => `<li>${escapeHtml(value)}</li>`).join("")}</ul>`
      : `<p>${escapeHtml(item.text)}</p>`;
    return `
      <article class="expectation-item">
        <h4>${escapeHtml(item.title)}</h4>
        ${body}
      </article>
    `;
  }

  function connectionCardMarkup(card) {
    const context = card.participantContext;
    return `
      <article class="connection-card participant-context-card">
        <div class="context-card-topline">
          <span>${escapeHtml(context.section)}</span>
          <strong>${escapeHtml(context.objectType)}</strong>
        </div>
        <span class="type-badge">${escapeHtml(context.typeLabel)}</span>
        <h4>${escapeHtml(context.title)}</h4>
        <p>${escapeHtml(context.body)}</p>
        <p class="supporting-detail">${escapeHtml(context.detail)}</p>
        ${card.communityPreview ? previewDetailsMarkup("Get to know this community", card.communityPreview) : ""}
      </article>
    `;
  }

  function dimensionMarkup(label, value, type) {
    return `
      <div class="dimension dimension-${escapeHtml(type)}">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function previewDetailsMarkup(summary, preview) {
    return `
      <details class="object-preview inline-preview">
        <summary>${escapeHtml(summary)}</summary>
        <p>${preview.lines.map(line => escapeHtml(line)).join("<br>")}</p>
      </details>
    `;
  }

  function wayGroupMarkup(group) {
    return `
      <section class="way-group way-${escapeHtml(group.kind)}">
        <div>
          <div class="context-card-topline">
            <h4>${escapeHtml(group.target)}</h4>
            <strong>${escapeHtml(group.targetType || "Object")}</strong>
          </div>
          <p>${escapeHtml(group.detail)}</p>
        </div>
        <div class="way-actions">
          ${group.actions.map(action => `<button class="way-button" type="button">${escapeHtml(action)}</button>`).join("")}
        </div>
      </section>
    `;
  }

  function suggestionCardMarkup(card) {
    const event = card.eventSummary;
    return `
      <article class="suggestion-card">
        <div class="suggestion-topline">
          <span>Suggested connection</span>
          <strong>${escapeHtml(card.source)} to ${escapeHtml(card.target)}</strong>
        </div>
        <div class="relation-adapter">
          <strong>${escapeHtml(card.objectPair)}</strong>
          <span>${escapeHtml(card.relationFamily)}</span>
        </div>
        <div class="review-grid">
          <section class="native-identity">
            <p class="eyebrow">Event being reviewed</p>
            <h4>${escapeHtml(event ? event.title : card.source)}</h4>
            ${event ? `
              <dl>
                <div><dt>Time</dt><dd>${escapeHtml(event.time)}</dd></div>
                <div><dt>Venue</dt><dd>${escapeHtml(event.venue)}</dd></div>
                <div><dt>Host</dt><dd>${escapeHtml(event.host)}</dd></div>
                <div><dt>Access</dt><dd>${escapeHtml(event.access)}</dd></div>
                <div><dt>Cost</dt><dd>${escapeHtml(event.cost)}</dd></div>
                <div><dt>For</dt><dd>${escapeHtml(event.audience)}</dd></div>
                <div><dt>Experience</dt><dd>${escapeHtml(event.experience)}</dd></div>
              </dl>
            ` : ""}
          </section>
          <section>
            <div class="dimension-grid review-dimensions">
              ${dimensionMarkup("Connection type", card.connectionType, "type")}
              ${dimensionMarkup("Review state", card.reviewState, "review")}
              ${dimensionMarkup("Visibility", card.visibility, "visibility")}
              ${dimensionMarkup("Evidence/source", card.evidenceSource, "evidence")}
            </div>
            <h4>Evidence before decision</h4>
            <div class="evidence-panel">
              ${comparisonMarkup("Suggested by", card.suggestedBy)}
              ${comparisonMarkup("Suggester relation", card.suggesterRelation)}
              ${comparisonMarkup("Host relation", card.hostRelation)}
              ${comparisonMarkup("Participant overlap", card.participantOverlap)}
              ${comparisonMarkup("Shared tags", card.sharedTags.length ? card.sharedTags.join(", ") : "No shared tags shown")}
              ${comparisonMarkup("Shared venue", card.sharedVenue)}
              ${comparisonMarkup("Temporal signal", card.temporalSignal)}
              ${comparisonMarkup("Prior relation", card.priorRelation)}
              ${comparisonMarkup("Expected consequence", card.acceptingWould)}
            </div>
            <details>
              <summary>Why this appears</summary>
              <p>${escapeHtml(card.why)}</p>
              ${evidenceMarkup(card.evidence)}
              <p class="propagation-note">${escapeHtml(card.patternMeaning)}</p>
            </details>
            ${unclearMarkup(card.unclear)}
          </section>
        </div>
        <div class="review-actions">
          <button class="button compact primary" type="button" data-action="accept" data-relation-id="${escapeHtml(card.id)}" title="${escapeHtml(copy.reviewConsequences.accept)}">Accept</button>
          <button class="button compact secondary" type="button" data-action="refine" data-relation-id="${escapeHtml(card.id)}" title="${escapeHtml(copy.reviewConsequences.refine)}">Refine</button>
          <button class="button compact secondary" type="button" data-action="redirect" data-relation-id="${escapeHtml(card.id)}" title="${escapeHtml(copy.reviewConsequences.redirect)}">Redirect</button>
          <button class="button compact secondary" type="button" data-action="computed" data-relation-id="${escapeHtml(card.id)}" title="${escapeHtml(copy.reviewConsequences.computed)}">Keep as pattern only</button>
          <button class="button compact danger" type="button" data-action="decline" data-relation-id="${escapeHtml(card.id)}" title="${escapeHtml(copy.reviewConsequences.decline)}">Decline</button>
        </div>
      </article>
    `;
  }

  function comparisonMarkup(label, value) {
    return `
      <div class="comparison-item">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function reviewedCardMarkup(card) {
    return `
      <details class="reviewed-card">
        <summary>
          <strong>${escapeHtml(card.reviewState)}</strong>
          <span>${escapeHtml(card.source)} connected to ${escapeHtml(card.target)}</span>
        </summary>
        <div class="dimension-grid">
          ${dimensionMarkup("Connection type", card.connectionType, "type")}
          ${dimensionMarkup("Review state", card.reviewState, "review")}
          ${dimensionMarkup("Visibility", card.visibility, "visibility")}
          ${dimensionMarkup("Evidence/source", card.evidenceSource, "evidence")}
        </div>
        <p>${escapeHtml(card.why)}</p>
        <p class="propagation-note">${escapeHtml(card.patternMeaning)}</p>
        <p class="propagation-note">${escapeHtml(card.acceptingWould)}</p>
      </details>
    `;
  }

  function evidenceMarkup(evidence) {
    if (!evidence || !evidence.length) return "";
    return `<ul class="evidence-list">${evidence.map(item => `<li><b>${escapeHtml(item.type)}:</b> ${escapeHtml(item.label)}</li>`).join("")}</ul>`;
  }

  function unclearMarkup(items) {
    if (!items || !items.length) return "";
    return `
      <details class="unclear-details">
        <summary>What may be unclear</summary>
        <ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </details>
    `;
  }

  function openDrawer() {
    renderDrawerOptions();
    els.drawer.removeAttribute("aria-hidden");
    els.drawer.classList.add("is-open");
    els.backdrop.hidden = false;
    els.suggestReason.focus();
  }

  function closeDrawer() {
    els.drawer.setAttribute("aria-hidden", "true");
    els.drawer.classList.remove("is-open");
    els.backdrop.hidden = true;
    els.suggestForm.reset();
  }

  function submitSuggestion(event) {
    event.preventDefault();
    const targetId = els.targetCommunity.value;
    const reason = els.suggestReason.value.trim();
    platform.fieldRelations.suggest({
      sourceType: "event",
      sourceId: vm.currentEventId,
      targetType: "community",
      targetId,
      relationKind: els.connectionType.value,
      relationStrength: 36,
      reviewAuthorityType: "community",
      reviewAuthorityId: targetId,
      visibility: els.suggestVisibility.value,
      reason,
      evidence: [{ type: "person_reason", label: reason }],
      holdTypes: ["stewardship", "context"],
      movementUnlocked: ["ask_steward", "follow"]
    }, vm.currentUserId);

    state.reviewCommunityId = targetId;
    state.reviewNotice = "";
    closeDrawer();
    render();
    flash("Suggested connection - waiting for review.");
  }

  function reviewSuggestion(action, relationId) {
    const reviewerId = vm.stewardFor(state.reviewCommunityId);
    if (action === "accept") {
      const message = vm.reviewActionMessage(action, relationId, state.reviewCommunityId);
      platform.fieldRelations.accept(relationId, reviewerId, "Accepted from steward surface.");
      state.reviewNotice = message;
      flash(message);
    } else if (action === "refine") {
      const message = vm.reviewActionMessage(action, relationId, state.reviewCommunityId);
      platform.fieldRelations.refine(relationId, reviewerId, {
        relationKind: "good_first_step_for",
        visibility: "public",
        movementUnlocked: ["attend", "follow", "request_access"],
        reason: "Adjusted as a possible first step before becoming visible."
      }, "Refined before publishing as context.");
      state.reviewNotice = message;
      flash(message);
    } else if (action === "redirect") {
      const nextTarget = state.reviewCommunityId === "tea" ? "ci" : "tea";
      const message = vm.reviewActionMessage(action, relationId, state.reviewCommunityId, nextTarget);
      platform.fieldRelations.redirect(relationId, reviewerId, "community", nextTarget, "Redirected to a better community context.");
      state.reviewCommunityId = nextTarget;
      state.reviewNotice = `${message} Reviewing for ${vm.labelFor("community", nextTarget)} now.`;
      flash(message);
    } else if (action === "decline") {
      const message = vm.reviewActionMessage(action, relationId, state.reviewCommunityId);
      platform.fieldRelations.decline(relationId, reviewerId, "Not useful to show as a connection right now.");
      state.reviewNotice = message;
      flash(message);
    } else if (action === "computed") {
      const message = vm.reviewActionMessage(action, relationId, state.reviewCommunityId);
      platform.fieldRelations.markComputedOnly(relationId, reviewerId, "Kept as a pattern without community endorsement.");
      state.reviewNotice = message;
      flash(message);
    }
    render();
  }

  function flash(message) {
    const notice = document.createElement("div");
    notice.className = "toast";
    notice.textContent = message;
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 3600);
  }

  function emptyState(title, detail) {
    return `
      <div class="empty-state">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(detail)}</p>
      </div>
    `;
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

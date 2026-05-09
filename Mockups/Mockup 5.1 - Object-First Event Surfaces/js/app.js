(function () {
  const platform = window.FieldPlatformDomain.createPlatformDomain({
    storageKey: "field_platform_mockup_5_1"
  });
  platform.resetDatabase();

  const copy = window.Mockup51Copy;
  const vm = window.Mockup51ViewModel.createViewModel(platform, copy);
  const state = {
    surface: "public",
    reviewCommunityId: "ecstatic"
  };

  const els = {
    publicSurface: byId("publicSurface"),
    stewardSurface: byId("stewardSurface"),
    surfaceTabs: Array.from(document.querySelectorAll("[data-surface]")),
    eventTitle: byId("publicTitle"),
    eventAudience: byId("eventAudience"),
    eventTime: byId("eventTime"),
    eventVenue: byId("eventVenue"),
    eventHost: byId("eventHost"),
    eventAccess: byId("eventAccess"),
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
    reviewCommunityTitle: byId("reviewCommunityTitle"),
    pendingCount: byId("pendingCount"),
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
      render();
      flash("Demo data reset.");
    });
    byId("attendEvent").addEventListener("click", () => {
      platform.events.get(vm.currentEventId).registerUser(platform.users.get("p_casey"));
      flash("Added Casey to attending for this event.");
      renderPublicEvent();
    });
    byId("markInterested").addEventListener("click", () => {
      platform.events.get(vm.currentEventId).markUserInterested(platform.users.get("p_casey"));
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
    els.eventAudience.textContent = page.audience;
    els.eventTime.textContent = page.time;
    els.eventVenue.textContent = page.venue;
    els.eventHost.textContent = page.host;
    els.eventAccess.textContent = page.access;
    els.expectationList.innerHTML = page.expectations.map(expectationMarkup).join("");

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

    els.reviewCommunityTitle.textContent = communityName;
    els.pendingCount.textContent = String(pending.length);
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

  function expectationMarkup(item) {
    return `
      <article class="expectation-item">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `;
  }

  function connectionCardMarkup(card) {
    return `
      <article class="connection-card">
        <div class="badge-row">${card.badges.map(badgeMarkup).join("")}</div>
        <h4>${escapeHtml(card.title)}</h4>
        <p class="connection-line">${escapeHtml(card.source)} connected to ${escapeHtml(card.target)}</p>
        <div class="card-meta">
          <span>${escapeHtml(card.status)}</span>
          <span>${escapeHtml(card.visibility)}</span>
        </div>
        <details>
          <summary>Why this appears</summary>
          <p>${escapeHtml(card.why)}</p>
          ${evidenceMarkup(card.evidence)}
        </details>
        ${unclearMarkup(card.unclear)}
      </article>
    `;
  }

  function wayGroupMarkup(group) {
    return `
      <section class="way-group">
        <div>
          <h4>${escapeHtml(group.target)}</h4>
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
          <span class="status-chip waiting">Waiting for review</span>
          <span>${escapeHtml(card.suggestedBy)}</span>
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
              </dl>
              <p>${escapeHtml(event.audience)}</p>
            ` : ""}
          </section>
          <section>
            <div class="badge-row">${card.badges.map(badgeMarkup).join("")}</div>
            <h4>${escapeHtml(card.title)}</h4>
            <p>${escapeHtml(card.why)}</p>
            ${evidenceMarkup(card.evidence)}
            ${unclearMarkup(card.unclear)}
            <details>
              <summary>What will this change?</summary>
              <p>${escapeHtml(card.acceptingWould)}</p>
              <p>${escapeHtml(card.patternMeaning)}</p>
            </details>
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

  function reviewedCardMarkup(card) {
    return `
      <article class="reviewed-card">
        <strong>${escapeHtml(card.status)}</strong>
        <span>${escapeHtml(card.source)} connected to ${escapeHtml(card.target)}</span>
      </article>
    `;
  }

  function badgeMarkup(label) {
    return `<span class="type-badge">${escapeHtml(label)}</span>`;
  }

  function evidenceMarkup(evidence) {
    if (!evidence || !evidence.length) return "";
    return `<ul class="evidence-list">${evidence.map(item => `<li>${escapeHtml(item.label || item.type)}</li>`).join("")}</ul>`;
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
    }, "p_casey");

    state.reviewCommunityId = targetId;
    closeDrawer();
    render();
    flash("Suggested connection - waiting for review.");
  }

  function reviewSuggestion(action, relationId) {
    const reviewerId = vm.stewardFor(state.reviewCommunityId);
    if (action === "accept") {
      platform.fieldRelations.accept(relationId, reviewerId, "Accepted from steward surface.");
      flash("Accepted. This connection can now appear as visible context.");
    } else if (action === "refine") {
      platform.fieldRelations.refine(relationId, reviewerId, {
        relationKind: "good_first_step_for",
        visibility: "public",
        movementUnlocked: ["attend", "follow", "request_access"],
        reason: "Adjusted as a possible first step before becoming visible."
      }, "Refined before publishing as context.");
      flash("Refined. The connection was adjusted before becoming visible.");
    } else if (action === "redirect") {
      const nextTarget = state.reviewCommunityId === "tea" ? "ci" : "tea";
      platform.fieldRelations.redirect(relationId, reviewerId, "community", nextTarget, "Redirected to a better community context.");
      state.reviewCommunityId = nextTarget;
      flash("Redirected. This belongs somewhere else.");
    } else if (action === "decline") {
      platform.fieldRelations.decline(relationId, reviewerId, "Not useful to show as a connection right now.");
      flash("Declined. This will not be shown as a connection.");
    } else if (action === "computed") {
      platform.fieldRelations.markComputedOnly(relationId, reviewerId, "Kept as a pattern without community endorsement.");
      flash("Kept as a pattern only.");
    }
    render();
  }

  function flash(message) {
    const notice = document.createElement("div");
    notice.className = "toast";
    notice.textContent = message;
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 2400);
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

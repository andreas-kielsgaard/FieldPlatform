(function () {
  const platform = window.FieldPlatformDomain.createPlatformDomain({
    storageKey: "field_platform_mockup_5"
  });
  platform.resetDatabase();

  const copy = window.Mockup5Copy;
  const vm = window.Mockup5ViewModel.createViewModel(platform, copy);
  const state = {
    selected: { type: "event", id: "e_ci_jam" },
    reviewCommunityId: "ecstatic",
    debugOpen: false
  };

  const els = {
    objectList: byId("objectList"),
    objectType: byId("objectType"),
    objectTitle: byId("objectTitle"),
    objectDescription: byId("objectDescription"),
    relationCards: byId("relationCards"),
    connectionCount: byId("connectionCount"),
    waysIn: byId("waysIn"),
    queueControls: byId("queueControls"),
    reviewQueue: byId("reviewQueue"),
    drawer: byId("suggestDrawer"),
    backdrop: byId("drawerBackdrop"),
    suggestForm: byId("suggestForm"),
    targetSelect: byId("targetSelect"),
    relationKindSelect: byId("relationKindSelect"),
    visibilitySelect: byId("visibilitySelect"),
    suggestReason: byId("suggestReason"),
    suggestSourceText: byId("suggestSourceText"),
    debugToggle: byId("debugToggle"),
    debugContent: byId("debugContent"),
    debugJson: byId("debugJson")
  };

  bindEvents();
  render();

  function bindEvents() {
    byId("resetDemo").addEventListener("click", () => {
      platform.resetDatabase();
      render();
      flash("Demo data reset.");
    });
    byId("openSuggest").addEventListener("click", openDrawer);
    byId("openSuggestInline").addEventListener("click", openDrawer);
    byId("closeSuggest").addEventListener("click", closeDrawer);
    byId("cancelSuggest").addEventListener("click", closeDrawer);
    els.backdrop.addEventListener("click", closeDrawer);
    byId("focusReview").addEventListener("click", () => {
      document.querySelector(".queue-list").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.debugToggle.addEventListener("click", () => {
      state.debugOpen = !state.debugOpen;
      renderDebug();
    });
    els.suggestForm.addEventListener("submit", submitSuggestion);
  }

  function render() {
    renderObjectList();
    renderObjectPage();
    renderRelations();
    renderWaysIn();
    renderQueueControls();
    renderReviewQueue();
    renderDebug();
  }

  function renderObjectList() {
    els.objectList.innerHTML = "";
    vm.objectChoices().forEach(choice => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `object-choice ${isSelected(choice) ? "is-selected" : ""}`;
      button.innerHTML = `
        <span>${escapeHtml(choice.label)}</span>
        <small>${escapeHtml(choice.typeLabel)}</small>
      `;
      button.addEventListener("click", () => {
        state.selected = { type: choice.type, id: choice.id };
        if (choice.type === "community") state.reviewCommunityId = choice.id;
        render();
      });
      els.objectList.appendChild(button);
    });
  }

  function renderObjectPage() {
    const summary = vm.objectSummary(state.selected.type, state.selected.id);
    els.objectType.textContent = summary.typeLabel;
    els.objectTitle.textContent = summary.label;
    els.objectDescription.textContent = summary.description || "No description yet.";
  }

  function renderRelations() {
    const cards = vm.relationCards(state.selected.type, state.selected.id);
    els.connectionCount.textContent = String(cards.length);
    els.relationCards.innerHTML = cards.length
      ? cards.map(relationCardMarkup).join("")
      : emptyState("No connections shown yet.", "Suggest a connection if this belongs with another community, event, venue, person, or pattern.");
  }

  function relationCardMarkup(card) {
    return `
      <article class="relation-card" data-status="${escapeHtml(card.raw.status)}">
        <div class="relation-topline">
          <span class="status-pill">${escapeHtml(card.status)}</span>
          <span class="visibility-pill">${escapeHtml(card.visibility)}</span>
        </div>
        <h4>${escapeHtml(card.connectionType)}</h4>
        <p class="connection-line">${escapeHtml(card.sourceLabel)} <span>connected to</span> ${escapeHtml(card.targetLabel)}</p>
        <section class="why-box">
          <h5>Why this appears</h5>
          <p>${escapeHtml(card.why)}</p>
          ${evidenceMarkup(card.evidence)}
        </section>
        ${unclearMarkup(card.unclear)}
        ${waysMarkup(card.movementLabels)}
      </article>
    `;
  }

  function evidenceMarkup(evidence) {
    if (!evidence.length) return "";
    return `<ul class="evidence-list">${evidence.map(item => `<li>${escapeHtml(item.label || item.type)}</li>`).join("")}</ul>`;
  }

  function unclearMarkup(items) {
    if (!items.length) return "";
    return `
      <section class="unclear-box">
        <h5>What may be unclear</h5>
        <ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>
    `;
  }

  function waysMarkup(items) {
    if (!items.length) return "";
    return `
      <section class="mini-ways">
        <h5>Ways in</h5>
        <div>${items.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </section>
    `;
  }

  function renderWaysIn() {
    const ways = vm.waysInForObject(state.selected.type, state.selected.id);
    els.waysIn.innerHTML = ways.length
      ? ways.map(way => `
          <button class="way-item" type="button">
            <span>${escapeHtml(way.label)}</span>
            <small>From ${escapeHtml(way.from)}</small>
          </button>
        `).join("")
      : emptyState("No clear next step yet.", "Connections that are accepted or found as patterns can make first steps clearer.");
  }

  function renderQueueControls() {
    const communities = ["ecstatic", "ci", "tea"].map(id => platform.communities.get(id));
    els.queueControls.innerHTML = communities.map(community => `
      <button class="segmented ${state.reviewCommunityId === community.id ? "is-selected" : ""}" type="button" data-community-id="${escapeHtml(community.id)}">
        ${escapeHtml(community.name())}
      </button>
    `).join("");
    els.queueControls.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        state.reviewCommunityId = button.dataset.communityId;
        renderReviewQueue();
        renderQueueControls();
      });
    });
  }

  function renderReviewQueue() {
    const cards = vm.pendingForCommunity(state.reviewCommunityId);
    els.reviewQueue.innerHTML = cards.length
      ? cards.map(queueCardMarkup).join("")
      : emptyState("No suggestions waiting.", "New suggestions for this community will appear here for review.");

    els.reviewQueue.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => reviewRelation(button.dataset.action, button.dataset.relationId));
    });
  }

  function queueCardMarkup(card) {
    return `
      <article class="queue-card">
        <span class="status-pill">${escapeHtml(card.status)}</span>
        <h4>${escapeHtml(card.sourceLabel)} -> ${escapeHtml(card.targetLabel)}</h4>
        <p>${escapeHtml(card.why)}</p>
        <div class="queue-meta">
          <span>${escapeHtml(card.connectionType)}</span>
          <span>${escapeHtml(card.visibility)}</span>
          <span>${escapeHtml(card.source)}</span>
        </div>
        ${unclearMarkup(card.unclear)}
        ${waysMarkup(card.movementLabels)}
        <div class="review-actions">
          <button class="button compact primary" type="button" data-action="accept" data-relation-id="${escapeHtml(card.id)}">Accept</button>
          <button class="button compact secondary" type="button" data-action="refine" data-relation-id="${escapeHtml(card.id)}">Refine</button>
          <button class="button compact secondary" type="button" data-action="redirect" data-relation-id="${escapeHtml(card.id)}">Redirect</button>
          <button class="button compact secondary" type="button" data-action="computed" data-relation-id="${escapeHtml(card.id)}">Keep as pattern only</button>
          <button class="button compact danger" type="button" data-action="decline" data-relation-id="${escapeHtml(card.id)}">Decline</button>
        </div>
      </article>
    `;
  }

  function reviewRelation(action, relationId) {
    const reviewer = stewardFor(state.reviewCommunityId);
    if (action === "accept") {
      platform.fieldRelations.accept(relationId, reviewer, "Accepted in Mockup 5 review.");
      flash("Accepted connection.");
    }
    if (action === "refine") {
      platform.fieldRelations.refine(relationId, reviewer, {
        relationKind: "good_first_step_for",
        visibility: "public",
        movementUnlocked: ["attend", "follow", "request_access"],
        reason: "Clarified as a possible first step after steward review."
      }, "Clarified as a first step.");
      flash("Connection clarified.");
    }
    if (action === "redirect") {
      platform.fieldRelations.redirect(relationId, reviewer, "community", "tea", "Redirected to the softer community context.");
      flash("Connection redirected.");
    }
    if (action === "computed") {
      platform.fieldRelations.markComputedOnly(relationId, reviewer, "Kept as a visible pattern rather than an accepted community connection.");
      flash("Kept as pattern only.");
    }
    if (action === "decline") {
      platform.fieldRelations.decline(relationId, reviewer, "Not a useful connection to show right now.");
      flash("Connection declined.");
    }
    render();
  }

  function openDrawer() {
    populateDrawer();
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

  function populateDrawer() {
    const summary = vm.objectSummary(state.selected.type, state.selected.id);
    els.suggestSourceText.textContent = `You are suggesting a connection from ${summary.label}.`;
    els.targetSelect.innerHTML = vm.targetChoices()
      .filter(choice => !(choice.type === state.selected.type && choice.id === state.selected.id))
      .map(choice => `<option value="${escapeHtml(choice.value)}">${escapeHtml(choice.label)} (${escapeHtml(choice.typeLabel)})</option>`)
      .join("");
    els.relationKindSelect.innerHTML = copy.suggestionKinds
      .map(item => `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`)
      .join("");
    els.visibilitySelect.innerHTML = copy.visibilityOptions
      .map(item => `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`)
      .join("");
  }

  function submitSuggestion(event) {
    event.preventDefault();
    const [targetType, targetId] = els.targetSelect.value.split(":");
    const reviewAuthority = reviewAuthorityFor(state.selected.type, state.selected.id, targetType, targetId);
    platform.fieldRelations.suggest({
      sourceType: state.selected.type,
      sourceId: state.selected.id,
      targetType,
      targetId,
      relationKind: els.relationKindSelect.value,
      relationStrength: 35,
      reviewAuthorityType: reviewAuthority.type,
      reviewAuthorityId: reviewAuthority.id,
      visibility: els.visibilitySelect.value,
      reason: els.suggestReason.value.trim(),
      evidence: [{ type: "person_reason", label: els.suggestReason.value.trim() }],
      holdTypes: ["stewardship", "context"],
      movementUnlocked: ["ask_steward", "follow"]
    }, "p_casey");

    if (reviewAuthority.type === "community") {
      state.reviewCommunityId = reviewAuthority.id;
    }
    closeDrawer();
    render();
    flash("Suggested connection - waiting for review.");
  }

  function reviewAuthorityFor(sourceType, sourceId, targetType, targetId) {
    if (targetType === "community") return { type: "community", id: targetId };
    if (sourceType === "community") return { type: "community", id: sourceId };
    return { type: "community", id: "ci" };
  }

  function stewardFor(communityId) {
    const stewards = platform.communities.get(communityId).data().stewards || [];
    return stewards[0] || "p_casey";
  }

  function renderDebug() {
    els.debugToggle.textContent = state.debugOpen ? "Hide dev/debug data" : "Show dev/debug data";
    els.debugToggle.setAttribute("aria-expanded", String(state.debugOpen));
    els.debugContent.hidden = !state.debugOpen;
    if (state.debugOpen) {
      els.debugJson.textContent = JSON.stringify(vm.debugForObject(state.selected.type, state.selected.id), null, 2);
    }
  }

  function flash(message) {
    const notice = document.createElement("div");
    notice.className = "toast";
    notice.textContent = message;
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 2200);
  }

  function emptyState(title, detail) {
    return `
      <div class="empty-state">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(detail)}</p>
      </div>
    `;
  }

  function isSelected(choice) {
    return choice.type === state.selected.type && choice.id === state.selected.id;
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

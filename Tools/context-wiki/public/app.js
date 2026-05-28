let pages = [];
let currentPage = null;
let dashboard = null;
let termEntries = [];
let surfaceMode = "read";
const openNavGroups = new Set();

const navGroups = [
  { key: "start", label: "Start", overview: "README.md" },
  { key: "principles", label: "Principles", overview: "Principles/What FieldPlatform is for.md" },
  { key: "vocabulary", label: "Vocabulary", overview: "Glossary/Project words in plain English.md" },
  { key: "concepts", label: "Product Concepts", overview: "Ontology/Product ontology.md" },
  { key: "stories", label: "User Stories and Flows", overview: "User stories/User stories overview.md" },
  { key: "views", label: "Views", overview: "Frontend/Views overview.md" },
  { key: "modules", label: "Modules", overview: "Frontend/Modules overview.md" },
  { key: "interface", label: "Interface Rules", overview: "Frontend/Surface grammar.md" },
  { key: "data", label: "Data Layer", overview: "Architecture/Data layer overview.md" },
  { key: "access", label: "Access and Calculation", overview: "Architecture/Access layer overview.md" },
  { key: "platform", label: "Platform Structure", overview: "Architecture/Platform architecture overview.md" },
  { key: "direction", label: "Open Direction", overview: "Current direction/Open questions.md" },
  { key: "parked", label: "Parked Ideas", overview: "Parked/Future exploration notes.md" },
  { key: "maintenance", label: "Wiki Maintenance", overview: "Maintenance/Context maintenance for agents.md" }
];

const els = {
  shell: document.getElementById("shell"),
  homeButton: document.getElementById("homeButton"),
  toggleSidebar: document.getElementById("toggleSidebar"),
  sidebarPanel: document.getElementById("sidebarPanel"),
  searchInput: document.getElementById("searchInput"),
  layerFilter: document.getElementById("layerFilter"),
  statusFilter: document.getElementById("statusFilter"),
  showDeprecated: document.getElementById("showDeprecated"),
  navTree: document.getElementById("navTree"),
  pageTitle: document.getElementById("pageTitle"),
  sourcePath: document.getElementById("sourcePath"),
  metaChips: document.getElementById("metaChips"),
  markdownBody: document.getElementById("markdownBody"),
  metadataPanel: document.getElementById("metadataPanel"),
  tracePanel: document.getElementById("tracePanel"),
  backlinksPanel: document.getElementById("backlinksPanel"),
  editorPanel: document.getElementById("editorPanel"),
  editorText: document.getElementById("editorText"),
  tagSuggestionPanel: document.getElementById("tagSuggestionPanel"),
  tagSuggestions: document.getElementById("tagSuggestions"),
  editButton: document.getElementById("editButton"),
  saveButton: document.getElementById("saveButton"),
  approveButton: document.getElementById("approveButton"),
  approvedBy: document.getElementById("approvedBy"),
  diffButton: document.getElementById("diffButton"),
  diffPanel: document.getElementById("diffPanel"),
  showReader: document.getElementById("showReader"),
  showDashboard: document.getElementById("showDashboard"),
  readerView: document.getElementById("readerView"),
  dashboardView: document.getElementById("dashboardView"),
  refreshDashboard: document.getElementById("refreshDashboard"),
  dashboardSummary: document.getElementById("dashboardSummary"),
  dashboardSections: document.getElementById("dashboardSections"),
  toggleInspector: document.getElementById("toggleInspector"),
  inspectorPanel: document.getElementById("inspectorPanel"),
  linkPreview: document.getElementById("linkPreview")
};

init();

async function init() {
  await loadPages();
  populateFilters();
  bindEvents();
  setInspectorOpen(false);
  setSidebarOpen(true);
  const initial = decodeURIComponent(location.hash.replace(/^#/, "")) || "README.md";
  openPage(pages.find((page) => page.path === initial) ? initial : "README.md");
}

async function loadPages() {
  pages = await fetchJson("/api/pages");
  pages.sort((a, b) => a.path.localeCompare(b.path));
  termEntries = buildTermEntries();
}

function bindEvents() {
  els.homeButton.addEventListener("click", () => {
    els.searchInput.value = "";
    els.layerFilter.value = "";
    els.statusFilter.value = "";
    openPage("README.md");
  });
  els.searchInput.addEventListener("input", renderNav);
  els.layerFilter.addEventListener("change", renderNav);
  els.statusFilter.addEventListener("change", renderNav);
  els.showDeprecated.addEventListener("change", renderNav);
  els.toggleSidebar.addEventListener("click", () => {
    setSidebarOpen(els.shell.classList.contains("sidebar-collapsed"));
  });
  els.editButton.addEventListener("click", () => {
    setSurfaceMode(surfaceMode === "edit" ? "read" : "edit");
  });
  document.querySelectorAll("[data-format]").forEach((button) => {
    button.addEventListener("click", () => applyMarkdownFormat(button.getAttribute("data-format")));
  });
  ["input", "click", "keyup", "select"].forEach((eventName) => {
    els.editorText.addEventListener(eventName, renderTagSuggestions);
  });
  els.saveButton.addEventListener("click", saveCurrentPage);
  els.approveButton.addEventListener("click", approveCurrentPage);
  els.diffButton.addEventListener("click", showReview);
  els.showReader.addEventListener("click", showReader);
  els.showDashboard.addEventListener("click", showDashboard);
  els.refreshDashboard.addEventListener("click", loadDashboard);
  els.toggleInspector.addEventListener("click", () => {
    setInspectorOpen(!els.shell.classList.contains("inspector-open"));
  });
  window.addEventListener("hashchange", () => {
    const target = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (target) openPage(target);
  });
}

function setSidebarOpen(open) {
  els.shell.classList.toggle("sidebar-collapsed", !open);
  els.toggleSidebar.setAttribute("aria-expanded", String(open));
  els.toggleSidebar.setAttribute("aria-label", open ? "Hide navigation" : "Show navigation");
  els.sidebarPanel.setAttribute("aria-hidden", String(!open));
}

function setInspectorOpen(open) {
  els.shell.classList.toggle("inspector-open", open);
  els.toggleInspector.setAttribute("aria-expanded", String(open));
  els.toggleInspector.setAttribute("aria-label", open ? "Hide spec details" : "Show spec details");
  els.inspectorPanel.setAttribute("aria-hidden", String(!open));
}

function populateFilters() {
  fillSelect(els.layerFilter, "All layers", unique(pages.map((page) => page.metadata.layer)));
  fillSelect(els.statusFilter, "All statuses", unique(pages.map((page) => page.metadata.status)));
}

function fillSelect(select, label, values) {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "";
  all.textContent = label;
  select.appendChild(all);
  values.filter(Boolean).sort().forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function filteredPages() {
  const query = els.searchInput.value.trim().toLowerCase();
  const layer = els.layerFilter.value;
  const status = els.statusFilter.value;
  const showDeprecated = els.showDeprecated.checked || status === "stale/deprecated" || query.includes("legacy");
  return pages.filter((page) => {
    const haystack = `${page.title}\n${page.body}\n${JSON.stringify(page.metadata)}`.toLowerCase();
    const isDeprecated = /stale|deprecated/i.test(`${page.metadata.status} ${page.metadata.maturity}`);
    return (!query || haystack.includes(query)) &&
      (!layer || page.metadata.layer === layer) &&
      (!status || page.metadata.status === status) &&
      (showDeprecated || !isDeprecated);
  });
}

function renderNav() {
  const groups = new Map();
  filteredPages().forEach((page) => {
    const key = navGroupKey(page.path);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(page);
  });
  els.navTree.innerHTML = "";
  const forceOpen = Boolean(els.searchInput.value.trim() || els.layerFilter.value || els.statusFilter.value);
  if (els.searchInput.value.trim()) {
    const note = document.createElement("p");
    note.className = "nav-note";
    note.textContent = "Search narrows the page list. Open a result to change the reader.";
    els.navTree.appendChild(note);
  }
  [...groups.entries()].sort((a, b) => groupRank(a[0]) - groupRank(b[0]) || groupLabel(a[0]).localeCompare(groupLabel(b[0]))).forEach(([key, items]) => {
    els.navTree.appendChild(navGroup(key, items, forceOpen));
  });
}

function buildTermEntries() {
  const byTerm = new Map();
  const add = (term, path) => {
    const cleaned = String(term || "").trim();
    if (!cleaned || !path || cleaned.length < 3) return;
    if (!pages.some((page) => page.path === path)) return;
    const normalized = normalizeTerm(cleaned);
    if (!normalized || blockedTerm(normalized)) return;
    if (!byTerm.has(normalized)) {
      byTerm.set(normalized, { term: cleaned, normalized, path });
    }
  };

  pages.forEach((page) => {
    add(page.title, page.path);
    normalizeList(page.metadata.canonical_for).forEach((term) => add(term, page.path));
  });

  const aliases = [
    ["principles", "Principles/What FieldPlatform is for.md"],
    ["operating principles", "Principles/Living field principles.md"],
    ["living field", "Principles/Living field principles.md"],
    ["product boundaries", "Principles/What FieldPlatform should not become.md"],
    ["vocabulary", "Glossary/Project words in plain English.md"],
    ["glossary", "Glossary/Project words in plain English.md"],
    ["product concept", "Ontology/Product ontology.md"],
    ["product concepts", "Ontology/Product ontology.md"],
    ["concept", "Ontology/Product ontology.md"],
    ["concepts", "Ontology/Product ontology.md"],
    ["user story", "User stories/User stories overview.md"],
    ["user stories", "User stories/User stories overview.md"],
    ["user stories and flows", "User stories/User stories overview.md"],
    ["story", "User stories/User stories overview.md"],
    ["stories", "User stories/User stories overview.md"],
    ["view", "Frontend/Views overview.md"],
    ["views", "Frontend/Views overview.md"],
    ["module", "Frontend/Modules overview.md"],
    ["modules", "Frontend/Modules overview.md"],
    ["interface rules", "Frontend/Surface grammar.md"],
    ["surface grammar", "Frontend/Surface grammar.md"],
    ["language rules", "Frontend/Language and copy rules.md"],
    ["copy rules", "Frontend/Language and copy rules.md"],
    ["data layer", "Architecture/Data layer overview.md"],
    ["access layer", "Architecture/Access layer overview.md"],
    ["access and calculation", "Architecture/Access layer overview.md"],
    ["platform structure", "Architecture/Platform architecture overview.md"],
    ["traceability", "Architecture/Traceability model.md"],
    ["review state", "Architecture/Review and approval model.md"],
    ["open direction", "Current direction/Open questions.md"],
    ["open questions", "Current direction/Open questions.md"],
    ["parked ideas", "Parked/Future exploration notes.md"],
    ["future exploration", "Parked/Future exploration notes.md"],
    ["wiki maintenance", "Maintenance/Context maintenance for agents.md"],
    ["context maintenance", "Maintenance/Context maintenance for agents.md"],
    ["person", "Data layer/Person entity.md"],
    ["people", "Data layer/Person entity.md"],
    ["person entity", "Data layer/Person entity.md"],
    ["community", "Data layer/Community entity.md"],
    ["communities", "Data layer/Community entity.md"],
    ["community entity", "Data layer/Community entity.md"],
    ["event", "Data layer/Event offering entity.md"],
    ["events", "Data layer/Event offering entity.md"],
    ["event entity", "Data layer/Event offering entity.md"],
    ["offering", "Data layer/Event offering entity.md"],
    ["offerings", "Data layer/Event offering entity.md"],
    ["offering entity", "Data layer/Event offering entity.md"],
    ["event offering entity", "Data layer/Event offering entity.md"],
    ["venue", "Data layer/Venue entity.md"],
    ["venues", "Data layer/Venue entity.md"],
    ["venue entity", "Data layer/Venue entity.md"],
    ["participation edge", "Data layer/ParticipationEdge.md"],
    ["person-to-community relationship", "Data layer/ParticipationEdge.md"],
    ["field relation", "Data layer/FieldRelation.md"],
    ["generated field", "Data layer/GeneratedField.md"],
    ["hold", "Ontology/Hold unclear point.md"],
    ["holds", "Ontology/Hold unclear point.md"],
    ["unclear point", "Ontology/Hold unclear point.md"],
    ["pathway", "Ontology/Pathway ways in.md"],
    ["pathways", "Ontology/Pathway ways in.md"],
    ["way in", "Ontology/Pathway ways in.md"],
    ["ways in", "Ontology/Pathway ways in.md"],
    ["my orientation", "Views/My Orientation View.md"],
    ["community overview", "Views/Community Overview View.md"],
    ["public event", "Views/Public Event View.md"],
    ["generated field view", "Views/Generated Field View.md"],
    ["steward suggested connections", "Views/Steward Suggested Connections View.md"],
    ["contextual disclosure", "Modules/Contextual Disclosure module.md"],
    ["self-resourcing", "Modules/Self-resourcing Entry module.md"],
    ["self-resourcing entry", "Modules/Self-resourcing Entry module.md"],
    ["suggested connections review", "Modules/Suggested Connections Review module.md"]
  ];
  aliases.forEach(([term, path]) => add(term, path));

  return [...byTerm.values()].sort((a, b) => b.normalized.length - a.normalized.length);
}

function normalizeTerm(term) {
  return String(term || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function blockedTerm(term) {
  // Reader tags are manual Markdown links. This matcher stays generous for editor suggestions.
  return [
    "fieldplatform",
    "source of truth",
    "general context navigation",
    "project vocabulary",
    "plain language onboarding"
  ].includes(term);
}

function navGroup(key, items, forceOpen) {
  const config = groupConfig(key);
  const open = forceOpen || openNavGroups.has(key);
  const overviewPath = config.overview;
  const childItems = items.filter((page) => page.path !== overviewPath);
  const group = document.createElement("section");
  group.className = `nav-group${open ? " open" : ""}`;

  const header = document.createElement("div");
  header.className = "nav-group-header";

  const title = document.createElement("button");
  title.type = "button";
  title.className = `nav-group-title${currentPage && currentPage.path === overviewPath ? " active" : ""}`;
  title.textContent = config.label;
  title.addEventListener("click", () => {
    openNavGroups.add(key);
    if (currentPage && currentPage.path === overviewPath) renderNav();
    else openPage(overviewPath);
  });
  attachPreview(title, overviewPath);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-group-toggle";
  toggle.textContent = open ? "-" : "+";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", `${open ? "Collapse" : "Expand"} ${config.label}`);
  toggle.disabled = childItems.length === 0;
  toggle.addEventListener("click", () => {
    if (openNavGroups.has(key)) openNavGroups.delete(key);
    else openNavGroups.add(key);
    renderNav();
  });

  header.append(title, toggle);
  group.appendChild(header);

  const list = document.createElement("div");
  list.className = "nav-group-items";
  list.hidden = !open;
  childItems.sort((a, b) => a.title.localeCompare(b.title)).forEach((page) => {
    list.appendChild(navButton(page));
  });
  group.appendChild(list);
  return group;
}

function navGroupKey(path) {
  if (path === "README.md") return "start";
  if (path.startsWith("Principles/")) return "principles";
  if (path.startsWith("Glossary/")) return "vocabulary";
  if (path.startsWith("Ontology/")) return "concepts";
  if (path.startsWith("User stories/")) return "stories";
  if (path.startsWith("Views/") || path === "Frontend/Views overview.md") return "views";
  if (path.startsWith("Modules/") || path === "Frontend/Modules overview.md") return "modules";
  if (path.startsWith("Frontend/")) return "interface";
  if (path.startsWith("Data layer/") || path === "Architecture/Data layer overview.md") return "data";
  if (path.startsWith("Access layer/") || path === "Architecture/Access layer overview.md") return "access";
  if (path.startsWith("Current direction/")) return "direction";
  if (path.startsWith("Parked/")) return "parked";
  if (path.startsWith("Maintenance/") || path === "Architecture/Traceability model.md" || path === "Architecture/Review and approval model.md") return "maintenance";
  if (path.startsWith("Architecture/")) return "platform";
  return "start";
}

function groupConfig(key) {
  return navGroups.find((group) => group.key === key) || { key, label: key, overview: "README.md" };
}

function groupRank(key) {
  const index = navGroups.findIndex((group) => group.key === key);
  return index === -1 ? navGroups.length : index;
}

function groupLabel(key) {
  return groupConfig(key).label;
}

function navButton(page) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `nav-item${currentPage && currentPage.path === page.path ? " active" : ""}`;
  const status = navStatus(page);
  button.innerHTML = `
    <span class="nav-title">${escapeHtml(page.title)}</span>
    ${status ? `<span class="nav-chips">${chip(status)}</span>` : ""}
  `;
  button.addEventListener("click", () => openPage(page.path));
  attachPreview(button, page.path);
  return button;
}

function navStatus(page) {
  const status = String(page.metadata.status || "");
  const maturity = String(page.metadata.maturity || "");
  if (/stale|deprecated/i.test(`${status} ${maturity}`)) return "legacy";
  if (/parked/i.test(`${status} ${maturity}`)) return "parked";
  return "";
}

async function openPage(path) {
  hidePreview();
  const page = await fetchJson(`/api/page?path=${encodeURIComponent(path)}`);
  currentPage = page;
  location.hash = encodeURIComponent(page.path);
  showReader();
  renderNav();
  renderPage(page);
}

function renderPage(page) {
  els.pageTitle.textContent = page.title;
  els.sourcePath.textContent = page.sourcePath;
  els.metaChips.innerHTML = [
    page.metadata.layer,
    page.metadata.status,
    page.metadata.maturity,
    page.metadata.review_state
  ].filter(Boolean).map(chip).join("");
  els.markdownBody.innerHTML = renderMarkdown(page.body || "");
  wireInternalLinks(els.markdownBody);
  els.editorText.value = page.content;
  setSurfaceMode("read");
  els.diffPanel.innerHTML = "";
  renderMetadata(page);
  renderTrace(page);
  renderBacklinks(page);
}

function setSurfaceMode(mode) {
  surfaceMode = mode;
  els.markdownBody.classList.toggle("hidden", mode !== "read");
  els.editorPanel.classList.toggle("hidden", mode !== "edit");
  els.diffPanel.classList.toggle("hidden", mode !== "review");
  els.editButton.classList.toggle("active", mode === "edit");
  els.diffButton.classList.toggle("active", mode === "review");
  els.editButton.textContent = mode === "edit" ? "Read" : "Edit";
  els.diffButton.textContent = mode === "review" ? "Read" : "Review";
  if (mode === "edit") {
    renderTagSuggestions();
    requestAnimationFrame(() => els.editorText.focus());
  } else {
    renderTagSuggestions();
  }
}

function renderMetadata(page) {
  const rows = Object.entries(page.metadata).filter(([, value]) => value && (!Array.isArray(value) || value.length));
  els.metadataPanel.innerHTML = rows.map(([key, value]) => `
    <dt>${escapeHtml(key)}</dt>
    <dd>${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</dd>
  `).join("");
}

function renderTrace(page) {
  const meta = page.metadata;
  const groups = [
    ["Canonical for", meta.canonical_for],
    ["Related", meta.related],
    ["Depends on", meta.depends_on],
    ["Consumed by", meta.consumed_by],
    ["Implemented by", meta.implemented_by]
  ];
  els.tracePanel.innerHTML = groups.map(([label, values]) => traceGroup(label, values, page.path)).join("");
  wireInternalLinks(els.tracePanel);
}

function traceGroup(label, values, fromPath) {
  const list = normalizeList(values);
  if (!list.length) return `<p class="muted">${escapeHtml(label)}: none listed.</p>`;
  return `<div class="trace-group"><strong>${escapeHtml(label)}</strong><div class="link-list">${list.map((item) => traceLink(item, fromPath)).join("")}</div></div>`;
}

function traceLink(item, fromPath) {
  const resolved = resolveReference(fromPath, item);
  if (resolved && pages.some((page) => page.path === resolved)) {
    return `<button type="button" class="link-button" data-page="${escapeHtml(resolved)}">${escapeHtml(item)}</button>`;
  }
  return `<span>${escapeHtml(item)}</span>`;
}

function renderBacklinks(page) {
  if (!page.backlinks.length) {
    els.backlinksPanel.innerHTML = `<p class="muted">No backlinks found.</p>`;
    return;
  }
  els.backlinksPanel.innerHTML = `<div class="link-list">${page.backlinks.map((item) => `<button type="button" class="link-button" data-page="${escapeHtml(item.path)}">${escapeHtml(item.title)}</button>`).join("")}</div>`;
  wireInternalLinks(els.backlinksPanel);
}

function wireInternalLinks(container) {
  container.querySelectorAll("[data-page]").forEach((node) => {
    attachPreview(node, node.getAttribute("data-page"));
    node.addEventListener("click", (event) => {
      event.preventDefault();
      openPage(node.getAttribute("data-page"));
    });
  });
}

function attachPreview(node, path) {
  if (!path) return;
  node.addEventListener("pointerenter", () => showPreview(node, path));
  node.addEventListener("pointermove", () => positionPreview(node));
  node.addEventListener("pointerleave", hidePreview);
  node.addEventListener("mouseenter", () => showPreview(node, path));
  node.addEventListener("mousemove", () => positionPreview(node));
  node.addEventListener("mouseleave", hidePreview);
  node.addEventListener("focus", () => showPreview(node, path));
  node.addEventListener("blur", hidePreview);
}

function showPreview(node, path) {
  const page = pages.find((item) => item.path === path);
  if (!page) return;
  els.linkPreview.innerHTML = `
    <div class="preview-title">${escapeHtml(page.title)}</div>
    <div class="preview-path">${escapeHtml(page.path)}</div>
    <p>${escapeHtml(previewText(page))}</p>
  `;
  els.linkPreview.classList.remove("hidden");
  positionPreview(node);
}

function positionPreview(node) {
  if (els.linkPreview.classList.contains("hidden")) return;
  const rect = node.getBoundingClientRect();
  const previewRect = els.linkPreview.getBoundingClientRect();
  const gap = 10;
  let left = rect.right + gap;
  let top = rect.top;
  if (left + previewRect.width > window.innerWidth - gap) {
    left = rect.left - previewRect.width - gap;
  }
  if (left < gap) left = gap;
  if (top + previewRect.height > window.innerHeight - gap) {
    top = window.innerHeight - previewRect.height - gap;
  }
  if (top < gap) top = gap;
  els.linkPreview.style.left = `${left}px`;
  els.linkPreview.style.top = `${top}px`;
}

function hidePreview() {
  els.linkPreview.classList.add("hidden");
}

function previewText(page) {
  const text = page.body
    .replace(/^#\s+.+$/m, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 320) || page.excerpt || "No preview available.";
}

async function saveCurrentPage() {
  if (!currentPage) return;
  await savePageContent(els.editorText.value, "read");
}

async function savePageContent(content, modeAfterSave = "read") {
  const result = await fetchJson("/api/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path: currentPage.path, content })
  });
  await loadPages();
  populateFilters();
  const page = await fetchJson(`/api/page?path=${encodeURIComponent(result.path)}`);
  currentPage = page;
  renderNav();
  renderPage(page);
  if (modeAfterSave === "review") await showReview();
  else if (modeAfterSave === "edit") setSurfaceMode("edit");
}

async function approveCurrentPage() {
  if (!currentPage) return;
  const approvedBy = els.approvedBy.value.trim() || "human-reviewer";
  const result = await fetchJson("/api/approve", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path: currentPage.path, approvedBy })
  });
  await loadPages();
  populateFilters();
  await openPage(result.path);
}

async function showReview() {
  if (!currentPage) return;
  if (surfaceMode === "review") {
    setSurfaceMode("read");
    return;
  }
  const text = await fetch(`/api/diff?path=${encodeURIComponent(currentPage.path)}`).then((res) => res.text());
  els.diffPanel.innerHTML = renderReview(text);
  wireInternalLinks(els.diffPanel);
  const addComment = els.diffPanel.querySelector("[data-review-action='comment']");
  if (addComment) addComment.addEventListener("click", addReviewCommentFromSelection);
  setSurfaceMode("review");
}

function showReader() {
  els.readerView.classList.remove("hidden");
  els.dashboardView.classList.add("hidden");
  els.showReader.classList.add("active");
  els.showDashboard.classList.remove("active");
}

async function showDashboard() {
  els.readerView.classList.add("hidden");
  els.dashboardView.classList.remove("hidden");
  els.showReader.classList.remove("active");
  els.showDashboard.classList.add("active");
  await loadDashboard();
}

async function loadDashboard() {
  dashboard = await fetchJson("/api/dashboard");
  renderDashboard();
}

function renderDashboard() {
  const sections = dashboard.sections;
  els.dashboardSummary.innerHTML = `
    <div class="summary-card"><span>Branch</span><strong>${escapeHtml(dashboard.branch || "unknown")}</strong></div>
    <div class="summary-card"><span>Commit</span><strong>${escapeHtml(dashboard.commit || "none")}</strong></div>
    <div class="summary-card"><span>Working changes</span><strong>${dashboard.gitStatus.length}</strong></div>
    <div class="summary-card"><span>Needs review</span><strong>${sections.needsHumanReview.length}</strong></div>
  `;
  els.dashboardSections.innerHTML = Object.entries(sections).map(([key, items]) => dashboardSection(key, items)).join("");
  if (dashboard.gitStatus.length) {
    els.dashboardSections.insertAdjacentHTML("afterbegin", `
      <section class="dashboard-section">
        <h3>Git Working Tree Changes</h3>
        <pre>${escapeHtml(dashboard.gitStatus.join("\n"))}</pre>
      </section>
    `);
  }
  wireInternalLinks(els.dashboardSections);
}

function dashboardSection(key, items) {
  const title = key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
  if (!items.length) return `<section class="dashboard-section"><h3>${escapeHtml(title)}</h3><p class="muted">None.</p></section>`;
  return `
    <section class="dashboard-section">
      <h3>${escapeHtml(title)} (${items.length})</h3>
      ${items.map((item) => `
        <div class="dashboard-item">
          <button type="button" class="link-button" data-page="${escapeHtml(item.path)}">${escapeHtml(item.title)}</button>
          <span class="chips">${chip(item.layer)}${chip(item.status)}</span>
        </div>
      `).join("")}
    </section>
  `;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        closeList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^\s*-\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        html.push("<ul>");
      }
      html.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        html.push("<ol>");
      }
      html.push(`<li>${inline(ordered[1])}</li>`);
      continue;
    }
    if (line.includes("|") && line.trim().startsWith("|")) {
      flushParagraph();
      closeList();
      html.push(renderTableLine(line));
      continue;
    }
    closeList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  closeList();
  return html.join("\n").replace(/<\/table>\n<table>/g, "");
}

function renderTableLine(line) {
  if (/^\|\s*-+/.test(line)) return "";
  const cells = line.split("|").slice(1, -1).map((cell) => `<td>${inline(cell.trim())}</td>`).join("");
  return `<table><tr>${cells}</tr></table>`;
}

function inline(text) {
  const placeholders = [];
  const stash = (html) => {
    const token = `@@WIKI_PLACEHOLDER_${placeholders.length}@@`;
    placeholders.push(html);
    return token;
  };

  let staged = text.replace(/`([^`]+)`/g, (match, value) => stash(`<code>${escapeHtml(value)}</code>`));
  staged = staged.replace(/\{\{comment:([\s\S]*?)\|([\s\S]*?)\}\}/g, (match, comment, label) => {
    return stash(`
      <span class="review-comment" tabindex="0">
        <span class="review-comment-text">${inline(label.trim())}</span>
        <span class="review-comment-popover">${escapeHtml(comment.trim())}</span>
      </span>
    `);
  });
  staged = staged.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
    const resolved = currentPage ? resolveReference(currentPage.path, href) : null;
    if (resolved && pages.some((page) => page.path === resolved)) {
      return stash(`<a href="#${encodeURIComponent(resolved)}" class="term-link" data-page="${escapeHtml(resolved)}">${escapeHtml(label)}</a>`);
    }
    return stash(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
  });

  let escaped = escapeHtml(staged);
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  placeholders.forEach((html, index) => {
    escaped = escaped.replace(`@@WIKI_PLACEHOLDER_${index}@@`, html);
  });
  return escaped;
}

function renderReview(diffText) {
  return `
    <div class="review-header">
      <div>
        <h3>Review</h3>
        <p>Select text in the preview and add a comment, or use the diff to inspect unapproved changes.</p>
      </div>
      <div class="review-actions">
        <button type="button" data-review-action="comment">Add comment</button>
      </div>
    </div>
    <article class="markdown review-preview">${renderMarkdown(currentPage.body || "")}</article>
    ${renderDiff(diffText)}
  `;
}

function renderDiff(text) {
  const lines = text.split(/\r?\n/);
  const rows = lines.map((line) => {
    let cls = "diff-context";
    let label = "human or unchanged";
    if (/^diff --git|^index |^--- |^\+\+\+ /.test(line)) {
      cls = "diff-meta";
      label = "file metadata";
    } else if (/^@@/.test(line)) {
      cls = "diff-hunk";
      label = "changed section";
    } else if (line.startsWith("+")) {
      cls = "diff-added";
      label = "agent added";
    } else if (line.startsWith("-")) {
      cls = "diff-removed";
      label = "agent removed";
    }
    return `<div class="diff-line ${cls}"><span>${escapeHtml(line || " ")}</span><em>${escapeHtml(label)}</em></div>`;
  }).join("");
  return `
    <div class="diff-header">
      <div>
        <h3>Unapproved Changes</h3>
        <p>Unapproved working-tree changes are highlighted. Approved content is treated as human-written.</p>
      </div>
      <div class="diff-legend">
        <span class="legend-added">Agent added</span>
        <span class="legend-removed">Agent removed</span>
      </div>
    </div>
    <div class="diff-lines">${rows || `<div class="diff-empty">No diff for this page.</div>`}</div>
  `;
}

function applyMarkdownFormat(format) {
  const editor = els.editorText;
  if (!editor) return;
  if (format === "bold") wrapSelection("**", "**", "strong text");
  else if (format === "italic") wrapSelection("*", "*", "emphasized text");
  else if (format === "code") wrapSelection("`", "`", "code");
  else if (format === "codeblock") wrapSelection("\n```\n", "\n```\n", "code block");
  else if (format === "heading") prefixSelectedLines("## ");
  else if (format === "quote") prefixSelectedLines("> ");
  else if (format === "bullet") prefixSelectedLines("- ");
  else if (format === "numbered") numberSelectedLines();
  else if (format === "link") insertMarkdownLink();
  else if (format === "tag") tagSelection();
  else if (format === "comment") commentSelectionInEditor();
  editor.focus();
  renderTagSuggestions();
}

function wrapSelection(prefix, suffix, placeholder) {
  const editor = els.editorText;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selected = editor.value.slice(start, end) || placeholder;
  const replacement = `${prefix}${selected}${suffix}`;
  replaceEditorRange(start, end, replacement, start + prefix.length, start + prefix.length + selected.length);
}

function prefixSelectedLines(prefix) {
  const range = selectedLineRange();
  const selected = els.editorText.value.slice(range.start, range.end);
  const replacement = selected.split("\n").map((line) => line ? `${prefix}${line}` : line).join("\n");
  replaceEditorRange(range.start, range.end, replacement, range.start, range.start + replacement.length);
}

function numberSelectedLines() {
  const range = selectedLineRange();
  const selected = els.editorText.value.slice(range.start, range.end);
  let index = 1;
  const replacement = selected.split("\n").map((line) => line ? `${index++}. ${line}` : line).join("\n");
  replaceEditorRange(range.start, range.end, replacement, range.start, range.start + replacement.length);
}

function insertMarkdownLink() {
  const editor = els.editorText;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const label = editor.value.slice(start, end) || "link text";
  const href = window.prompt("Link target", "") || "";
  if (!href.trim()) return;
  const replacement = `[${escapeMarkdownLinkLabel(label)}](${href.trim()})`;
  replaceEditorRange(start, end, replacement, start + 1, start + 1 + label.length);
}

function tagSelection() {
  const editor = els.editorText;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const label = editor.value.slice(start, end).trim();
  if (!label || !currentPage) return;
  const entry = termEntries.find((item) => item.path !== currentPage.path && item.normalized === normalizeTerm(label));
  if (!entry) return;
  const original = editor.value.slice(start, end);
  const replacement = `[${escapeMarkdownLinkLabel(original)}](${relativeReference(currentPage.path, entry.path)})`;
  replaceEditorRange(start, end, replacement, start + replacement.length, start + replacement.length);
}

function commentSelectionInEditor() {
  const editor = els.editorText;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const selected = editor.value.slice(start, end);
  if (!selected.trim()) return;
  const comment = window.prompt("Comment", "");
  if (!comment || !comment.trim()) return;
  const replacement = reviewCommentMarkup(selected, comment);
  replaceEditorRange(start, end, replacement, start + replacement.length, start + replacement.length);
}

async function addReviewCommentFromSelection() {
  if (!currentPage) return;
  const selection = String(window.getSelection ? window.getSelection().toString() : "").trim();
  if (!selection) {
    window.alert("Select text in the review preview first.");
    return;
  }
  const comment = window.prompt("Comment", "");
  if (!comment || !comment.trim()) return;
  const content = els.editorText.value || currentPage.content || "";
  const target = findCommentTarget(content, selection);
  if (!target) {
    window.alert("Could not locate that exact text in the Markdown source. Open Edit mode and add the comment there.");
    return;
  }
  const selectedSource = content.slice(target.start, target.end);
  const replacement = reviewCommentMarkup(selectedSource, comment);
  const updated = `${content.slice(0, target.start)}${replacement}${content.slice(target.end)}`;
  els.editorText.value = updated;
  await savePageContent(updated, "review");
}

function findCommentTarget(content, selectedText) {
  const direct = content.indexOf(selectedText);
  if (direct !== -1) return { start: direct, end: direct + selectedText.length };
  const linkPattern = /\[((?:\\.|[^\]])+)\]\(([^)]+)\)/g;
  let match = linkPattern.exec(content);
  while (match) {
    const label = match[1].replace(/\\]/g, "]").replace(/\\\\/g, "\\");
    if (label === selectedText) return { start: match.index, end: match.index + match[0].length };
    match = linkPattern.exec(content);
  }
  return null;
}

function reviewCommentMarkup(source, comment) {
  return `{{comment:${sanitizeReviewComment(comment)}|${source}}}`;
}

function sanitizeReviewComment(comment) {
  return String(comment || "").replace(/[|{}]/g, " ").replace(/\s+/g, " ").trim();
}

function selectedLineRange() {
  const editor = els.editorText;
  const value = editor.value;
  const start = value.lastIndexOf("\n", Math.max(0, editor.selectionStart - 1)) + 1;
  const nextBreak = value.indexOf("\n", editor.selectionEnd);
  const end = nextBreak === -1 ? value.length : nextBreak;
  return { start, end };
}

function replaceEditorRange(start, end, replacement, selectionStart, selectionEnd) {
  const editor = els.editorText;
  editor.value = `${editor.value.slice(0, start)}${replacement}${editor.value.slice(end)}`;
  editor.setSelectionRange(selectionStart, selectionEnd);
}

function renderTagSuggestions() {
  if (!els.tagSuggestionPanel || !currentPage || els.editorPanel.classList.contains("hidden")) {
    if (els.tagSuggestionPanel) els.tagSuggestionPanel.classList.add("hidden");
    return;
  }
  const suggestions = collectTagSuggestions(els.editorText.value, currentPage.path).slice(0, 10);
  els.tagSuggestionPanel.classList.toggle("hidden", !suggestions.length);
  if (!suggestions.length) {
    els.tagSuggestions.innerHTML = "";
    return;
  }
  els.tagSuggestions.innerHTML = suggestions.map((suggestion) => `
    <div class="tag-suggestion">
      <button type="button" class="tag-suggestion-main" data-term="${escapeHtml(suggestion.normalized)}" data-page="${escapeHtml(suggestion.path)}">
        <span>${escapeHtml(suggestion.label)}</span>
        <small>${escapeHtml(pageTitleForPath(suggestion.path))}</small>
      </button>
      <span class="tag-suggestion-count">${suggestion.count}</span>
    </div>
  `).join("");
  els.tagSuggestions.querySelectorAll("[data-term][data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      applyTagSuggestion(button.getAttribute("data-term"), button.getAttribute("data-page"));
    });
  });
}

function collectTagSuggestions(content, pagePath) {
  const byKey = new Map();
  scanUnlinkedTermMatches(content, pagePath, (match) => {
    const key = `${match.normalized}\n${match.path}`;
    const existing = byKey.get(key);
    if (existing) {
      existing.count += 1;
      return;
    }
    byKey.set(key, {
      label: match.label,
      normalized: match.normalized,
      path: match.path,
      count: 1,
      index: match.index
    });
  });
  return [...byKey.values()].sort((a, b) => a.index - b.index);
}

function applyTagSuggestion(normalized, path) {
  if (!currentPage) return;
  let target = null;
  scanUnlinkedTermMatches(els.editorText.value, currentPage.path, (match) => {
    if (!target && match.normalized === normalized && match.path === path) target = match;
  });
  if (!target) {
    renderTagSuggestions();
    return;
  }
  const content = els.editorText.value;
  const label = content.slice(target.index, target.index + target.length);
  const href = relativeReference(currentPage.path, target.path);
  const replacement = `[${escapeMarkdownLinkLabel(label)}](${href})`;
  els.editorText.value = `${content.slice(0, target.index)}${replacement}${content.slice(target.index + target.length)}`;
  const cursor = target.index + replacement.length;
  els.editorText.setSelectionRange(cursor, cursor);
  els.editorText.focus();
  renderTagSuggestions();
}

function scanUnlinkedTermMatches(content, pagePath, visit) {
  const lines = content.split("\n");
  let offset = 0;
  let inFence = false;
  let inFrontmatter = lines[0] && lines[0].trim() === "---";
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex].replace(/\r$/, "");
    if (inFrontmatter) {
      if (lineIndex > 0 && line.trim() === "---") inFrontmatter = false;
      offset += lines[lineIndex].length + 1;
      continue;
    }
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      offset += lines[lineIndex].length + 1;
      continue;
    }
    if (!inFence && !/^\s{0,3}#/.test(line)) {
      scanMarkdownPlainSegments(line, offset, (segment, segmentOffset) => {
        scanTermSegment(segment, segmentOffset, pagePath, visit);
      });
    }
    offset += lines[lineIndex].length + 1;
  }
}

function scanMarkdownPlainSegments(line, lineOffset, visit) {
  const protectedPattern = /(`[^`]*`|\{\{comment:[^}]*\}\}|!?\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match = protectedPattern.exec(line);
  while (match) {
    if (match.index > lastIndex) {
      visit(line.slice(lastIndex, match.index), lineOffset + lastIndex);
    }
    lastIndex = match.index + match[0].length;
    match = protectedPattern.exec(line);
  }
  if (lastIndex < line.length) visit(line.slice(lastIndex), lineOffset + lastIndex);
}

function scanTermSegment(segment, segmentOffset, pagePath, visit) {
  if (!termEntries.length || !segment.trim()) return;
  let index = 0;
  while (index < segment.length) {
    const entry = termEntries.find((item) => item.path !== pagePath && termMatchesAt(segment, index, item.normalized));
    if (entry) {
      visit({
        label: segment.slice(index, index + entry.normalized.length),
        normalized: entry.normalized,
        path: entry.path,
        index: segmentOffset + index,
        length: entry.normalized.length
      });
      index += entry.normalized.length;
    } else {
      index += 1;
    }
  }
}

function pageTitleForPath(path) {
  const page = pages.find((item) => item.path === path);
  return page ? page.title : path;
}

function relativeReference(fromPath, toPath) {
  const fromParts = fromPath.split("/");
  fromParts.pop();
  const toParts = toPath.split("/");
  let index = 0;
  while (index < fromParts.length && index < toParts.length && fromParts[index] === toParts[index]) {
    index += 1;
  }
  const up = fromParts.slice(index).map(() => "..");
  const down = toParts.slice(index);
  return encodeURI([...up, ...down].join("/") || toPath);
}

function escapeMarkdownLinkLabel(label) {
  return label.replace(/\\/g, "\\\\").replace(/\]/g, "\\]");
}

function termMatchesAt(text, index, term) {
  const slice = text.slice(index, index + term.length);
  if (slice.toLowerCase() !== term) return false;
  const before = index === 0 ? "" : text[index - 1];
  const after = text[index + term.length] || "";
  return isBoundary(before) && isBoundary(after);
}

function isBoundary(char) {
  return !char || !/[A-Za-z0-9_-]/.test(char);
}

function resolveReference(fromPath, href) {
  if (!href || href.startsWith("http") || href.startsWith("#")) return null;
  const clean = href.split("#")[0].replace(/\\/g, "/");
  if (!clean.toLowerCase().endsWith(".md")) return null;
  const base = fromPath.includes("/") ? fromPath.split("/").slice(0, -1).join("/") : "";
  const stack = (base ? base.split("/") : []).concat(decodeURIComponent(clean).split("/"));
  const out = [];
  for (const part of stack) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out.join("/");
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value].filter(Boolean);
}

function chip(value) {
  if (!value) return "";
  const kind = String(value).toLowerCase();
  const cls = kind.includes("parked") || kind.includes("business") ? "status-parked" : kind.includes("stale") || kind.includes("deprecated") ? "status-stale" : "";
  return `<span class="chip ${cls}">${escapeHtml(value)}</span>`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }
  return response.json();
}

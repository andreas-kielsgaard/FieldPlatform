let pages = [];
let currentPage = null;
let dashboard = null;
let termEntries = [];
let surfaceMode = "read";
let savedEditorRange = null;
let currentReview = null;
let currentComments = [];
let activeInspectorTab = "comments";
let selectedTag = null;
let editingTag = null;
let FuseSearch = null;
let tagPickerState = null;
let hoveredEditableTag = null;
let activePreviewNode = null;
let previewModifierDown = false;
let previewHideTimer = null;
let previewHovering = false;
const activeInlineFormats = new Set();
const editorUndoStack = [];
const editorRedoStack = [];
const openNavGroups = new Set();

const navGroups = [
  { key: "start", label: "Start", overview: "README.md" },
  { key: "principles", label: "Principles", overview: "Principles/What FieldPlatform is.md" },
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
  visualEditor: document.getElementById("visualEditor"),
  metadataPanel: document.getElementById("metadataPanel"),
  tracePanel: document.getElementById("tracePanel"),
  backlinksPanel: document.getElementById("backlinksPanel"),
  editorPanel: document.getElementById("editorPanel"),
  editorText: document.getElementById("editorText"),
  tagSuggestionPanel: document.getElementById("tagSuggestionPanel"),
  tagSuggestions: document.getElementById("tagSuggestions"),
  tagPicker: document.getElementById("tagPicker"),
  tagPickerSearch: document.getElementById("tagPickerSearch"),
  tagPickerResults: document.getElementById("tagPickerResults"),
  tagPickerSelection: document.getElementById("tagPickerSelection"),
  tagPickerClose: document.getElementById("tagPickerClose"),
  blockFormat: document.getElementById("blockFormat"),
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
  commentsTab: document.getElementById("commentsTab"),
  specsTab: document.getElementById("specsTab"),
  commentsPanel: document.getElementById("commentsPanel"),
  specsPanel: document.getElementById("specsPanel"),
  commentCount: document.getElementById("commentCount"),
  commentsList: document.getElementById("commentsList"),
  linkPreview: document.getElementById("linkPreview")
};

init();

async function init() {
  await loadPages();
  populateFilters();
  bindEvents();
  setInspectorTab("comments");
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
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      saveEditorSelection();
    });
    button.addEventListener("click", () => applyMarkdownFormat(button.getAttribute("data-format")));
  });
  els.blockFormat.addEventListener("mousedown", saveEditorSelection);
  els.blockFormat.addEventListener("change", () => applyMarkdownFormat(els.blockFormat.value));
  ["input", "click", "keyup", "mouseup"].forEach((eventName) => {
    els.visualEditor.addEventListener(eventName, () => {
      saveEditorSelection();
      updateSourceFromVisualEditor();
      updateCommentsFromContent(els.editorText.value);
      renderTagSuggestions();
      updateBlockFormatControl();
      updateInlineFormatButtons();
    });
  });
  els.visualEditor.addEventListener("beforeinput", handleVisualEditorBeforeInput);
  els.visualEditor.addEventListener("keydown", handleVisualEditorKeydown);
  els.visualEditor.addEventListener("dblclick", (event) => {
    const tag = event.target.closest("a.term-link");
    if (!tag || surfaceMode !== "edit") return;
    event.preventDefault();
    event.stopPropagation();
    beginTagTextEdit(tag);
  });
  els.visualEditor.addEventListener("click", (event) => {
    const tag = event.target.closest("a.term-link");
    if (tag && surfaceMode === "edit") {
      event.preventDefault();
      closeTagPicker();
      if (tag === editingTag) {
        clearSelectedTag();
        return;
      }
      if (event.ctrlKey || event.metaKey || previewModifierDown) {
        openTagInNewWindow(tag.getAttribute("data-page"));
        return;
      }
      selectTagElement(tag);
      return;
    }
    finishTagTextEdit();
    clearSelectedTag();
    if (event.target.closest("a")) event.preventDefault();
  });
  els.saveButton.addEventListener("click", saveCurrentPage);
  els.approveButton.addEventListener("click", approveCurrentPage);
  els.diffButton.addEventListener("click", showReview);
  els.showReader.addEventListener("click", showReader);
  els.showDashboard.addEventListener("click", showDashboard);
  els.refreshDashboard.addEventListener("click", loadDashboard);
  els.commentsTab.addEventListener("click", () => setInspectorTab("comments"));
  els.specsTab.addEventListener("click", () => setInspectorTab("specs"));
  els.tagPickerSearch.addEventListener("input", () => renderTagPickerResults(els.tagPickerSearch.value));
  els.tagPickerSearch.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTagPicker();
    if (event.key === "Enter") {
      const first = els.tagPickerResults.querySelector("[data-page]");
      if (first) {
        event.preventDefault();
        chooseTagPage(first.getAttribute("data-page"));
      }
    }
  });
  els.tagPickerClose.addEventListener("click", closeTagPicker);
  els.toggleInspector.addEventListener("click", () => {
    const opening = !els.shell.classList.contains("inspector-open");
    if (opening) setInspectorTab("comments");
    setInspectorOpen(opening);
  });
  window.addEventListener("hashchange", () => {
    const target = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (target) openPage(target);
  });
  document.addEventListener("keydown", handleEditorHistoryShortcut, true);
  window.addEventListener("keydown", handleGlobalPreviewKeydown);
  window.addEventListener("keyup", handleGlobalPreviewKeyup);
  window.addEventListener("resize", positionTagPicker);
  window.addEventListener("scroll", positionTagPicker, true);
  window.addEventListener("blur", () => {
    previewModifierDown = false;
    hidePreviewNow();
  });
  els.linkPreview.addEventListener("pointerenter", keepPreviewOpen);
  els.linkPreview.addEventListener("pointerleave", schedulePreviewHide);
  els.linkPreview.addEventListener("mouseenter", keepPreviewOpen);
  els.linkPreview.addEventListener("mouseleave", schedulePreviewHide);
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
  els.toggleInspector.setAttribute("aria-label", open ? "Hide review details" : "Show review details");
  els.inspectorPanel.setAttribute("aria-hidden", String(!open));
  updateCommentVisibility();
}

function setInspectorTab(tab) {
  activeInspectorTab = tab === "specs" ? "specs" : "comments";
  const commentsActive = activeInspectorTab === "comments";
  els.commentsTab.classList.toggle("active", commentsActive);
  els.specsTab.classList.toggle("active", !commentsActive);
  els.commentsTab.setAttribute("aria-selected", String(commentsActive));
  els.specsTab.setAttribute("aria-selected", String(!commentsActive));
  els.commentsPanel.classList.toggle("hidden", !commentsActive);
  els.specsPanel.classList.toggle("hidden", commentsActive);
  updateCommentVisibility();
}

function updateCommentVisibility() {
  const commentsOpenInRead = surfaceMode === "read" &&
    activeInspectorTab === "comments" &&
    els.shell.classList.contains("inspector-open");
  els.shell.classList.toggle("comments-visible", surfaceMode === "edit" || surfaceMode === "review" || commentsOpenInRead);
}

function updateInspectorForMode() {
  setInspectorTab("comments");
  if (surfaceMode === "read") {
    setInspectorOpen(false);
  } else if (currentComments.length) {
    setInspectorOpen(true);
  } else {
    setInspectorOpen(false);
  }
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
    ["principles", "Principles/What FieldPlatform is.md"],
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
  hidePreviewNow();
  const page = await fetchJson(`/api/page?path=${encodeURIComponent(path)}`);
  currentPage = page;
  location.hash = encodeURIComponent(page.path);
  showReader();
  renderNav();
  renderPage(page);
}

function renderPage(page) {
  currentReview = null;
  updateCommentsFromContent(page.content || page.body || "");
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
  renderVisualEditor(page.body || "");
  setSurfaceMode("read");
  els.diffPanel.innerHTML = "";
  renderMetadata(page);
  renderTrace(page);
  renderBacklinks(page);
}

function setSurfaceMode(mode) {
  surfaceMode = mode;
  if (mode !== "edit") {
    closeTagPicker();
    finishTagTextEdit();
  }
  els.markdownBody.classList.toggle("hidden", mode !== "read");
  els.editorPanel.classList.toggle("hidden", mode !== "edit");
  els.diffPanel.classList.toggle("hidden", mode !== "review");
  els.editButton.classList.toggle("active", mode === "edit");
  els.diffButton.classList.toggle("active", mode === "review");
  els.editButton.textContent = mode === "edit" ? "Read" : "Edit";
  els.diffButton.textContent = mode === "review" ? "Read" : "Review";
  if (mode === "edit") {
    renderTagSuggestions();
    requestAnimationFrame(() => {
      els.visualEditor.focus();
      updateBlockFormatControl();
    });
  } else {
    renderTagSuggestions();
  }
  updateInspectorForMode();
  updateCommentVisibility();
}

function renderVisualEditor(markdown) {
  els.visualEditor.innerHTML = renderMarkdown(markdown || "");
  editingTag = null;
  selectedTag = null;
  editorUndoStack.length = 0;
  editorRedoStack.length = 0;
  wireEditableTagLinks();
  savedEditorRange = null;
  activeInlineFormats.clear();
  updateInlineFormatButtons();
}

function wireEditableTagLinks() {
  els.visualEditor.querySelectorAll("a.term-link[data-page]").forEach((node) => {
    prepareEditableTagLink(node);
  });
}

function prepareEditableTagLink(node) {
  node.contentEditable = "false";
  node.spellcheck = false;
  node.removeAttribute("tabindex");
  node.classList.remove("selected-tag", "editing-tag");
  node.title = "Click to select. Double-click to edit the tag text. Ctrl+hover to preview. Ctrl+click to open in a new window.";
  node.addEventListener("mouseenter", (event) => {
    hoveredEditableTag = node;
    if (event.ctrlKey || event.metaKey) showPreview(node, node.getAttribute("data-page"));
  });
  node.addEventListener("mousemove", (event) => {
    hoveredEditableTag = node;
    if (event.ctrlKey || event.metaKey) {
      showPreview(node, node.getAttribute("data-page"));
      positionPreview(node);
    } else if (activePreviewNode === node) {
      schedulePreviewHide(node);
    }
  });
  node.addEventListener("mouseleave", () => {
    hoveredEditableTag = null;
    schedulePreviewHide(node);
  });
}

function updateSourceFromVisualEditor() {
  if (!currentPage || surfaceMode !== "edit") return;
  els.editorText.value = composePageContentFromEditor();
}

function composePageContentFromEditor() {
  const frontmatter = extractFrontmatter(currentPage ? currentPage.content : "").frontmatter;
  const body = visualEditorToMarkdown(els.visualEditor).trim();
  return `${frontmatter}${frontmatter ? "\n\n" : ""}${body}\n`;
}

function extractFrontmatter(content) {
  const text = String(content || "");
  if (!text.startsWith("---")) return { frontmatter: "", body: text };
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      return {
        frontmatter: lines.slice(0, index + 1).join("\n"),
        body: lines.slice(index + 1).join("\n")
      };
    }
  }
  return { frontmatter: "", body: text };
}

function visualEditorToMarkdown(root) {
  const blocks = [];
  root.childNodes.forEach((node) => {
    const markdown = blockNodeToMarkdown(node);
    if (markdown) blocks.push(markdown);
  });
  return blocks.join("\n\n").replace(/\n{3,}/g, "\n\n");
}

function blockNodeToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const tag = node.tagName.toLowerCase();
  if (/^h[1-6]$/.test(tag)) {
    const level = Number(tag.slice(1));
    return `${"#".repeat(Math.min(level, 6))} ${inlineNodeToMarkdown(node).trim()}`;
  }
  if (tag === "p" || tag === "div") return inlineNodeToMarkdown(node).trim();
  if (tag === "ul") {
    return [...node.children].filter((child) => child.tagName && child.tagName.toLowerCase() === "li").map((child) => `- ${inlineNodeToMarkdown(child).trim()}`).join("\n");
  }
  if (tag === "ol") {
    let index = 1;
    return [...node.children].filter((child) => child.tagName && child.tagName.toLowerCase() === "li").map((child) => `${index++}. ${inlineNodeToMarkdown(child).trim()}`).join("\n");
  }
  if (tag === "blockquote") {
    return inlineNodeToMarkdown(node).split("\n").map((line) => `> ${line}`).join("\n");
  }
  if (tag === "pre") return `\`\`\`\n${node.textContent.replace(/\n+$/, "")}\n\`\`\``;
  if (tag === "table") return tableToMarkdown(node);
  if (tag === "br") return "";
  return inlineNodeToMarkdown(node).trim();
}

function inlineNodeToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) return normalizeEditorText(node.textContent);
  if (node.nodeType !== Node.ELEMENT_NODE) return "";
  const element = node;
  const tag = element.tagName.toLowerCase();
  if (tag === "br") return "\n";
  if (tag === "strong" || tag === "b") return `**${childrenToMarkdown(element).trim()}**`;
  if (tag === "em" || tag === "i") return `*${childrenToMarkdown(element).trim()}*`;
  if (tag === "code") return `\`${element.textContent.replace(/`/g, "'")}\``;
  if (tag === "a") {
    const label = childrenToMarkdown(element).trim() || element.textContent.trim();
    const target = element.getAttribute("data-page")
      ? relativeReference(currentPage.path, element.getAttribute("data-page"))
      : (element.getAttribute("href") || "");
    return `[${escapeMarkdownLinkLabel(label)}](${target})`;
  }
  if (element.classList.contains("review-comment")) {
    const comment = element.querySelector(".review-comment-popover")?.textContent || "";
    const body = element.querySelector(".review-comment-text") ? childrenToMarkdown(element.querySelector(".review-comment-text")) : element.textContent;
    return reviewCommentMarkup(body.trim(), comment);
  }
  return childrenToMarkdown(element);
}

function childrenToMarkdown(element) {
  return [...element.childNodes].map(inlineNodeToMarkdown).join("").replace(/[ \t]+\n/g, "\n");
}

function normalizeEditorText(text) {
  return String(text || "").replace(/\u00a0/g, " ");
}

function tableToMarkdown(table) {
  const rows = [...table.querySelectorAll("tr")].map((row) => [...row.children].map((cell) => inlineNodeToMarkdown(cell).trim()));
  if (!rows.length) return "";
  const width = Math.max(...rows.map((row) => row.length));
  const padded = rows.map((row) => [...row, ...Array(Math.max(0, width - row.length)).fill("")]);
  const header = padded[0];
  const separator = header.map(() => "---");
  const body = padded.slice(1);
  return [header, separator, ...body].map((row) => `| ${row.join(" | ")} |`).join("\n");
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

function updateCommentsFromContent(content) {
  const parsed = extractFrontmatter(content || "");
  currentComments = extractCommentsFromMarkdown(parsed.body || content || "");
  renderCommentsPanel();
  if ((surfaceMode === "edit" || surfaceMode === "review") && currentComments.length) {
    setInspectorTab("comments");
    setInspectorOpen(true);
  }
  updateCommentVisibility();
}

function extractCommentsFromMarkdown(markdown) {
  const comments = [];
  const pattern = /\{\{comment:([\s\S]*?)\|([\s\S]*?)\}\}/g;
  let match = pattern.exec(markdown || "");
  while (match) {
    const comment = sanitizeReviewComment(match[1]);
    const source = match[2].trim();
    comments.push({
      id: commentId(comment, source),
      comment,
      source,
      excerpt: plainMarkdownText(source).slice(0, 180),
      index: match.index
    });
    match = pattern.exec(markdown || "");
  }
  return comments;
}

function renderCommentsPanel() {
  els.commentCount.textContent = String(currentComments.length);
  if (!currentComments.length) {
    els.commentsList.innerHTML = `<p class="muted">No comments on this page.</p>`;
    return;
  }
  els.commentsList.innerHTML = currentComments.map((item, index) => `
    <button type="button" class="comment-card" data-comment-id="${escapeHtml(item.id)}">
      <span class="comment-number">Comment ${index + 1}</span>
      <strong>${escapeHtml(item.comment)}</strong>
      <span>${escapeHtml(item.excerpt || "Commented text")}</span>
    </button>
  `).join("");
  els.commentsList.querySelectorAll("[data-comment-id]").forEach((button) => {
    button.addEventListener("click", () => focusComment(button.getAttribute("data-comment-id")));
  });
}

function focusComment(id) {
  if (!id) return;
  if (surfaceMode === "read" && activeInspectorTab === "comments") updateCommentVisibility();
  const containers = [els.diffPanel, els.visualEditor, els.markdownBody];
  const target = containers.map((container) => container.querySelector(`[data-comment-id="${id}"]`)).find(Boolean);
  if (!target) return;
  target.scrollIntoView({ block: "center", behavior: "smooth" });
  target.classList.add("active-comment");
  window.setTimeout(() => target.classList.remove("active-comment"), 1600);
}

function commentId(comment, source) {
  return `comment-${stableHash(`${comment}|${plainMarkdownText(source)}`)}`;
}

function stableHash(value) {
  let hash = 0;
  const text = String(value || "");
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function plainMarkdownText(text) {
  return String(text || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
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

function handleGlobalPreviewKeydown(event) {
  if (event.key === "Control" || event.key === "Meta" || event.ctrlKey || event.metaKey) {
    previewModifierDown = true;
  }
  if (surfaceMode !== "edit" || !hoveredEditableTag) return;
  if (previewModifierDown) {
    showPreview(hoveredEditableTag, hoveredEditableTag.getAttribute("data-page"));
  }
}

function handleGlobalPreviewKeyup(event) {
  if (event.key === "Control" || event.key === "Meta") previewModifierDown = false;
  if (surfaceMode !== "edit") return;
  if (event.key === "Control" || event.key === "Meta") {
    schedulePreviewHide(hoveredEditableTag);
  }
}

function attachPreview(node, path) {
  if (!path) return;
  node.addEventListener("pointerenter", () => showPreview(node, path));
  node.addEventListener("pointermove", () => positionPreview(node));
  node.addEventListener("pointerleave", () => schedulePreviewHide(node));
  node.addEventListener("mouseenter", () => showPreview(node, path));
  node.addEventListener("mousemove", () => positionPreview(node));
  node.addEventListener("mouseleave", () => schedulePreviewHide(node));
  node.addEventListener("focus", () => showPreview(node, path));
  node.addEventListener("blur", () => schedulePreviewHide(node));
}

function showPreview(node, path) {
  const page = pages.find((item) => item.path === path);
  if (!page) return;
  const preview = previewText(page);
  keepPreviewOpen();
  activePreviewNode = node;
  els.linkPreview.innerHTML = `
    <div class="preview-title">${escapeHtml(page.title)}</div>
    <p class="preview-body">${escapeHtml(preview)}</p>
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

function keepPreviewOpen() {
  if (previewHideTimer) {
    window.clearTimeout(previewHideTimer);
    previewHideTimer = null;
  }
  previewHovering = true;
}

function schedulePreviewHide(node) {
  if (node && activePreviewNode && node !== activePreviewNode) return;
  previewHovering = false;
  if (previewHideTimer) window.clearTimeout(previewHideTimer);
  previewHideTimer = window.setTimeout(() => {
    previewHideTimer = null;
    if (!previewHovering) hidePreviewNow();
  }, 500);
}

function hidePreviewNow() {
  if (previewHideTimer) {
    window.clearTimeout(previewHideTimer);
    previewHideTimer = null;
  }
  previewHovering = false;
  els.linkPreview.classList.add("hidden");
  activePreviewNode = null;
}

function previewText(page) {
  const text = plainPreviewText(page.body);
  if (!text) return page.excerpt || "No preview available.";
  const limit = 360;
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit).replace(/[ \t\n]+[^\s]*$/, "").trim();
  return `${clipped || text.slice(0, limit).trim()} [...]`;
}

function plainPreviewText(markdown) {
  return String(markdown || "")
    .replace(/^#\s+.+(?:\n|$)/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\{comment:[\s\S]*?\|([\s\S]*?)\}\}/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

async function saveCurrentPage() {
  if (!currentPage) return;
  await savePageContent(composePageContentFromEditor(), "read");
}

async function savePageContent(content, modeAfterSave = "read") {
  const result = await fetchJson("/api/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path: currentPage.path, content, source: "human-edit" })
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
  currentReview = await fetchJson(`/api/review?path=${encodeURIComponent(currentPage.path)}`);
  els.diffPanel.innerHTML = renderReview(currentReview);
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
    const id = commentId(sanitizeReviewComment(comment), label.trim());
    return stash(`
      <span class="review-comment" tabindex="0" data-comment-id="${escapeHtml(id)}">
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

function renderReview(review) {
  const sections = review.sections || [];
  return `
    <div class="review-header">
      <div>
        <h3>Review</h3>
        <p>AI-generated sections are highlighted. Human-written and approved sections are left plain.</p>
      </div>
      <div class="review-actions">
        <button type="button" data-review-action="comment">Add comment</button>
      </div>
    </div>
    <div class="review-legend">
      <span class="legend-ai">AI generated: ${review.summary.generated}</span>
      <span class="legend-human">Human written: ${review.summary.humanWritten}</span>
      <span class="legend-approved">Human approved: ${review.summary.humanApproved}</span>
    </div>
    <article class="markdown review-preview">
      ${sections.map(renderReviewSection).join("") || `<p class="muted">No reviewable sections found.</p>`}
    </article>
  `;
}

function renderReviewSection(section) {
  const isGenerated = section.state === "ai-generated";
  const stateLabel = section.state === "human-approved" ? "Human approved" : section.state === "human-written" ? "Human written" : "AI generated";
  return `
    <section class="review-section review-state-${escapeHtml(section.state)}" title="${isGenerated ? escapeHtml(section.tooltip) : ""}" aria-label="${escapeHtml(`${section.heading}: ${stateLabel}`)}">
      ${isGenerated ? `<span class="review-section-badge">AI</span><span class="review-section-tooltip">${escapeHtml(section.tooltip)}</span>` : ""}
      ${renderMarkdown(section.markdown)}
    </section>
  `;
}

async function applyMarkdownFormat(format) {
  if (!els.visualEditor) return;
  ensureVisualEditorSelection();
  if (["bold", "italic", "code"].includes(format)) applyInlineFormat(format);
  else if (format === "codeblock") insertCodeBlock();
  else if (format === "quote") applyQuoteBlock();
  else if (format === "bullet") applyListFormat("ul");
  else if (format === "numbered") applyListFormat("ol");
  else if (format === "link") insertVisualLink();
  else if (format === "tag") {
    await openTagPickerForSelection();
    return;
  }
  else if (format === "comment") commentSelectionInEditor();
  else if (["p", "h1", "h2", "h3"].includes(format)) applyBlockFormat(format);
  els.visualEditor.focus();
  saveEditorSelection();
  updateSourceFromVisualEditor();
  updateCommentsFromContent(els.editorText.value);
  renderTagSuggestions();
  updateBlockFormatControl();
  updateInlineFormatButtons();
  placeCaretAtEditorEnd();
  refocusVisualEditor();
}

function refocusVisualEditor() {
  els.visualEditor.focus({ preventScroll: true });
  requestAnimationFrame(() => els.visualEditor.focus({ preventScroll: true }));
  window.setTimeout(() => els.visualEditor.focus({ preventScroll: true }), 0);
}

function placeCaretAtEditorEnd() {
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(els.visualEditor);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function saveEditorSelection() {
  if (!els.visualEditor) return;
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (!els.visualEditor.contains(range.commonAncestorContainer)) return;
  savedEditorRange = range.cloneRange();
}

function restoreEditorSelection() {
  if (!savedEditorRange) return false;
  const selection = window.getSelection();
  if (!selection) return false;
  try {
    selection.removeAllRanges();
    selection.addRange(savedEditorRange);
    return true;
  } catch {
    savedEditorRange = null;
    return false;
  }
}

function ensureVisualEditorSelection() {
  els.visualEditor.focus();
  const selection = window.getSelection();
  if (selection && selection.rangeCount && els.visualEditor.contains(selection.anchorNode)) {
    saveEditorSelection();
    return;
  }
  if (restoreEditorSelection()) return;
  const range = document.createRange();
  range.selectNodeContents(els.visualEditor);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function selectedVisualText() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount || !els.visualEditor.contains(selection.anchorNode)) return "";
  return selection.toString();
}

function handleVisualEditorBeforeInput(event) {
  if (event.inputType !== "insertText" || !event.data || !activeInlineFormats.size) return;
  if (selectionMatchesActiveInlineFormats()) return;
  event.preventDefault();
  insertFormattedText(event.data);
  updateSourceFromVisualEditor();
  renderTagSuggestions();
}

function handleEditorHistoryShortcut(event) {
  if (surfaceMode !== "edit" || !(event.ctrlKey || event.metaKey)) return false;
  const targetTag = event.target?.tagName ? event.target.tagName.toLowerCase() : "";
  if (["input", "textarea", "select"].includes(targetTag)) return false;
  const key = event.key.toLowerCase();
  if (key === "z" && editorUndoStack.length) {
    event.preventDefault();
    event.stopPropagation();
    undoEditorChange();
    return true;
  }
  if (key === "y" && editorRedoStack.length) {
    event.preventDefault();
    event.stopPropagation();
    redoEditorChange();
    return true;
  }
  return false;
}

function handleVisualEditorKeydown(event) {
  if (handleEditorHistoryShortcut(event)) {
    return;
  }
  if (editingTag && (event.key === "Enter" || event.key === "Escape")) {
    event.preventDefault();
    finishTagTextEdit({ placeCaretAfter: true });
    return;
  }
  if (!selectedTag) return;
  if (event.key === "Backspace" || event.key === "Delete") {
    event.preventDefault();
    pushEditorUndoSnapshot();
    unwrapTagElement(selectedTag);
    clearSelectedTag();
    updateSourceFromVisualEditor();
    renderTagSuggestions();
  }
}

function selectTagElement(tag) {
  finishTagTextEdit();
  clearSelectedTag();
  hidePreviewNow();
  selectedTag = tag;
  selectedTag.classList.add("selected-tag");
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNode(tag);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function beginTagTextEdit(tag) {
  if (!tag || !els.visualEditor.contains(tag)) return;
  if (editingTag && editingTag !== tag) finishTagTextEdit();
  if (editingTag !== tag) {
    pushEditorUndoSnapshot();
  }
  clearSelectedTag();
  hidePreviewNow();
  editingTag = tag;
  tag.contentEditable = "true";
  tag.spellcheck = true;
  tag.tabIndex = 0;
  tag.classList.add("editing-tag");
  tag.focus({ preventScroll: true });
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(tag);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function finishTagTextEdit(options = {}) {
  if (!editingTag) return;
  const tag = editingTag;
  editingTag = null;
  tag.contentEditable = "false";
  tag.spellcheck = false;
  tag.removeAttribute("tabindex");
  tag.classList.remove("editing-tag");
  if (options.placeCaretAfter && els.visualEditor.contains(tag)) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStartAfter(tag);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    saveEditorSelection();
  }
  updateSourceFromVisualEditor();
  renderTagSuggestions();
}

function openTagInNewWindow(path) {
  if (!path) return;
  hidePreviewNow();
  const targetUrl = `${location.origin}${location.pathname}#${encodeURIComponent(path)}`;
  const opened = window.open(targetUrl, "_blank", "noopener,noreferrer");
  if (!opened) {
    const link = document.createElement("a");
    link.href = targetUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

function clearSelectedTag() {
  if (selectedTag) selectedTag.classList.remove("selected-tag");
  selectedTag = null;
}

function pushEditorUndoSnapshot() {
  editorUndoStack.push(els.visualEditor.innerHTML);
  if (editorUndoStack.length > 40) editorUndoStack.shift();
  editorRedoStack.length = 0;
}

function undoEditorChange() {
  if (!editorUndoStack.length) return;
  editorRedoStack.push(els.visualEditor.innerHTML);
  restoreEditorSnapshot(editorUndoStack.pop());
}

function redoEditorChange() {
  if (!editorRedoStack.length) return;
  editorUndoStack.push(els.visualEditor.innerHTML);
  restoreEditorSnapshot(editorRedoStack.pop());
}

function restoreEditorSnapshot(html) {
  editingTag = null;
  selectedTag = null;
  els.visualEditor.innerHTML = html;
  wireEditableTagLinks();
  clearSelectedTag();
  updateSourceFromVisualEditor();
  updateCommentsFromContent(els.editorText.value);
  renderTagSuggestions();
  updateBlockFormatControl();
  updateInlineFormatButtons();
}

function unwrapTagElement(tag) {
  const text = document.createTextNode(tag.textContent || "");
  tag.replaceWith(text);
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStartAfter(text);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function applyInlineFormat(format) {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  if (!selection.isCollapsed && selectedVisualText()) {
    wrapVisualSelection(inlineFormatTag(format), {}, selectedVisualText());
    return;
  }
  toggleInlineFormatMode(format);
}

function toggleInlineFormatMode(format) {
  if (activeInlineFormats.has(format)) {
    activeInlineFormats.delete(format);
    moveCaretOutOfInlineFormat(format);
  } else {
    activeInlineFormats.add(format);
  }
  updateInlineFormatButtons();
}

function inlineFormatTag(format) {
  if (format === "bold") return "strong";
  if (format === "italic") return "em";
  return "code";
}

function inlineFormatSelector(format) {
  if (format === "bold") return "strong, b";
  if (format === "italic") return "em, i";
  return "code";
}

function selectionMatchesActiveInlineFormats() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount || !els.visualEditor.contains(selection.anchorNode)) return false;
  return [...activeInlineFormats].every((format) => closestInlineFormat(selection.anchorNode, format));
}

function closestInlineFormat(node, format) {
  let current = node && node.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
  while (current && current !== els.visualEditor) {
    if (current.matches && current.matches(inlineFormatSelector(format))) return current;
    current = current.parentElement;
  }
  return null;
}

function moveCaretOutOfInlineFormat(format) {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount || !els.visualEditor.contains(selection.anchorNode)) return;
  const wrapper = closestInlineFormat(selection.anchorNode, format);
  if (!wrapper) return;
  const range = document.createRange();
  range.setStartAfter(wrapper);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function insertFormattedText(text) {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (!els.visualEditor.contains(range.commonAncestorContainer)) return;
  if (!range.collapsed) range.deleteContents();
  const textNode = document.createTextNode(text);
  let node = textNode;
  const order = ["code", "italic", "bold"].filter((format) => activeInlineFormats.has(format));
  order.forEach((format) => {
    const wrapper = document.createElement(inlineFormatTag(format));
    wrapper.appendChild(node);
    node = wrapper;
  });
  range.insertNode(node);
  const nextRange = document.createRange();
  nextRange.setStart(textNode, textNode.textContent.length);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);
  saveEditorSelection();
}

function updateInlineFormatButtons() {
  const selection = window.getSelection();
  const formatsAtSelection = new Set();
  if (selection && selection.rangeCount && els.visualEditor.contains(selection.anchorNode)) {
    ["bold", "italic", "code"].forEach((format) => {
      if (closestInlineFormat(selection.anchorNode, format)) formatsAtSelection.add(format);
    });
  }
  document.querySelectorAll("[data-format]").forEach((button) => {
    const format = button.getAttribute("data-format");
    if (!["bold", "italic", "code"].includes(format)) return;
    const active = activeInlineFormats.has(format) || formatsAtSelection.has(format);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function wrapVisualSelection(tagName, attributes = {}, placeholder = "") {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (!els.visualEditor.contains(range.commonAncestorContainer)) return null;
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (range.collapsed) {
    element.textContent = placeholder || tagName;
  } else {
    element.appendChild(range.extractContents());
  }
  range.insertNode(element);
  selection.removeAllRanges();
  const nextRange = document.createRange();
  nextRange.selectNodeContents(element);
  nextRange.collapse(false);
  selection.addRange(nextRange);
  saveEditorSelection();
  return element;
}

function applyBlockFormat(tagName) {
  const block = nearestEditorBlock();
  if (!block) return;
  const target = tagName === "p" ? "p" : tagName;
  replaceElementTag(block, target);
}

function applyQuoteBlock() {
  const block = nearestEditorBlock();
  if (!block) return;
  const quote = block.closest("blockquote");
  if (quote && els.visualEditor.contains(quote)) {
    replaceElementTag(quote, "p");
    return;
  }
  replaceElementTag(block, "blockquote");
}

function applyListFormat(listTag) {
  const block = nearestEditorBlock();
  if (!block) return;
  const existingList = block.closest("ul, ol");
  if (existingList && els.visualEditor.contains(existingList)) {
    if (existingList.tagName.toLowerCase() === listTag) unwrapList(existingList);
    else replaceElementTag(existingList, listTag);
    return;
  }
  const list = document.createElement(listTag);
  const item = document.createElement("li");
  while (block.firstChild) item.appendChild(block.firstChild);
  list.appendChild(item);
  block.replaceWith(list);
  selectElementContents(item);
}

function unwrapList(list) {
  const fragment = document.createDocumentFragment();
  const paragraphs = [...list.children].map((item) => {
    const paragraph = document.createElement("p");
    while (item.firstChild) paragraph.appendChild(item.firstChild);
    fragment.appendChild(paragraph);
    return paragraph;
  });
  list.replaceWith(fragment);
  if (paragraphs[0]) selectElementContents(paragraphs[0]);
}

function nearestEditorBlock() {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;
  let node = selection.anchorNode;
  if (!node || !els.visualEditor.contains(node)) return null;
  if (node.nodeType !== Node.ELEMENT_NODE) node = node.parentElement;
  while (node && node !== els.visualEditor) {
    const tag = node.tagName ? node.tagName.toLowerCase() : "";
    if (["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote", "pre"].includes(tag)) return node;
    node = node.parentElement;
  }
  return els.visualEditor.firstElementChild || null;
}

function replaceElementTag(element, tagName) {
  if (!element || element === els.visualEditor) return null;
  const replacement = document.createElement(tagName);
  while (element.firstChild) replacement.appendChild(element.firstChild);
  element.replaceWith(replacement);
  selectElementContents(replacement);
  return replacement;
}

function selectElementContents(element) {
  const selection = window.getSelection();
  if (!selection || !element) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function insertCodeBlock() {
  const selected = selectedVisualText() || "code block";
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = selected;
  pre.appendChild(code);
  if (!range.collapsed) range.deleteContents();
  range.insertNode(pre);
  range.setStartAfter(pre);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  saveEditorSelection();
}

function insertVisualLink() {
  const label = selectedVisualText() || "link text";
  const href = window.prompt("Link target", "") || "";
  if (!href.trim()) return;
  const link = wrapVisualSelection("a", { href: href.trim() }, label);
  if (link && !link.textContent.trim()) link.textContent = label;
}

async function openTagPickerForSelection() {
  const label = selectedVisualText().trim();
  if (!currentPage) return;
  if (!label) {
    window.alert("Select text in the editor first, then choose Tag.");
    return;
  }
  await ensureFuseSearch();
  tagPickerState = {
    label,
    range: savedEditorRange ? savedEditorRange.cloneRange() : window.getSelection().getRangeAt(0).cloneRange()
  };
  els.tagPickerSelection.textContent = `Tag selected text: "${label}"`;
  els.tagPickerSearch.value = label;
  els.tagPicker.classList.remove("hidden");
  renderTagPickerResults(label);
  positionTagPicker();
  requestAnimationFrame(() => {
    positionTagPicker();
    els.tagPickerSearch.focus();
    els.tagPickerSearch.select();
  });
}

async function ensureFuseSearch() {
  if (FuseSearch) return FuseSearch;
  const module = await import("/vendor/fuse.min.mjs");
  FuseSearch = module.default || module.Fuse;
  if (!FuseSearch) throw new Error("Fuse.js failed to load.");
  return FuseSearch;
}

function tagPageEntries() {
  return pages
    .filter((page) => !currentPage || page.path !== currentPage.path)
    .map((page) => ({
      title: page.title,
      path: page.path,
      layer: page.metadata.layer || "",
      status: page.metadata.status || "",
      aliases: normalizeList(page.metadata.canonical_for),
      searchText: [page.title, page.path, page.metadata.layer, page.metadata.status, ...normalizeList(page.metadata.canonical_for)].filter(Boolean).join(" ")
    }));
}

function renderTagPickerResults(query) {
  const entries = tagPageEntries();
  const trimmed = String(query || "").trim();
  const results = trimmed && FuseSearch
    ? new FuseSearch(entries, {
      keys: [
        { name: "title", weight: 0.45 },
        { name: "aliases", weight: 0.3 },
        { name: "path", weight: 0.2 },
        { name: "layer", weight: 0.05 }
      ],
      threshold: 0.38,
      ignoreLocation: true,
      includeMatches: true,
      includeScore: true,
      minMatchCharLength: 2
    }).search(trimmed).slice(0, 40)
    : entries.slice(0, 60).map((item) => ({ item, matches: [], score: 1 }));

  if (!results.length) {
    els.tagPickerResults.innerHTML = `<p class="muted">No matching wiki pages.</p>`;
    return;
  }
  els.tagPickerResults.innerHTML = results.map((result, index) => tagPickerResult(result, index)).join("");
  els.tagPickerResults.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("mousedown", (event) => event.preventDefault());
    button.addEventListener("click", () => chooseTagPage(button.getAttribute("data-page")));
  });
}

function tagPickerResult(result, index) {
  const page = result.item;
  const title = highlightedFuseValue(page.title, result.matches, "title");
  const path = highlightedFuseValue(page.path, result.matches, "path");
  const aliasMatch = (result.matches || []).find((match) => match.key === "aliases");
  const alias = aliasMatch ? `<span class="tag-picker-alias">Matched alias: ${highlightFuseIndices(String(aliasMatch.value || ""), aliasMatch.indices || [])}</span>` : "";
  return `
    <button type="button" class="tag-picker-result${index === 0 ? " best-match" : ""}" data-page="${escapeHtml(page.path)}">
      <span class="tag-picker-rank">${index === 0 ? "Best match" : `Match ${index + 1}`}</span>
      <strong>${title}</strong>
      <span>${path}</span>
      ${alias}
      <small>${escapeHtml([page.layer, page.status].filter(Boolean).join(" / "))}</small>
    </button>
  `;
}

function highlightedFuseValue(value, matches, key) {
  const match = (matches || []).find((item) => item.key === key);
  if (!match) return escapeHtml(value);
  return highlightFuseIndices(value, match.indices || []);
}

function highlightFuseIndices(value, indices) {
  const text = String(value || "");
  if (!indices.length) return escapeHtml(text);
  let html = "";
  let cursor = 0;
  indices.forEach(([start, end]) => {
    if (start > cursor) html += escapeHtml(text.slice(cursor, start));
    html += `<mark>${escapeHtml(text.slice(start, end + 1))}</mark>`;
    cursor = end + 1;
  });
  if (cursor < text.length) html += escapeHtml(text.slice(cursor));
  return html;
}

function chooseTagPage(path) {
  if (!tagPickerState || !path) return;
  const entry = pages.find((page) => page.path === path);
  if (!entry || !restoreTagPickerSelection()) return;
  pushEditorUndoSnapshot();
  const link = wrapVisualSelection("a", {
    href: `#${encodeURIComponent(entry.path)}`,
    "data-page": entry.path,
    class: "term-link"
  }, tagPickerState.label);
  if (link) {
    link.textContent = tagPickerState.label;
    prepareEditableTagLink(link);
  }
  closeTagPicker();
  updateSourceFromVisualEditor();
  renderTagSuggestions();
  els.visualEditor.focus();
}

function restoreTagPickerSelection() {
  const selection = window.getSelection();
  if (!selection || !tagPickerState.range) return false;
  try {
    selection.removeAllRanges();
    selection.addRange(tagPickerState.range);
    savedEditorRange = tagPickerState.range.cloneRange();
    return true;
  } catch {
    return false;
  }
}

function closeTagPicker() {
  if (!els.tagPicker) return;
  els.tagPicker.classList.add("hidden");
  els.tagPickerResults.innerHTML = "";
  tagPickerState = null;
}

function positionTagPicker() {
  if (!els.tagPicker || els.tagPicker.classList.contains("hidden")) return;
  const anchor = document.querySelector('[data-format="tag"]');
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  const margin = 14;
  const pickerRect = els.tagPicker.getBoundingClientRect();
  const width = Math.min(560, window.innerWidth - margin * 2);
  let left = rect.left;
  if (left + width > window.innerWidth - margin) left = window.innerWidth - margin - width;
  if (left < margin) left = margin;
  let top = rect.bottom + 8;
  if (top + pickerRect.height > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - pickerRect.height - 8);
  }
  els.tagPicker.style.width = `${width}px`;
  els.tagPicker.style.left = `${left}px`;
  els.tagPicker.style.top = `${top}px`;
}

function commentSelectionInEditor() {
  const selected = selectedVisualText();
  if (!selected.trim()) return;
  const comment = window.prompt("Comment", "");
  if (!comment || !comment.trim()) return;
  const wrapper = document.createElement("span");
  wrapper.className = "review-comment";
  wrapper.tabIndex = 0;
  wrapper.dataset.commentId = commentId(sanitizeReviewComment(comment), selected);
  const text = document.createElement("span");
  text.className = "review-comment-text";
  const popover = document.createElement("span");
  popover.className = "review-comment-popover";
  popover.textContent = sanitizeReviewComment(comment);
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  text.appendChild(range.extractContents());
  wrapper.append(text, popover);
  range.insertNode(wrapper);
  selection.removeAllRanges();
  const nextRange = document.createRange();
  nextRange.selectNodeContents(wrapper);
  nextRange.collapse(false);
  selection.addRange(nextRange);
  saveEditorSelection();
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

function renderTagSuggestions() {
  if (!els.tagSuggestionPanel || !currentPage || els.editorPanel.classList.contains("hidden")) {
    if (els.tagSuggestionPanel) els.tagSuggestionPanel.classList.add("hidden");
    return;
  }
  updateSourceFromVisualEditor();
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
  wrapFirstVisualTermMatch(normalized, path);
  updateSourceFromVisualEditor();
  els.visualEditor.focus();
  renderTagSuggestions();
}

function updateBlockFormatControl() {
  if (!els.blockFormat) return;
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount || !els.visualEditor.contains(selection.anchorNode)) return;
  let node = selection.anchorNode.nodeType === Node.ELEMENT_NODE ? selection.anchorNode : selection.anchorNode.parentElement;
  while (node && node !== els.visualEditor) {
    const tag = node.tagName ? node.tagName.toLowerCase() : "";
    if (["p", "h1", "h2", "h3"].includes(tag)) {
      els.blockFormat.value = tag;
      return;
    }
    node = node.parentElement;
  }
  els.blockFormat.value = "p";
}

function wrapFirstVisualTermMatch(normalized, path) {
  const walker = document.createTreeWalker(els.visualEditor, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("a, code, pre, .review-comment")) return NodeFilter.FILTER_REJECT;
      const index = findTermIndex(node.textContent, normalized);
      return index === -1 ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const node = walker.nextNode();
  if (!node) return false;
  const index = findTermIndex(node.textContent, normalized);
  const label = node.textContent.slice(index, index + normalized.length);
  const before = document.createTextNode(node.textContent.slice(0, index));
  const after = document.createTextNode(node.textContent.slice(index + normalized.length));
  const link = document.createElement("a");
  link.className = "term-link";
  link.href = `#${encodeURIComponent(path)}`;
  link.dataset.page = path;
  link.textContent = label;
  prepareEditableTagLink(link);
  node.parentNode.insertBefore(before, node);
  node.parentNode.insertBefore(link, node);
  node.parentNode.insertBefore(after, node);
  node.remove();
  return true;
}

function findTermIndex(text, normalized) {
  const lower = String(text || "").toLowerCase();
  let index = lower.indexOf(normalized);
  while (index !== -1) {
    const before = index === 0 ? "" : lower[index - 1];
    const after = lower[index + normalized.length] || "";
    if (isBoundary(before) && isBoundary(after)) return index;
    index = lower.indexOf(normalized, index + 1);
  }
  return -1;
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

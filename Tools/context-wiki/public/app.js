let pages = [];
let currentPage = null;
let dashboard = null;

const els = {
  searchInput: document.getElementById("searchInput"),
  layerFilter: document.getElementById("layerFilter"),
  statusFilter: document.getElementById("statusFilter"),
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
  dashboardSections: document.getElementById("dashboardSections")
};

init();

async function init() {
  await loadPages();
  populateFilters();
  bindEvents();
  const initial = decodeURIComponent(location.hash.replace(/^#/, "")) || "README.md";
  openPage(pages.find((page) => page.path === initial) ? initial : "README.md");
}

async function loadPages() {
  pages = await fetchJson("/api/pages");
  pages.sort((a, b) => a.path.localeCompare(b.path));
}

function bindEvents() {
  els.searchInput.addEventListener("input", renderNav);
  els.layerFilter.addEventListener("change", renderNav);
  els.statusFilter.addEventListener("change", renderNav);
  els.editButton.addEventListener("click", () => els.editorPanel.classList.toggle("hidden"));
  els.saveButton.addEventListener("click", saveCurrentPage);
  els.approveButton.addEventListener("click", approveCurrentPage);
  els.diffButton.addEventListener("click", showDiff);
  els.showReader.addEventListener("click", showReader);
  els.showDashboard.addEventListener("click", showDashboard);
  els.refreshDashboard.addEventListener("click", loadDashboard);
  window.addEventListener("hashchange", () => {
    const target = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (target) openPage(target);
  });
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
  return pages.filter((page) => {
    const haystack = `${page.title}\n${page.body}\n${JSON.stringify(page.metadata)}`.toLowerCase();
    return (!query || haystack.includes(query)) &&
      (!layer || page.metadata.layer === layer) &&
      (!status || page.metadata.status === status);
  });
}

function renderNav() {
  const groups = new Map();
  filteredPages().forEach((page) => {
    const folder = page.path.includes("/") ? page.path.split("/")[0] : "Root";
    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push(page);
  });
  els.navTree.innerHTML = "";
  [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([folder, items]) => {
    const group = document.createElement("section");
    group.className = "nav-group";
    group.innerHTML = `<h4>${escapeHtml(folder)}</h4>`;
    items.sort((a, b) => a.title.localeCompare(b.title)).forEach((page) => {
      group.appendChild(navButton(page));
    });
    els.navTree.appendChild(group);
  });
}

function navButton(page) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `nav-item${currentPage && currentPage.path === page.path ? " active" : ""}`;
  button.innerHTML = `
    <span class="nav-title">${escapeHtml(page.title)}</span>
    <span class="nav-chips">${chip(page.metadata.layer)}${chip(page.metadata.status)}</span>
  `;
  button.addEventListener("click", () => openPage(page.path));
  return button;
}

async function openPage(path) {
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
  els.editorPanel.classList.add("hidden");
  els.diffPanel.classList.add("hidden");
  els.diffPanel.textContent = "";
  renderMetadata(page);
  renderTrace(page);
  renderBacklinks(page);
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
    node.addEventListener("click", (event) => {
      event.preventDefault();
      openPage(node.getAttribute("data-page"));
    });
  });
}

async function saveCurrentPage() {
  if (!currentPage) return;
  const content = els.editorText.value;
  const result = await fetchJson("/api/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ path: currentPage.path, content })
  });
  await loadPages();
  populateFilters();
  await openPage(result.path);
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

async function showDiff() {
  if (!currentPage) return;
  const text = await fetch(`/api/diff?path=${encodeURIComponent(currentPage.path)}`).then((res) => res.text());
  els.diffPanel.textContent = text;
  els.diffPanel.classList.remove("hidden");
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
  let escaped = escapeHtml(text);
  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
    const resolved = currentPage ? resolveReference(currentPage.path, href) : null;
    if (resolved && pages.some((page) => page.path === resolved)) {
      return `<a href="#${encodeURIComponent(resolved)}" data-page="${escapeHtml(resolved)}">${label}</a>`;
    }
    return `<a href="${escapeHtml(href)}">${label}</a>`;
  });
  return escaped;
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

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..", "..");
const contextDir = path.join(rootDir, "General context");
const publicDir = path.join(__dirname, "public");
const defaultPort = Number(process.env.PORT || 4177);

const requiredMeta = ["title", "layer", "status", "provenance", "review_state"];
const approvalKeys = new Set(["approved_by", "approved_at", "approved_commit", "approved_file_hash"]);
const reviewMetadataKeys = new Set([...approvalKeys, "human_sections", "approved_sections"]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function fromContext(absPath) {
  return toPosix(path.relative(contextDir, absPath));
}

function insideContext(relativePath) {
  const resolved = path.resolve(contextDir, relativePath || "");
  if (!resolved.startsWith(contextDir)) {
    throw new Error("Path escapes General context");
  }
  if (path.extname(resolved).toLowerCase() !== ".md") {
    throw new Error("Only Markdown files can be read or written");
  }
  return resolved;
}

function walkMarkdown(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(abs));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(abs);
    }
  }
  return files.sort((a, b) => fromContext(a).localeCompare(fromContext(b)));
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) {
    return { metadata: {}, body: text, raw: "" };
  }
  const lines = text.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { metadata: {}, body: text, raw: "" };
  }
  const rawLines = lines.slice(1, end);
  const metadata = {};
  let activeKey = null;
  for (const rawLine of rawLines) {
    const line = rawLine.replace(/\r$/, "");
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && activeKey) {
      if (!Array.isArray(metadata[activeKey])) metadata[activeKey] = [];
      metadata[activeKey].push(item[1].trim());
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_/-]+):\s*(.*)$/);
    if (match) {
      activeKey = match[1];
      const value = match[2].trim();
      metadata[activeKey] = value === "" ? "" : stripQuotes(value);
    }
  }
  return {
    metadata,
    body: lines.slice(end + 1).join("\n"),
    raw: lines.slice(0, end + 1).join("\n")
  };
}

function stripQuotes(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function stringifyFrontmatter(metadata) {
  const ordered = [
    "title",
    "layer",
    "status",
    "maturity",
    "provenance",
    "review_state",
    "approved_by",
    "approved_at",
    "approved_commit",
    "approved_file_hash",
    "human_sections",
    "approved_sections",
    "canonical_for",
    "related",
    "depends_on",
    "consumed_by",
    "implemented_by"
  ];
  const keys = [...ordered, ...Object.keys(metadata).filter((key) => !ordered.includes(key))];
  const lines = ["---"];
  const seen = new Set();
  for (const key of keys) {
    if (seen.has(key)) continue;
    seen.add(key);
    const value = metadata[key];
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${item}`);
    } else {
      lines.push(`${key}: ${value || ""}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") return value ? [value] : [];
  return [];
}

function titleFromBody(body, fallback) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback.replace(/\.md$/i, "").split("/").pop();
}

function reviewHash(text) {
  const parsed = parseFrontmatter(text);
  const metadata = { ...parsed.metadata };
  for (const key of reviewMetadataKeys) delete metadata[key];
  const canonical = `${stringifyFrontmatter(metadata)}\n${parsed.body.replace(/\r\n/g, "\n")}`;
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

function fileHash(text) {
  return crypto.createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex");
}

function normalizeSectionText(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

function sectionHash(markdown) {
  return crypto.createHash("sha256").update(normalizeSectionText(markdown)).digest("hex");
}

function sectionizeMarkdown(body) {
  const lines = String(body || "").replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let current = [];
  let startLine = 1;

  const pushCurrent = () => {
    const markdown = current.join("\n").trim();
    if (!markdown) return;
    const firstLine = markdown.split("\n")[0] || "";
    const heading = firstLine.match(/^(#{1,6})\s+(.+)$/);
    sections.push({
      id: `section-${sections.length + 1}`,
      index: sections.length,
      startLine,
      level: heading ? heading[1].length : 0,
      heading: heading ? heading[2].trim() : "Opening text",
      markdown,
      hash: sectionHash(markdown)
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^#{1,6}\s+/.test(line) && current.some((item) => item.trim())) {
      pushCurrent();
      current = [line];
      startLine = index + 1;
    } else {
      if (!current.length) startLine = index + 1;
      current.push(line);
    }
  }
  pushCurrent();
  return sections;
}

function withSortedValues(values) {
  return [...values].sort();
}

function gitPathForContext(relativePath) {
  return path.posix.join("General context", relativePath);
}

function pathHasWorkingChange(relativePath) {
  return Boolean(git(["status", "--short", "--", gitPathForContext(relativePath)], ""));
}

function latestCommitLabel(relativePath) {
  return git(["log", "--format=%h %s", "-n", "1", "--", gitPathForContext(relativePath)], "");
}

function reviewModel(page) {
  const humanHashes = new Set(normalizeList(page.metadata.human_sections));
  const approvedHashes = new Set(normalizeList(page.metadata.approved_sections));
  const fullyApproved = /human-approved/i.test(String(page.metadata.review_state || "")) &&
    (!page.metadata.approved_file_hash || page.metadata.approved_file_hash === page.reviewHash);
  const hasWorkingChange = pathHasWorkingChange(page.path);
  const commitLabel = hasWorkingChange ? "not committed" : (latestCommitLabel(page.path) || "commit unknown");
  const sections = sectionizeMarkdown(page.body).map((section) => {
    let state = "ai-generated";
    if (fullyApproved || approvedHashes.has(section.hash)) state = "human-approved";
    else if (humanHashes.has(section.hash)) state = "human-written";
    return {
      ...section,
      state,
      commitLabel: state === "ai-generated" ? commitLabel : "",
      tooltip: state === "ai-generated" ? `Generated text added in ${commitLabel}` : reviewStateLabel(state)
    };
  });
  return {
    path: page.path,
    sourcePath: page.sourcePath,
    title: page.title,
    metadata: page.metadata,
    reviewHash: page.reviewHash,
    contentHash: page.contentHash,
    commitLabel,
    sections,
    summary: {
      generated: sections.filter((section) => section.state === "ai-generated").length,
      humanWritten: sections.filter((section) => section.state === "human-written").length,
      humanApproved: sections.filter((section) => section.state === "human-approved").length
    }
  };
}

function reviewStateLabel(state) {
  if (state === "human-approved") return "Human approved";
  if (state === "human-written") return "Human written";
  return "AI generated";
}

function contentWithHumanSectionTracking(previousContent, nextContent) {
  const previous = parseFrontmatter(previousContent || "");
  const next = parseFrontmatter(nextContent || "");
  const previousHashes = new Set(sectionizeMarkdown(previous.body).map((section) => section.hash));
  const currentSections = sectionizeMarkdown(next.body);
  const currentHashes = new Set(currentSections.map((section) => section.hash));
  const metadata = { ...next.metadata };
  const humanHashes = new Set(normalizeList(metadata.human_sections).filter((hash) => currentHashes.has(hash)));
  const approvedHashes = new Set(normalizeList(metadata.approved_sections).filter((hash) => currentHashes.has(hash)));

  for (const section of currentSections) {
    if (!previousHashes.has(section.hash)) {
      humanHashes.add(section.hash);
      approvedHashes.delete(section.hash);
    }
  }

  if (humanHashes.size) metadata.human_sections = withSortedValues(humanHashes);
  else delete metadata.human_sections;
  if (approvedHashes.size) metadata.approved_sections = withSortedValues(approvedHashes);
  else delete metadata.approved_sections;

  if (humanHashes.size && !/human-approved/i.test(String(metadata.review_state || ""))) {
    metadata.provenance = /agent|generated|migrated|mixed|unknown/i.test(String(metadata.provenance || "")) ? "mixed" : (metadata.provenance || "human-edited");
    metadata.review_state = metadata.review_state || "needs-human-review";
  }

  return `${stringifyFrontmatter(metadata)}\n\n${next.body.replace(/^\n+/, "")}`;
}

function resolveWikiReference(fromPage, reference) {
  if (!reference || /^https?:\/\//i.test(reference) || reference.startsWith("#")) return null;
  const clean = reference.split("#")[0].replace(/\\/g, "/");
  if (!clean.toLowerCase().endsWith(".md")) return null;
  const decoded = safeDecode(clean);
  const base = path.posix.dirname(fromPage);
  const resolved = path.posix.normalize(path.posix.join(base, decoded));
  if (resolved.startsWith("../")) return null;
  return resolved;
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function extractMarkdownLinks(pagePath, body) {
  const links = [];
  const regex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(body))) {
    const resolved = resolveWikiReference(pagePath, match[1]);
    if (resolved) links.push(resolved);
  }
  return links;
}

function metadataReferences(pagePath, metadata) {
  const refs = [];
  for (const key of ["related", "depends_on", "consumed_by"]) {
    for (const item of normalizeList(metadata[key])) {
      const resolved = resolveWikiReference(pagePath, item);
      if (resolved) refs.push(resolved);
    }
  }
  return refs;
}

function loadPages() {
  const files = walkMarkdown(contextDir);
  const pages = files.map((absPath) => {
    const relativePath = fromContext(absPath);
    const content = fs.readFileSync(absPath, "utf8");
    const parsed = parseFrontmatter(content);
    const title = parsed.metadata.title || titleFromBody(parsed.body, relativePath);
    const links = extractMarkdownLinks(relativePath, parsed.body);
    const metaRefs = metadataReferences(relativePath, parsed.metadata);
    const references = [...new Set([...links, ...metaRefs])];
    return {
      path: relativePath,
      sourcePath: absPath,
      title,
      metadata: parsed.metadata,
      body: parsed.body,
      content,
      contentHash: fileHash(content),
      reviewHash: reviewHash(content),
      links,
      references
    };
  });
  const byPath = new Map(pages.map((page) => [page.path, page]));
  for (const page of pages) {
    page.backlinks = [];
  }
  for (const page of pages) {
    for (const ref of page.references) {
      const target = byPath.get(ref);
      if (target) {
        target.backlinks.push({ path: page.path, title: page.title });
      }
    }
  }
  return pages;
}

function publicPage(page) {
  return {
    path: page.path,
    sourcePath: page.sourcePath,
    title: page.title,
    metadata: page.metadata,
    body: page.body,
    content: page.content,
    contentHash: page.contentHash,
    reviewHash: page.reviewHash,
    links: page.links,
    references: page.references,
    backlinks: page.backlinks || [],
    excerpt: page.body.replace(/\s+/g, " ").trim().slice(0, 240)
  };
}

function git(args, fallback = "") {
  try {
    return execFileSync("git", args, { cwd: rootDir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return fallback;
  }
}

function currentCommit() {
  return git(["rev-parse", "--short", "HEAD"], "");
}

function dashboard(pages) {
  const gitStatus = git(["status", "--short", "--", "General context", "Tools/context-wiki"], "");
  const branchDiffNames = git(["diff", "--name-only", "main...HEAD", "--", "General context", "Tools/context-wiki"], "");
  const missingMetadata = pages.filter((page) => requiredMeta.some((key) => !page.metadata[key]));
  const needsHumanReview = pages.filter((page) => /unreviewed|needs-human-review|stale/i.test(`${page.metadata.review_state} ${page.metadata.status}`));
  const generatedUnapproved = pages.filter((page) => {
    const prov = String(page.metadata.provenance || "");
    const reviewed = String(page.metadata.review_state || "");
    return /(agent|generated|migrated|mixed|unknown)/i.test(prov) && !/human-approved/i.test(reviewed);
  });
  const changedSinceApproval = pages.filter((page) => page.metadata.approved_file_hash && page.metadata.approved_file_hash !== page.reviewHash);
  const openQuestions = pages.filter((page) => /open question/i.test(`${page.title} ${page.body}`));
  const buildableNotImplemented = pages.filter((page) => /buildable spec/i.test(`${page.metadata.status} ${page.metadata.maturity}`) && normalizeList(page.metadata.implemented_by).length === 0);
  const implementedNeedsReview = pages.filter((page) => /implemented/i.test(`${page.metadata.status} ${page.metadata.maturity}`) && !/human-reviewed|human-approved/i.test(String(page.metadata.review_state || "")));
  const viewsWithoutAccess = pages.filter((page) => page.path.startsWith("Views/") && !page.content.includes("Access"));
  const modulesWithoutParents = pages.filter((page) => page.path.startsWith("Modules/") && !/Parent Views/i.test(page.body));
  const userStoriesWithoutViews = pages.filter((page) => page.path.startsWith("User stories/") && !/View|Views\//i.test(page.content));
  const accessWithoutData = pages.filter((page) => page.path.startsWith("Access layer/") && !/Data layer|entities read|entities written|FieldRelation|ParticipationEdge/i.test(page.content));
  const dataWithoutAccess = pages.filter((page) => page.path.startsWith("Data layer/") && !/Access Layer|Access Dependencies|Current methods/i.test(page.content));
  const parked = pages.filter((page) => /parked/i.test(`${page.metadata.status} ${page.metadata.maturity}`));
  const pilotPlanning = pages.filter((page) => /conviviality|pilot|resourcing|governance/i.test(`${page.metadata.layer} ${page.title} ${page.metadata.canonical_for}`));
  const stale = pages.filter((page) => /stale|deprecated/i.test(`${page.metadata.status} ${page.metadata.maturity}`));
  const orphanSpecs = pages.filter((page) => {
    const isStub = /Legacy Pointer/.test(page.title);
    return !isStub && page.backlinks.length === 0 && normalizeList(page.metadata.related).length === 0 && page.path !== "README.md";
  });
  return {
    generatedAt: new Date().toISOString(),
    branch: git(["branch", "--show-current"], ""),
    commit: currentCommit(),
    gitStatus: gitStatus ? gitStatus.split(/\r?\n/) : [],
    branchDiffFiles: branchDiffNames ? branchDiffNames.split(/\r?\n/) : [],
    sections: {
      needsHumanReview: brief(needsHumanReview),
      generatedUnapproved: brief(generatedUnapproved),
      changedSinceApproval: brief(changedSinceApproval),
      missingMetadata: brief(missingMetadata),
      openQuestions: brief(openQuestions),
      buildableNotImplemented: brief(buildableNotImplemented),
      implementedNeedsReview: brief(implementedNeedsReview),
      viewsWithoutAccessContracts: brief(viewsWithoutAccess),
      modulesWithoutParentViews: brief(modulesWithoutParents),
      userStoriesWithoutLinkedViews: brief(userStoriesWithoutViews),
      accessMethodsWithoutLinkedDataEntities: brief(accessWithoutData),
      dataEntitiesWithNoAccessMethods: brief(dataWithoutAccess),
      orphanSpecs: brief(orphanSpecs),
      parkedExploration: brief(parked),
      pilotPlanning: brief(pilotPlanning),
      deprecatedStalePages: brief(stale)
    }
  };
}

function brief(pages) {
  return pages.map((page) => ({
    path: page.path,
    title: page.title,
    layer: page.metadata.layer || "",
    status: page.metadata.status || "",
    maturity: page.metadata.maturity || "",
    review_state: page.metadata.review_state || ""
  }));
}

function searchPages(pages, params) {
  const query = String(params.get("q") || "").toLowerCase();
  const status = String(params.get("status") || "").toLowerCase();
  const layer = String(params.get("layer") || "").toLowerCase();
  return pages.filter((page) => {
    const haystack = `${page.title}\n${page.body}\n${JSON.stringify(page.metadata)}`.toLowerCase();
    const statusValue = String(page.metadata.status || "").toLowerCase();
    const layerValue = String(page.metadata.layer || "").toLowerCase();
    return (!query || haystack.includes(query)) &&
      (!status || statusValue === status) &&
      (!layer || layerValue === layer);
  });
}

function sendJson(res, data, status = 200) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

function sendText(res, text, type = "text/plain; charset=utf-8", status = 200) {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function handleApi(req, res, url) {
  const pages = loadPages();
  if (req.method === "GET" && url.pathname === "/api/pages") {
    sendJson(res, pages.map(publicPage));
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/page") {
    const requested = url.searchParams.get("path") || "README.md";
    const page = pages.find((item) => item.path === requested);
    if (!page) return sendJson(res, { error: "Page not found" }, 404);
    sendJson(res, publicPage(page));
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/search") {
    sendJson(res, searchPages(pages, url.searchParams).map(publicPage));
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/dashboard") {
    sendJson(res, dashboard(pages));
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/review") {
    const requested = url.searchParams.get("path") || "README.md";
    const page = pages.find((item) => item.path === requested);
    if (!page) return sendJson(res, { error: "Page not found" }, 404);
    sendJson(res, reviewModel(page));
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/diff") {
    const requested = url.searchParams.get("path");
    const page = requested ? pages.find((item) => item.path === requested) : null;
    if (page && page.metadata.approved_file_hash && page.metadata.approved_file_hash === page.reviewHash) {
      sendText(res, "No unapproved diff for this page.");
      return;
    }
    const diffPath = requested ? path.posix.join("General context", requested) : "General context";
    const diff = git(["diff", "--", diffPath], "");
    sendText(res, diff || "No working-tree diff for this path.");
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/save") {
    const payload = JSON.parse(await readBody(req));
    const abs = insideContext(payload.path);
    const previousContent = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : "";
    const incomingContent = String(payload.content || "");
    const nextContent = payload.source === "human-edit"
      ? contentWithHumanSectionTracking(previousContent, incomingContent)
      : incomingContent;
    fs.writeFileSync(abs, nextContent, "utf8");
    sendJson(res, { ok: true, path: fromContext(abs), reviewHash: reviewHash(nextContent) });
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/approve") {
    const payload = JSON.parse(await readBody(req));
    const abs = insideContext(payload.path);
    const content = fs.readFileSync(abs, "utf8");
    const parsed = parseFrontmatter(content);
    const metadata = { ...parsed.metadata };
    metadata.review_state = "human-approved";
    metadata.approved_by = String(payload.approvedBy || "human-reviewer");
    metadata.approved_at = new Date().toISOString();
    metadata.approved_commit = currentCommit();
    metadata.approved_sections = sectionizeMarkdown(parsed.body).map((section) => section.hash);
    metadata.approved_file_hash = reviewHash(content);
    const updated = `${stringifyFrontmatter(metadata)}\n\n${parsed.body.replace(/^\n+/, "")}`;
    fs.writeFileSync(abs, updated, "utf8");
    sendJson(res, { ok: true, path: fromContext(abs), approved_file_hash: metadata.approved_file_hash });
    return;
  }
  sendJson(res, { error: "Unknown API route" }, 404);
}

function serveStatic(req, res, url) {
  let requested = url.pathname === "/" ? "/index.html" : url.pathname;
  if (requested === "/vendor/fuse.min.mjs") {
    const fusePath = path.join(__dirname, "node_modules", "fuse.js", "dist", "fuse.min.mjs");
    if (!fs.existsSync(fusePath)) {
      return sendText(res, "Run npm install in Tools/context-wiki to install Fuse.js.", "text/plain; charset=utf-8", 404);
    }
    return sendText(res, fs.readFileSync(fusePath), "text/javascript; charset=utf-8");
  }
  requested = requested.replace(/\.\.+/g, "");
  const abs = path.join(publicDir, requested);
  if (!abs.startsWith(publicDir) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    return sendText(res, "Not found", "text/plain; charset=utf-8", 404);
  }
  const ext = path.extname(abs).toLowerCase();
  const type = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8"
  }[ext] || "application/octet-stream";
  sendText(res, fs.readFileSync(abs), type);
}

function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    try {
      if (url.pathname.startsWith("/api/")) {
        await handleApi(req, res, url);
      } else {
        serveStatic(req, res, url);
      }
    } catch (error) {
      sendJson(res, { error: error.message }, 500);
    }
  });
}

if (process.argv.includes("--check")) {
  const pages = loadPages();
  const report = dashboard(pages);
  console.log(`Pages: ${pages.length}`);
  console.log(`Needs human review: ${report.sections.needsHumanReview.length}`);
  console.log(`Missing metadata: ${report.sections.missingMetadata.length}`);
  console.log(`Parked: ${report.sections.parkedExploration.length}`);
  console.log(`Git changes: ${report.gitStatus.length}`);
  process.exit(0);
}

createServer().listen(defaultPort, () => {
  console.log(`Context wiki reading ${contextDir}`);
  console.log(`Open http://localhost:${defaultPort}`);
});

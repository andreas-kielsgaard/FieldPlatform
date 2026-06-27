import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../../..");
const dependencyCruiserRoots = ["apps/web/app", "apps/web/src", "tools/agent-tools/src"];

const args = parseArgs(process.argv.slice(2));

if (args.flags.help || args.flags.h) {
  printHelp();
  process.exit(0);
}

try {
  const changedFiles = getChangedFiles(args);
  const dependencyGraph = readDependencyGraph();
  const analysis = analyzeChangeSurface(changedFiles, dependencyGraph, args);

  if (args.flags.json) {
    process.stdout.write(`${JSON.stringify(analysis, null, 2)}\n`);
  } else {
    printHumanSummary(analysis);
  }

  if (analysis.dependencyCruiser.errors.length > 0) {
    process.exitCode = 2;
  }
} catch (error) {
  console.error(`change-surface: ${error.message}`);
  process.exit(1);
}

function getChangedFiles(parsedArgs) {
  if (typeof parsedArgs.flags.files === "string") {
    return changedFilesFromFiles(parsedArgs.flags.files);
  }

  if (typeof parsedArgs.flags.base === "string") {
    const head = typeof parsedArgs.flags.head === "string" ? parsedArgs.flags.head : "HEAD";
    return changedFilesFromBase(parsedArgs.flags.base, head);
  }

  return changedFilesFromWorkingTree();
}

function changedFilesFromFiles(files) {
  return dedupeChangedFiles(
    files
      .split(",")
      .map((filePath) => normalizeRepoPath(filePath.trim()))
      .filter(Boolean)
      .map((filePath) => ({
        path: filePath,
        status: "manual",
        kind: "manual",
        oldPath: null,
      })),
  );
}

function changedFilesFromBase(base, head) {
  const diff = runGit(["diff", "--name-status", "--find-renames", `${base}...${head}`, "--"]);
  return parseNameStatus(diff.stdout);
}

function changedFilesFromWorkingTree() {
  const tracked = runGit(["diff", "--name-status", "--find-renames", "HEAD", "--"]);
  const untracked = runGit(["ls-files", "--others", "--exclude-standard"]);
  const changed = parseNameStatus(tracked.stdout);

  for (const filePath of untracked.stdout.split(/\r?\n/).filter(Boolean)) {
    changed.push({
      path: normalizePath(filePath),
      status: "??",
      kind: "untracked",
      oldPath: null,
    });
  }

  return dedupeChangedFiles(changed);
}

function parseNameStatus(output) {
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      const status = parts[0];

      if (status.startsWith("R") || status.startsWith("C")) {
        return {
          path: normalizePath(parts[2]),
          status,
          kind: status.startsWith("R") ? "renamed" : "copied",
          oldPath: normalizePath(parts[1]),
        };
      }

      return {
        path: normalizePath(parts[1]),
        status,
        kind: statusKind(status),
        oldPath: null,
      };
    });
}

function statusKind(status) {
  if (status === "A") {
    return "added";
  }
  if (status === "D") {
    return "deleted";
  }
  if (status === "M") {
    return "modified";
  }
  if (status === "T") {
    return "type-change";
  }
  return "changed";
}

function dedupeChangedFiles(changedFiles) {
  const byPath = new Map();
  for (const file of changedFiles) {
    byPath.set(file.path, file);
  }
  return Array.from(byPath.values()).sort((left, right) => left.path.localeCompare(right.path));
}

function readDependencyGraph() {
  const dependencyCruiserCli = path.join(
    workspaceRoot,
    "node_modules",
    "dependency-cruiser",
    "bin",
    "dependency-cruise.mjs",
  );
  const run = spawnSync(
    process.execPath,
    [
      dependencyCruiserCli,
      "--config",
      "dependency-cruiser.config.cjs",
      "--output-type",
      "json",
      ...dependencyCruiserRoots,
    ],
    {
      cwd: workspaceRoot,
      encoding: "utf8",
      shell: false,
      maxBuffer: 1024 * 1024 * 20,
    },
  );

  if (run.error) {
    throw new Error(`dependency-cruiser failed to start: ${run.error.message}`);
  }

  const parsed = parseJson(run.stdout, "dependency-cruiser JSON output");
  const errors = [];
  if (run.status !== 0) {
    errors.push(`dependency-cruiser exited with ${run.status}: ${trim(run.stderr) || "no stderr"}`);
  }

  return {
    roots: dependencyCruiserRoots,
    modules: Array.isArray(parsed.modules) ? parsed.modules : [],
    summary: parsed.summary ?? null,
    errors,
  };
}

function analyzeChangeSurface(changedFiles, dependencyGraph, parsedArgs) {
  const graph = buildGraph(dependencyGraph.modules);
  const affectedByPath = new Map();
  const unmappedChangedFiles = [];

  for (const changedFile of changedFiles) {
    if (changedFile.kind === "deleted") {
      unmappedChangedFiles.push({
        ...changedFile,
        reason: "deleted files are not present in the current dependency-cruiser graph",
      });
      continue;
    }

    if (!isInDependencyScope(changedFile.path)) {
      unmappedChangedFiles.push({
        ...changedFile,
        reason: "outside active dependency-cruiser source roots",
      });
      continue;
    }

    if (!graph.nodes.has(changedFile.path)) {
      unmappedChangedFiles.push({
        ...changedFile,
        reason: "inside active source roots but absent from the dependency-cruiser graph",
      });
      continue;
    }

    addAffectedReason(affectedByPath, changedFile.path, {
      kind: "changed-file",
      changedFile: changedFile.path,
      status: changedFile.status,
      chain: [changedFile.path],
      explanation: `${changedFile.path} is directly changed (${changedFile.status}).`,
    });

    for (const dependent of dependentChains(changedFile.path, graph.reverseDependencies)) {
      addAffectedReason(affectedByPath, dependent.path, {
        kind: "dependent",
        changedFile: changedFile.path,
        status: changedFile.status,
        chain: dependent.chain,
        explanation: `${dependent.path} depends on ${changedFile.path} via ${dependent.chain.join(" -> ")}.`,
      });
    }
  }

  const affectedFiles = Array.from(affectedByPath.entries())
    .map(([filePath, reasons]) => ({
      path: filePath,
      surface: surfaceFor(filePath),
      reasons,
    }))
    .sort((left, right) => left.path.localeCompare(right.path));

  return {
    tool: "change-surface",
    mode: inputMode(parsedArgs),
    base: inputMode(parsedArgs) === "base" ? parsedArgs.flags.base : null,
    head: inputMode(parsedArgs) === "base" ? (parsedArgs.flags.head ?? "HEAD") : null,
    changedFiles,
    affectedFiles,
    surfaces: buildSurfaces(affectedFiles),
    unmappedChangedFiles,
    dependencyCruiser: {
      roots: dependencyGraph.roots,
      command: "corepack pnpm depcruise:active-source",
      moduleCount: dependencyGraph.modules.length,
      violationCount: dependencyGraph.summary?.violations?.length ?? 0,
      errors: dependencyGraph.errors,
    },
    limitations: [
      "Reports structural dependency impact only; it does not choose tests or verification policy.",
      "Uses the current dependency graph, so deleted files and non-imported files are surfaced as unmapped changes.",
      "Default dependency-cruiser roots are apps/web/app, apps/web/src, and tools/agent-tools/src.",
      "Agent OS, Archive, generated outputs, package metadata, and docs are not treated as application dependency surfaces.",
    ],
  };
}

function inputMode(parsedArgs) {
  if (typeof parsedArgs.flags.files === "string") {
    return "files";
  }
  if (typeof parsedArgs.flags.base === "string") {
    return "base";
  }
  return "working-tree";
}

function buildGraph(modules) {
  const nodes = new Set();
  for (const module of modules) {
    const source = normalizePath(module.source);
    if (isInDependencyScope(source)) {
      nodes.add(source);
    }
  }

  const reverseDependencies = new Map();
  for (const module of modules) {
    const source = normalizePath(module.source);
    if (!nodes.has(source)) {
      continue;
    }

    for (const dependency of module.dependencies ?? []) {
      const resolved = normalizePath(dependency.resolved ?? "");
      if (!nodes.has(resolved)) {
        continue;
      }
      if (!reverseDependencies.has(resolved)) {
        reverseDependencies.set(resolved, new Set());
      }
      reverseDependencies.get(resolved).add(source);
    }
  }

  return { nodes, reverseDependencies };
}

function dependentChains(changedFile, reverseDependencies) {
  const chains = [];
  const queue = [{ path: changedFile, chain: [changedFile] }];
  const seen = new Set([changedFile]);

  while (queue.length > 0) {
    const current = queue.shift();
    const dependents = Array.from(reverseDependencies.get(current.path) ?? []).sort();

    for (const dependent of dependents) {
      if (seen.has(dependent)) {
        continue;
      }
      seen.add(dependent);
      const chain = [...current.chain, dependent];
      chains.push({ path: dependent, chain });
      queue.push({ path: dependent, chain });
    }
  }

  return chains;
}

function addAffectedReason(affectedByPath, filePath, reason) {
  if (!affectedByPath.has(filePath)) {
    affectedByPath.set(filePath, []);
  }
  affectedByPath.get(filePath).push(reason);
}

function buildSurfaces(affectedFiles) {
  const surfaces = new Map();

  for (const affectedFile of affectedFiles) {
    const surface = affectedFile.surface;
    if (!surfaces.has(surface.id)) {
      surfaces.set(surface.id, {
        ...surface,
        files: [],
        reasons: [],
      });
    }

    const entry = surfaces.get(surface.id);
    entry.files.push(affectedFile.path);
    for (const reason of affectedFile.reasons) {
      entry.reasons.push({
        file: affectedFile.path,
        changedFile: reason.changedFile,
        explanation: reason.explanation,
      });
    }
  }

  return Array.from(surfaces.values()).sort((left, right) => left.id.localeCompare(right.id));
}

function surfaceFor(filePath) {
  const normalized = normalizePath(filePath);
  let match = normalized.match(/^apps\/web\/app\/routes\/(.+)[.][cm]?[jt]sx?$/);
  if (match) {
    return {
      id: `web:route:${match[1]}`,
      kind: "web-route",
      label: `Web route: ${match[1]}`,
      root: "apps/web/app/routes",
    };
  }

  match = normalized.match(/^apps\/web\/app\/([^/]+)/);
  if (match) {
    return {
      id: "web:app-shell",
      kind: "web-app-shell",
      label: "Web app shell",
      root: "apps/web/app",
    };
  }

  match = normalized.match(/^apps\/web\/src\/modules\/([^/]+)\/([^/]+)/);
  if (match) {
    const [, moduleName, layer] = match;
    const normalizedLayer = layer === "index.ts" ? "public-interface" : layer;
    return {
      id: `web:module:${moduleName}:${normalizedLayer}`,
      kind: "web-module",
      label: `Web module: ${moduleName} / ${normalizedLayer}`,
      root: `apps/web/src/modules/${moduleName}`,
    };
  }

  match = normalized.match(/^apps\/web\/src\/shared\/([^/]+)/);
  if (match) {
    return {
      id: `web:shared:${match[1]}`,
      kind: "web-shared",
      label: `Web shared: ${match[1]}`,
      root: `apps/web/src/shared/${match[1]}`,
    };
  }

  if (normalized.startsWith("tools/agent-tools/src/")) {
    return {
      id: "tool:agent-tools",
      kind: "development-tool",
      label: "Agent tools source",
      root: "tools/agent-tools/src",
    };
  }

  return {
    id: "unknown",
    kind: "unknown",
    label: "Unknown mapped surface",
    root: ".",
  };
}

function isInDependencyScope(filePath) {
  const normalized = normalizePath(filePath);
  return dependencyCruiserRoots.some(
    (root) => normalized === root || normalized.startsWith(`${root}/`),
  );
}

function printHumanSummary(analysis) {
  console.log("change-surface");
  console.log(
    `Mode: ${analysis.mode}${analysis.base ? ` (${analysis.base}...${analysis.head})` : ""}`,
  );
  console.log(`Dependency roots: ${analysis.dependencyCruiser.roots.join(", ")}`);
  console.log(`Dependency command: ${analysis.dependencyCruiser.command}`);
  console.log("");

  console.log(`Changed files (${analysis.changedFiles.length})`);
  if (analysis.changedFiles.length === 0) {
    console.log("  (none)");
  }
  for (const file of analysis.changedFiles) {
    const mapped = analysis.affectedFiles.some((affectedFile) => affectedFile.path === file.path);
    console.log(`  ${file.status.padEnd(4)} ${file.path}${mapped ? " [mapped]" : " [unmapped]"}`);
    if (file.oldPath) {
      console.log(`       from ${file.oldPath}`);
    }
  }
  console.log("");

  console.log(`Affected surfaces (${analysis.surfaces.length})`);
  if (analysis.surfaces.length === 0) {
    console.log("  (none)");
  }
  for (const surface of analysis.surfaces) {
    console.log(`  - ${surface.label} (${surface.root})`);
    for (const reason of surface.reasons) {
      console.log(`      ${reason.file}: ${reason.explanation}`);
    }
  }
  console.log("");

  console.log(`Affected files (${analysis.affectedFiles.length})`);
  if (analysis.affectedFiles.length === 0) {
    console.log("  (none)");
  }
  for (const affectedFile of analysis.affectedFiles) {
    console.log(`  - ${affectedFile.path}`);
    for (const reason of affectedFile.reasons) {
      console.log(`      ${reason.explanation}`);
    }
  }
  console.log("");

  console.log(`Unmapped changed files (${analysis.unmappedChangedFiles.length})`);
  if (analysis.unmappedChangedFiles.length === 0) {
    console.log("  (none)");
  }
  for (const file of analysis.unmappedChangedFiles) {
    console.log(`  - ${file.path}: ${file.reason}`);
  }

  if (analysis.dependencyCruiser.errors.length > 0) {
    console.log("");
    console.log("Dependency-cruiser warnings");
    for (const error of analysis.dependencyCruiser.errors) {
      console.log(`  - ${error}`);
    }
  }
}

function runGit(gitArgs) {
  const run = spawnSync("git", gitArgs, {
    cwd: workspaceRoot,
    encoding: "utf8",
  });

  if (run.error) {
    throw new Error(`git failed to start: ${run.error.message}`);
  }
  if (run.status !== 0) {
    throw new Error(`git ${gitArgs.join(" ")} failed: ${trim(run.stderr) || "no stderr"}`);
  }

  return run;
}

function parseArgs(argv) {
  const flags = {};
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--") {
      continue;
    }
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }

    const key = value.slice(2);
    const eqIndex = key.indexOf("=");
    if (eqIndex >= 0) {
      flags[key.slice(0, eqIndex)] = key.slice(eqIndex + 1);
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = true;
    }
  }

  return { flags, positional };
}

function parseJson(raw, label) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse ${label}: ${error.message}`);
  }
}

function normalizePath(value) {
  return String(value ?? "").replaceAll("\\", "/");
}

function normalizeRepoPath(filePath) {
  const normalized = normalizePath(filePath);
  const absolutePrefix = normalizePath(workspaceRoot).toLowerCase();
  const comparePath = normalized.toLowerCase();
  if (comparePath.startsWith(`${absolutePrefix}/`)) {
    return normalized.slice(workspaceRoot.length + 1).replaceAll("\\", "/");
  }
  if (path.isAbsolute(normalized)) {
    return path.relative(workspaceRoot, normalized).replaceAll("\\", "/");
  }
  return normalized.replace(/^[.]\//, "");
}

function trim(value) {
  return String(value ?? "").trim();
}

function printHelp() {
  console.log(`change-surface

Identify changed files and structurally affected active source surfaces.

Usage:
  corepack pnpm change-surface
  corepack pnpm --silent change-surface --json
  corepack pnpm change-surface --base origin/main
  corepack pnpm change-surface --files apps/web/src/shared/policy/visibility.ts
  corepack pnpm --silent change-surface --base origin/main --head HEAD --json

Modes:
  default          Compare the current working tree, including untracked files, against HEAD.
  --base <ref>    Compare <ref>...HEAD using git diff. Use --head <ref> to override HEAD.
  --files <files> Treat comma-separated repo-relative files as the changed-file input.

Options:
  --json          Emit machine-readable JSON.
  --help          Show this help.
`);
}

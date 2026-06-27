import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../../..");
const changeSurfaceScript = path.join(scriptDirectory, "change-surface.mjs");

const args = parseArgs(process.argv.slice(2));

if (args.flags.help || args.flags.h) {
  printHelp();
  process.exit(0);
}

try {
  const input = resolveInput(args);
  const vitest = selectVitestTests(input.consideredFiles);
  const playwright = selectPlaywrightTests(input.consideredFiles);
  const noIdentifiedTestRelation = filesWithoutSelection(input.consideredFiles, vitest, playwright);

  const result = {
    tool: "test-selection",
    mode: input.mode,
    base: input.base,
    source: input.source,
    consideredFiles: input.consideredFiles,
    vitest,
    playwright,
    noIdentifiedTestRelation,
    limitations: [
      "This tool selects technically relevant tests; it does not implement verification policy or decide what must be run.",
      "Vitest test files are discovered with `vitest list --json`; source-to-test matching is conservative and path based.",
      "Playwright browser tests are discovered with `playwright test --list --reporter=json`; source-to-browser-test mapping is not available yet unless an e2e spec itself changed.",
      "Storybook-related selection is not implemented yet.",
      "Agent OS, Archive, generated outputs, package metadata, and docs are reported as having no identified test relation unless a runner exposes one.",
    ],
  };

  if (args.flags.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    printHumanSummary(result);
  }

  if (vitest.errors.length > 0 || playwright.errors.length > 0) {
    process.exitCode = 2;
  }
} catch (error) {
  console.error(`test-selection: ${error.message}`);
  process.exit(1);
}

function resolveInput(parsedArgs) {
  if (typeof parsedArgs.flags.files === "string") {
    const consideredFiles = parsedArgs.flags.files
      .split(",")
      .map((filePath) => normalizeRepoPath(filePath.trim()))
      .filter(Boolean)
      .map((filePath) => ({
        path: filePath,
        sources: ["manual"],
        reasons: [`Provided through --files.`],
        surface: null,
      }));

    return {
      mode: "files",
      base: null,
      source: {
        kind: "files",
        command: "test-selection --files",
      },
      consideredFiles: dedupeConsideredFiles(consideredFiles),
    };
  }

  const changeSurfaceArgs = ["--json"];
  if (typeof parsedArgs.flags.base === "string") {
    changeSurfaceArgs.push("--base", parsedArgs.flags.base);
    if (typeof parsedArgs.flags.head === "string") {
      changeSurfaceArgs.push("--head", parsedArgs.flags.head);
    }
  }

  const run = spawnNode(changeSurfaceScript, changeSurfaceArgs, workspaceRoot);
  if (run.status !== 0) {
    throw new Error(
      `change-surface failed: ${trim(run.stderr) || trim(run.stdout) || "no output"}`,
    );
  }

  const changeSurface = parseJson(run.stdout, "change-surface JSON output");
  return {
    mode: changeSurface.mode,
    base: changeSurface.base,
    source: {
      kind: "change-surface",
      command: `node tools/agent-tools/src/change-surface.mjs ${changeSurfaceArgs.join(" ")}`,
      dependencyCruiser: changeSurface.dependencyCruiser,
    },
    consideredFiles: consideredFilesFromChangeSurface(changeSurface),
  };
}

function consideredFilesFromChangeSurface(changeSurface) {
  const files = [];

  for (const changedFile of changeSurface.changedFiles ?? []) {
    const reasons = [`Changed file from Git (${changedFile.status}).`];
    const unmapped = (changeSurface.unmappedChangedFiles ?? []).find(
      (file) => file.path === changedFile.path,
    );
    if (unmapped?.reason) {
      reasons.push(`Change-surface mapping: ${unmapped.reason}.`);
    }
    files.push({
      path: normalizeRepoPath(changedFile.path),
      sources: ["changed"],
      reasons,
      surface: null,
    });
  }

  for (const affectedFile of changeSurface.affectedFiles ?? []) {
    files.push({
      path: normalizeRepoPath(affectedFile.path),
      sources: ["affected"],
      reasons: (affectedFile.reasons ?? []).map((reason) => reason.explanation),
      surface: affectedFile.surface ?? null,
    });
  }

  return dedupeConsideredFiles(files);
}

function dedupeConsideredFiles(files) {
  const byPath = new Map();

  for (const file of files) {
    if (!byPath.has(file.path)) {
      byPath.set(file.path, {
        path: file.path,
        sources: [],
        reasons: [],
        surface: file.surface,
      });
    }

    const entry = byPath.get(file.path);
    entry.sources.push(...file.sources.filter((source) => !entry.sources.includes(source)));
    entry.reasons.push(...file.reasons.filter(Boolean));
    entry.surface ??= file.surface;
  }

  return Array.from(byPath.values()).sort((left, right) => left.path.localeCompare(right.path));
}

function selectVitestTests(consideredFiles) {
  const command = ["corepack", "pnpm", "--filter", "web", "exec", "vitest", "list", "--json"];
  const discovered = runWorkspaceCommand(command.slice(1));
  const errors = [];
  if (discovered.status !== 0) {
    errors.push(
      `vitest list failed: ${trim(discovered.stderr) || trim(discovered.stdout) || "no output"}`,
    );
  }

  const tests = discovered.status === 0 ? parseVitestList(discovered.stdout) : [];
  const selectedByKey = new Map();

  for (const consideredFile of consideredFiles) {
    for (const test of tests) {
      const reason = vitestSelectionReason(consideredFile.path, test.file);
      if (!reason) {
        continue;
      }

      const key = `${test.file}\u0000${test.name}`;
      if (!selectedByKey.has(key)) {
        selectedByKey.set(key, {
          ...test,
          reasons: [],
        });
      }
      selectedByKey.get(key).reasons.push({
        file: consideredFile.path,
        explanation: reason,
      });
    }
  }

  const selectedTests = Array.from(selectedByKey.values()).sort((left, right) =>
    `${left.file}:${left.name}`.localeCompare(`${right.file}:${right.name}`),
  );

  return {
    command: command.join(" "),
    capability: "Vitest native test discovery via `vitest list --json`.",
    discoveredTestCount: tests.length,
    selectedTests,
    selectedFiles: uniqueSorted(selectedTests.map((test) => test.file)),
    errors,
    limitations: [
      "Vitest related-test selection without running tests is not exposed here; this tool uses native discovery plus conservative path matching.",
      "A source file without a colocated `.test.ts` or `.test.tsx` file may have no selected Vitest relation even if broader behavioral coverage exists.",
    ],
  };
}

function parseVitestList(stdout) {
  const parsed = parseJson(stdout, "Vitest list JSON output");
  if (!Array.isArray(parsed)) {
    throw new Error("Vitest list JSON output was not an array.");
  }

  return parsed.map((test) => ({
    name: String(test.name ?? ""),
    file: normalizeRepoPath(test.file),
  }));
}

function vitestSelectionReason(consideredPath, testPath) {
  if (consideredPath === testPath) {
    return `${testPath} is itself a Vitest test file.`;
  }

  if (!consideredPath.startsWith("apps/web/src/")) {
    return null;
  }

  const candidates = vitestCandidateTestFiles(consideredPath);
  if (candidates.includes(testPath)) {
    return `${testPath} is the colocated Vitest test file for ${consideredPath}.`;
  }

  return null;
}

function vitestCandidateTestFiles(filePath) {
  const parsed = path.posix.parse(filePath);
  if (![".ts", ".tsx"].includes(parsed.ext)) {
    return [];
  }
  if (parsed.name.endsWith(".test")) {
    return [filePath];
  }

  return [".ts", ".tsx"].map((extension) =>
    normalizeRepoPath(path.posix.join(parsed.dir, `${parsed.name}.test${extension}`)),
  );
}

function selectPlaywrightTests(consideredFiles) {
  const command = [
    "corepack",
    "pnpm",
    "--filter",
    "web",
    "exec",
    "playwright",
    "test",
    "--list",
    "--reporter=json",
  ];
  const discovered = runWorkspaceCommand(command.slice(1));
  const errors = [];
  if (discovered.status !== 0) {
    errors.push(
      `playwright test --list failed: ${trim(discovered.stderr) || trim(discovered.stdout) || "no output"}`,
    );
  }

  const tests = discovered.status === 0 ? parsePlaywrightList(discovered.stdout) : [];
  const selectedByKey = new Map();

  for (const consideredFile of consideredFiles) {
    for (const test of tests) {
      if (consideredFile.path !== test.file) {
        continue;
      }
      const key = `${test.file}\u0000${test.project}\u0000${test.title}`;
      if (!selectedByKey.has(key)) {
        selectedByKey.set(key, {
          ...test,
          reasons: [],
        });
      }
      selectedByKey.get(key).reasons.push({
        file: consideredFile.path,
        explanation: `${test.file} is itself a Playwright spec file.`,
      });
    }
  }

  const selectedTests = Array.from(selectedByKey.values()).sort((left, right) =>
    `${left.file}:${left.project}:${left.title}`.localeCompare(
      `${right.file}:${right.project}:${right.title}`,
    ),
  );

  return {
    command: command.join(" "),
    capability:
      "Playwright native browser test listing via `playwright test --list --reporter=json`.",
    discoveredTestCount: tests.length,
    selectedTests,
    selectedFiles: uniqueSorted(selectedTests.map((test) => test.file)),
    selectedTags: uniqueSorted(selectedTests.flatMap((test) => test.tags)),
    errors,
    limitations: [
      "Playwright can list tests and filter changed test files, but no source-to-browser-test relation is configured yet.",
      "This tool selects Playwright tests only when a considered file is itself an e2e spec.",
    ],
  };
}

function parsePlaywrightList(stdout) {
  const parsed = parseJson(stdout, "Playwright JSON list output");
  const tests = [];

  for (const suite of parsed.suites ?? []) {
    collectPlaywrightSuiteTests(suite, tests);
  }

  return tests;
}

function collectPlaywrightSuiteTests(suite, tests, parentTitles = []) {
  const suiteTitle = suite.title ? [...parentTitles, suite.title] : parentTitles;
  for (const spec of suite.specs ?? []) {
    const file = normalizeRepoPath(path.posix.join("apps/web/e2e", spec.file ?? suite.file ?? ""));
    for (const test of spec.tests ?? []) {
      tests.push({
        title: [...suiteTitle, spec.title].filter(Boolean).join(" > "),
        file,
        line: spec.line ?? null,
        column: spec.column ?? null,
        project: test.projectName ?? test.projectId ?? "unknown",
        tags: Array.isArray(spec.tags) ? spec.tags : [],
      });
    }
  }

  for (const child of suite.suites ?? []) {
    collectPlaywrightSuiteTests(child, tests, suiteTitle);
  }
}

function filesWithoutSelection(consideredFiles, vitest, playwright) {
  return consideredFiles
    .filter((file) => {
      const selectedByVitest = vitest.selectedTests.some((test) =>
        test.reasons.some((reason) => reason.file === file.path),
      );
      const selectedByPlaywright = playwright.selectedTests.some((test) =>
        test.reasons.some((reason) => reason.file === file.path),
      );
      return !selectedByVitest && !selectedByPlaywright;
    })
    .map((file) => ({
      path: file.path,
      sources: file.sources,
      reason: "No Vitest or Playwright relation was identified for this file.",
    }));
}

function runWorkspaceCommand(argsForCorepack) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/d", "/s", "/c", "corepack", ...argsForCorepack], {
      cwd: workspaceRoot,
      encoding: "utf8",
      shell: false,
      maxBuffer: 1024 * 1024 * 20,
    });
  }

  return spawnSync("corepack", argsForCorepack, {
    cwd: workspaceRoot,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 20,
  });
}

function spawnNode(scriptPath, scriptArgs, cwd) {
  return spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
    cwd,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 20,
  });
}

function normalizeRepoPath(filePath) {
  const normalized = String(filePath ?? "").replaceAll("\\", "/");
  const absolutePrefix = normalizePathForCompare(workspaceRoot);
  const comparePath = normalizePathForCompare(normalized);
  if (comparePath.startsWith(`${absolutePrefix}/`)) {
    return normalized.slice(workspaceRoot.length + 1).replaceAll("\\", "/");
  }
  if (comparePath.startsWith("apps/web/")) {
    return normalized;
  }
  if (path.isAbsolute(normalized)) {
    return path.relative(workspaceRoot, normalized).replaceAll("\\", "/");
  }
  return normalized.replace(/^[.]\//, "");
}

function normalizePathForCompare(filePath) {
  return String(filePath ?? "")
    .replaceAll("\\", "/")
    .toLowerCase();
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

    const withoutPrefix = value.slice(2);
    const eqIndex = withoutPrefix.indexOf("=");
    if (eqIndex >= 0) {
      flags[withoutPrefix.slice(0, eqIndex)] = withoutPrefix.slice(eqIndex + 1);
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      flags[withoutPrefix] = next;
      index += 1;
    } else {
      flags[withoutPrefix] = true;
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

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function trim(value) {
  return String(value ?? "").trim();
}

function printHumanSummary(result) {
  console.log("test-selection");
  console.log(`Mode: ${result.mode}${result.base ? ` (${result.base})` : ""}`);
  console.log(`Source: ${result.source.kind}`);
  console.log("");

  console.log(`Changed/affected files considered (${result.consideredFiles.length})`);
  if (result.consideredFiles.length === 0) {
    console.log("  (none)");
  }
  for (const file of result.consideredFiles) {
    console.log(`  - ${file.path} [${file.sources.join(", ")}]`);
    for (const reason of file.reasons) {
      console.log(`      ${reason}`);
    }
  }
  console.log("");

  console.log(`Selected Vitest tests (${result.vitest.selectedTests.length})`);
  console.log(`  Discovery: ${result.vitest.command}`);
  if (result.vitest.selectedTests.length === 0) {
    console.log("  (none)");
  }
  for (const test of result.vitest.selectedTests) {
    console.log(`  - ${test.file}: ${test.name}`);
    for (const reason of test.reasons) {
      console.log(`      ${reason.explanation}`);
    }
  }
  console.log("");

  console.log(`Selected Playwright tests (${result.playwright.selectedTests.length})`);
  console.log(`  Discovery: ${result.playwright.command}`);
  if (result.playwright.selectedTests.length === 0) {
    console.log("  (none)");
  }
  for (const test of result.playwright.selectedTests) {
    console.log(`  - ${test.file}: ${test.title} [${test.project}]`);
    if (test.tags.length > 0) {
      console.log(`      tags: ${test.tags.join(", ")}`);
    }
    for (const reason of test.reasons) {
      console.log(`      ${reason.explanation}`);
    }
  }
  if (result.playwright.selectedTags.length > 0) {
    console.log(`  Tags: ${result.playwright.selectedTags.join(", ")}`);
  }
  console.log("");

  console.log(
    `Files/surfaces with no identified test relation (${result.noIdentifiedTestRelation.length})`,
  );
  if (result.noIdentifiedTestRelation.length === 0) {
    console.log("  (none)");
  }
  for (const file of result.noIdentifiedTestRelation) {
    console.log(`  - ${file.path}: ${file.reason}`);
  }
  console.log("");

  console.log("Limitations");
  for (const limitation of result.limitations) {
    console.log(`  - ${limitation}`);
  }
}

function printHelp() {
  console.log(`test-selection

Identify technically relevant tests for changed and affected files.

Usage:
  corepack pnpm test-selection
  corepack pnpm test-selection --json
  corepack pnpm test-selection --base origin/main
  corepack pnpm test-selection --files apps/web/src/shared/policy/visibility.ts

Options:
  --json             Emit machine-readable JSON.
  --base <ref>       Ask change-surface to compare <ref>...HEAD.
  --files <files>    Comma-separated repo-relative files to consider instead of change-surface.
  --help             Show this help.
`);
}

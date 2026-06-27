import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../../..");
const changeSurfaceScript = path.join(scriptDirectory, "change-surface.mjs");
const testSelectionScript = path.join(scriptDirectory, "test-selection.mjs");
const dependencyCruiserRoots = ["apps/web/app", "apps/web/src", "tools/agent-tools/src"];

const args = parseArgs(process.argv.slice(2));

if (args.flags.help || args.flags.h) {
  printHelp();
  process.exit(0);
}

try {
  const source = collectSourceOutputs(args);
  const plan = buildVerificationPlan(source, args);

  if (args.flags.json) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  } else {
    printHumanSummary(plan);
  }
} catch (error) {
  console.error(`change-verification: ${error.message}`);
  process.exit(1);
}

function collectSourceOutputs(parsedArgs) {
  const testSelectionArgs = ["--json"];
  const changeSurfaceArgs = ["--json"];
  let changeSurface = null;
  const warnings = [];

  if (typeof parsedArgs.flags.files === "string") {
    changeSurfaceArgs.push("--files", parsedArgs.flags.files);
    testSelectionArgs.push("--files", parsedArgs.flags.files);
  } else {
    if (typeof parsedArgs.flags.base === "string") {
      changeSurfaceArgs.push("--base", parsedArgs.flags.base);
      testSelectionArgs.push("--base", parsedArgs.flags.base);
      if (typeof parsedArgs.flags.head === "string") {
        changeSurfaceArgs.push("--head", parsedArgs.flags.head);
        testSelectionArgs.push("--head", parsedArgs.flags.head);
      }
    }
  }

  const changeSurfaceRun = runJsonTool("change-surface", changeSurfaceScript, changeSurfaceArgs);
  changeSurface = changeSurfaceRun.output;
  warnings.push(...changeSurfaceRun.warnings);

  const testSelectionRun = runJsonTool("test-selection", testSelectionScript, testSelectionArgs);
  warnings.push(...testSelectionRun.warnings);

  return {
    mode: typeof parsedArgs.flags.files === "string" ? "files" : (changeSurface?.mode ?? "unknown"),
    base:
      typeof parsedArgs.flags.files === "string"
        ? null
        : (changeSurface?.base ?? parsedArgs.flags.base ?? null),
    head:
      typeof parsedArgs.flags.files === "string"
        ? null
        : (changeSurface?.head ?? parsedArgs.flags.head ?? "HEAD"),
    changeSurface,
    testSelection: testSelectionRun.output,
    commands: {
      changeSurface: `node tools/agent-tools/src/change-surface.mjs ${changeSurfaceArgs.join(" ")}`,
      testSelection: `node tools/agent-tools/src/test-selection.mjs ${testSelectionArgs.join(" ")}`,
    },
    warnings,
  };
}

function buildVerificationPlan(source) {
  const consideredFiles = dedupeConsideredFiles([
    ...consideredFilesFromChangeSurface(source.changeSurface),
    ...(source.testSelection.consideredFiles ?? []),
  ]);
  const fileRuleMap = new Map(consideredFiles.map((file) => [file.path, new Set()]));
  const checkMap = new Map();

  addCheck(checkMap, {
    id: "lint",
    label: "Lint",
    command: "corepack pnpm lint",
    implemented: true,
    reasons: ["Always included for changed-file verification planning."],
    files: [],
  });
  addCheck(checkMap, {
    id: "typecheck",
    label: "Typecheck",
    command: "corepack pnpm typecheck",
    implemented: true,
    reasons: ["Always included for changed-file verification planning."],
    files: [],
  });

  const webSourceFiles = consideredFiles.filter((file) => isActiveWebSource(file.path));
  if (webSourceFiles.length > 0) {
    addCheck(checkMap, {
      id: "build:web",
      label: "Web build",
      command: "corepack pnpm --filter web build",
      implemented: true,
      reasons: ["Active web app source changed under apps/web/app or apps/web/src."],
      files: webSourceFiles.map((file) => file.path),
    });
    markFiles(fileRuleMap, webSourceFiles, "build:web");
  }

  const dependencyScopedFiles = consideredFiles.filter((file) =>
    isDependencyCruiserScopedSource(file.path),
  );
  if (dependencyScopedFiles.length > 0) {
    addCheck(checkMap, {
      id: "depcruise:active-source",
      label: "Active-source dependency boundaries",
      command: "corepack pnpm depcruise:active-source",
      implemented: true,
      reasons: ["Dependency-cruiser-scoped source changed or was affected."],
      files: dependencyScopedFiles.map((file) => file.path),
    });
    markFiles(fileRuleMap, dependencyScopedFiles, "depcruise:active-source");
  }

  const vitestFiles = source.testSelection.vitest?.selectedFiles ?? [];
  if (vitestFiles.length > 0) {
    addCheck(checkMap, {
      id: "vitest",
      label: "Vitest selected tests",
      command: `corepack pnpm --filter web exec vitest run ${vitestFiles.join(" ")}`,
      implemented: true,
      reasons: [
        `test-selection selected ${plural(vitestFiles.length, "Vitest file")} through Vitest discovery.`,
      ],
      files: vitestFiles,
      tests: source.testSelection.vitest.selectedTests ?? [],
    });
    markReasonFiles(fileRuleMap, source.testSelection.vitest.selectedTests ?? [], "vitest");
  }

  const playwrightFiles = source.testSelection.playwright?.selectedFiles ?? [];
  if (playwrightFiles.length > 0) {
    addCheck(checkMap, {
      id: "playwright",
      label: "Playwright selected tests",
      command: `corepack pnpm --filter web exec playwright test ${playwrightFiles.join(" ")}`,
      implemented: true,
      reasons: [
        `test-selection selected ${plural(playwrightFiles.length, "Playwright file")} through Playwright listing.`,
      ],
      files: playwrightFiles,
      tests: source.testSelection.playwright.selectedTests ?? [],
    });
    markReasonFiles(fileRuleMap, source.testSelection.playwright.selectedTests ?? [], "playwright");
  }

  const dbFiles = consideredFiles.filter((file) => isDatabaseSchemaOrMigration(file.path));
  if (dbFiles.length > 0) {
    addCheck(checkMap, {
      id: "db:migration-check",
      label: "Database migration check",
      command: null,
      implemented: false,
      status: "not-implemented",
      reasons: ["DB schema or migration files changed; a migration-specific check is needed."],
      files: dbFiles.map((file) => file.path),
    });
    markFiles(fileRuleMap, dbFiles, "db:migration-check");
  }

  const structuralFiles = consideredFiles.filter((file) => isPackageConfigOrTooling(file.path));
  if (structuralFiles.length > 0) {
    addCheck(checkMap, {
      id: "structural-check",
      label: "Broad structural check",
      command: "corepack pnpm boundary:validate",
      implemented: true,
      reasons: [
        "Package, configuration, or development-tool files changed; narrow selected tests are not enough.",
      ],
      files: structuralFiles.map((file) => file.path),
    });
    markFiles(fileRuleMap, structuralFiles, "structural-check");
  }

  const unresolved = consideredFiles
    .filter((file) => (fileRuleMap.get(file.path)?.size ?? 0) === 0)
    .map((file) => ({
      path: file.path,
      sources: file.sources ?? [],
      reason:
        "No file-specific verification rule matched this file beyond the global lint/typecheck plan.",
    }));

  const plannedChecks = Array.from(checkMap.values()).sort((left, right) =>
    checkSortKey(left.id).localeCompare(checkSortKey(right.id)),
  );

  return {
    tool: "change-verification",
    mode: source.mode,
    base: source.base,
    head: source.head,
    source: {
      commands: source.commands,
      warnings: source.warnings,
      changeSurface: source.changeSurface
        ? {
            changedFileCount: source.changeSurface.changedFiles?.length ?? 0,
            affectedFileCount: source.changeSurface.affectedFiles?.length ?? 0,
            unmappedChangedFileCount: source.changeSurface.unmappedChangedFiles?.length ?? 0,
            dependencyCruiser: source.changeSurface.dependencyCruiser ?? null,
          }
        : null,
      testSelection: {
        consideredFileCount: source.testSelection.consideredFiles?.length ?? 0,
        selectedVitestFileCount: vitestFiles.length,
        selectedPlaywrightFileCount: playwrightFiles.length,
      },
    },
    consideredFiles,
    consideredFilesCount: consideredFiles.length,
    plannedChecks,
    unresolved,
    limitations: [
      "This is a planning tool only; it does not execute checks.",
      "The first policy is intentionally small and does not implement full verification policy, repo health, or Storybook integration.",
      "DB migration verification is surfaced as a not-yet-implemented planned item.",
      "Test relevance comes from test-selection; this tool does not duplicate test discovery or dependency analysis.",
    ],
  };
}

function consideredFilesFromChangeSurface(changeSurface) {
  const files = [];

  for (const changedFile of changeSurface.changedFiles ?? []) {
    const reasons = [`Changed file from change-surface (${changedFile.status}).`];
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

  return files;
}

function addCheck(checkMap, check) {
  if (!checkMap.has(check.id)) {
    checkMap.set(check.id, {
      id: check.id,
      label: check.label,
      command: check.command,
      implemented: check.implemented,
      status: check.status ?? (check.implemented ? "planned" : "not-implemented"),
      reasons: [],
      files: [],
      tests: check.tests ?? undefined,
    });
  }

  const entry = checkMap.get(check.id);
  entry.reasons.push(...check.reasons.filter((reason) => !entry.reasons.includes(reason)));
  entry.files = uniqueSorted([...entry.files, ...(check.files ?? [])]);
  if (check.tests) {
    entry.tests = check.tests;
  }
}

function markFiles(fileRuleMap, files, rule) {
  for (const file of files) {
    fileRuleMap.get(file.path)?.add(rule);
  }
}

function markReasonFiles(fileRuleMap, selectedTests, rule) {
  for (const test of selectedTests) {
    for (const reason of test.reasons ?? []) {
      fileRuleMap.get(reason.file)?.add(rule);
    }
  }
}

function dedupeConsideredFiles(files) {
  const byPath = new Map();
  for (const file of files) {
    const normalized = normalizeRepoPath(file.path);
    if (!byPath.has(normalized)) {
      byPath.set(normalized, {
        path: normalized,
        sources: [],
        reasons: [],
        surface: file.surface ?? null,
      });
    }

    const entry = byPath.get(normalized);
    entry.sources.push(...(file.sources ?? []).filter((source) => !entry.sources.includes(source)));
    entry.reasons.push(...(file.reasons ?? []).filter(Boolean));
    entry.surface ??= file.surface ?? null;
  }

  return Array.from(byPath.values()).sort((left, right) => left.path.localeCompare(right.path));
}

function isActiveWebSource(filePath) {
  const normalized = normalizeRepoPath(filePath);
  return normalized.startsWith("apps/web/app/") || normalized.startsWith("apps/web/src/");
}

function isDependencyCruiserScopedSource(filePath) {
  const normalized = normalizeRepoPath(filePath);
  return dependencyCruiserRoots.some(
    (root) => normalized === root || normalized.startsWith(`${root}/`),
  );
}

function isDatabaseSchemaOrMigration(filePath) {
  const normalized = normalizeRepoPath(filePath);
  return (
    normalized.startsWith("apps/web/src/shared/db/schema/") ||
    normalized.startsWith("apps/web/drizzle/") ||
    normalized === "apps/web/drizzle.config.ts" ||
    normalized === "apps/web/drizzle.config.js" ||
    normalized.includes("/migrations/")
  );
}

function isPackageConfigOrTooling(filePath) {
  const normalized = normalizeRepoPath(filePath);
  const baseName = path.posix.basename(normalized);
  const rootConfigFiles = new Set([
    "biome.json",
    "dependency-cruiser.config.cjs",
    "knip.json",
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "tsconfig.json",
  ]);

  return (
    rootConfigFiles.has(normalized) ||
    normalized.startsWith("tools/") ||
    baseName === "package.json" ||
    /^([A-Za-z0-9-]+[.])?(config|config[.]local)[.][cm]?[jt]s(on)?$/.test(baseName) ||
    /^(vite|vitest|playwright|drizzle|storybook|tailwind|postcss|eslint)[.]config[.][cm]?[jt]s$/.test(
      baseName,
    ) ||
    /^tsconfig([.][A-Za-z0-9-]+)?[.]json$/.test(baseName)
  );
}

function printHumanSummary(plan) {
  console.log("change-verification");
  console.log(`Mode: ${plan.mode}${plan.base ? ` (${plan.base}...${plan.head})` : ""}`);
  console.log(`Considered files: ${plan.consideredFilesCount}`);
  console.log("");

  console.log("Planned checks");
  if (plan.plannedChecks.length === 0) {
    console.log("  (none)");
  }
  for (const check of plan.plannedChecks) {
    const status = check.implemented ? "planned" : "not implemented";
    console.log(`  - ${check.id}: ${check.label} [${status}]`);
    if (check.command) {
      console.log(`      command: ${check.command}`);
    }
    for (const reason of check.reasons) {
      console.log(`      reason: ${reason}`);
    }
    if (check.files.length > 0) {
      console.log(`      files: ${check.files.join(", ")}`);
    }
  }
  console.log("");

  console.log(`Unresolved files/surfaces (${plan.unresolved.length})`);
  if (plan.unresolved.length === 0) {
    console.log("  (none)");
  }
  const visibleUnresolved = plan.unresolved.slice(0, 40);
  for (const file of visibleUnresolved) {
    console.log(`  - ${file.path}: ${file.reason}`);
  }
  if (plan.unresolved.length > visibleUnresolved.length) {
    console.log(`  ... ${plan.unresolved.length - visibleUnresolved.length} more in JSON output`);
  }
  console.log("");

  if (plan.source.warnings.length > 0) {
    console.log("Source warnings");
    for (const warning of plan.source.warnings) {
      console.log(`  - ${warning}`);
    }
    console.log("");
  }

  console.log("Limitations");
  for (const limitation of plan.limitations) {
    console.log(`  - ${limitation}`);
  }
}

function spawnNode(scriptPath, scriptArgs) {
  return spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
    cwd: workspaceRoot,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 40,
  });
}

function runJsonTool(label, scriptPath, scriptArgs) {
  const run = spawnNode(scriptPath, scriptArgs);
  let output = null;

  try {
    output = parseJson(run.stdout, `${label} JSON output`);
  } catch (error) {
    if (run.status !== 0) {
      throw new Error(`${label} failed: ${trim(run.stderr) || trim(run.stdout) || "no output"}`);
    }
    throw error;
  }

  if (run.status !== 0) {
    return {
      output,
      warnings: [
        `${label} exited with ${run.status}; using parseable JSON output with embedded errors or limitations.`,
      ],
    };
  }

  return { output, warnings: [] };
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

function normalizeRepoPath(filePath) {
  const normalized = String(filePath ?? "").replaceAll("\\", "/");
  const absolutePrefix = workspaceRoot.replaceAll("\\", "/").toLowerCase();
  const comparePath = normalized.toLowerCase();
  if (comparePath.startsWith(`${absolutePrefix}/`)) {
    return normalized.slice(workspaceRoot.length + 1).replaceAll("\\", "/");
  }
  if (path.isAbsolute(normalized)) {
    return path.relative(workspaceRoot, normalized).replaceAll("\\", "/");
  }
  return normalized.replace(/^[.]\//, "");
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function plural(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function checkSortKey(id) {
  const order = [
    "lint",
    "typecheck",
    "build:web",
    "depcruise:active-source",
    "vitest",
    "playwright",
    "db:migration-check",
    "structural-check",
  ];
  const index = order.indexOf(id);
  return `${index === -1 ? order.length : index}:${id}`;
}

function trim(value) {
  return String(value ?? "").trim();
}

function printHelp() {
  console.log(`change-verification

Plan concise verification for changed and affected files.

Usage:
  corepack pnpm change-verification
  corepack pnpm change-verification --json
  corepack pnpm change-verification --base origin/main
  corepack pnpm change-verification --files apps/web/src/shared/policy/visibility.ts

Options:
  --json             Emit machine-readable JSON.
  --base <ref>       Ask change-surface and test-selection to compare <ref>...HEAD.
  --files <files>    Ask change-surface and test-selection to consider comma-separated repo-relative files.
  --help             Show this help.
`);
}

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../../..");
const commandTimeoutMs = 1000 * 60 * 10;

const args = parseArgs(process.argv.slice(2));

if (args.flags.help || args.flags.h) {
  printHelp();
  process.exit(0);
}

try {
  const result = runRepoHealth();

  if (args.flags.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    printHumanSummary(result);
  }

  if (result.status === "failed") {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`repo-health: ${error.message}`);
  process.exit(1);
}

function runRepoHealth() {
  const checks = [
    runCheck({
      id: "lint",
      label: "Root lint",
      command: "corepack pnpm lint",
    }),
    runCheck({
      id: "typecheck",
      label: "Root typecheck",
      command: "corepack pnpm typecheck",
    }),
    runCheck({
      id: "test",
      label: "Root tests",
      command: "corepack pnpm test",
    }),
    runCheck({
      id: "depcruise",
      label: "Root dependency-cruiser",
      command: "corepack pnpm depcruise",
    }),
    runCheck({
      id: "depcruise:active-source",
      label: "Active-source dependency-cruiser",
      command: "corepack pnpm depcruise:active-source",
    }),
    runCheck({
      id: "boundary:validate",
      label: "Boundary validation",
      command: "corepack pnpm boundary:validate",
    }),
    runCheck({
      id: "build:web",
      label: "Web build",
      command: "corepack pnpm --filter web build",
    }),
    wikiCheck(),
    skippedCheck({
      id: "knip",
      label: "Knip",
      reason: "No stable root Knip command is configured; deferred.",
    }),
  ];

  const summary = summarizeChecks(checks);

  return {
    tool: "repo-health",
    status: summary.failed > 0 ? "failed" : "passed",
    summary,
    checks,
    limitations: [
      "Aggregates existing project commands only; it is not a CI system or a persistent dashboard.",
      "Checks are run for current repository health, independent of a specific diff.",
      "Wiki checks are included only when a stable root wiki:check command is configured.",
      "Knip is reported as deferred unless a stable root command is added later.",
    ],
  };
}

function wikiCheck() {
  if (!hasRootScript("wiki:check")) {
    return skippedCheck({
      id: "wiki:check",
      label: "Wiki check",
      reason: "No stable root wiki:check command is configured; deferred.",
    });
  }

  return runCheck({
    id: "wiki:check",
    label: "Wiki check",
    command: "corepack pnpm wiki:check",
  });
}

function hasRootScript(scriptName) {
  const packageJson = JSON.parse(readFileSync(path.join(workspaceRoot, "package.json"), "utf8"));
  return typeof packageJson.scripts?.[scriptName] === "string";
}

function runCheck(check) {
  const startedAt = Date.now();
  const run = runShellCommand(check.command);
  const durationMs = Date.now() - startedAt;
  const stdout = trim(run.stdout);
  const stderr = trim(run.stderr);
  const failureDetails = failureText(run, stdout, stderr);

  return {
    id: check.id,
    label: check.label,
    command: check.command,
    status: run.status === 0 && !run.error ? "passed" : "failed",
    exitCode: typeof run.status === "number" ? run.status : null,
    signal: run.signal ?? null,
    durationMs,
    stdoutExcerpt: failureDetails ? excerpt(stdout) : "",
    stderrExcerpt: failureDetails,
  };
}

function skippedCheck(check) {
  return {
    id: check.id,
    label: check.label,
    command: check.command ?? null,
    status: "skipped",
    exitCode: null,
    signal: null,
    durationMs: 0,
    stdoutExcerpt: "",
    stderrExcerpt: "",
    reason: check.reason,
  };
}

function runShellCommand(command) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/d", "/s", "/c", command], {
      cwd: workspaceRoot,
      encoding: "utf8",
      shell: false,
      maxBuffer: 1024 * 1024 * 20,
      timeout: commandTimeoutMs,
    });
  }

  return spawnSync(command, {
    cwd: workspaceRoot,
    encoding: "utf8",
    shell: true,
    maxBuffer: 1024 * 1024 * 20,
    timeout: commandTimeoutMs,
  });
}

function failureText(run, stdout, stderr) {
  if (!run.error && run.status === 0) {
    return "";
  }

  const parts = [];
  if (run.error) {
    parts.push(run.error.message);
  }
  if (stderr) {
    parts.push(stderr);
  }
  if (!stderr && stdout) {
    parts.push(stdout);
  }

  return excerpt(parts.join("\n"));
}

function summarizeChecks(checks) {
  return checks.reduce(
    (summary, check) => ({
      total: summary.total + 1,
      passed: summary.passed + (check.status === "passed" ? 1 : 0),
      failed: summary.failed + (check.status === "failed" ? 1 : 0),
      skipped: summary.skipped + (check.status === "skipped" ? 1 : 0),
    }),
    {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    },
  );
}

function printHumanSummary(result) {
  console.log("repo-health");
  console.log(`Status: ${result.status}`);
  console.log(
    `Checks: ${result.summary.passed} passed, ${result.summary.failed} failed, ${result.summary.skipped} skipped`,
  );
  console.log("");

  for (const check of result.checks) {
    const status = check.status.padEnd(7);
    const duration = check.durationMs > 0 ? ` (${check.durationMs} ms)` : "";
    console.log(`[${status}] ${check.id}: ${check.label}${duration}`);
    if (check.command) {
      console.log(`  command: ${check.command}`);
    }
    if (check.status === "failed") {
      console.log(`  exit: ${check.exitCode ?? "unknown"}`);
      if (check.stderrExcerpt) {
        console.log(`  failure: ${oneLine(check.stderrExcerpt)}`);
      }
      if (check.stdoutExcerpt && check.stdoutExcerpt !== check.stderrExcerpt) {
        console.log(`  stdout: ${oneLine(check.stdoutExcerpt)}`);
      }
    }
    if (check.status === "skipped" && check.reason) {
      console.log(`  reason: ${check.reason}`);
    }
  }
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

function excerpt(value) {
  const lines = trim(value).split(/\r?\n/).filter(Boolean);
  return lines.slice(-12).join("\n");
}

function oneLine(value) {
  return trim(value).replace(/\s+/g, " ");
}

function trim(value) {
  return String(value ?? "").trim();
}

function printHelp() {
  console.log(`repo-health

Summarize current repository health by running existing project commands.

Usage:
  corepack pnpm repo-health
  corepack pnpm repo-health --json

Options:
  --json          Emit machine-readable JSON.
  --help          Show this help.
`);
}

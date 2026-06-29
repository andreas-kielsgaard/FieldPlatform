import { contextFoundationLimitations } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildEvidenceEnvelope, printEvidenceSummary } from "./evidence-command.mjs";
import { buildManifestEnvelope, printManifestSummary } from "./manifest-command.mjs";
import { buildSchemasEnvelope, printSchemasSummary } from "./schemas-command.mjs";

export function runContextCli(argv, io = {}) {
  const stdout = io.stdout ?? process.stdout;
  const stderr = io.stderr ?? process.stderr;
  const now = io.now ?? (() => new Date());
  const parsed = parseArgs(argv);

  if (parsed.positional.length === 0) {
    printContextHelp(stdout);
    return 0;
  }

  const [commandName, ...commandArgs] = parsed.positional;
  if (commandName === "schemas") {
    return runSchemasCommand(commandArgs, { stdout, now, inheritedFlags: parsed.flags });
  }
  if (commandName === "manifest") {
    return runManifestCommand(commandArgs, { stdout, now, inheritedFlags: parsed.flags });
  }
  if (commandName === "evidence") {
    return runEvidenceCommand(commandArgs, { stdout, now, inheritedFlags: parsed.flags });
  }

  const message = `Unknown agent-os context command: ${commandName}`;
  if (parsed.flags.json) {
    const envelope = createCommandEnvelope({
      name: commandName || "unknown",
      generatedAt: now().toISOString(),
      status: "error",
      data: {},
      warnings: [message],
      limitations: contextFoundationLimitations,
    });
    stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    stderr.write(`${message}\n\n`);
    printContextHelp(stderr);
  }
  return 1;
}

function runSchemasCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printSchemasHelp(io.stdout);
    return 0;
  }

  const envelope = buildSchemasEnvelope({
    generatedAt: io.now().toISOString(),
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printSchemasSummary(envelope, io.stdout);
  }

  return 0;
}

function runManifestCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printManifestHelp(io.stdout);
    return 0;
  }

  const envelope = buildManifestEnvelope({
    generatedAt: io.now().toISOString(),
    withFreshness: flags["with-freshness"] === true,
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printManifestSummary(envelope, io.stdout);
  }

  return 0;
}

function runEvidenceCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printEvidenceHelp(io.stdout);
    return 0;
  }

  const envelope = buildEvidenceEnvelope({
    generatedAt: io.now().toISOString(),
    withFreshness: flags["with-freshness"] === true,
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printEvidenceSummary(envelope, io.stdout);
  }

  return envelope.status === "error" ? 1 : 0;
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
    } else {
      flags[withoutPrefix] = true;
    }
  }

  return { flags, positional };
}

function printContextHelp(stdout) {
  stdout.write(`agent-os context

Inspect Agent OS context-tool contracts.

Usage:
  corepack pnpm agent-os context --help
  corepack pnpm agent-os context schemas --json
  corepack pnpm agent-os context manifest --json
  corepack pnpm agent-os context manifest --json --with-freshness
  corepack pnpm agent-os context evidence --json
  corepack pnpm agent-os context evidence --json --with-freshness

Commands:
  evidence   Emit the composed on-demand structural evidence snapshot.
  manifest   Emit the on-demand Field Platform file manifest.
  schemas    Inspect available context schemas and capability state.

Options:
  --help     Show this help.
`);
}

function printManifestHelp(stdout) {
  stdout.write(`agent-os context manifest

Emit the on-demand Field Platform file manifest.

Usage:
  corepack pnpm agent-os context manifest --json
  corepack pnpm agent-os context manifest --json --with-freshness
  corepack pnpm agent-os context manifest --help

Options:
  --json             Emit the shared machine-readable command envelope.
  --with-freshness   Include local Git/filesystem freshness evidence per entry.
  --help             Show this help.
`);
}

function printEvidenceHelp(stdout) {
  stdout.write(`agent-os context evidence

Emit the composed on-demand Field Platform structural evidence snapshot.

Usage:
  corepack pnpm agent-os context evidence --json
  corepack pnpm agent-os context evidence --json --with-freshness
  corepack pnpm agent-os context evidence --help

Options:
  --json             Emit the shared machine-readable command envelope.
  --with-freshness   Include local Git/filesystem freshness evidence per manifest entry.
  --help             Show this help.
`);
}

function printSchemasHelp(stdout) {
  stdout.write(`agent-os context schemas

Inspect registered context schemas.

Usage:
  corepack pnpm agent-os context schemas --json
  corepack pnpm agent-os context schemas --help

Options:
  --json     Emit the shared machine-readable command envelope.
  --help     Show this help.
`);
}

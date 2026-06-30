import { contextFoundationLimitations } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildEvidenceEnvelope, printEvidenceSummary } from "./evidence-command.mjs";
import { buildInspectEnvelope, printInspectSummary } from "./inspect-command.mjs";
import { buildManifestEnvelope, printManifestSummary } from "./manifest-command.mjs";
import { buildSchemasEnvelope, printSchemasSummary } from "./schemas-command.mjs";
import { buildSearchEnvelope, printSearchSummary } from "./search-command.mjs";
import { buildSymbolsEnvelope, printSymbolsSummary } from "./symbols-command.mjs";

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
  const command = contextCommandDefinitions.find((definition) => definition.name === commandName);
  if (command) {
    return command.run(commandArgs, { stdout, now, inheritedFlags: parsed.flags });
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

function runInspectCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printInspectHelp(io.stdout);
    return 0;
  }

  const envelope = buildInspectEnvelope({
    generatedAt: io.now().toISOString(),
    requestedPath: flags.path,
    withFreshness: flags["with-freshness"] === true,
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printInspectSummary(envelope, io.stdout);
  }

  return envelope.status === "error" ? 1 : 0;
}

function runSymbolsCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printSymbolsHelp(io.stdout);
    return 0;
  }

  const envelope = buildSymbolsEnvelope({
    generatedAt: io.now().toISOString(),
    requestedName: flags.name,
    path: flags.path,
    kind: flags.kind,
    visibility: flags.visibility,
    withFreshness: flags["with-freshness"] === true,
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printSymbolsSummary(envelope, io.stdout);
  }

  return envelope.status === "error" ? 1 : 0;
}

function runSearchCommand(argv, io) {
  const parsed = parseArgs(argv);
  const flags = {
    ...io.inheritedFlags,
    ...parsed.flags,
  };

  if (flags.help || flags.h) {
    printSearchHelp(io.stdout);
    return 0;
  }

  const envelope = buildSearchEnvelope({
    generatedAt: io.now().toISOString(),
    query: flags.query,
    path: flags.path,
    language: flags.language,
    caseSensitive: flags["case-sensitive"] === true,
    includeTests: flags["include-tests"] === true,
    limit: flags.limit,
    withFreshness: flags["with-freshness"] === true,
  });

  if (flags.json) {
    io.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    printSearchSummary(envelope, io.stdout);
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
${formatUsageExamples(contextUsageExamples)}

Commands:
${formatCommandSummaries(contextCommandDefinitions)}

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

function printInspectHelp(stdout) {
  stdout.write(`agent-os context inspect

Inspect composed context evidence for one repository path.

Usage:
  corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json
  corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json --with-freshness
  corepack pnpm agent-os context inspect --help

Options:
  --path=<path>       Required repo-relative POSIX path.
  --json              Emit the shared machine-readable command envelope.
  --with-freshness    Include local Git/filesystem freshness evidence when available.
  --help              Show this help.
`);
}

function printSymbolsHelp(stdout) {
  stdout.write(`agent-os context symbols

Look up exact TypeScript/TSX symbols from the composed evidence snapshot.

Usage:
  corepack pnpm agent-os context symbols --name=Layout --json
  corepack pnpm agent-os context symbols --name=Layout --json --with-freshness
  corepack pnpm agent-os context symbols --name=Layout --path=apps/web/app/root.tsx --json
  corepack pnpm agent-os context symbols --name=Layout --kind=component --json
  corepack pnpm agent-os context symbols --name=Layout --visibility=exported --json
  corepack pnpm agent-os context symbols --help

Options:
  --name=<symbol>        Required exact symbol name.
  --path=<path>          Optional repo-relative POSIX defining-file filter.
  --kind=<kind>          Optional function|class|interface|type|component|constant|variable filter.
  --visibility=<value>   Optional exported|local filter.
  --json                 Emit the shared machine-readable command envelope.
  --with-freshness       Include local Git/filesystem freshness evidence for defining files.
  --help                 Show this help.
`);
}

function printSearchHelp(stdout) {
  stdout.write(`agent-os context search

Search manifest-included files for deterministic literal text matches.

Usage:
  corepack pnpm agent-os context search --query=visibility --json
  corepack pnpm agent-os context search --query=visibility --json --with-freshness
  corepack pnpm agent-os context search --query=visibility --path=apps/web/src/shared/policy/visibility.ts --json
  corepack pnpm agent-os context search --query=visibility --language=typescript --json
  corepack pnpm agent-os context search --query=Visibility --case-sensitive --json
  corepack pnpm agent-os context search --help

Options:
  --query=<literal-text>   Required literal text query. Regex/fuzzy matching is not supported.
  --path=<path>            Optional repo-relative POSIX file filter.
  --language=<language>    Optional manifest language filter.
  --case-sensitive         Match query case exactly. Default is case-insensitive.
  --include-tests          Include manifest-included test files. Default excludes tests.
  --limit=<count>          Maximum returned matches. Default 100.
  --json                   Emit the shared machine-readable command envelope.
  --with-freshness         Include local Git/filesystem freshness evidence for matching files.
  --help                   Show this help.
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

function formatUsageExamples(examples) {
  return examples.map((example) => `  ${example}`).join("\n");
}

function formatCommandSummaries(commands) {
  return commands.map((command) => `  ${command.name.padEnd(9)} ${command.summary}`).join("\n");
}

export const contextCommandDefinitions = Object.freeze([
  Object.freeze({
    name: "evidence",
    summary: "Emit the composed on-demand structural evidence snapshot.",
    run: runEvidenceCommand,
  }),
  Object.freeze({
    name: "inspect",
    summary: "Inspect evidence scoped to one repository path.",
    run: runInspectCommand,
  }),
  Object.freeze({
    name: "manifest",
    summary: "Emit the on-demand Field Platform file manifest.",
    run: runManifestCommand,
  }),
  Object.freeze({
    name: "schemas",
    summary: "Inspect available context schemas and capability state.",
    run: runSchemasCommand,
  }),
  Object.freeze({
    name: "search",
    summary: "Search manifest-included files for literal text matches.",
    run: runSearchCommand,
  }),
  Object.freeze({
    name: "symbols",
    summary: "Look up exact TypeScript/TSX symbols from the evidence snapshot.",
    run: runSymbolsCommand,
  }),
]);

export const contextCommandNames = Object.freeze(
  contextCommandDefinitions.map((definition) => definition.name),
);

export const contextUsageExamples = Object.freeze([
  "corepack pnpm agent-os context schemas --json",
  "corepack pnpm agent-os context manifest --json",
  "corepack pnpm agent-os context manifest --json --with-freshness",
  "corepack pnpm agent-os context evidence --json",
  "corepack pnpm agent-os context evidence --json --with-freshness",
  "corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json",
  "corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json --with-freshness",
  "corepack pnpm agent-os context symbols --name=Layout --json",
  "corepack pnpm agent-os context symbols --name=Layout --json --with-freshness",
  "corepack pnpm agent-os context search --query=visibility --json",
  "corepack pnpm agent-os context search --query=visibility --json --with-freshness",
]);

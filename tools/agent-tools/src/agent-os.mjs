import { runContextCli } from "./context/cli/context-cli.mjs";

const args = process.argv.slice(2);
const [namespace, ...namespaceArgs] = args;

if (!namespace || namespace === "--help" || namespace === "-h") {
  printHelp();
  process.exit(0);
}

if (namespace === "context") {
  process.exitCode = runContextCli(namespaceArgs);
} else {
  console.error(`Unknown agent-os namespace: ${namespace}\n`);
  printHelp();
  process.exitCode = 1;
}

function printHelp() {
  console.log(`agent-os

Repository-local Agent OS utility namespace.

Usage:
  corepack pnpm agent-os context --help
  corepack pnpm agent-os context schemas --json
  corepack pnpm agent-os context manifest --json
  corepack pnpm agent-os context manifest --json --with-freshness

Namespaces:
  context    Inspect context-tool contracts.
`);
}

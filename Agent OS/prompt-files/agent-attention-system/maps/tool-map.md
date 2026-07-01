# Development Tool Map

This map lists active development tools and common evidence sources. Use tools when they provide concrete evidence; use source reads and reasoning for semantic judgment.

## Active Replacement Development Tools

Run these from the repository root.

| Tool | Command | Use |
|---|---|---|
| `change-surface` | `corepack pnpm change-surface` | Identify changed files and dependency-cruiser-derived affected active source surfaces. |
| `test-selection` | `corepack pnpm test-selection` | Identify runner-discovered Vitest and Playwright test relations for changed or affected files. |
| `change-verification` | `corepack pnpm change-verification` | Produce a concise per-change verification plan without executing the checks. |
| `repo-health` | `corepack pnpm repo-health` | Summarize whole-repository technical health independent of a specific diff. |
| `depcruise:active-source` | `corepack pnpm depcruise:active-source` | Run dependency-cruiser over active app and development-tool source. |
| `agent-os context ...` | `corepack pnpm agent-os context --help` | Inspect bounded context evidence from the active context adapter; use `manifest`, `evidence`, `inspect`, `symbols`, `search`, and `bundle` as evidence tools, not semantic authority. See `tools/agent-tools/docs/context-usage.md`. |

The diff-scoped tools support `--base origin/main`, and `change-surface`, `test-selection`, and `change-verification` support `--files <comma-separated-files>`.

## Common Evidence Sources

- Source reads.
- `rg` for references, literals, naming, policy values, imports, and docs.
- `package.json`, package manifests, and package scripts.
- TypeScript, Biome, build, and test output.
- Dependency-cruiser config and output.
- Boundary validation output.
- `agent-os context ...` JSON output for adapter-bounded source policy, declarations, literal matches, dependency edges, schemas, and selected evidence bundles.
- Vitest and Playwright output.
- Storybook only when present and relevant.
- Drizzle schema and migrations for database work.

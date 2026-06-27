# Pre-Development Readiness

## Purpose

Use this project-control surface before making application architecture and technology choices or starting product development.

The goal is to make the development substrate ready for the current architectural pre-decisions without pretending unresolved choices are already settled.

## Deterministic Check Cues

Run deterministic checks when their substrate exists and their cost is reasonable:

- `git status --short --branch` to confirm branch, untracked files, and local change shape.
- `corepack pnpm change-surface` to identify changed and dependency-affected active source surfaces.
- `corepack pnpm test-selection` to identify runner-discovered test relations.
- `corepack pnpm change-verification` to produce a per-change verification plan.
- `corepack pnpm repo-health` to summarize whole-repository health independent of a diff.
- `corepack pnpm depcruise:active-source` to check dependency-cruiser rules over active app and development-tool source.
- `npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json` after Agent OS maps, tools, indexes, semantic surfaces, or generated artifacts change.
- Legacy generated index and semantic chunk freshness checks are retired from ordinary readiness review. Use them only for an explicit legacy Agent OS index-maintenance task.
- Parse generated JSON under `tool-maintained-files/` after builder changes.

These checks are evidence. They do not decide product architecture, technology fit, ownership, or readiness by themselves.

## Legacy Generated Artifact Commit Policy

Legacy generated index artifacts are evidence only. They are not locally authoritative for ordinary development.

For ordinary local work, do not refresh legacy generated indexes. For commit preparation, avoid including legacy generated index artifacts unless explicitly requested.

Legacy `change-index` has a specific commit-prep mode for explicit legacy index maintenance:

```powershell
npx --yes tsx tool-implementations/indexes/build-change-index.ts --commit-view --json
```

Legacy `build-all-indexes` can pass that mode through to `change-index` during explicit legacy index maintenance:

```powershell
npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --commit-view --json
```

Avoid partial commits where legacy generated artifacts were refreshed from a different source shape than the source files being committed. If that mismatch exists, either commit the matching source and generated artifacts together during explicit legacy maintenance or defer the generated artifact update.

## Relocatable Path Policy

Generated artifacts should use Agent OS root-relative paths. Avoid persisting machine-specific absolute paths.

When a tool needs to run from a different directory, pass `--root` with the Agent OS root. The generated artifact `pathReference` field describes this convention. Contract checks should catch structured absolute-path leaks in tool-maintained JSON.

## Development Environment Cues

Before product development begins, set up only the development environment pieces that support accepted pre-decisions:

- Node and package-manager version policy.
- TypeScript workspace layout.
- Formatting, linting, and typecheck commands.
- Test runner and initial verification profile.
- App framework scaffold only after the web-app direction is accepted.
- Persistence tooling only after the database and ORM direction are accepted.
- Environment variable and secret-handling conventions before integrations or auth are wired.

Do not let missing tooling silently become architecture. If a setup step depends on an unresolved choice, record the decision needed and defer the implementation.

## Embeddings And Vector Store Cue

Keep embeddings and vector stores deferred for now.

Before implementing them, decide:

- embedding model or provider
- local versus remote execution
- vector store location and lifecycle
- privacy and source-retention policy
- cache, generated-artifact, and commit policy
- refresh cost and stale-result warnings
- measurable retrieval failure that justifies the added maintenance surface

Use human-maintained maps, selected source reads, `rg`, standard project checks, and the replacement development tools instead of semantic candidate or exact generated-index retrieval during ordinary development.

## Right-Timed Deferred Actions

Consider these actions when their substrate exists:

- AST or LSP-backed symbol/dependency indexing: after the TypeScript workspace, `tsconfig`, and product source exist.
- Test relevance mapping: after test runner, app routes, package structure, and fixture conventions exist.
- Route, component, schema, and accessor index hardening: after the corresponding application surfaces are real.
- Dependency-boundary enforcement: after package boundaries and allowed dependency directions are accepted.
- Vector retrieval infrastructure: after lexical semantic retrieval shows practical recall limits and architecture choices settle.
- Public tool or MCP integration: after local deterministic scripts prove which evidence paths need shared cross-agent access.

Record deferred work with the reason it is not right-timed yet and the trigger that would make it worth implementing.

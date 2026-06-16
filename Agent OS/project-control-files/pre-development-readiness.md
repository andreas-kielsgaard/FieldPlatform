# Pre-Development Readiness

## Purpose

Use this project-control surface before making application architecture and technology choices or starting product development.

The goal is to make the development substrate ready for the current architectural pre-decisions without pretending unresolved choices are already settled.

## Deterministic Check Cues

Run deterministic checks when their substrate exists and their cost is reasonable:

- `git status --short --branch` to confirm branch, untracked files, and local change shape.
- `npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json` after Agent OS maps, tools, indexes, semantic surfaces, or generated artifacts change.
- `npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --check --json` when active Stratum 1 freshness or metadata matters.
- `npx --yes tsx tool-implementations/semantic/build-semantic-chunk-index.ts --check --json` when semantic candidate substrate freshness matters.
- Parse generated JSON under `tool-maintained-files/` after builder changes.

These checks are evidence. They do not decide product architecture, technology fit, ownership, or readiness by themselves.

## Generated Artifact Commit Policy

Generated index artifacts are locally authoritative for the local repository state.

For ordinary local work, refresh generated indexes against the current working tree. For commit preparation, make sure generated artifacts included in the commit reflect the structure being committed, not unrelated local dirtiness.

`change-index` has a specific commit-prep mode:

```powershell
npx --yes tsx tool-implementations/indexes/build-change-index.ts --commit-view --json
```

`build-all-indexes` can pass that mode through to `change-index`:

```powershell
npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --commit-view --json
```

After the commit, if local uncommitted work remains, refresh the ordinary working-tree view again so local generated files return to local truth.

Avoid partial commits where generated artifacts were refreshed from a different source shape than the source files being committed. If that mismatch exists, either commit the matching source and generated artifacts together or defer the generated artifact update.

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

Until those choices are made, use `semantic-candidate-query` and exact indexes as the supported semantic retrieval path.

## Right-Timed Deferred Actions

Consider these actions when their substrate exists:

- AST or LSP-backed symbol/dependency indexing: after the TypeScript workspace, `tsconfig`, and product source exist.
- Test relevance mapping: after test runner, app routes, package structure, and fixture conventions exist.
- Route, component, schema, and accessor index hardening: after the corresponding application surfaces are real.
- Dependency-boundary enforcement: after package boundaries and allowed dependency directions are accepted.
- Vector retrieval infrastructure: after lexical semantic retrieval shows practical recall limits and architecture choices settle.
- Public tool or MCP integration: after local deterministic scripts prove which evidence paths need shared cross-agent access.

Record deferred work with the reason it is not right-timed yet and the trigger that would make it worth implementing.

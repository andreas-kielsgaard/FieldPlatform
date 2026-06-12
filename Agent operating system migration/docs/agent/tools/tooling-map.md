# Tooling Map

This file lists the logical tools available to the agent operating system and routes each tool to its instruction file.

Modes and structural-maintenance behaviors refer to tool IDs from this map. They do not name script paths or execution details directly.

Instruction file paths are relative to this file. Script paths are owned by the instruction files and are relative to the repository root.

## Tool Groups

| Group | Purpose |
|---|---|
| `authority-and-contracts` | Authority, audience, maintenance-path, and consumer contract evidence. |
| `change-review` | Change summary and affected-surface evidence. |
| `discovery-and-usage` | Search, usage, naming, symbol, scenario, and state-consumer discovery. |
| `index-access` | Bounded generated-index query and update contracts. |
| `structure-and-indexing` | Structural map and index generation or inspection. |
| `validation-and-drift` | Boundary, documentation, schema, fixture, permission, and design-token checks. |

## Tool Inventory

### Authority And Contracts

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `artifact-maintenance-path` | Classify whether an artifact appears manually authoritative, generated, indexed, derived, tool-maintained, stale, or unknown. | `authority-and-contracts/artifact-maintenance-path.instructions.md` |
| `audience-surface-check` | Check whether maintained content belongs in agent-facing instructions, human-facing documentation, product copy, developer notes, tests, examples, generated output, tool output, or migration-only notes. | `authority-and-contracts/audience-surface-check.instructions.md` |
| `authority-surface-search` | Find where a rule, convention, source-of-truth statement, or expectation appears and classify likely authority roles. | `authority-and-contracts/authority-surface-search.instructions.md` |
| `contract-impact` | Identify consumers, docs, maps, fixtures, examples, tests, and instructions affected by changed promised behavior. | `authority-and-contracts/contract-impact.instructions.md` |
| `contract-test-coverage` | Check whether tests cover changed internal processing and consumer-visible contract dimensions. | `authority-and-contracts/contract-test-coverage.instructions.md` |

### Change Review

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `map-affected-surfaces` | Summarize components, routes, concepts, schemas, accessors, policies, mocks, tests, docs, and ledgers affected by a change. | `change-review/map-affected-surfaces.instructions.md` |
| `summarize-change` | Generate a structured summary of changed files, affected surfaces, checks, docs updates, debt, experiments, and open risks. | `change-review/summarize-change.instructions.md` |

### Discovery And Usage

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `accessor-usage` | Find callers, consumers, imports, and access patterns for an accessor, API boundary, query, mutation, or service method. | `discovery-and-usage/accessor-usage.instructions.md` |
| `component-usage` | Find component imports, consumers, examples, stories, tests, and nearby similar components. | `discovery-and-usage/component-usage.instructions.md` |
| `find-similar-pattern` | Find repeated markup, class combinations, helper patterns, compositions, or implementation shapes that may be extraction candidates. | `discovery-and-usage/find-similar-pattern.instructions.md` |
| `find-term` | Search canonical terms, aliases, avoided names, UI literals, route labels, fixture keys, identifiers, and nearby language. | `discovery-and-usage/find-term.instructions.md` |
| `rename-impact` | Identify likely impacted files and control surfaces for a concept, identifier, route label, fixture key, accessor, or UI term rename. | `discovery-and-usage/rename-impact.instructions.md` |
| `scenario-usage` | Find where mock scenarios, fixtures, seeds, demo data, examples, stories, and tests are used. | `discovery-and-usage/scenario-usage.instructions.md` |
| `state-consumer-search` | Find state owners, consumers, update paths, derived values, duplicated state, URL state, cache state, and shared-store usage. | `discovery-and-usage/state-consumer-search.instructions.md` |
| `symbol-search` | Search exported and imported symbols, types, functions, constants, classes, and module boundaries. | `discovery-and-usage/symbol-search.instructions.md` |

### Index Access

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `query-accessor-index` | Return bounded generated accessor-index slices with freshness and uncertainty notes. | `index-access/query-accessor-index.instructions.md` |
| `update-accessor-index` | Refresh generated accessor-index data or report that refresh is unavailable. | `index-access/update-accessor-index.instructions.md` |
| `query-component-index` | Return bounded generated component-index slices with freshness and uncertainty notes. | `index-access/query-component-index.instructions.md` |
| `update-component-index` | Refresh generated component-index data or report that refresh is unavailable. | `index-access/update-component-index.instructions.md` |
| `query-data-model-index` | Return bounded generated data-model-index slices with freshness and uncertainty notes. | `index-access/query-data-model-index.instructions.md` |
| `update-data-model-index` | Refresh generated data-model-index data or report that refresh is unavailable. | `index-access/update-data-model-index.instructions.md` |
| `query-naming-index` | Return bounded generated naming-index slices with freshness and uncertainty notes. | `index-access/query-naming-index.instructions.md` |
| `update-naming-index` | Refresh generated naming-index data or report that refresh is unavailable. | `index-access/update-naming-index.instructions.md` |
| `query-permissions-visibility-index` | Return bounded generated permissions-visibility-index slices with freshness and uncertainty notes. | `index-access/query-permissions-visibility-index.instructions.md` |
| `update-permissions-visibility-index` | Refresh generated permissions-visibility-index data or report that refresh is unavailable. | `index-access/update-permissions-visibility-index.instructions.md` |
| `query-routing-index` | Return bounded generated routing-index slices with freshness and uncertainty notes. | `index-access/query-routing-index.instructions.md` |
| `update-routing-index` | Refresh generated routing-index data or report that refresh is unavailable. | `index-access/update-routing-index.instructions.md` |
| `query-schema-index` | Return bounded generated schema-index slices with freshness and uncertainty notes. | `index-access/query-schema-index.instructions.md` |
| `update-schema-index` | Refresh generated schema-index data or report that refresh is unavailable. | `index-access/update-schema-index.instructions.md` |
| `query-state-management-index` | Return bounded generated state-management-index slices with freshness and uncertainty notes. | `index-access/query-state-management-index.instructions.md` |
| `update-state-management-index` | Refresh generated state-management-index data or report that refresh is unavailable. | `index-access/update-state-management-index.instructions.md` |

### Structure And Indexing

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `map-components` | Generate or refresh component structural index data for shared components, consumers, examples, and tests. | `structure-and-indexing/map-components.instructions.md` |
| `map-deps` | Generate or inspect dependency graph data, import direction, cycles, orphaned modules, and cross-layer coupling. | `structure-and-indexing/map-deps.instructions.md` |
| `map-routes` | Generate or inspect route, page, layout shell, route-param, and route-family structural data. | `structure-and-indexing/map-routes.instructions.md` |
| `source-map-indexer` | Refresh generated `source-directory-map.json` directory data for bounded source-tree discovery. | `structure-and-indexing/source-map-indexer.instructions.md` |
| `source-map-query` | Return child directories and file names for a requested directory scope from `source-directory-map.json`. | `structure-and-indexing/source-map-query.instructions.md` |

### Validation And Drift

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `check-boundaries` | Detect architecture boundary issues, dependency direction violations, layer leaks, and direct imports that bypass approved control surfaces. | `validation-and-drift/check-boundaries.instructions.md` |
| `check-docs` | Check documentation freshness, broken references, missing map updates, and instruction files that point to retired or missing control surfaces. | `validation-and-drift/check-docs.instructions.md` |
| `check-permission-literals` | Find raw role, capability, policy, permission, and visibility literals outside approved policy or map locations. | `validation-and-drift/check-permission-literals.instructions.md` |
| `check-schema-drift` | Compare schema, validators, generated types, accessors, fixtures, seeds, and mocks for likely drift. | `validation-and-drift/check-schema-drift.instructions.md` |
| `check-token-literals` | Find hardcoded colors, spacing, typography, status styles, and other design-token literals outside approved design-system sources. | `validation-and-drift/check-token-literals.instructions.md` |
| `test-surface-selection` | Suggest relevant test surfaces, commands or categories, coverage gaps, and residual uncertainty for a changed target or change summary. | `validation-and-drift/test-surface-selection.instructions.md` |
| `validate-fixtures` | Validate fixtures, seeds, scenarios, and mock responses against expected schemas, validators, or documented shape. | `validation-and-drift/validate-fixtures.instructions.md` |

## Maintenance Rules

- When a mode or behavior requires a tool, reference the logical tool ID from this map.
- Do not add a tool reference to a mode or behavior file without adding or updating this map.
- Tool instruction files own script paths, parameters, execution instructions, output interpretation, and known limitations.
- Mode and behavior files own when a logical tool is relevant, not how to execute it.
- During migration, a tool may exist as a placeholder contract before implementation. Do not claim deterministic tool-backed evidence unless the script is implemented and actually run.
- Agents may propose tool contract changes as notes when reflective work exposes a gap. Active tool contract changes require an explicit human-initiated Agent OS maintenance task.

# Development Tool Map

This map lists the active replacement development-tool surface first. The broad generated index/query tools are retained below as legacy reference only; they are retired from ordinary development and are not normal orientation, testing, or verification support.

## Active Replacement Development Tools

Run these from the repository root.

| Tool | Command | Use |
|---|---|---|
| `change-surface` | `corepack pnpm change-surface` | Identify changed files and dependency-cruiser-derived affected active source surfaces. |
| `test-selection` | `corepack pnpm test-selection` | Identify runner-discovered Vitest and Playwright test relations for changed or affected files. |
| `change-verification` | `corepack pnpm change-verification` | Produce a concise per-change verification plan without executing the checks. |
| `repo-health` | `corepack pnpm repo-health` | Summarize whole-repository technical health independent of a specific diff. |
| `depcruise:active-source` | `corepack pnpm depcruise:active-source` | Run dependency-cruiser over active app and development-tool source: `apps/web/app`, `apps/web/src`, and `tools/agent-tools/src`. |

All four Node-backed tools also support `--json`; the diff-scoped tools support `--base origin/main`, and `change-surface`, `test-selection`, and `change-verification` support `--files <comma-separated-files>`.

## Legacy Generated Index/Query Catalogue

`File:` entries in this map resolve to `prompt-files/tools/operators/<file>.md`.

## Path Query
File: `path-query`
Query paths by path text, area, artifact kind, generated/manual hint, or changed-file context.
Parameters: path-index, path, area, artifact type, generated/manual hints, changed files

## File Query
File: `retrieve-slice`
Retrieve a bounded file slice by line range without loading the whole file.
Parameters: files plus indexes, file path, start line, end line, limit

## Symbol Query
File: `symbol-query`
Query definitions, usages, imports, exports, re-exports, and likely dependent files.
Parameters: symbol-index, definition, usages, imports, exports, dependents

## Dependency Query
File: `dependency-query`
Query dependencies, dependents, import edges, cross-area edges, and rough boundary evidence.
Parameters: dependency-index, dependencies, dependents, cross-area edges, importer, imported

## Route Query
File: `route-query`
Query route paths, pages, layouts, params, route families, and route-like files.
Parameters: route-index, route, file, params, family, handler

## Component Query
File: `component-query`
Query component definitions, consumers, stories, tests, props hints, and nearby component names.
Parameters: component-index, definition, consumers, stories, tests, props hints

## Term Query
File: `term-query`
Query terms across prose, identifiers, headings, UI-looking literals, and co-occurrence contexts.
Parameters: term-index, canonical, all, identifiers, ui-literals, cooccurs, drift, replace-preview

## Literal Query
File: `literal-query`
Query string literals, policy-like values, status values, token-like values, and arbitrary style-like values.
Parameters: literal-index, string, role/capability, status, token-like, arbitrary value

## Doc Ref Query
File: `doc-ref-query`
Query docs links, headings, file references, inline IDs, and broken local references.
Parameters: doc-reference-index, path refs, headings, inline IDs, broken links

## Artifact Query
File: `artifact-query`
Query generated/manual/hybrid hints, producer hints, direct-edit policy hints, audience, and authority role.
Parameters: artifact-metadata-index, maintenance-path, producer, direct-edit policy, audience, authority role

## Test Query
File: `test-query`
Query tests and stories by source, symbol, route, fixture, or likely tested subject.
Parameters: test-index, tests by source, tests by symbol, stories by component, e2e by route

## Fixture Query
File: `fixture-query`
Query fixture, mock, seed, scenario, demo, and example artifacts and represented concepts.
Parameters: fixture-scenario-index, scenario usage, fixture consumers, concept usage, changed fixture impact

## Schema Query
File: `schema-query`
Query schema-like declarations, field hints, validators, generated type hints, and relation hints.
Parameters: schema-shape-index, entity shape, field usage, validator mapping, generated type mapping

## Accessor Query
File: `accessor-query`
Query accessor/API-like definitions, callers, read/write hints, imports, and cache hints.
Parameters: accessor-index, callers, input/output hints, read/write, cache/invalidation notes

## Diff Query
File: `diff-query`
Query changed files, status codes, artifact kinds, and changed area hints.
Parameters: change-index, changed files, changed symbols by follow-up query, changed docs, generated artifacts

## Semantic Candidate Query
File: `semantic-candidate-query`
Query deterministic text chunks for lexical semantic candidates when exact indexes are too narrow.
Parameters: semantic-chunk-index, fuzzy recall, near-match chunks, broad orientation, candidate evidence

## Pattern Candidate Query
File: `pattern-candidate-query`
Query repeated component-like names, similar literals, nearby terms, and candidate pattern evidence.
Parameters: component-index, literal-index, term-index, similar names, repeated literals, nearby terms, candidate patterns

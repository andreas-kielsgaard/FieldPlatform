# Generated Index Selection Review

## Status

Deferred.

## Current Generated Index Candidates

The following files were moved under `Agent operating system migration/docs/agent/generated-indexes/`:

- `accessor-map.md`
- `schema-map.md`
- `data-model-map.md`
- `naming-index.md`
- `component-registry.md`
- `routing-map.md`
- `state-management-map.md`
- `permissions-and-visibility-map.md`

## Rationale

These files are likely to become large, volatile, and better consumed through bounded tool queries than direct agent ingestion. Their existence is justified when they let tools answer focused questions such as:

- which consumers are affected by an accessor or contract change
- which schema, generated artifacts, validators, fixtures, or tests may drift
- which components, routes, state owners, or permissions are affected by a change
- which names or concepts appear across product, schema, UI, accessors, fixtures, and tests

## Overlap Questions

- `data-model-map.md`, `schema-map.md`, and `domain-glossary.md` may overlap around entity meaning.
- `naming-index.md` and `domain-glossary.md` may overlap around canonical terms.
- `component-registry.md`, `routing-map.md`, and `design-system-map.md` may overlap around page shells and reusable UI primitives.
- `permissions-and-visibility-map.md`, `routing-map.md`, and `accessor-map.md` may overlap around guarded screens and authorized data access.
- `testing-map.md` was deleted for now, but future test behavior work may require generated test indexes.

## Unsupported Functionality

The generated indexes do not yet have implemented tools. Tool placeholders now define intended query/update API pairs for each current generated index, but they do not yet produce or refresh these files.

Future work should decide which indexes are generated, which are curated, which are hybrid, and which should be replaced by direct tool queries without storing a Markdown artifact.

Access to generated index data should start from bounded query tools. Refresh should go through matching update tools or be reported as unavailable. Future review should consider whether a generated index may keep a curated memory snippet, and if so how that snippet avoids being overwritten by index regeneration.

## Possible Future Indexes

- Test coverage and critical-flow index.
- Generated artifact freshness index.
- Dependency-boundary violations index.
- Tool-output provenance or maintenance-path index.
- Contract surface index.
- Source/generated artifact ownership index.

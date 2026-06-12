# Mode: Data Model Change

## Required Orientation

- `docs/agent/domain-glossary.md`

## Required Tools Or Searches

- Tool: `query-data-model-index` for generated data-model index slices relevant to the target.
- Tool: `query-schema-index` for generated schema index slices relevant to the target.
- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `query-permissions-visibility-index` for generated permissions and visibility index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Tool: `rename-impact` for changed entities or fields.
- Tool: `check-schema-drift`.
- Tool: `contract-impact` for changed entity shape, relation behavior, fixture keys, accessors, examples, or tests.
- Tool: `contract-test-coverage` for changed model invariants or consumer-visible behavior.
- Search relations, field names, fixture keys, validators, accessors, and tests.
- Run affected model/accessor tests if available.

## Implementation Instructions

- Define whether the change is conceptual, persisted, API-level, or UI-only.
- Do not let UI shape become the source of truth for the model.
- Keep entity names, relations, fixtures, validators, accessors, and tests coherent.
- Record invariants explicitly.
- If the model is exploratory, mark open questions rather than pretending finality.

## Cross-Application Impact Checks

- Entity and relation maps.
- Schema and validation.
- Accessors and service boundaries.
- Mock scenarios and fixtures.
- Permissions and visibility where data shape affects access.
- Tests and examples.

## Documentation Updates

- Tool: `update-data-model-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-schema-index` if persistence changes, or report required index refresh if the tool is unavailable.
- Tool: `update-accessor-index`, or report required index refresh if the tool is unavailable.
- Report fixture or scenario implications until test behavior is designed.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update the deferred logging strategy if the model decision will shape future work.

## Regression Checks

- Relation mismatch across layers.
- Invariants represented only in code comments or UI assumptions.
- Fixtures no longer matching model shape.
- Accessors leaking raw storage shape unintentionally.
- Tests missing changed relation behavior.

## Structural Maintenance Clues

- Enter structural maintenance when entity ownership, invariant placement, lifecycle state, persistence boundary, or model reuse is being decided.

## Required Completion Report

```text
Primary mode: data model change
Entity/relation changed:
Invariants:
Persisted? yes/no
Schema affected:
Accessors affected:
Mocks affected:
Tests affected:
Open model questions:
Checks run:
```

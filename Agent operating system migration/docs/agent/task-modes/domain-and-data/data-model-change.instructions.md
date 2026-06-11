# Mode: Data Model Change

## Required Orientation

- `docs/agent/generated-indexes/data-model-map.md`
- `docs/agent/generated-indexes/schema-map.md`
- `docs/agent/generated-indexes/accessor-map.md`
- `docs/agent/domain-glossary.md`
- `docs/agent/generated-indexes/permissions-and-visibility-map.md`

## Required Tools Or Searches

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

- Update `generated-indexes/data-model-map.md`.
- Update `generated-indexes/schema-map.md` if persistence changes.
- Update `generated-indexes/accessor-map.md`.
- Report fixture or scenario implications until test behavior is designed.
- Report coverage implications until test behavior is designed.
- Update the deferred logging strategy if the model decision will shape future work.

## Regression Checks

- Relation mismatch across layers.
- Invariants represented only in code comments or UI assumptions.
- Fixtures no longer matching model shape.
- Accessors leaking raw storage shape unintentionally.
- Tests missing changed relation behavior.

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

# Mode: Data Model Change

## Required Orientation

- `docs/agent/data-model-map.md`
- `docs/agent/schema-map.md`
- `docs/agent/accessor-map.md`
- `docs/agent/domain-glossary.md`
- `docs/agent/mock-data-map.md`
- `docs/agent/permissions-and-visibility-map.md`

## Required Tools Or Searches

- Tool: `rename-impact` for changed entities or fields.
- Tool: `check-schema-drift`.
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

- Update `data-model-map.md`.
- Update `schema-map.md` if persistence changes.
- Update `accessor-map.md`.
- Update `mock-data-map.md`.
- Update `testing-map.md` if coverage changes.
- Update `decision-log.md` if the model decision will shape future work.

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

# Mode: Database Schema Or Persistence Change

## Required Orientation

- `docs/agent/generated-indexes/schema-map.md`
- `docs/agent/generated-indexes/data-model-map.md`
- `docs/agent/generated-indexes/accessor-map.md`
- `docs/agent/known-debt.md`

## Required Tools Or Searches

- Identify the canonical schema source before editing.
- Run migration checks if available.
- Run type generation or validation generation if applicable.
- Tool: `check-schema-drift`.
- Tool: `artifact-maintenance-path` for generated types, validators, schema indexes, or tool-maintained schema artifacts.
- Tool: `contract-impact` for persisted shape, accessor return shape, migration compatibility, generated output, fixtures, or tests.
- Tool: `contract-test-coverage` for changed persistence behavior or generated contract surfaces.
- Run affected accessor and persistence tests.

## Implementation Instructions

- Do not mutate schema without a migration strategy once persistence matters.
- Update generated types, validators, or schema artifacts when applicable.
- Update accessors rather than letting UI query schema directly.
- Check whether mock data and tests still match persisted shape.
- Do not introduce nullable or optional fields as an easy escape hatch without recording the semantic reason.

## Cross-Application Impact Checks

- Domain model meaning.
- Accessor return shapes.
- Validators and generated types.
- Mocks, seeds, and fixtures.
- Migration/backward compatibility assumptions.
- Tests and structural indexes.

## Documentation Updates

- Update `generated-indexes/schema-map.md`.
- Update `generated-indexes/data-model-map.md` if model meaning changes.
- Update `generated-indexes/accessor-map.md`.
- Report fixture or scenario implications until test behavior is designed.
- Report test coverage implications until test behavior is designed.
- Update the deferred logging strategy if storage strategy changes.
- Update `known-debt.md` if migration safety is deferred.

## Regression Checks

- Schema/UI drift.
- Stale generated artifacts.
- Mocks not matching persisted shape.
- Accessors bypassed to accommodate schema changes.
- Missing migration or rollback notes.

## Required Completion Report

```text
Primary mode: database schema or persistence change
Schema change:
Migration:
Generated artifacts:
Accessors updated:
Mocks updated:
Backward compatibility:
Debt:
Checks run:
Docs updated:
```

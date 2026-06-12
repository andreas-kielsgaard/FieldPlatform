# Mode: Database Schema Or Persistence Change

## Required Orientation

- `docs/agent/known-debt.md`

## Required Tools Or Searches

- Tool: `query-schema-index` for generated schema index slices relevant to the target.
- Tool: `query-data-model-index` for generated data-model index slices relevant to the target.
- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

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

- Tool: `update-schema-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-data-model-index` if model meaning changes, or report required index refresh if the tool is unavailable.
- Tool: `update-accessor-index`, or report required index refresh if the tool is unavailable.
- Report fixture or scenario implications until test behavior is designed.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update the deferred logging strategy if storage strategy changes.
- Update `known-debt.md` if migration safety is deferred.

## Regression Checks

- Schema/UI drift.
- Stale generated artifacts.
- Mocks not matching persisted shape.
- Accessors bypassed to accommodate schema changes.
- Missing migration or rollback notes.

## Structural Maintenance Clues

- Enter structural maintenance when choosing schema authority, migration ownership, generated-artifact maintenance, storage boundaries, or accessor responsibility.

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

# Mode: Database Schema Or Persistence Change

## Required Orientation

- `prompt-files/known-debt.md`

## Required Tools Or Searches

- Tool: `schema-query` for generated schema index slices relevant to the target.
- Tool: `schema-query` for generated data-model index slices relevant to the target.
- Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Identify the canonical schema source before editing.
- Run migration checks if available.
- Run type generation or validation generation if applicable.
- Skill: `schema-fixture-drift-scan`.
- Tool: `artifact-query` for generated types, validators, schema indexes, or tool-maintained schema artifacts.
- Skill: `consumer-impact-preview` for persisted shape, accessor return shape, migration compatibility, generated output, fixtures, or tests.
- Skill: `test-relation-scan` for changed persistence behavior or generated contract surfaces.
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

- Tool: `build-schema-shape-index`, or report required index refresh if the tool is unavailable.
- Tool: `build-schema-shape-index` if model meaning changes, or report required index refresh if the tool is unavailable.
- Tool: `build-accessor-index`, or report required index refresh if the tool is unavailable.
- Report fixture or scenario implications until test behavior is designed.
- Skill: `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
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




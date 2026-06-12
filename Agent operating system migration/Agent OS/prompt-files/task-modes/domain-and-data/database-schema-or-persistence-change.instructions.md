# Mode: Database Schema Or Persistence Change

## Orientation Cues

- `prompt-files/known-debt.md`

## Evidence Cues

- Consider Tool: `schema-query` for generated schema index slices relevant to the target.
- Consider Tool: `schema-query` for generated data-model index slices relevant to the target.
- Consider Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Identify the canonical schema source before editing.
- Consider running migration checks if available.
- Consider running type generation or validation generation if applicable.
- Consider Skill: `schema-fixture-drift-scan`.
- Consider Tool: `artifact-query` for generated types, validators, schema indexes, or tool-maintained schema artifacts.
- Consider Skill: `consumer-impact-preview` for persisted shape, accessor return shape, migration compatibility, generated output, fixtures, or tests.
- Consider Skill: `test-relation-scan` for changed persistence behavior or generated contract surfaces.
- Consider running affected accessor and persistence tests.

## Implementation Cues

- Prefer a migration strategy before mutating schema once persistence matters.
- Consider updating generated types, validators, or schema artifacts when applicable.
- Consider updating accessors rather than letting UI query schema directly.
- Check whether mock data and tests still match persisted shape.
- Avoid introducing nullable or optional fields as an easy escape hatch without recording the semantic reason.

## Cross-Application Impact Cues

- Domain model meaning.
- Accessor return shapes.
- Validators and generated types.
- Mocks, seeds, and fixtures.
- Migration/backward compatibility assumptions.
- Tests and structural indexes.

## Documentation Cues

- Consider Tool: `build-schema-shape-index`, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-schema-shape-index` if model meaning changes, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-accessor-index`, or report index refresh may be needed if the tool is unavailable.
- Report fixture or scenario implications until test behavior is designed.
- Consider Skill: `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
- Consider updating the deferred logging strategy if storage strategy changes.
- Consider updating `known-debt.md` if migration safety is deferred.

## Regression Cues

- Schema/UI drift.
- Stale generated artifacts.
- Mocks not matching persisted shape.
- Accessors bypassed to accommodate schema changes.
- Missing migration or rollback notes.

## Structural Maintenance Clues

- Consider entering structural maintenance when choosing schema authority, migration ownership, generated-artifact maintenance, storage boundaries, or accessor responsibility.

## Report Cues

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




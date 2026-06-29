# Mode: Database Schema Or Persistence Change

## Orientation Cues

- Source/config/schema, migrations, and relevant project decisions if present

## Evidence Cues


- Identify the canonical schema source before editing.
- Consider running migration checks if available.
- Consider running type generation or validation generation if applicable.
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
- Tests and source/config references.

## Documentation Cues

- Report fixture or scenario implications until test behavior is designed.
- Consider updating relevant durable memory if storage strategy changes.
- Report deferred migration-safety work in the final response.

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
Scoped compromise:
Checks run:
Docs updated:
```


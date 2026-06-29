# Mode: Data Model Change

## Orientation Cues

- Source-owned schema/contracts/domain usage and relevant project decisions if present

## Evidence Cues


- Consider searching relations, field names, fixture keys, validators, accessors, and tests.
- Consider running affected model/accessor tests if available.

## Implementation Cues

- Define whether the change is conceptual, persisted, API-level, or UI-only.
- Keep UI shape from becoming the source of truth for the model.
- Keep entity names, relations, fixtures, validators, accessors, and tests coherent.
- Record invariants explicitly.
- If the model is exploratory, mark open questions rather than pretending finality.

## Cross-Application Impact Cues

- Entity and relation maps.
- Schema and validation.
- Accessors and service boundaries.
- Mock scenarios and fixtures.
- Permissions and visibility where data shape affects access.
- Tests and examples.

## Documentation Cues

- Report fixture or scenario implications until test behavior is designed.
- Consider updating relevant durable memory if the model decision will shape future work.

## Regression Cues

- Relation mismatch across layers.
- Invariants represented only in code comments or UI assumptions.
- Fixtures no longer matching model shape.
- Accessors leaking raw storage shape unintentionally.
- Tests missing changed relation behavior.

## Structural Maintenance Clues

- Consider entering structural maintenance when entity ownership, invariant placement, lifecycle state, persistence boundary, or model reuse is being decided.

## Report Cues

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





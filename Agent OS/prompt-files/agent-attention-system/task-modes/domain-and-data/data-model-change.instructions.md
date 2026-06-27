# Mode: Data Model Change

## Orientation Cues

- `prompt-files/domain-glossary.md`

## Evidence Cues

- Legacy tool note (inactive): `schema-query` for generated data-model index slices relevant to the target.
- Legacy tool note (inactive): `schema-query` for generated schema index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy tool note (inactive): `literal-query` for generated permissions and visibility index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Legacy skill note (inactive): `rename-impact-preview` for changed entities or fields.
- Legacy skill note (inactive): `schema-fixture-drift-scan`.
- Legacy skill note (inactive): `consumer-impact-preview` for changed entity shape, relation behavior, fixture keys, accessors, examples, or tests.
- Legacy skill note (inactive): `test-relation-scan` for changed model invariants or consumer-visible behavior.
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

- Legacy tool note (inactive): `build-schema-shape-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-schema-shape-index` if persistence changes, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-accessor-index`, legacy index refresh is out of scope unless explicitly requested.
- Report fixture or scenario implications until test behavior is designed.
- Legacy skill note (inactive): `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
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






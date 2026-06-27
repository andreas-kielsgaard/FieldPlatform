# Mode: Mock Data Change

## Orientation Cues

- `prompt-files/domain-glossary.md`

## Evidence Cues

- Legacy tool note (inactive): `schema-query` for generated data-model index slices relevant to the target.
- Legacy tool note (inactive): `schema-query` for generated schema index slices relevant to the target.
- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Legacy tool note (inactive): `term-query` for represented concepts.
- Legacy skill note (inactive): `schema-fixture-drift-scan`.
- Legacy tool note (inactive): `fixture-query`.
- Legacy skill note (inactive): `consumer-impact-preview` when fixture or scenario shape is consumed by tests, examples, previews, or generated indexes.
- Legacy tool note (inactive): `artifact-query` when fixture indexes, generated scenarios, or tool-maintained mock outputs are involved.
- Consider searching schema/validator references when mock shape changes.

## Implementation Cues

- Put durable mock data in canonical fixture builders or scenarios.
- Avoid creating long-lived inline mock objects inside pages or components.
- Distinguish visual filler data from domain-representative scenarios.
- If mock data encodes a product assumption, update the relevant map.
- Keep fixtures aligned with validators and schema where those exist.
- Prefer named scenarios over anonymous arrays.

## Cross-Application Impact Cues

- Concepts represented by the scenario.
- Schema, validators, and accessors.
- Stories, examples, tests, and previews.
- UI surfaces relying on mock behavior.
- Whether the mock should be marked provisional.

## Documentation Cues

- Report fixture or scenario implications until test behavior is designed.
- Consider updating `domain-glossary.md` if the scenario introduces terms.
- Legacy tool note (inactive): `build-schema-shape-index` if relation assumptions change, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-component-index` if examples depend on the scenario, legacy index refresh is out of scope unless explicitly requested.
- Consider updating `experiments.md` if the mock carries provisional product assumptions.

## Regression Cues

- Inline mock data becoming hidden architecture.
- Fixtures drifting from model/schema shape.
- Scenarios named too generically to reveal intent.
- Tests passing only because stale mock assumptions remain.
- Product assumptions encoded without documentation.

## Structural Maintenance Clues

- Consider entering structural maintenance when mock data becomes a durable fixture, scenario, product assumption, example contract, or maintained data source.

## Report Cues

```text
Primary mode: mock data change
Mock/scenario changed:
Concepts represented:
Used by:
Schema/validator alignment:
Assumptions encoded:
Docs updated:
Checks run:
```




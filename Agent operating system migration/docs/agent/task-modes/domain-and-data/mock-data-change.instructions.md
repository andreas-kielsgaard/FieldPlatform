# Mode: Mock Data Change

## Required Orientation

- `docs/agent/domain-glossary.md`

## Required Tools Or Searches

- Tool: `query-data-model-index` for generated data-model index slices relevant to the target.
- Tool: `query-schema-index` for generated schema index slices relevant to the target.
- Tool: `query-component-index` for generated component index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Tool: `find-term` for represented concepts.
- Tool: `validate-fixtures`.
- Tool: `scenario-usage`.
- Tool: `contract-impact` when fixture or scenario shape is consumed by tests, examples, previews, or generated indexes.
- Tool: `artifact-maintenance-path` when fixture indexes, generated scenarios, or tool-maintained mock outputs are involved.
- Search schema/validator references when mock shape changes.

## Implementation Instructions

- Put durable mock data in canonical fixture builders or scenarios.
- Do not create long-lived inline mock objects inside pages or components.
- Distinguish visual filler data from domain-representative scenarios.
- If mock data encodes a product assumption, update the relevant map.
- Keep fixtures aligned with validators and schema where those exist.
- Prefer named scenarios over anonymous arrays.

## Cross-Application Impact Checks

- Concepts represented by the scenario.
- Schema, validators, and accessors.
- Stories, examples, tests, and previews.
- UI surfaces relying on mock behavior.
- Whether the mock should be marked provisional.

## Documentation Updates

- Report fixture or scenario implications until test behavior is designed.
- Update `domain-glossary.md` if the scenario introduces terms.
- Tool: `update-data-model-index` if relation assumptions change, or report required index refresh if the tool is unavailable.
- Tool: `update-component-index` if examples depend on the scenario, or report required index refresh if the tool is unavailable.
- Update `experiments.md` if the mock carries provisional product assumptions.

## Regression Checks

- Inline mock data becoming hidden architecture.
- Fixtures drifting from model/schema shape.
- Scenarios named too generically to reveal intent.
- Tests passing only because stale mock assumptions remain.
- Product assumptions encoded without documentation.

## Structural Maintenance Clues

- Enter structural maintenance when mock data becomes a durable fixture, scenario, product assumption, example contract, or maintained data source.

## Required Completion Report

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

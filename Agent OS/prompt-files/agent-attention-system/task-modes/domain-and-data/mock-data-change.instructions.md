# Mode: Mock Data Change

## Orientation Cues

- Source-owned domain usage, fixtures, and relevant project decisions if present

## Evidence Cues


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
- Consider updating source-owned naming surfaces or a relevant mature project decision if the scenario introduces durable terms.
- Report provisional product assumptions in the final response when mock data carries them.

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



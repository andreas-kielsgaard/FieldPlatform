# Mode: Extract Reusable Pattern

## Required Orientation

- `docs/agent/generated-indexes/component-registry.md`
- `docs/agent/design-system-map.md`
- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md`
- `docs/agent/project-setup/technology-architecture-map.md` when extraction crosses area, package, or platform boundaries
- `docs/agent/known-debt.md`

## Required Tools Or Searches

- Search for repeated markup, classes, functions, helpers, or compositions.
- Tool: `component-usage`.
- Tool: `find-similar-pattern`.
- Tool: `map-components` if component structural indexes need refresh.
- Tool: `map-deps` when extraction crosses module boundaries.

## Implementation Instructions

- Extract only after identifying at least two actual or strongly imminent uses.
- Name the abstraction after the stable structural role, not accidental current content.
- Keep the abstraction narrow.
- Migrate consumers deliberately.
- Do not extract unstable product ontology into generic infrastructure.
- If extraction is useful but premature, log it as an extraction candidate instead.

## Cross-Application Impact Checks

- What consumers will migrate now?
- What duplication remains intentionally?
- Does the abstraction create a new convention future work must follow?
- Does extraction change behavior or only structure?

## Documentation Updates

- Update `generated-indexes/component-registry.md` for the new shared component or extraction candidate.
- Update the deferred logging strategy if the extraction establishes a convention.
- Update `known-debt.md` if duplication is intentionally left.
- Update `experiments.md` if the extraction remains provisional.

## Regression Checks

- Premature abstraction.
- Wrong abstraction name or ownership.
- Missed consumers.
- Behavior changes hidden inside refactor.
- Overly broad props or options.

## Required Completion Report

```text
Primary mode: extract reusable pattern
Pattern extracted:
Previous locations:
New abstraction:
Why now:
Consumers migrated:
Remaining duplication:
Behavior changed? yes/no
Docs updated:
Checks run:
```

# Mode: Modify Existing Component

## Required Orientation

- `docs/agent/generated-indexes/component-registry.md`
- `docs/agent/design-system-map.md`

## Required Tools Or Searches

- Find all component consumers before changing API or behavior.
- Tool: `component-usage`.
- Tool: `map-components` if component structural indexes need refresh.
- Run visual checks or examples if available.
- Run relevant tests for changed behavior.

## Implementation Instructions

- Preserve existing variants unless intentionally replacing them.
- Do not repurpose a component so its name no longer matches its behavior.
- Prefer a deliberate variant over one-off conditional complexity.
- If the component has become too broad, consider splitting it.
- Keep API changes explicit and migrate consumers deliberately.
- Update examples or stories to show changed states.

## Cross-Application Impact Checks

- Which consumers will see visual or behavioral changes?
- Does the component still belong at its current abstraction level?
- Does the change introduce a domain-specific dependency?
- Does a visual or token convention need to move into the design-system map?

## Documentation Updates

- Update `generated-indexes/component-registry.md` for API, variant, purpose, ownership, or status changes.
- Update `design-system-map.md` if the component changes shared visual rules.
- Report coverage implications until test behavior is designed.
- Update `known-debt.md` if compatibility work is intentionally deferred.

## Regression Checks

- Downstream consumer breakage.
- Silent visual regressions.
- Variant behavior drift.
- Component becoming too broad or too domain-specific.
- Missing migration for renamed props or states.

## Required Completion Report

```text
Primary mode: modify existing component
Component changed:
Consumers found:
API changed? yes/no
Variants changed:
Stories/examples updated:
Visual checks:
Breaking risk:
Docs updated:
Checks run:
```

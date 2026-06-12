# Mode: Modify Existing Component

## Required Orientation

- `docs/agent/design-system-map.md`

## Required Tools Or Searches

- Tool: `query-component-index` for generated component index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

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

- Tool: `update-component-index` for API, variant, purpose, ownership, or status changes, or report required index refresh if the tool is unavailable.
- Update `design-system-map.md` if the component changes shared visual rules.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update `known-debt.md` if compatibility work is intentionally deferred.

## Regression Checks

- Downstream consumer breakage.
- Silent visual regressions.
- Variant behavior drift.
- Component becoming too broad or too domain-specific.
- Missing migration for renamed props or states.

## Structural Maintenance Clues

- Enter structural maintenance when the component API, abstraction level, ownership, split/rename path, variant contract, or domain boundary changes.

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

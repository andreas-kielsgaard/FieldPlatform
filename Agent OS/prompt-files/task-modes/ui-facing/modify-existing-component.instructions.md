# Mode: Modify Existing Component

## Orientation Cues

- `prompt-files/design-system-map.md`

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Find all component consumers before changing API or behavior.
- Consider Tool: `component-query`.
- Consider Tool: `build-component-index` if component structural indexes need refresh.
- Consider running visual checks or examples if available.
- Consider running relevant tests for changed behavior.

## Implementation Cues

- Preserve existing variants unless intentionally replacing them.
- Avoid repurposing a component so its name no longer matches its behavior.
- Prefer a deliberate variant over one-off conditional complexity.
- If the component has become too broad, consider splitting it.
- Keep API changes explicit and migrate consumers deliberately.
- Consider updating examples or stories to show changed states.

## Cross-Application Impact Cues

- Which consumers will see visual or behavioral changes?
- Does the component still belong at its current abstraction level?
- Does the change introduce a domain-specific dependency?
- Does a visual or token convention need to move into the design-system map?

## Documentation Cues

- Consider Tool: `build-component-index` for API, variant, purpose, ownership, or status changes, or report index refresh may be needed if the tool is unavailable.
- Consider updating `design-system-map.md` if the component changes shared visual rules.
- Consider Skill: `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
- Consider updating `known-debt.md` if compatibility work is intentionally deferred.

## Regression Cues

- Downstream consumer breakage.
- Silent visual regressions.
- Variant behavior drift.
- Component becoming too broad or too domain-specific.
- Missing migration for renamed props or states.

## Structural Maintenance Clues

- Consider entering structural maintenance when the component API, abstraction level, ownership, split/rename path, variant contract, or domain boundary changes.

## Report Cues

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




# Mode: Visual Or Design-System Change

## Required Orientation

- `prompt-files/design-system-map.md`

## Required Tools Or Searches

- Tool: `component-query` for generated component index slices relevant to the target.
- Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Skill: `design-token-drift-scan`.
- Tool: `component-query` when shared visuals change.
- Use component examples, previews, or Storybook if available.
- Run visual comparisons or screenshots if available.

## Implementation Instructions

- Change shared visual rules through tokens, primitives, or shared styles where possible.
- Do not hardcode repeated colors, spacing, typography, or status styles in components.
- Update all consumers through the shared control surface when practical.
- Add or update examples for visible variants.
- Distinguish a one-off visual need from a design-system rule.

## Cross-Application Impact Checks

- Which components consume the changed token, primitive, or visual rule?
- Does the change alter status semantics or only presentation?
- Does the change create a new shared interaction pattern?
- Do screenshots or examples need to be refreshed?

## Documentation Updates

- Update `design-system-map.md`.
- Tool: `build-component-index` if component variants or primitives changed, or report required index refresh if the tool is unavailable.
- Skill: `test-relation-scan` for visual coverage implications, or report gaps if the tool is unavailable.
- Update the deferred logging strategy if a durable design convention is established.

## Regression Checks

- Token drift.
- Hardcoded repeated values.
- Inconsistent variant rollout.
- Unintended changes to shared components.
- Text overlap, truncation, or visual breakage across expected viewports.

## Structural Maintenance Clues

- Enter structural maintenance when a visual rule becomes design-system authority, a primitive changes ownership, status treatment becomes semantic, or shared interaction contracts change.

## Required Completion Report

```text
Primary mode: visual or design-system change
Visual rule changed:
Token/primitive affected:
Components affected:
Stories/examples updated:
Visual checks:
Docs updated:
Checks run:
```




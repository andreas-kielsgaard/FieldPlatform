# Mode: Visual Or Design-System Change

## Orientation Cues

- `prompt-files/design-system-map.md`

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider Skill: `design-token-drift-scan`.
- Consider Tool: `component-query` when shared visuals change.
- Consider using component examples, previews, or Storybook if available.
- Consider running visual comparisons or screenshots if available.

## Implementation Cues

- Change shared visual rules through tokens, primitives, or shared styles where possible.
- Avoid hardcoding repeated colors, spacing, typography, or status styles in components.
- Consider updating all consumers through the shared control surface when practical.
- Add or update examples for visible variants.
- Distinguish a one-off visual need from a design-system rule.

## Cross-Application Impact Cues

- Which components consume the changed token, primitive, or visual rule?
- Does the change alter status semantics or only presentation?
- Does the change create a new shared interaction pattern?
- Do screenshots or examples need to be refreshed?

## Documentation Cues

- Consider updating `design-system-map.md`.
- Consider Tool: `build-component-index` if component variants or primitives changed, or report index refresh may be needed if the tool is unavailable.
- Consider Skill: `test-relation-scan` for visual coverage implications, or report gaps if the tool is unavailable.
- Consider updating the deferred logging strategy if a durable design convention is established.

## Regression Cues

- Token drift.
- Hardcoded repeated values.
- Inconsistent variant rollout.
- Unintended changes to shared components.
- Text overlap, truncation, or visual breakage across expected viewports.

## Structural Maintenance Clues

- Consider entering structural maintenance when a visual rule becomes design-system authority, a primitive changes ownership, status treatment becomes semantic, or shared interaction contracts change.

## Report Cues

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




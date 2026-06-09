# Mode: Visual Or Design-System Change

## Required Orientation

- `docs/agent/design-system-map.md`
- `docs/agent/component-registry.md`
- `docs/agent/testing-map.md`

## Required Tools Or Searches

- Tool: `check-token-literals`.
- Tool: `component-usage` when shared visuals change.
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
- Update `component-registry.md` if component variants or primitives changed.
- Update `testing-map.md` if visual coverage changes.
- Update `decision-log.md` if a durable design convention is established.

## Regression Checks

- Token drift.
- Hardcoded repeated values.
- Inconsistent variant rollout.
- Unintended changes to shared components.
- Text overlap, truncation, or visual breakage across expected viewports.

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

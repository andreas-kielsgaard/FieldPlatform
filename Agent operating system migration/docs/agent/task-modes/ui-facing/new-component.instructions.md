# Mode: New Component

## Required Orientation

- `docs/agent/design-system-map.md`
- `docs/agent/project-setup/technology-architecture-map.md` when shared placement or interface boundaries may matter
- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md` when deciding whether logic belongs inside this component, a local helper, a shared component, or another owner

## Required Tools Or Searches

- Tool: `query-component-index` for generated component index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Search for similar components and local patterns.
- Tool: `component-usage`.
- Tool: `map-components` if component structural indexes need refresh.
- Tool: `find-term` for the proposed component name and purpose.
- Check examples, stories, previews, or neighboring component APIs if available.

## Implementation Instructions

- Classify the component before creating it: primitive, layout component, composite component, domain component, or page-local component.
- Do not create a shared component until existing components and local patterns have been checked.
- Keep page-specific components near the page.
- Put shared components in the canonical shared component location.
- Name the component by role or purpose, not by the first page where it appears.
- Do not encode unstable domain concepts into a generic component.
- Expose the smallest API that supports the known use case.
- Do not add variants speculatively.

## Cross-Application Impact Checks

- Could this be local instead of shared?
- Is the API stable enough for reuse?
- Does the component introduce visual, naming, or status conventions?
- Does it depend on mock data or domain assumptions that should stay outside the component?

## Documentation Updates

- Tool: `update-component-index`, or report required index refresh if the tool is unavailable.
- Update `design-system-map.md` if tokens, variants, primitives, or status treatment changed.
- Update examples or stories if the component is shared or likely reused.
- Tool: `test-surface-selection` for component coverage implications, or report gaps if the tool is unavailable.

## Regression Checks

- Unnecessary abstraction.
- Missing variants for real current states.
- Speculative variants.
- Domain-specific assumptions hidden in a generic component.
- Component API broader than its known use.

## Structural Maintenance Clues

- Enter structural maintenance when choosing shared versus local placement, primitive versus domain ownership, API contract, variant authority, or reuse path.

## Required Completion Report

```text
Primary mode: new component
Component:
Classification:
Why existing components were insufficient:
Props/API:
Variants:
Stories/tests:
Consumers:
Docs updated:
Checks run:
```

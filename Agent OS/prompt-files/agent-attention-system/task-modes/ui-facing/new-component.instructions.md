# Mode: New Component

## Orientation Cues

- Source-owned tokens, primitives, component examples, and relevant project decisions if present
- `project-decisions/project-decision-map.md` when shared placement or interface boundaries depend on mature project decisions
- `prompt-files/agent-attention-system/agent-attention-system-usage.md` when deciding whether logic belongs inside this component, a local helper, a shared component, or another owner

## Evidence Cues

- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching for similar components and local patterns.
- Legacy tool note (inactive): `component-query`.
- Legacy tool note (inactive): `build-component-index` if component structural indexes need refresh.
- Legacy tool note (inactive): `term-query` for the proposed component name and purpose.
- Check examples, stories, previews, or neighboring component APIs if available.

## Implementation Cues

- Classify the component before creating it: primitive, layout component, composite component, domain component, or page-local component.
- Prefer creating a shared component after checking existing components and local patterns.
- Keep page-specific components near the page.
- Put shared components in the canonical shared component location.
- Name the component by role or purpose, not by the first page where it appears.
- Avoid encoding unstable domain concepts into a generic component.
- Expose the smallest API that supports the known use case.
- Avoid adding variants speculatively.

## Cross-Application Impact Cues

- Could this be local instead of shared?
- Is the API stable enough for reuse?
- Does the component introduce visual, naming, or status conventions?
- Does it depend on mock data or domain assumptions that should stay outside the component?

## Documentation Cues

- Legacy tool note (inactive): `build-component-index`, legacy index refresh is out of scope unless explicitly requested.
- Consider updating source-owned tokens/primitives or a relevant mature project decision if tokens, variants, primitives, or status treatment changed.
- Consider updating examples or stories if the component is shared or likely reused.
- Legacy skill note (inactive): `test-relation-scan` for component coverage implications, or report gaps if the tool is unavailable.

## Regression Cues

- Unnecessary abstraction.
- Missing variants for real current states.
- Speculative variants.
- Domain-specific assumptions hidden in a generic component.
- Component API broader than its known use.

## Structural Maintenance Clues

- Consider entering structural maintenance when choosing shared versus local placement, primitive versus domain ownership, API contract, variant authority, or reuse path.

## Report Cues

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



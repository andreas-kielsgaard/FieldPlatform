# Mode: New Route Or Page

## Required Orientation

- `project-control-files/technology-architecture-map.md` when route placement or platform boundaries may matter
- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` when deciding page-shell ownership, boundary placement, or durable route/page structure
- `prompt-files/domain-glossary.md`

## Required Tools Or Searches

- Tool: `route-query` for generated routing index slices relevant to the target.
- Tool: `component-query` for generated component index slices relevant to the target.
- Tool: `literal-query` for generated permissions and visibility index slices relevant to the target.
- Tool: `term-query` for generated naming index slices relevant to the target.
- Skill: `state-impact-scan` for generated state-management index slices relevant to the target.
- Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Tool: `build-route-index`.
- Search for similar route families and page shells.
- Tool: `term-query` for proposed route labels or slugs.
- Search for policy/visibility patterns if the route is guarded.

## Implementation Instructions

- Treat routes as product language.
- Check whether a route family or page shell already exists.
- Use existing layout shells unless there is a clear reason not to.
- Do not invent route slugs casually.
- Do not bury permission assumptions directly inside page code when a policy layer exists.
- Define loading, empty, error, and unauthorized states when relevant.

## Cross-Application Impact Checks

- Does the route introduce a new concept or label?
- Does it require permissions, visibility, or data access rules?
- Does it establish a repeatable page shell?
- Does URL state need to be documented?

## Documentation Updates

- Tool: `build-route-index`, or report required index refresh if the tool is unavailable.
- Tool: `build-literal-index` if visibility changes, or report required index refresh if the tool is unavailable.
- Tool: `build-component-index` if a page shell becomes reusable, or report required index refresh if the tool is unavailable.
- Update `domain-glossary.md` if route language introduces domain terms; use Tool: `build-term-index`, or report required index refresh if the tool is unavailable.
- Tool: `build-symbol-index` if URL state changes, or report required index refresh if the tool is unavailable.

## Regression Checks

- Route naming drift.
- Duplicate page shells.
- Missing unauthorized, empty, loading, or error states.
- Policy omission.
- Route-level data assumptions not routed through accessors.

## Structural Maintenance Clues

- Enter structural maintenance when route-family ownership, page-shell placement, route naming, URL state, permission/data boundary, or durable navigable structure is being decided.

## Required Completion Report

```text
Primary mode: new route or page
Route/page:
Route params:
Page shell used:
Policy/visibility assumptions:
Data access assumptions:
States covered:
Docs updated:
Checks run:
```




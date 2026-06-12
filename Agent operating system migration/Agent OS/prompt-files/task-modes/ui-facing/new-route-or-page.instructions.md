# Mode: New Route Or Page

## Orientation Cues

- `project-control-files/technology-architecture-map.md` when route placement or platform boundaries may matter
- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` when deciding page-shell ownership, boundary placement, or durable route/page structure
- `prompt-files/domain-glossary.md`

## Evidence Cues

- Consider Tool: `route-query` for generated routing index slices relevant to the target.
- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Tool: `literal-query` for generated permissions and visibility index slices relevant to the target.
- Consider Tool: `term-query` for generated naming index slices relevant to the target.
- Consider Skill: `state-impact-scan` for generated state-management index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider Tool: `build-route-index`.
- Consider searching for similar route families and page shells.
- Consider Tool: `term-query` for proposed route labels or slugs.
- Consider searching for policy/visibility patterns if the route is guarded.

## Implementation Cues

- Treat routes as product language.
- Check whether a route family or page shell already exists.
- Consider using existing layout shells unless there is a clear reason not to.
- Avoid inventing route slugs casually.
- Prefer the policy layer over burying permission assumptions directly inside page code.
- Define loading, empty, error, and unauthorized states when relevant.

## Cross-Application Impact Cues

- Does the route introduce a new concept or label?
- Does it require permissions, visibility, or data access rules?
- Does it establish a repeatable page shell?
- Does URL state need to be documented?

## Documentation Cues

- Consider Tool: `build-route-index`, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-literal-index` if visibility changes, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-component-index` if a page shell becomes reusable, or report index refresh may be needed if the tool is unavailable.
- Consider updating `domain-glossary.md` if route language introduces domain terms; use Tool: `build-term-index`, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-symbol-index` if URL state changes, or report index refresh may be needed if the tool is unavailable.

## Regression Cues

- Route naming drift.
- Duplicate page shells.
- Missing unauthorized, empty, loading, or error states.
- Policy omission.
- Route-level data assumptions not routed through accessors.

## Structural Maintenance Clues

- Consider entering structural maintenance when route-family ownership, page-shell placement, route naming, URL state, permission/data boundary, or durable navigable structure is being decided.

## Report Cues

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




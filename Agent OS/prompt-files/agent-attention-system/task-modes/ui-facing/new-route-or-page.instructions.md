# Mode: New Route Or Page

## Orientation Cues

- `project-decisions/project-decision-map.md` when route placement or platform boundaries depend on mature project decisions
- `prompt-files/agent-attention-system/agent-attention-system-usage.md` when deciding page-shell ownership, boundary placement, or durable route/page structure
- Source-owned domain usage, copy surfaces, and relevant project decisions if present

## Evidence Cues


- Consider searching for similar route families and page shells.
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



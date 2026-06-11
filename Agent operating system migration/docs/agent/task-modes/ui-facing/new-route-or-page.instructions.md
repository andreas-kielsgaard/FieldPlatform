# Mode: New Route Or Page

## Required Orientation

- `docs/agent/generated-indexes/routing-map.md`
- `docs/agent/project-setup/technology-architecture-map.md` when route placement or platform boundaries may matter
- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md` when deciding page-shell ownership, boundary placement, or durable route/page structure
- `docs/agent/generated-indexes/component-registry.md`
- `docs/agent/generated-indexes/permissions-and-visibility-map.md`
- `docs/agent/domain-glossary.md`

## Required Tools Or Searches

- Tool: `map-routes`.
- Search for similar route families and page shells.
- Tool: `find-term` for proposed route labels or slugs.
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

- Update `generated-indexes/routing-map.md`.
- Update `generated-indexes/permissions-and-visibility-map.md` if visibility changes.
- Update `generated-indexes/component-registry.md` if a page shell becomes reusable.
- Update `domain-glossary.md` or `generated-indexes/naming-index.md` if route language introduces domain terms.
- Update `generated-indexes/state-management-map.md` if URL state changes.

## Regression Checks

- Route naming drift.
- Duplicate page shells.
- Missing unauthorized, empty, loading, or error states.
- Policy omission.
- Route-level data assumptions not routed through accessors.

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

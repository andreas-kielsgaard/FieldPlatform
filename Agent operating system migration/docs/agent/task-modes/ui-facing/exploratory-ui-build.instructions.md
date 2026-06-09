# Mode: Exploratory UI Build

## Required Orientation

- `docs/agent/source-map.md`
- `docs/agent/component-registry.md`
- `docs/agent/design-system-map.md`
- `docs/agent/routing-map.md`
- `docs/agent/mock-data-map.md`
- `docs/agent/experiments.md`

## Required Tools Or Searches

- Search for similar surfaces, shells, cards, lists, and panels.
- Tool: `component-usage`.
- Tool: `find-term` for domain language introduced by the surface.
- Use component previews or visual checks if available.

## Implementation Instructions

- Reuse existing layout, component, token, and naming patterns where possible.
- Prefer local implementation while the pattern is uncertain.
- Promote only clearly repeated or structurally important patterns into shared components.
- Do not invent durable domain concepts inside view code without checking naming and concept maps.
- Do not create long-lived inline mock data.
- Mark exploratory product assumptions in the experiments ledger when they are not yet stable.

## Cross-Application Impact Checks

- Does this introduce a new concept, status, route, fixture, or shared visual pattern?
- Does it duplicate an existing card, list, shell, or interaction?
- Does it create a mock scenario that looks like a product contract?
- Does it imply permissions, visibility, or access behavior?

## Documentation Updates

- Update `component-registry.md` if a shared pattern appears.
- Update `routing-map.md` if a route or navigable surface appears.
- Update `mock-data-map.md` if durable fixture/scenario assumptions appear.
- Update `experiments.md` for provisional surfaces or product assumptions.
- Update naming/domain maps if new terms become meaningful.

## Regression Checks

- Duplicate page/card/list shells.
- Hardcoded visual values or statuses.
- Mock data embedded directly in views.
- Domain concepts introduced without map updates.
- New routes or visibility assumptions without map updates.
- Visual drift from existing patterns.

## Required Completion Report

```text
Primary mode: exploratory UI build
Surface added/changed:
Existing components reused:
New local patterns introduced:
Shared patterns introduced:
Domain terms introduced/changed:
Mock data touched:
Docs updated:
Provisional assumptions:
Checks run:
```

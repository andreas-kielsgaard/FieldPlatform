# Mode: Exploratory UI Build

## Required Orientation

- `docs/agent/project-setup/technology-architecture-map.md` when platform, route, or source/generated boundaries may matter
- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md` when exploratory work starts creating durable owners, shared patterns, or source-of-truth structure
- `docs/agent/generated-indexes/component-registry.md`
- `docs/agent/design-system-map.md`
- `docs/agent/generated-indexes/routing-map.md`
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

- Update `generated-indexes/component-registry.md` if a shared pattern appears.
- Update `generated-indexes/routing-map.md` if a route or navigable surface appears.
- Report durable fixture or scenario assumptions until test behavior is designed.
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

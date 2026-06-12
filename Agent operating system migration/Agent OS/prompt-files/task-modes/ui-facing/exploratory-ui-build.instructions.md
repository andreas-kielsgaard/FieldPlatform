# Mode: Exploratory UI Build

## Orientation Cues

- `project-control-files/technology-architecture-map.md` when platform, route, or source/generated boundaries may matter
- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` when exploratory work starts creating durable owners, shared patterns, or source-of-truth structure
- `prompt-files/design-system-map.md`
- `prompt-files/experiments.md`

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Tool: `route-query` for generated routing index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching for similar surfaces, shells, cards, lists, and panels.
- Consider Tool: `component-query`.
- Consider Tool: `term-query` for domain language introduced by the surface.
- Consider using component previews or visual checks if available.

## Implementation Cues

- Reuse existing layout, component, token, and naming patterns where possible.
- Prefer local implementation while the pattern is uncertain.
- Promote only clearly repeated or structurally important patterns into shared components.
- Avoid inventing durable domain concepts inside view code without checking naming and concept maps.
- Avoid creating long-lived inline mock data.
- Mark exploratory product assumptions in the experiments ledger when they are not yet stable.

## Cross-Application Impact Cues

- Does this introduce a new concept, status, route, fixture, or shared visual pattern?
- Does it duplicate an existing card, list, shell, or interaction?
- Does it create a mock scenario that looks like a product contract?
- Does it imply permissions, visibility, or access behavior?

## Documentation Cues

- Consider Tool: `build-component-index` if a shared pattern appears, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-route-index` if a route or navigable surface appears, or report index refresh may be needed if the tool is unavailable.
- Report durable fixture or scenario assumptions until test behavior is designed.
- Consider updating `experiments.md` for provisional surfaces or product assumptions.
- Consider updating `domain-glossary.md`; use Tool: `build-term-index` if new terms become meaningful, or report index refresh may be needed if the tool is unavailable.

## Regression Cues

- Duplicate page/card/list shells.
- Hardcoded visual values or statuses.
- Mock data embedded directly in views.
- Domain concepts introduced without map updates.
- New routes or visibility assumptions without map updates.
- Visual drift from existing patterns.

## Structural Maintenance Clues

- Consider entering structural maintenance when exploratory UI starts creating shared patterns, durable routes, component ownership, product concepts, mock contracts, or visibility assumptions.

## Report Cues

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




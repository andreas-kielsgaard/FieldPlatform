# Mode: Exploratory UI Build

## Orientation Cues

- `project-decisions/project-decision-map.md` when platform, route, or source/generated boundaries depend on mature project decisions
- `prompt-files/agent-attention-system/agent-attention-system-usage.md` when exploratory work starts creating durable owners, shared patterns, or source-of-truth structure
- Source-owned tokens, primitives, component examples, and relevant project decisions if present

## Evidence Cues


- Consider searching for similar surfaces, shells, cards, lists, and panels.
- Consider using component previews or visual checks if available.

## Implementation Cues

- Reuse existing layout, component, token, and naming patterns where possible.
- Prefer local implementation while the pattern is uncertain.
- Promote only clearly repeated or structurally important patterns into shared components.
- Avoid inventing durable domain concepts inside view code without checking naming and concept maps.
- Avoid creating long-lived inline mock data.
- Report exploratory product assumptions in the final response when they are not yet stable.

## Cross-Application Impact Cues

- Does this introduce a new concept, status, route, fixture, or shared visual pattern?
- Does it duplicate an existing card, list, shell, or interaction?
- Does it create a mock scenario that looks like a product contract?
- Does it imply permissions, visibility, or access behavior?

## Documentation Cues

- Report durable fixture or scenario assumptions until test behavior is designed.
- Report provisional surfaces or product assumptions in the final response; update project decisions only when a mature human-owned decision changes.

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



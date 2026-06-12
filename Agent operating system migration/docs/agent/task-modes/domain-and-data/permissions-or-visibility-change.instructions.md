# Mode: Permissions Or Visibility Change

## Required Orientation

- `docs/agent/domain-glossary.md`

## Required Tools Or Searches

- Tool: `query-permissions-visibility-index` for generated permissions and visibility index slices relevant to the target.
- Tool: `query-routing-index` for generated routing index slices relevant to the target.
- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Tool: `check-permission-literals`.
- Search policy predicates, role strings, guards, and hidden/disabled logic.
- Search route guards and accessor-level checks.
- Run affected policy/access tests if available.

## Implementation Instructions

- Centralize permission logic in policy or predicate modules where such a layer exists.
- Do not scatter raw role strings through components.
- Distinguish can see, can open, can edit, can invite, can publish, and can administer.
- Define hidden, disabled, and visible-with-explanation behavior deliberately.
- Check both UI visibility and data access; hiding a UI element is not authorization.

## Cross-Application Impact Checks

- Routes and protected surfaces.
- Accessors and data-return behavior.
- UI hidden/disabled/explained states.
- Policy vocabulary and capabilities.
- Tests and examples.

## Documentation Updates

- Tool: `update-permissions-visibility-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-routing-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-accessor-index`, or report required index refresh if the tool is unavailable.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update the deferred logging strategy if policy vocabulary changes.

## Regression Checks

- Raw permission or role literals outside policy boundaries.
- UI-only authorization.
- Inconsistent hidden vs disabled behavior.
- Protected routes without data-access checks.
- Accessor rules diverging from UI visibility.

## Structural Maintenance Clues

- Enter structural maintenance when policy vocabulary, guard placement, UI/data authorization boundaries, hidden versus disabled contracts, or permission authority changes.

## Required Completion Report

```text
Primary mode: permissions or visibility change
Capability/policy changed:
Predicates:
Routes affected:
Components affected:
Accessor/data implications:
Tests:
Docs updated:
Checks run:
```

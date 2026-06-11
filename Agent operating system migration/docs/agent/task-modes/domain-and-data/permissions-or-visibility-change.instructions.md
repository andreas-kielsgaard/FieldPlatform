# Mode: Permissions Or Visibility Change

## Required Orientation

- `docs/agent/generated-indexes/permissions-and-visibility-map.md`
- `docs/agent/generated-indexes/routing-map.md`
- `docs/agent/generated-indexes/accessor-map.md`
- `docs/agent/domain-glossary.md`

## Required Tools Or Searches

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

- Update `generated-indexes/permissions-and-visibility-map.md`.
- Update `generated-indexes/routing-map.md`.
- Update `generated-indexes/accessor-map.md`.
- Report test coverage implications until test behavior is designed.
- Update the deferred logging strategy if policy vocabulary changes.

## Regression Checks

- Raw permission or role literals outside policy boundaries.
- UI-only authorization.
- Inconsistent hidden vs disabled behavior.
- Protected routes without data-access checks.
- Accessor rules diverging from UI visibility.

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

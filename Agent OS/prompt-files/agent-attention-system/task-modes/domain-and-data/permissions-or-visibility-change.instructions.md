# Mode: Permissions Or Visibility Change

## Orientation Cues

- `prompt-files/domain-glossary.md`

## Evidence Cues

- Legacy tool note (inactive): `literal-query` for generated permissions and visibility index slices relevant to the target.
- Legacy tool note (inactive): `route-query` for generated routing index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Legacy skill note (inactive): `policy-literal-drift-scan`.
- Consider searching policy predicates, role strings, guards, and hidden/disabled logic.
- Consider searching route guards and accessor-level checks.
- Consider running affected policy/access tests if available.

## Implementation Cues

- Centralize permission logic in policy or predicate modules where such a layer exists.
- Avoid scattering raw role strings through components.
- Distinguish can see, can open, can edit, can invite, can publish, and can administer.
- Define hidden, disabled, and visible-with-explanation behavior deliberately.
- Check both UI visibility and data access; hiding a UI element is not authorization.

## Cross-Application Impact Cues

- Routes and protected surfaces.
- Accessors and data-return behavior.
- UI hidden/disabled/explained states.
- Policy vocabulary and capabilities.
- Tests and examples.

## Documentation Cues

- Legacy tool note (inactive): `build-literal-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-route-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-accessor-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy skill note (inactive): `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
- Consider updating relevant durable memory if policy vocabulary changes.

## Regression Cues

- Raw permission or role literals outside policy boundaries.
- UI-only authorization.
- Inconsistent hidden vs disabled behavior.
- Protected routes without data-access checks.
- Accessor rules diverging from UI visibility.

## Structural Maintenance Clues

- Consider entering structural maintenance when policy vocabulary, guard placement, UI/data authorization boundaries, hidden versus disabled contracts, or permission authority changes.

## Report Cues

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




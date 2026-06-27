# Mode: State-Management Change

## Orientation Cues

- Use source reads, human-maintained maps, and standard checks. Legacy generated-index query tools listed below are inactive for ordinary development.

## Evidence Cues

- Legacy skill note (inactive): `state-impact-scan` for generated state-management index slices relevant to the target.
- Legacy tool note (inactive): `route-query` for generated routing index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Legacy skill note (inactive): `state-impact-scan`.
- Consider searching duplicated derived state and mirrored server data.
- Consider running affected interaction tests if available.
- Consider using route/search-param checks if URL state changes.

## Implementation Cues

- Choose the narrowest state scope that preserves correctness.
- Prefer derived values over duplicated state.
- Avoid contradictory state flags.
- Consider using URL state when navigation, history, or shareability matters.
- Consider using server/data state for fetched or persisted data.
- Consider using shared client state only when multiple distant surfaces genuinely coordinate.
- Avoid introducing global state for convenience.

## Cross-Application Impact Cues

- Does state belong locally, in URL, at the data boundary, or in shared client state?
- Are derived values duplicated?
- Are server/data values copied into client state without reason?
- Do route semantics, caching, or accessors need updates?

## Documentation Cues

- Legacy tool note (inactive): `build-symbol-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-route-index` if URL state changes, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-accessor-index` if server state, cache, or invalidation changes, legacy index refresh is out of scope unless explicitly requested.
- Legacy skill note (inactive): `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
- Consider updating `known-debt.md` if state duplication remains temporarily.

## Regression Cues

- Duplicate state.
- Contradictory flags.
- Stale cached data.
- URL/back-button/shareability behavior.
- Hidden state transitions in effects.
- Global store introduced for convenience.

## Structural Maintenance Clues

- Consider entering structural maintenance when state ownership, URL/cache/shared-state boundaries, lifecycle rules, duplicated state, or maintenance path is being decided.

## Report Cues

```text
Primary mode: state-management change
State changed:
Old location:
New location:
Why this scope:
Derived/duplicated state checked:
Consumers:
Tests:
Docs updated:
Checks run:
```




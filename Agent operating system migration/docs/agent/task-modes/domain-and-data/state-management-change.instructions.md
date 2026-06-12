# Mode: State-Management Change

## Required Orientation

- Query generated indexes through the tools below instead of loading whole generated files.

## Required Tools Or Searches

- Tool: `query-state-management-index` for generated state-management index slices relevant to the target.
- Tool: `query-routing-index` for generated routing index slices relevant to the target.
- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `query-component-index` for generated component index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Tool: `state-consumer-search`.
- Search duplicated derived state and mirrored server data.
- Run affected interaction tests if available.
- Use route/search-param checks if URL state changes.

## Implementation Instructions

- Choose the narrowest state scope that preserves correctness.
- Prefer derived values over duplicated state.
- Avoid contradictory state flags.
- Use URL state when navigation, history, or shareability matters.
- Use server/data state for fetched or persisted data.
- Use shared client state only when multiple distant surfaces genuinely coordinate.
- Do not introduce global state for convenience.

## Cross-Application Impact Checks

- Does state belong locally, in URL, at the data boundary, or in shared client state?
- Are derived values duplicated?
- Are server/data values copied into client state without reason?
- Do route semantics, caching, or accessors need updates?

## Documentation Updates

- Tool: `update-state-management-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-routing-index` if URL state changes, or report required index refresh if the tool is unavailable.
- Tool: `update-accessor-index` if server state, cache, or invalidation changes, or report required index refresh if the tool is unavailable.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update `known-debt.md` if state duplication remains temporarily.

## Regression Checks

- Duplicate state.
- Contradictory flags.
- Stale cached data.
- URL/back-button/shareability behavior.
- Hidden state transitions in effects.
- Global store introduced for convenience.

## Structural Maintenance Clues

- Enter structural maintenance when state ownership, URL/cache/shared-state boundaries, lifecycle rules, duplicated state, or maintenance path is being decided.

## Required Completion Report

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

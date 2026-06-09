# Mode: State-Management Change

## Required Orientation

- `docs/agent/state-management-map.md`
- `docs/agent/routing-map.md`
- `docs/agent/accessor-map.md`
- `docs/agent/component-registry.md`
- `docs/agent/testing-map.md`

## Required Tools Or Searches

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

- Update `state-management-map.md`.
- Update `routing-map.md` if URL state changes.
- Update `accessor-map.md` if server state, cache, or invalidation changes.
- Update `testing-map.md`.
- Update `known-debt.md` if state duplication remains temporarily.

## Regression Checks

- Duplicate state.
- Contradictory flags.
- Stale cached data.
- URL/back-button/shareability behavior.
- Hidden state transitions in effects.
- Global store introduced for convenience.

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

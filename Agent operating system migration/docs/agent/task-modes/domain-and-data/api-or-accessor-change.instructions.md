# Mode: API Or Accessor Change

## Required Orientation

- `docs/agent/accessor-map.md`
- `docs/agent/schema-map.md`
- `docs/agent/data-model-map.md`
- `docs/agent/permissions-and-visibility-map.md`
- `docs/agent/state-management-map.md`
- `docs/agent/testing-map.md`

## Required Tools Or Searches

- Tool: `accessor-usage`.
- Tool: `symbol-search` for accessor names and API routes.
- Search direct data access patterns.
- Run affected accessor/API tests.

## Implementation Instructions

- Preserve a clear data-access layer.
- Do not scatter fetch, query, mutation, or storage logic directly into UI if an accessor boundary exists.
- If an accessor changes shape, find all consumers.
- Document caching and invalidation assumptions.
- Keep authorization and visibility checks in the appropriate policy/access layer.
- Return stable domain shapes unless raw storage rows are explicitly intended.

## Cross-Application Impact Checks

- Callers and consumers.
- Return shapes and data model assumptions.
- Cache and invalidation behavior.
- Permission and visibility implications.
- Server/client state ownership.
- Tests, examples, and mocks.

## Documentation Updates

- Update `accessor-map.md`.
- Update `state-management-map.md` if cache or server-state behavior changes.
- Update `permissions-and-visibility-map.md` if access logic changes.
- Update `testing-map.md`.
- Update `known-debt.md` if direct access remains temporarily.

## Regression Checks

- Direct UI data access creeping in.
- Stale callers after return shape changes.
- Cache invalidation misses.
- Policy checks moved into arbitrary components.
- Mocks still shaped like old responses.

## Required Completion Report

```text
Primary mode: API or accessor change
Accessor/API changed:
Callers:
Return shape:
Cache/invalidation:
Permission implications:
Mocks affected:
Tests/checks:
Docs updated:
```

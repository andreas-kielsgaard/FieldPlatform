# Mode: API Or Accessor Change

## Required Orientation

- Query generated indexes through the tools below instead of loading whole generated files.

## Required Tools Or Searches

- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `query-schema-index` for generated schema index slices relevant to the target.
- Tool: `query-data-model-index` for generated data-model index slices relevant to the target.
- Tool: `query-permissions-visibility-index` for generated permissions and visibility index slices relevant to the target.
- Tool: `query-state-management-index` for generated state-management index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Tool: `accessor-usage`.
- Tool: `symbol-search` for accessor names and API routes.
- Tool: `contract-impact` for changed accessor/API shape, behavior, errors, side effects, caching, or compatibility.
- Tool: `contract-test-coverage` for changed internal processing behind an accessor/API contract.
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

- Tool: `update-accessor-index`, or report required index refresh if the tool is unavailable.
- Tool: `update-state-management-index` if cache or server-state behavior changes, or report required index refresh if the tool is unavailable.
- Tool: `update-permissions-visibility-index` if access logic changes, or report required index refresh if the tool is unavailable.
- Tool: `test-surface-selection` for coverage implications, or report gaps if the tool is unavailable.
- Update `known-debt.md` if direct access remains temporarily.

## Regression Checks

- Direct UI data access creeping in.
- Stale callers after return shape changes.
- Cache invalidation misses.
- Policy checks moved into arbitrary components.
- Mocks still shaped like old responses.

## Structural Maintenance Clues

- Enter structural maintenance when the accessor boundary, return-shape contract, cache lifecycle, authorization placement, or data-access ownership is being established or changed.

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

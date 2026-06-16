# Mode: API Or Accessor Change

## Orientation Cues

- Query generated indexes through the tools below instead of loading whole generated files.

## Evidence Cues

- Consider Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Consider Tool: `schema-query` for generated schema index slices relevant to the target.
- Consider Tool: `schema-query` for generated data-model index slices relevant to the target.
- Consider Tool: `literal-query` for generated permissions and visibility index slices relevant to the target.
- Consider Skill: `state-impact-scan` for generated state-management index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider Tool: `accessor-query`.
- Consider Tool: `symbol-query` for accessor names and API routes.
- Consider Skill: `consumer-impact-preview` for changed accessor/API shape, behavior, errors, side effects, caching, or compatibility.
- Consider Skill: `test-relation-scan` for changed internal processing behind an accessor/API contract.
- Consider searching direct data access patterns.
- Consider running affected accessor/API tests.

## Implementation Cues

- Preserve a clear data-access layer.
- Prefer the accessor boundary over scattering fetch, query, mutation, or storage logic directly into UI.
- If an accessor changes shape, find all consumers.
- Document caching and invalidation assumptions.
- Keep authorization and visibility checks in the appropriate policy/access layer.
- Return stable domain shapes unless raw storage rows are explicitly intended.

## Cross-Application Impact Cues

- Callers and consumers.
- Return shapes and data model assumptions.
- Cache and invalidation behavior.
- Permission and visibility implications.
- Server/client state ownership.
- Tests, examples, and mocks.

## Documentation Cues

- Consider Tool: `build-accessor-index`, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-symbol-index` if cache or server-state behavior changes, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-literal-index` if access logic changes, or report index refresh may be needed if the tool is unavailable.
- Consider Skill: `test-relation-scan` for coverage implications, or report gaps if the tool is unavailable.
- Consider updating `known-debt.md` if direct access remains temporarily.

## Regression Cues

- Direct UI data access creeping in.
- Stale callers after return shape changes.
- Cache invalidation misses.
- Policy checks moved into arbitrary components.
- Mocks still shaped like old responses.

## Structural Maintenance Clues

- Consider entering structural maintenance when the accessor boundary, return-shape contract, cache lifecycle, authorization placement, or data-access ownership is being established or changed.

## Report Cues

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




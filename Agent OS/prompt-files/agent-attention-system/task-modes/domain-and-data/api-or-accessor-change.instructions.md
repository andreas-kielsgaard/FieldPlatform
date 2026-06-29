# Mode: API Or Accessor Change

## Orientation Cues

- Use source reads, `rg`, human-maintained maps, and standard checks.

## Evidence Cues


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

- Report any temporary direct-access compromise in the final response.

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

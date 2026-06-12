# Generated Index Note: Accessor Map

## Purpose

The accessor map should index data-access boundaries, their return shapes, dependencies, consumers, and caching or invalidation behavior.

Its role in the Agent OS is to help agents avoid bypassing approved access paths and to preview contract impact when accessors or APIs change.

## Expected Contents

- Accessor or API identifier.
- Canonical path.
- Input and return-shape summary.
- Upstream dependencies.
- Downstream consumers.
- Cache, invalidation, authorization, and side-effect notes.
- Stability or deprecation status.

## Maintained Or Accessed By

- `accessor-query`
- `symbol-query`
- `dependency-query`
- `consumer-impact-preview`
- `test-relation-scan`
- `schema-fixture-drift-scan`

## Access Pattern

Agents should not ingest the whole index by default. Task modes and behaviors should request bounded slices through tools for a target accessor, API route, return shape, or consumer surface.

## Implementation Direction

Start with static export/import and term search. Add framework-specific route/API discovery later. Treat dynamic usage as uncertain unless runtime metadata or tests provide evidence.


# Generated Index Note: Routing Map

## Purpose

The routing map should index routes, params, ownership, policy guards, data accessors, shared shells, and route families.

Its role in the Agent OS is to help agents understand navigation impact and avoid route changes that silently bypass access, state, or visibility boundaries.

## Expected Contents

- Route path.
- Params.
- Purpose.
- Owner or feature area.
- Policy guard or visibility rule.
- Main accessors.
- Shared shell/layout.
- Related tests and critical flows.

## Maintained Or Accessed By

- `build-route-index`
- `term-query`
- `consumer-impact-preview`
- `policy-literal-drift-scan`
- `affected-surface-mapping`

## Access Pattern

Agents should query routes by path, slug, owner, or guard. Full route-map ingestion should be reserved for route-family or navigation-wide changes.

## Implementation Direction

Start with framework route discovery. Add policy/accessor/shell detection and route-family grouping as project conventions stabilize.


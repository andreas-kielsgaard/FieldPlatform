# Generated Index Note: Permissions And Visibility Map

## Purpose

The permissions and visibility map should index capabilities, roles or subjects, policy predicates, guarded surfaces, raw literals, and visibility behavior.

Its role in the Agent OS is to keep permission logic centralized and prevent local UI, routes, accessors, fixtures, or tests from inventing divergent policy semantics.

## Expected Contents

- Capability or visibility concept.
- Meaning.
- Related roles, subjects, or policy predicates.
- Canonical policy source.
- Guarded routes, screens, components, or accessors.
- Hidden or disabled behavior.
- Raw-literal warnings and retired literals.

## Maintained Or Accessed By

- `check-permission-literals`
- `find-term`
- `rename-impact`
- `contract-impact`
- `map-routes`
- `accessor-usage`

## Access Pattern

Agents should query by capability, role, predicate, route, component, or accessor. Full ingestion should be avoided unless the task is a broad permission-model review.

## Implementation Direction

Start with literal and predicate discovery. Add guarded route/component/accessor cross-references as policy conventions become explicit.

# Generated Index Note: Data Model Map

## Purpose

The data model map should index entities, relations, invariants, lifecycle states, and open model questions discovered from schema, accessors, domain code, fixtures, and canonical context.

Its role in the Agent OS is to help agents distinguish conceptual model changes from UI-only, schema-only, or accessor-only changes.

## Expected Contents

- Entity names and definitions.
- Key relations and cardinality.
- Lifecycle states and invariants.
- Related schema, accessors, fixtures, tests, and UI concepts.
- Open model questions and uncertainty markers.

## Maintained Or Accessed By

- `find-term`
- `rename-impact`
- `check-schema-drift`
- `contract-impact`
- `validate-fixtures`
- `authority-surface-search`

## Access Pattern

Agents should not ingest the entire data model index by default. They should query by entity, relation, invariant, or changed field, then load only the relevant slice.

## Implementation Direction

Start as a hybrid index: tool-refreshed references plus curated definitions. Keep model meaning human-reviewable until product/domain authority is clearer.

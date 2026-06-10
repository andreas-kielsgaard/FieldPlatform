# Source Maintenance Behavior: Rename Source Concept

## Purpose

Decide and execute the reasoning for renaming a code concept, symbol, type, label family, route, component, service, accessor, file, or domain source element.

This behavior protects against partial renames and accidental semantic changes.

## Activated Lenses

- Naming/Ontology
- Blast Radius
- Boundary
- Lifecycle
- Memory

## Evidence To Consider

- Domain glossary and naming index.
- Existing identifiers, labels, routes, schemas, accessors, fixtures, tests, docs, and maps.
- Whether the rename is pure, semantic, split, merge, alias, or deprecation.
- Public API and boundary implications.
- Tool evidence category: `rename-impact`.
- Tool evidence category: `find-term`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `check-docs`.

## Procedure

1. Use the Naming/Ontology Lens to classify the rename type.
2. Use the Blast-Radius Lens to identify all affected surfaces.
3. Use the Boundary Lens if the name appears in public interfaces, schema, generated artifacts, routes, or tool interfaces.
4. Use the Lifecycle Lens if the old name is deprecated, retained as legacy, or still accepted as an alias.
5. Use the Memory Lens to update canonical terms, aliases, deprecated names, unresolved language, or naming debt.

## Rename Types

- Pure rename: the concept stays the same and only the label changes.
- Semantic rename: the concept's meaning is being clarified or changed.
- Split rename: one old concept becomes multiple named concepts.
- Merge rename: multiple names become one canonical concept.
- Alias rename: old and new names coexist intentionally.
- Deprecation rename: old name remains temporarily but is no longer preferred.

## Stop Or Escalate When

- The rename changes product-authoritative vocabulary.
- The rename crosses public API, schema, route, data, generated, or tool boundaries.
- Existing usages reveal multiple concepts hidden under one name.
- The old name must remain for compatibility but no alias/deprecation path is defined.

## Memory Updates

Update `naming-index.md` and `domain-glossary.md` when canonical names, aliases, deprecated names, unresolved language, or meaning changes are involved.

Update area maps and `decision-log.md` when rename scope affects durable architecture or source ownership.

## Completion Output

```text
Concept:
Rename type:
Old names:
New canonical name:
Aliases retained:
Deprecated names:
Affected surfaces:
Memory updated:
Unresolved language:
```

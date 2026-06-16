# Structural Maintenance Behavior: Rename Maintained Concept

## Purpose

Decide and execute the reasoning for renaming a maintained concept, symbol, type, label family, route, component, service, accessor, file, instruction, map entry, tool contract, or domain Maintained Element.

This behavior protects against partial renames and accidental semantic changes.

## Lens Prompts

- Naming/Ontology: classify the rename as pure, semantic, split, merge, alias, or deprecation before editing names.
- Blast Radius: names can span identifiers, labels, routes, schemas, accessors, fixtures, tests, docs, maps, and public APIs.
- Boundary: public interfaces, schema, generated artifacts, routes, and tool interfaces need explicit compatibility treatment.
- Lifecycle: decide whether old names disappear, remain as aliases, or become deprecated legacy.
- Memory: update canonical terms, aliases, deprecated names, unresolved language, and naming debt when future agents need the distinction.

## Procedure

1. State the concept and rename type.
2. Identify old names, new names, aliases, deprecated names, and affected surfaces.
3. Check public API, schema, generated, route, data, tool, and documentation boundaries.
4. Decide whether to rename, retain aliases, deprecate, split, merge, or defer.
5. Add secondary naming alignment, semantic centralization, or lifecycle behavior when the rename reveals one.

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
- The old name needs to remain for compatibility but no alias/deprecation path is defined.

## Memory Updates

Update `domain-glossary.md` when canonical names, aliases, deprecated names, unresolved language, or meaning changes are involved. Refresh `term-index` and use `rename-impact-preview` when rename evidence should become queryable.

Update area maps and the deferred logging strategy when rename scope affects durable architecture or maintained ownership.

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

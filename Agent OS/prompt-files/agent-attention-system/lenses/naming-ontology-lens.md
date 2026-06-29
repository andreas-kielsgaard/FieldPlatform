# Naming/Ontology Lens

## Purpose

Treat vocabulary as architecture by distinguishing labels, aliases, internal concepts, canonical terms, and unresolved language.

## Activates When

- A task introduces, changes, removes, splits, merges, or reuses a term.
- A name affects Maintained Elements, routes, schemas, types, accessors, fixtures, tests, permissions, or UI copy.
- A term appears similar to an existing concept.
- UI language may be more provisional than internal architecture.

## Core Distinction

A name is not a label. It is a claim about the model.

## Questions

- Is this a new concept, alias, refinement, split, merge, or UI-copy change?
- Does this term already exist under another name?
- Is the term canonical, provisional, deprecated, context-specific, or unresolved?
- Should UI language diverge from internal architecture?
- Does the name create a search, reuse, or ownership problem?

## Evidence To Consider

- Domain glossary.
- Source-owned naming surfaces.
- Existing symbols, routes, schemas, accessors, fixtures, tests, and UI labels.
- Rename-impact output.
- Current product or design language where relevant.

## Decision Outputs

- Use existing canonical term.
- Add alias.
- Introduce provisional term.
- Introduce canonical term.
- Rename concept.
- Split concept.
- Merge concepts.
- Leave unresolved language entry.

## Stop Or Escalate When

- A new durable term overlaps with an existing canonical term.
- A rename may affect public interfaces, schema, fixtures, tests, or docs.
- UI language is being accidentally promoted into internal architecture.
- Existing vocabulary cannot express the distinction without ambiguity.

## Cheap Pass

The change is local UI copy that does not introduce source identifiers, data concepts, route names, permissions, fixtures, tests, or durable terminology.

## Memory Implication

Update memory when a term becomes canonical, provisional by decision, deprecated, aliased, split, merged, or intentionally unresolved.

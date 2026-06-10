# Source Maintenance Behavior: Name New Source Element

## Purpose

Choose a name for a new durable source element that reflects ownership, responsibility, scope, abstraction level, and domain meaning.

This behavior protects against vocabulary drift and names that imply the wrong owner or boundary.

## Activated Lenses

- Naming/Ontology
- Ownership
- Boundary
- Lifecycle
- Memory

## Evidence To Consider

- Domain glossary and naming index.
- Existing symbols, route names, components, accessors, schema names, fixtures, and tests.
- Existing naming conventions in the target area.
- Owner and lifecycle classification.
- Tool evidence category: `find-term`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `find-similar-pattern`.

## Procedure

1. Use the Ownership Lens to identify what the source element owns.
2. Use the Naming/Ontology Lens to decide whether the name should be domain-bearing, technical, provisional, canonical, contextual, or local.
3. Use the Boundary Lens to ensure the name does not imply knowledge from the wrong layer.
4. Use the Lifecycle Lens to decide whether the name is stable, provisional, or local.
5. Use the Memory Lens only if the name becomes durable, shared, canonical, or intentionally provisional.

## Prefer Names That

- Name the responsibility rather than the implementation accident.
- Match existing vocabulary in the owning area.
- Avoid implying broader scope than the element owns.
- Preserve meaningful domain distinctions.
- Make future placement and reuse decisions easier.

## Avoid Names That

- Collapse different concepts under one generic term.
- Encode temporary implementation details as durable language.
- Borrow names from unrelated areas because they are familiar.
- Suggest a public contract when the element is private.
- Introduce a new synonym for an existing canonical concept without recording it.

## Stop Or Escalate When

- Product-authoritative language is being established.
- Existing adjacent names conflict and require broader alignment.
- Naming would decide ownership or boundary without enough evidence.
- The new name would become part of a public API, route, schema, generated artifact, or tool interface.

## Memory Updates

Update `naming-index.md` or `domain-glossary.md` when the name is canonical, shared, provisional, deprecated, or intentionally unresolved.

Update area maps when the name defines a durable source element or owner.

## Completion Output

```text
Source element:
Chosen name:
Naming type: local/technical/domain/provisional/canonical
Existing related names:
Reason:
Memory updated:
Unresolved language:
```

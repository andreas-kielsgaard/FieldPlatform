# Source Maintenance Behavior: Name New Source Element

## Purpose

Choose a name for a new durable source element that reflects ownership, responsibility, scope, abstraction level, and domain meaning.

This behavior protects against vocabulary drift and names that imply the wrong owner or boundary.

## Lens Prompts

- Naming/Ontology: choose names that reflect meaning, not temporary implementation accidents.
- Ownership: name the responsibility the source element owns, and avoid implying broader scope than it has.
- Boundary: avoid names that imply knowledge from another layer or a public contract that does not exist.
- Lifecycle: decide whether the name is local, technical, domain-bearing, provisional, canonical, or stable.
- Memory: record names only when they become shared, canonical, provisional, deprecated, or intentionally unresolved.

## Procedure

1. State the source element and its owned responsibility.
2. Compare candidate names with nearby naming conventions and known domain language.
3. Check whether the name implies wrong ownership, boundary, lifecycle, or abstraction level.
4. Choose the narrowest meaningful name.
5. Add secondary alignment or rename behavior when adjacent names conflict.

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

# Source Maintenance Behavior: Centralize Duplicated Semantics

## Purpose

Decide whether multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, or interpretation and should therefore be centralized.

This behavior protects semantic coherence even when code shape differs.

## Activated Lenses

- Duplication
- Naming/Ontology
- Ownership
- Data/State/Effect
- Boundary
- Memory

## Evidence To Consider

- Domain glossary and naming index.
- Existing labels, statuses, roles, policies, calculations, transformations, accessors, fixtures, routes, and tests.
- Whether implementations would need to change together.
- Whether semantics are durable or provisional.
- Tool evidence category: `find-term`.
- Tool evidence category: `find-similar-pattern`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `rename-impact`.

## Procedure

1. Use the Duplication Lens to distinguish duplicated semantics from similar shape.
2. Use the Naming/Ontology Lens to identify the canonical concept, alias, or unresolved language.
3. Use the Ownership Lens to find the rightful semantic owner.
4. Use the Data/State/Effect Lens if the semantics affect data shape, derivation, policy, calculation, state, caching, or side effects.
5. Use the Boundary Lens if the semantic owner must be consumed across layers.
6. Use the Memory Lens if the centralized semantics become canonical or intentionally provisional.

## Centralize When

- Multiple implementations express the same durable rule or meaning.
- Changing one should require changing the others.
- Centralization prevents naming, policy, calculation, or data drift.
- A clear semantic owner can be named.
- Consumers can depend on the owner through an appropriate interface.

## Avoid Centralization When

- Similarity is only visual or structural.
- Meanings are still genuinely different.
- Language is exploratory and should remain provisional.
- Centralization would produce a vague generic concept.
- The shared owner would mix unrelated responsibilities.

## Stop Or Escalate When

- Centralization affects schema, accessors, permissions, fixtures, routes, tests, or public interfaces.
- Old and new terms would coexist without alias/deprecation recording.
- The semantic owner crosses layer boundaries and needs an interface.
- Product-authoritative vocabulary is being decided without explicit direction.

## Memory Updates

Update `domain-glossary.md` and `naming-index.md` when terms or semantics become canonical, provisional, deprecated, or intentionally unresolved.

Update area maps when semantic ownership affects components, accessors, policies, fixtures, schema, or state.

Update `decision-log.md` for durable semantic centralization.

## Completion Output

```text
Semantic duplication:
Canonical owner:
Terms/aliases affected:
Centralization decision:
Affected surfaces:
Memory updated:
Unresolved language:
```

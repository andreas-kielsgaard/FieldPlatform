# Structural Maintenance Behavior: Centralize Duplicated Semantics

## Purpose

Decide whether multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, or interpretation and should therefore be centralized.

This behavior protects semantic coherence even when artifact shape differs.

## Lens Prompts

- Duplication: centralize duplicated meaning, rule, policy, calculation, or transformation, not merely similar shape.
- Naming/Ontology: identify canonical terms, aliases, provisional language, or unresolved vocabulary before freezing semantics.
- Ownership: find the rightful semantic owner that can change with the rule.
- Data/State/Effect: treat schema, derivation, policy, state, caching, side effects, and fixtures as semantic surfaces when they must change together.
- Boundary: expose centralized semantics through the appropriate interface when consumed across layers.
- Memory: record canonical, provisional, deprecated, or intentionally unresolved semantics.

## Procedure

1. State the duplicated semantic rule or meaning.
2. Distinguish semantic duplication from visual or structural similarity.
3. Identify canonical language, aliases, and unresolved terms.
4. Identify the semantic owner and boundary for consumption.
5. Decide centralize, keep local, defer, or route to extraction/demotion.
6. Add secondary naming, boundary, or data/state behavior when centralization affects those surfaces.

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

Update `domain-glossary.md` when terms or semantics become canonical, provisional, deprecated, or intentionally unresolved. Refresh `term-index` when durable semantic evidence should become queryable.

Update area maps when semantic ownership affects components, accessors, policies, fixtures, schema, or state.

Update the deferred logging strategy for durable semantic centralization.

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

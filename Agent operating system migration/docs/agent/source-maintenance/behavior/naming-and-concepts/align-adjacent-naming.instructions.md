# Source Maintenance Behavior: Align Adjacent Naming

## Purpose

Decide whether similar or related source elements should have more consistent naming without triggering a full rename migration.

This behavior protects against naming drift and premature canonicalization.

## Activated Lenses

- Naming/Ontology
- Near-Match
- Duplication
- Memory

## Evidence To Consider

- Domain glossary and naming index.
- Nearby identifiers, filenames, components, accessors, routes, schema names, fixtures, and tests.
- Whether names are aliases, separate concepts, contextual variants, or drift.
- Tool evidence category: `find-term`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `find-similar-pattern`.

## Procedure

1. Use the Naming/Ontology Lens to classify each name as canonical, alias, provisional, contextual, deprecated, or unresolved.
2. Use the Near-Match Lens to decide whether the names refer to the same concept or adjacent concepts.
3. Use the Duplication Lens to identify whether naming drift reflects duplicated semantics.
4. Use the Memory Lens if canonical names, aliases, unresolved language, or intentional divergence should be recorded.

## Align Locally When

- Names refer to the same concept in the same boundary.
- Drift makes local code harder to scan.
- Alignment can be made without establishing a broad canonical term.
- Nearby conventions clearly point to one preferred form.

## Keep Distinct When

- Similar names represent different domain concepts.
- Names are contextual and meaningful in their own boundaries.
- Alignment would hide a real distinction.
- A broader product or domain naming decision is needed first.

## Record Unresolved Language When

- Multiple terms are in active use and no canonical choice is clear.
- The current task should not decide product-authoritative language.
- A temporary local name is chosen with known uncertainty.

## Stop Or Escalate When

- Adjacent names imply a larger semantic centralization decision.
- A rename would affect public APIs, routes, schema, generated artifacts, or tool interfaces.
- A product-authoritative term needs human confirmation.

## Memory Updates

Update `naming-index.md` when aliases, preferred forms, unresolved language, or naming families become durable.

Update `domain-glossary.md` when domain meaning is clarified.

Update `known-debt.md` when naming drift remains intentionally unresolved.

## Completion Output

```text
Names considered:
Relationship: same/adjacent/alias/contextual/unresolved
Alignment decision:
Canonical or preferred form:
Aliases retained:
Memory updated:
Remaining naming debt:
```

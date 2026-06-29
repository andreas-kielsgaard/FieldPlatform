# Structural Maintenance Behavior: Align Adjacent Naming

## Purpose

Decide whether similar or related Maintained Elements should have more consistent naming without triggering a full rename migration.

This behavior protects against naming drift and premature canonicalization.

## Lens Prompts

- Naming/Ontology: classify nearby names as canonical, alias, provisional, contextual, deprecated, unresolved, or intentionally distinct.
- Near-Match: adjacent names may be related without naming the same concept.
- Duplication: naming drift can reveal duplicated semantics, but similar names are not proof of shared meaning.
- Memory: record aliases, preferred forms, unresolved language, and intentional divergence only when durable.

## Procedure

1. State the adjacent names and where they appear.
2. Decide whether they represent the same concept, adjacent concepts, aliases, contextual variants, or unresolved language.
3. Align locally, keep distinct, record unresolved language, or escalate to rename/centralization.
4. Avoid turning local consistency work into product-authoritative vocabulary unless directed.
5. Add secondary rename or semantic centralization behavior when alignment becomes broader than local naming.

## Align Locally When

- Names refer to the same concept in the same boundary.
- Drift makes local maintained elements harder to scan.
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


Update source-owned naming surfaces or a relevant mature project decision when domain meaning is clarified.

Report intentionally unresolved naming drift in the final response.

## Completion Output

```text
Names considered:
Relationship: same/adjacent/alias/contextual/unresolved
Alignment decision:
Canonical or preferred form:
Aliases retained:
Memory updated:
Remaining naming compromise:
```

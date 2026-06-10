# Duplication Lens

## Purpose

Decide whether repetition is useful local duplication, harmful semantic drift, or evidence for extraction or centralization.

## Activates When

- Similar code, UI, names, data transformations, policies, calculations, or flows appear in multiple places.
- A refactor or extraction is being considered.
- Tool output indicates repeated patterns.
- A shared abstraction may be premature or false.

## Core Distinction

Duplicate shape is not the same as duplicated semantics.

## Questions

- Are these copies changing for the same reason?
- Do they represent the same rule, transformation, status, policy, calculation, or concept?
- Would changing one require changing the other?
- Is duplication protecting local experimentation?
- Is a current shared abstraction actually false or too broad?

## Evidence To Consider

- Similar pattern or duplication output.
- Change history or likely reasons to change.
- Domain glossary and naming index.
- Consumers and dependency direction.
- Ownership and lifecycle classification.

## Decision Outputs

- Tolerate local duplication.
- Mark candidate pattern.
- Extract shared responsibility.
- Centralize duplicated semantics.
- Demote false abstraction.

## Stop Or Escalate When

- Repeated code has similar shape but different reasons to change.
- Different-looking code expresses the same durable rule.
- Centralization would freeze exploratory vocabulary too early.
- Duplication crosses policies, schema, accessors, or calculations.

## Cheap Pass

Duplication can remain local when it appears once or twice in unstable exploratory work, has different meanings, and does not encode shared policy, schema, naming, or calculation semantics.

## Memory Implication

Update memory when duplication is accepted as debt, marked as a candidate pattern, centralized as canonical semantics, or demoted from a false shared abstraction.

# Lifecycle Lens

## Purpose

Prevent prototypes, local helpers, candidate patterns, debt, and deprecated maintained elements from becoming architecture accidentally.

## Activates When

- A task creates, reuses, promotes, demotes, deprecates, trims, or retires a Maintained Element.
- Existing artifacts or implementation details are being treated as precedent.
- Exploratory or provisional work may become durable.
- A shared element may no longer deserve shared status.

## Core Distinction

Existing in the repository is not the same as approved architecture.

## Questions

- Is this local, candidate, shared, provisional, stable, deprecated, or retired?
- What would promote it?
- What would retire it?
- What should future agents assume about it?
- Is this element evidence, experiment, debt, or architecture?

## Evidence To Consider

- Experiments ledger.
- Known debt ledger.
- Component registry, accessor map, technology architecture map, and area-specific maps.
- Consumer and dependency evidence.
- Tool evidence from `artifact-query` when generated, indexed, or tool-maintained status affects lifecycle decisions.
- User or maintainer signals about maturity.

## Decision Outputs

- Local one-off.
- Candidate pattern.
- Shared primitive.
- Domain component.
- Provisional experiment.
- Stable architecture.
- Deprecated.
- Retired.

## Stop Or Escalate When

- A provisional element is about to be used as precedent.
- A shared abstraction is being changed for one local use.
- A stable element is being demoted, deprecated, or retired.
- The promotion or retirement criteria are not clear.

## Cheap Pass

The change remains inside a local one-off or already-classified provisional element and does not create new consumers, conventions, or durable names.

## Memory Implication

Update memory when lifecycle classification changes, promotion or retirement criteria are defined, debt is accepted or removed, or future agents need to know whether a maintained element is precedent.


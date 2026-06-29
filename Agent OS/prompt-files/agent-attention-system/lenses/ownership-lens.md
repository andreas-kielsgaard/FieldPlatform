# Ownership Lens

## Purpose

Find the narrowest rightful owner of source behavior.

## Activates When

- A task adds, moves, extends, extracts, centralizes, promotes, or demotes behavior.
- Existing elements share a topic with the new behavior.
- A new Maintained Element may be needed.
- A current owner may become broader after the change.

## Core Distinction

Same topic is not the same as same responsibility.

## Questions

- What thing has the same reason to change as the new behavior?
- Does an existing owner already own this responsibility?
- Would the owner's name remain precise after the change?
- Does the new behavior share lifecycle, dependencies, consumers, and abstraction level with the owner?
- Would existing consumers inherit irrelevant assumptions?

## Evidence To Consider

- Existing owner names and purposes.
- Current consumers.
- Required dependencies for the new behavior.
- Lifecycle of the new behavior.
- Nearby possible owners.
- Tests or examples that reveal why an owner changes.

## Decision Outputs

- Extend existing owner.
- Create new local owner.
- Create new shared owner.
- Move to a different boundary.
- Keep provisional.
- Defer and record ownership uncertainty.

## Stop Or Escalate When

- Adding behavior would make the owner name vaguer.
- The change adds a second reason to change.
- The new behavior imports from a different layer or abstraction level.
- Unrelated tests or consumers would need to change together.
- One file begins mixing presentation, policy, data, and transformation.

## Cheap Pass

The change stays inside one local owner, does not alter exported behavior, does not broaden the owner name, and does not add new dependencies or consumers.

## Memory Implication

Update memory when ownership becomes durable, changes a boundary, establishes a convention, or records an exception. Report intentional ownership compromises in the final response.

# Reuse Lens

## Purpose

Decide whether existing functionality should be reused, composed, extended, extracted, or avoided.

## Activates When

- Existing behavior appears to cover part or all of the needed capability.
- A task may duplicate behavior that already exists.
- An existing element almost fits but might be overloaded by reuse.
- The agent is choosing between creating and reusing.

## Core Distinction

Reuse should preserve meaning, not merely save effort.

## Questions

- Does the existing thing fully or partially serve the need?
- Would using it preserve its current meaning?
- Would modifying it overload its scope?
- Would wrapping or composing be better than changing it?
- Is creating a local one-off more honest than pretending a shared abstraction exists?

## Evidence To Consider

- Existing symbols, components, accessors, services, utilities, or examples.
- Current consumers and variants.
- Similar pattern search.
- Ownership evidence.
- Lifecycle and stability of the existing element.

## Decision Outputs

- Reuse unchanged.
- Reuse by composition.
- Extend existing owner.
- Branch from near match.
- Create local one-off.
- Extract shared pattern.

## Stop Or Escalate When

- Reuse would require unrelated options or flags.
- Existing consumers would not share the new assumptions.
- Reuse would make the existing name less precise.
- The existing element is provisional, deprecated, or not approved as precedent.

## Cheap Pass

Reuse is safe when the existing element already owns the behavior, the new use matches its public purpose, and no API, dependency, lifecycle, or naming drift is introduced.

## Memory Implication

Update memory only when reuse establishes a durable convention, promotes a candidate pattern, changes ownership expectations, or records intentional divergence from a near match.

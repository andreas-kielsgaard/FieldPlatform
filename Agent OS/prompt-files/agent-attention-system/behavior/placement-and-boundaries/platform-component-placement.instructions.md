# Structural Maintenance Behavior: Platform Component Placement

## Purpose

Decide whether a new technology area, tool, app surface, service boundary, package, or platform component deserves its own durable ownership boundary.

This behavior protects against treating major architectural areas as ordinary folders.

## Lens Prompts

- Intent: define the platform capability, technology area, tool area, or ownership boundary being proposed.
- Ownership: create a component only when no existing platform component owns the responsibility cleanly.
- Boundary: state allowed and disallowed coupling before treating a folder as a component.
- Blast Radius: identify producers, consumers, build/test/runtime impact, and future navigation cost.
- Lifecycle: classify the component as provisional, candidate, or stable architecture.
- Memory: update architecture memory only when the component becomes durable or a rejected boundary should be remembered.

## Procedure

1. State the proposed platform component and what it would own.
2. Compare it with existing platform components and technology areas.
3. Define consumers, interfaces, source/generated expectations, and runtime/tooling boundaries.
4. Classify lifecycle and blast radius.
5. Decide create, reuse existing owner, defer, or record a temporary boundary.
6. Add secondary technology-standard or interface-boundary behavior when needed.

## Create A Platform Component When

- It owns a stable responsibility with independent evolution.
- It has clear consumers and interfaces.
- It prevents repeated boundary ambiguity.
- It deserves a canonical directory.
- Its source/generated or runtime/tooling boundary matters.

## Avoid New Platform Component When

- The proposed component is only a temporary grouping.
- The name is vague or only reflects file count.
- The responsibility is still exploratory.
- The existing architecture already has a rightful owner.

## Stop Or Escalate When

- A new component implies technology standard decisions.
- A new component changes interface expectations between major areas.
- The platform boundary is product-authoritative or requires human confirmation.
- Multiple components would need to move.

## Memory Updates

Update `project-control-files/technology-architecture-map.md` for canonical directory, ownership, source/generated boundaries, and interface expectations.

Update relevant durable memory for accepted or rejected platform boundaries.

Update `known-debt.md` if a provisional boundary is accepted temporarily.

## Completion Output

```text
Platform component:
Canonical directory:
Owns:
Must not own:
Allowed consumers/interfaces:
Lifecycle classification:
Memory updated:
Open questions:
```

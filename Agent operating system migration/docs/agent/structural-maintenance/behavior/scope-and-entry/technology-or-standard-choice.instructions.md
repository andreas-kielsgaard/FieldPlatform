# Structural Maintenance Behavior: Technology Or Standard Choice

## Purpose

Decide whether a new technology, library, runtime, convention, or project standard should be introduced, reused, deferred, or rejected.

This behavior protects against accidental stack drift and one-off dependencies becoming project standards.

## Lens Prompts

- Intent: name the capability the technology, library, runtime, convention, or standard is meant to provide.
- Reuse: prefer an existing project standard when it satisfies the need without fragmenting patterns.
- Boundary: identify which layers, runtime areas, generated artifacts, tools, CI paths, or platform components would depend on the choice.
- Lifecycle: classify the choice as local experiment, candidate standard, stable architecture, or rejected alternative.
- Memory: record choices only when they affect future agent or developer decisions.

## Procedure

1. State the capability gap or standardization question.
2. Compare the need with existing technologies, conventions, and project standards.
3. Identify affected boundaries, runtimes, generated surfaces, build/test systems, or agent operations.
4. Classify the choice lifecycle.
5. Decide reuse, defer, new, or reject.
6. Record durable architecture or debt only when the choice becomes future-relevant.

## Prefer Existing Standards When

- The existing standard satisfies the need with acceptable tradeoffs.
- Introducing a new option would fragment patterns.
- The new choice mainly saves local effort but adds global cognitive load.

## Prefer New Technology Or Standard When

- It solves a recurring need not covered by existing standards.
- It creates a clearer control surface.
- It reduces future entropy more than it increases stack complexity.
- It fits the intended architecture and boundary direction.

## Defer When

- The product need is still provisional.
- The standard would freeze an unstable pattern.
- The same result can be achieved locally without becoming precedent.

## Stop Or Escalate When

- A dependency would cross runtime/tooling/product boundaries.
- A library choice implies architecture, schema, routing, state, or build-system changes.
- The decision needs human/product authority.
- The choice would become a project-wide convention.

## Memory Updates

Update `project-setup/technology-architecture-map.md` when a technology area, runtime, toolchain, or source/generated boundary becomes durable.

Update the deferred logging strategy when a choice affects future work or rejects a plausible alternative.

Update `known-debt.md` when accepting a temporary dependency or standard gap.

## Completion Output

```text
Capability needed:
Existing standard considered:
Decision: reuse/defer/new/reject
Lifecycle classification:
Affected boundaries:
Memory updated:
Remaining uncertainty:
```

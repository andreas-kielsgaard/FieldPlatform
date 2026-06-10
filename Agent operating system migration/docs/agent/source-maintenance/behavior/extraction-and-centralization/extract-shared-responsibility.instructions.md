# Source Maintenance Behavior: Extract Shared Responsibility

## Purpose

Decide whether repeated or mixed source behavior should be extracted into a narrower, named owner.

This behavior protects against both premature abstraction and leaving stable responsibilities scattered.

## Activated Lenses

- Duplication
- Ownership
- Boundary
- Lifecycle
- Blast Radius
- Memory

## Evidence To Consider

- Repeated local patterns.
- Existing owners and possible extraction targets.
- Whether copies change for the same reason.
- Consumers that would use the extracted owner.
- Dependency direction and public API implications.
- Tool evidence category: `find-similar-pattern`.
- Tool evidence category: `component-usage`.
- Tool evidence category: `map-deps`.
- Tool evidence category: `check-boundaries`.

## Procedure

1. Use the Duplication Lens to decide whether repetition is harmful duplication, useful local duplication, or evidence of shared responsibility.
2. Use the Ownership Lens to name the narrowest rightful owner.
3. Use the Boundary Lens to ensure extraction does not invert dependencies or leak implementation details.
4. Use the Lifecycle Lens to classify the extraction as candidate, provisional, shared, or stable.
5. Use the Blast-Radius Lens if migrating existing consumers.
6. Use the Memory Lens if the extracted responsibility becomes durable.

## Extract When

- Repeated code has the same reason to change.
- A clear narrow owner can be named.
- Extraction reduces future update risk.
- Consumers benefit without inheriting unrelated assumptions.
- Boundary direction remains clean.

## Keep Local When

- Reuse is speculative.
- The concept is unstable.
- Similarity is presentational but not semantic.
- Extraction would require a vague generic name.
- Local duplication is protecting exploration.

## Extract Lower-Level Primitive When

- High-level concepts differ.
- A lower-level stable mechanism is shared.
- Sharing the full abstraction would hide important domain differences.

## Stop Or Escalate When

- Extraction creates new public API or cross-layer dependency.
- The abstraction immediately needs unrelated options.
- Existing consumers must migrate broadly.
- The extraction reveals duplicated semantics that should be centralized instead.

## Memory Updates

Update component/accessor/tool/area maps when the extracted owner becomes shared.

Update `known-debt.md` if extraction is partial.

Update `decision-log.md` when extraction establishes a new convention.

## Completion Output

```text
Responsibility extracted:
Sources considered:
Reason to extract:
New owner:
Consumers migrated:
Lifecycle classification:
Memory updated:
Remaining debt:
```

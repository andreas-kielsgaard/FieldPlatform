# Structural Maintenance Behavior: Branch From Near Match

## Purpose

Decide whether a similar existing Maintained Element should be reused, extended, wrapped, extracted beneath, or branched away from.

This behavior protects almost-right abstractions from becoming overloaded.

## Lens Prompts

- Near-Match: separate what matches from what does not; almost-right is not automatically reusable.
- Ownership: reuse or extend only if the existing element is the rightful owner for the new responsibility.
- Reuse: choose reuse, composition, extension, extraction, branch, or local one-off based on meaning and future change pressure.
- Duplication: similar shape is not shared semantics; extract only what truly changes together.
- Lifecycle: classify a branch as local one-off, candidate pattern, provisional work, or durable owner.
- Memory: record durable divergence, non-goals for reuse, shared primitives, or future-relevant near matches.

## Procedure

1. State the near match and the new need.
2. List the meaningful matches and mismatches.
3. Identify whether mismatch is semantic, presentational, data-related, lifecycle-related, or boundary-related.
4. Decide reuse, parameterize, extract beneath both, branch, or keep local.
5. Add secondary extraction, centralization, extension, or demotion behavior when the near match reveals a broader structural decision.

## Reuse Or Parameterize When

- Differences are superficial and belong within the existing element's purpose.
- Parameterization does not introduce unrelated options.
- Existing consumers share the assumptions.

## Extract Beneath Both When

- Both elements share a lower-level primitive.
- The shared part has stable semantics.
- Extraction reduces duplication without forcing one concept into another.

## Branch When

- The existing element almost fits but would need unrelated options.
- Similarity is presentational but not semantic.
- The elements have different permissions, data shapes, lifecycles, or dependency directions.
- A generic name would hide important domain distinctions.

## Keep Local When

- The need appears once.
- The concept is unstable.
- Future reuse is speculative.
- Local implementation remains easy to delete.

## Stop Or Escalate When

- Reuse would contaminate existing consumers.
- A shared abstraction would freeze exploratory vocabulary too early.
- The near match reveals a missing lower-level primitive.
- Divergence should be remembered for future agents.

## Memory Updates

Update memory when a near match becomes a candidate pattern, intentional divergence, shared primitive, durable branch, or recorded non-goal for reuse.

## Completion Output

```text
Near match considered:
Matches:
Mismatches:
Decision: reuse/parameterize/extract/branch/local
Lifecycle classification:
Memory updated:
Remaining uncertainty:
```

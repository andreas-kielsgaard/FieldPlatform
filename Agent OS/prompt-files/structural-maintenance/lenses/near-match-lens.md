# Near-Match Lens

## Purpose

Handle almost-right similarities without corrupting ownership, naming, or abstraction scope.

## Activates When

- A similar existing element appears close to the new need.
- Reuse, extension, branching, or extraction are all plausible.
- Visual, structural, behavioral, semantic, lifecycle, or boundary similarity needs to be separated.

## Core Distinction

Almost the same is the highest-risk similarity.

## Questions

- What exactly matches?
- What exactly does not match?
- Is the mismatch superficial, behavioral, semantic, lifecycle-related, data-related, or boundary-related?
- Would changing the existing thing help both uses or contaminate one?
- Is there a lower-level primitive beneath both elements?

## Evidence To Consider

- Similar pattern search.
- Side-by-side names, responsibilities, dependencies, and consumers.
- UI shape versus domain meaning.
- Variants, props, options, or parameters that would be needed to share one owner.
- Lifecycle and stability of both elements.

## Decision Outputs

- Reuse as-is.
- Parameterize carefully.
- Extract common lower-level primitive.
- Branch into separate owner.
- Keep local and record candidate pattern.

## Stop Or Escalate When

- The similar element would need unrelated options to support the new use.
- The similarity is presentational but not semantic.
- The two elements have different permissions, data shapes, lifecycle, or dependency direction.
- A generic name would hide important domain distinctions.

## Cheap Pass

The near match can be ignored when the task is local, the similar element is clearly a different responsibility, and no shared owner or naming convention is being introduced.

## Memory Implication

Update memory when a near match becomes a candidate pattern, intentional divergence, shared primitive, durable branch, or recorded non-goal for reuse.

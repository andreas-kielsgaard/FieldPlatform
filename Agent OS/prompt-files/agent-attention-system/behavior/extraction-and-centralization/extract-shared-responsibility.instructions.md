# Structural Maintenance Behavior: Extract Shared Responsibility

## Purpose

Decide whether repeated or mixed maintained behavior should be extracted into a narrower, named owner.

This behavior protects against both premature abstraction and leaving stable responsibilities scattered.

## Lens Prompts

- Duplication: extract only when repeated behavior has the same reason to change; local duplication can be useful during exploration.
- Ownership: name the narrowest owner that actually owns the extracted responsibility.
- Boundary: avoid extracting in a way that inverts dependencies or leaks implementation details.
- Lifecycle: classify the extraction as candidate, provisional, shared, or stable.
- Blast Radius: identify current consumers before migrating them to the extracted owner.
- Memory: update durable guidance for extraction or new conventions only when future agents need the precedent.

## Procedure

1. State the repeated or mixed responsibility.
2. Decide whether the repetition is harmful duplication, useful local duplication, or evidence of a shared responsibility.
3. Identify the narrowest rightful owner and candidate extraction target.
4. Check boundary direction, public API implications, and consumer impact.
5. Decide extract, keep local, extract lower-level primitive, or defer.
6. Add secondary centralization, splitting, or boundary behavior when the extraction reveals another structural decision.

## Extract When

- Repeated behavior has the same reason to change.
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
- Existing consumers may need broad migration.
- The extraction reveals duplicated semantics that should be centralized instead.

## Memory Updates

Update component/accessor/tool/area maps when the extracted owner becomes shared.

Report partial extraction or remaining compromise in the final response.

Update relevant durable memory when extraction establishes a new convention.

## Completion Output

```text
Responsibility extracted:
Sources considered:
Reason to extract:
New owner:
Consumers migrated:
Lifecycle classification:
Memory updated:
Remaining compromise:
```

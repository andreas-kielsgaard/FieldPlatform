# Structural Maintenance Behavior: Split Overloaded Maintained Element

## Purpose

Decide whether a file, module, object, component, service, accessor, utility, or tool has multiple independent responsibilities and should be split.

This behavior protects against monolith growth by splitting on divergent reasons to change, not arbitrary size.

## Lens Prompts

- Ownership: split on different reasons to change, not arbitrary file size.
- Boundary: mixed layers, dependency directions, or source/generated responsibilities are split signals.
- Data/State/Effect: separate state, side effects, accessors, calculations, persistence, policy, and presentation when they have different owners.
- Blast Radius: preview exports, consumers, and tests before changing public shape.
- Lifecycle: classify split outputs as local, shared, provisional, or stable.
- Memory: update durable ownership or boundary guidance; report partial splits as scoped compromises.

## Procedure

1. State the overloaded element and its current public purpose.
2. List the independent responsibilities and reasons to change.
3. Check boundary direction, data/state/effect mixing, consumers, and tests.
4. Choose a split output or keep intact.
5. Decide whether the split is local, shared, provisional, or stable.
6. Add secondary extraction, movement, boundary, or naming behavior when split outputs require it.

## Split When

- Responsibilities have different reasons to change.
- The current name would become vague to stay accurate.
- Consumers use unrelated subsets.
- Tests or dependencies reveal independent concerns.
- Splitting clarifies boundary direction.

## Keep Intact When

- The element has one clear reason to change.
- Internal sections are cohesive.
- Splitting would create premature abstraction.
- The overload is temporary and contained.

## Split Outputs

Choose one:

- Extract local helper.
- Split private implementation from public API.
- Split by responsibility.
- Split by layer.
- Split shared owner from local one-off.
- Report pending split compromise.

## Stop Or Escalate When

- Public API migration appears likely.
- Split crosses platform boundaries.
- Behavior changes are being mixed into the split.
- The split reveals duplicated semantics or a missing interface boundary.

## Memory Updates

Update area maps when ownership changes.

Report partial splits or remaining compromise in the final response.

Update relevant durable memory when a structural split establishes a convention.

## Completion Output

```text
Overloaded element:
Responsibilities identified:
Split decision:
New owners:
Public API impact:
Boundary impact:
Memory updated:
Remaining compromise:
```

# Structural Maintenance Behavior: Extend Existing Owner

## Purpose

Decide whether an existing owner should receive added behavior.

This behavior protects against expanding a module, component, service, accessor, utility, or tool merely because it is nearby or topically related.

## Lens Prompts

- Ownership: same topic is not same responsibility; extend only when the new behavior has the same reason to change.
- Reuse: extension should preserve meaning, not only reduce local effort.
- Contract: preserve the owner's promised behavior, inputs, outputs, side effects, compatibility, and tests, or handle consumers affected by the contract change.
- Boundary: reject extension that makes the owner import from a layer or abstraction level it should not know.
- Blast Radius: if the owner is exported, shared, stable, or consumed across routes/layers, identify likely consumers first.
- Memory: record only durable scope changes, conventions, or accepted scope debt.

## Procedure

1. State the behavior being added.
2. State the current owner's responsibility and public purpose.
3. Check reason to change, lifecycle, dependencies, abstraction level, contract expectations, tests, and consumers.
4. Use `consumer-impact-preview` and `test-relation-scan` when extension may alter promised behavior for existing consumers.
5. Check whether the owner's name remains precise.
6. Decide extend, branch, split, move, or defer.
7. Add secondary behavior when extension reveals near-match, overload, movement, or interface decisions.

## Extend When

- The new behavior shares the same reason to change.
- The lifecycle, dependencies, consumers, and abstraction level match.
- The owner name remains precise.
- Existing consumers would inherit irrelevant assumptions.
- No boundary leak is introduced.

## Branch Instead When

- The behavior has a different lifecycle.
- The new behavior requires dependencies the owner should not know about.
- Extension would require unrelated options, flags, or branching logic.
- The existing owner would need a vaguer name after extension.

## Split Instead When

- The owner already has multiple independent responsibilities.
- Extension would add another axis of change.
- Tests or consumers are already unrelated.

## Stop Or Escalate When

- Adding behavior makes the owner name vaguer.
- The change adds a second reason to change.
- The owner starts mixing presentation, policy, data, and transformation.
- Blast radius is uncertain and the owner is shared/stable.

## Memory Updates

Update area-specific maps when the owner's durable scope changes.

Update relevant durable memory when extension establishes a convention.

Update `known-debt.md` if extension is accepted despite scope tension.

## Completion Output

```text
Owner considered:
Extension decision:
Same reason to change? yes/no/uncertain
Boundary impact:
Consumers affected:
Alternative owners considered:
Memory updated:
```


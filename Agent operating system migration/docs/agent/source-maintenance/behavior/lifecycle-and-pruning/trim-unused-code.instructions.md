# Source Maintenance Behavior: Trim Unused Code

## Purpose

Decide whether obsolete, abandoned, unreachable, or unused code should be removed.

This behavior protects against dead-code accumulation and unsafe deletion based on weak evidence.

## Activated Lenses

- Lifecycle
- Blast Radius
- Memory

## Evidence To Consider

- Current references and consumers.
- Maps, registries, and ledgers.
- Tests, fixtures, docs, and examples.
- Whether code is public API, generated, or dynamically referenced.
- Known debt or experiment removal triggers.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `map-deps`.
- Tool evidence category: `map-affected-surfaces`.
- Tool evidence category: `check-docs`.

## Procedure

1. Use the Lifecycle Lens to classify the element as local, provisional, deprecated, retired, obsolete, or stable.
2. Use the Blast-Radius Lens to identify consumers and hidden references.
3. Use the Memory Lens to update ledgers, maps, or docs if removal changes durable memory.
4. Remove only when evidence is strong enough for the lifecycle status.

## Remove When

- References and consumers have been checked.
- The element is deprecated, retired, obsolete, unreachable, or intentionally abandoned.
- Removal does not erase needed examples, fixtures, or architectural evidence.
- Dynamic or generated usage has been ruled out or handled.
- Maps and memory surfaces can be updated in the same change when needed.

## Defer Removal When

- Usage evidence is incomplete.
- The element is public API or dynamically referenced.
- Tests or fixtures still document intended behavior.
- The code is provisional but still active.
- A deprecation step is needed first.

## Stop Or Escalate When

- Removing code changes behavior beyond cleanup.
- Public API, schema, generated artifacts, routes, or tools are involved.
- The code appears unused only because analysis tooling is incomplete.
- Removal conflicts with active experiments or known debt.

## Memory Updates

Update `known-debt.md` or `experiments.md` when removal resolves, changes, or invalidates an entry.

Update area maps when canonical surfaces are removed.

Update `decision-log.md` if removal retires a durable architectural element.

## Completion Output

```text
Element:
Lifecycle classification:
Removal evidence:
Consumers checked:
Decision: remove/defer/deprecate
Memory updated:
Remaining uncertainty:
```

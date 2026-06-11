# Structural Maintenance Behavior: Trim Unused Element

## Purpose

Decide whether obsolete, abandoned, unreachable, or unused maintained elements should be removed.

This behavior protects against dead-element accumulation and unsafe deletion based on weak evidence.

## Lens Prompts

- Lifecycle: remove only when the element is obsolete, abandoned, unreachable, deprecated, retired, or intentionally no longer authoritative.
- Contract: removal must not break promised behavior, fixtures, examples, tests, public APIs, or tool contracts unless consumers are migrated.
- Blast Radius: check consumers, hidden references, tests, fixtures, docs, examples, generated usage, and public API implications before deletion.
- Memory: update ledgers, maps, experiments, or known debt when removal changes durable project memory.

## Procedure

1. State the element and suspected removal reason.
2. Classify lifecycle as local, provisional, deprecated, retired, obsolete, stable, or uncertain.
3. Check consumers, public API, dynamic/generated references, tests, fixtures, docs, examples, and recorded debt triggers as needed.
4. Use `contract-impact` when removal may affect supported behavior, public API, examples, fixtures, or tool contracts.
5. Use `artifact-maintenance-path` when the element may be generated, indexed, derived, or tool-maintained.
6. Decide remove, defer, deprecate first, or keep.
7. Add secondary deprecation or boundary behavior when removal is not yet safe.

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
- The element is provisional but still active.
- A deprecation step is needed first.

## Stop Or Escalate When

- Removing the element changes behavior beyond cleanup.
- Public API, schema, generated artifacts, routes, or tools are involved.
- The element appears unused only because analysis tooling is incomplete.
- Removal conflicts with active experiments or known debt.

## Memory Updates

Update `known-debt.md` or `experiments.md` when removal resolves, changes, or invalidates an entry.

Update area maps when canonical surfaces are removed.

Update the deferred logging strategy if removal retires a durable architectural element.

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

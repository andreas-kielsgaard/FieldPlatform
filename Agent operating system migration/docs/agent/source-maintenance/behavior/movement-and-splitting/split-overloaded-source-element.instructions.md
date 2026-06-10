# Source Maintenance Behavior: Split Overloaded Source Element

## Purpose

Decide whether a file, module, object, component, service, accessor, utility, or tool has multiple independent responsibilities and should be split.

This behavior protects against monolith growth by splitting on divergent reasons to change, not arbitrary size.

## Activated Lenses

- Ownership
- Boundary
- Data/State/Effect
- Blast Radius
- Lifecycle
- Memory

## Evidence To Consider

- Current source element name, public API, sections, responsibilities, and imports.
- Consumers and tests.
- Dependency directions.
- Whether concerns have different lifecycles or reasons to change.
- Tool evidence category: `map-deps`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `component-usage`.
- Tool evidence category: `check-boundaries`.

## Procedure

1. Use the Ownership Lens to identify separate reasons to change.
2. Use the Boundary Lens to identify mixed layers or dependency directions.
3. Use the Data/State/Effect Lens if source state, side effects, accessors, calculations, or persistence are mixed.
4. Use the Blast-Radius Lens before changing exports or consumers.
5. Use the Lifecycle Lens to decide whether split owners are local, shared, provisional, or stable.
6. Use the Memory Lens if ownership or boundaries become durable.

## Split When

- Responsibilities have different reasons to change.
- The current name must become vague to stay accurate.
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
- Log pending split debt.

## Stop Or Escalate When

- Public API migration is required.
- Split crosses platform boundaries.
- Behavior changes are being mixed into the split.
- The split reveals duplicated semantics or a missing interface boundary.

## Memory Updates

Update area maps when ownership changes.

Update `known-debt.md` if split is partial.

Update `decision-log.md` when a structural split establishes a convention.

## Completion Output

```text
Overloaded element:
Responsibilities identified:
Split decision:
New owners:
Public API impact:
Boundary impact:
Memory updated:
Remaining debt:
```

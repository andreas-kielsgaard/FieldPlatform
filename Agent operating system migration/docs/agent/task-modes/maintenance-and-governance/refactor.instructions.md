# Mode: Refactor

## Required Orientation

- `docs/agent/source-map.md`
- `docs/agent/decision-log.md`
- `docs/agent/known-debt.md`
- The map that owns the target area, such as `component-registry.md`, `accessor-map.md`, `schema-map.md`, or `routing-map.md`.

## Required Tools Or Searches

- Search all affected imports and consumers.
- Tool: `map-deps`.
- Tool: `check-boundaries`.
- Use typecheck, lint, and relevant tests where available.
- Use codemods for broad mechanical changes when safer than manual edits.

## Implementation Instructions

- State the no-behavior-change intent before editing.
- Establish current behavior through tests, examples, or a manual description.
- Move code in small coherent steps.
- Preserve public APIs unless the refactor explicitly includes migration.
- Avoid mixing feature work with refactor unless requested.
- Update maps if structure or ownership changes.

## Cross-Application Impact Checks

- Public APIs and imports.
- Ownership and source-map changes.
- Component or accessor boundaries.
- Dependency direction and cycles.
- Tests and examples that rely on file locations.

## Documentation Updates

- Update `source-map.md` if structure or ownership changes.
- Update `component-registry.md` if component ownership changes.
- Update `accessor-map.md` if data boundaries change.
- Update `decision-log.md` if a structural convention is established.
- Update `known-debt.md` if refactor is partial.

## Regression Checks

- Accidental behavior changes.
- Missed imports or consumers.
- Dependency cycles.
- Public API drift.
- Refactor mixed with hidden feature work.

## Required Completion Report

```text
Primary mode: refactor
Refactor intent:
Behavior changed? intended/no
Moved/renamed files:
Public APIs changed:
Dependency checks:
Tests:
Docs updated:
Remaining debt:
```

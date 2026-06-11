# Mode: Refactor

## Required Orientation

- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md`
- `docs/agent/project-setup/technology-architecture-map.md` when refactor changes placement, ownership, or interface boundaries
- `docs/agent/known-debt.md`
- The map that owns the target area, such as `generated-indexes/component-registry.md`, `generated-indexes/accessor-map.md`, `generated-indexes/schema-map.md`, or `generated-indexes/routing-map.md`.

## Required Tools Or Searches

- Search all affected imports and consumers.
- Tool: `map-deps`.
- Tool: `check-boundaries`.
- Tool: `contract-impact` when public APIs, exported behavior, examples, fixtures, or shared consumers may be affected.
- Tool: `contract-test-coverage` when the refactor changes internal processing behind an existing contract.
- Use typecheck, lint, and relevant tests where available.
- Use codemods for broad mechanical changes when safer than manual edits.

## Implementation Instructions

- State the no-behavior-change intent before editing.
- Establish current behavior through tests, examples, or a manual description.
- Move code in small coherent steps.
- Preserve public APIs unless the refactor explicitly includes migration.
- Preserve promised behavior for existing consumers, or explicitly report the intended contract change and migration path.
- Avoid mixing feature work with refactor unless requested.
- Update maps if structure or ownership changes.

## Cross-Application Impact Checks

- Public APIs and imports.
- Ownership, structural-maintenance, and technology-architecture changes.
- Component or accessor boundaries.
- Dependency direction and cycles.
- Tests and examples that rely on file locations.

## Documentation Updates

- Use structural maintenance when structure or ownership changes.
- Update `project-setup/technology-architecture-map.md` if platform, directory, source/generated, or interface boundaries change.
- Update `generated-indexes/component-registry.md` if component ownership changes.
- Update `generated-indexes/accessor-map.md` if data boundaries change.
- Update the deferred logging strategy if a structural convention is established.
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

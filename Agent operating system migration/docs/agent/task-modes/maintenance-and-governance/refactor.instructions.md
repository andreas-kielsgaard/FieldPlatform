# Mode: Refactor

## Required Orientation

- `docs/agent/structural-maintenance/structural-maintenance-usage.instructions.md`
- `docs/agent/project-setup/technology-architecture-map.md` when refactor changes placement, ownership, or interface boundaries
- `docs/agent/known-debt.md`
- Query generated indexes through the tools below instead of loading whole generated files.

## Required Tools Or Searches

- Tool: `query-component-index` for generated component index slices relevant to the target.
- Tool: `query-accessor-index` for generated accessor index slices relevant to the target.
- Tool: `query-schema-index` for generated schema index slices relevant to the target.
- Tool: `query-routing-index` for generated routing index slices relevant to the target.
- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

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
- Tool: `update-component-index` if component ownership changes, or report required index refresh if the tool is unavailable.
- Tool: `update-accessor-index` if data boundaries change, or report required index refresh if the tool is unavailable.
- Update the deferred logging strategy if a structural convention is established.
- Update `known-debt.md` if refactor is partial.

## Regression Checks

- Accidental behavior changes.
- Missed imports or consumers.
- Dependency cycles.
- Public API drift.
- Refactor mixed with hidden feature work.

## Structural Maintenance Clues

- Enter structural maintenance when a no-behavior-change refactor still changes placement, ownership, boundaries, reuse, duplication, contracts, or maintenance paths.

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

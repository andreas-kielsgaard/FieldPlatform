# Mode: Refactor

## Orientation Cues

- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md`
- `project-control-files/technology-architecture-map.md` when refactor changes placement, ownership, or interface boundaries
- `prompt-files/known-debt.md`
- Query generated indexes through the tools below instead of loading whole generated files.

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Consider Tool: `schema-query` for generated schema index slices relevant to the target.
- Consider Tool: `route-query` for generated routing index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching all affected imports and consumers.
- Consider Tool: `dependency-query`.
- Consider Skill: `boundary-verification`.
- Consider Skill: `consumer-impact-preview` when public APIs, exported behavior, examples, fixtures, or shared consumers may be affected.
- Consider Skill: `test-relation-scan` when the refactor changes internal processing behind an existing contract.
- Consider using typecheck, lint, and relevant tests where available.
- Consider using codemods for broad mechanical changes when safer than manual edits.

## Implementation Cues

- State the no-behavior-change intent before editing.
- Establish current behavior through tests, examples, or a manual description.
- Move code in small coherent steps.
- Preserve public APIs unless the refactor explicitly includes migration.
- Preserve promised behavior for existing consumers, or explicitly report the intended contract change and migration path.
- Avoid mixing feature work with refactor unless requested.
- Consider updating maps if structure or ownership changes.

## Cross-Application Impact Cues

- Public APIs and imports.
- Ownership, structural-maintenance, and technology-architecture changes.
- Component or accessor boundaries.
- Dependency direction and cycles.
- Tests and examples that rely on file locations.

## Documentation Cues

- Consider using structural maintenance when structure or ownership changes.
- Consider updating `project-control-files/technology-architecture-map.md` if platform, directory, source/generated, or interface boundaries change.
- Consider Tool: `build-component-index` if component ownership changes, or report index refresh may be needed if the tool is unavailable.
- Consider Tool: `build-accessor-index` if data boundaries change, or report index refresh may be needed if the tool is unavailable.
- Consider updating the deferred logging strategy if a structural convention is established.
- Consider updating `known-debt.md` if refactor is partial.

## Regression Cues

- Accidental behavior changes.
- Missed imports or consumers.
- Dependency cycles.
- Public API drift.
- Refactor mixed with hidden feature work.

## Structural Maintenance Clues

- Consider entering structural maintenance when a no-behavior-change refactor still changes placement, ownership, boundaries, reuse, duplication, contracts, or maintenance paths.

## Report Cues

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




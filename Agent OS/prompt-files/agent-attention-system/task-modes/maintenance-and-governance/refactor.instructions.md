# Mode: Refactor

## Orientation Cues

- `prompt-files/agent-attention-system/agent-attention-system-usage.md`
- `project-decisions/project-decision-map.md` when refactor changes placement, ownership, or interface boundaries covered by mature project decisions
- Final response notes for partial refactors or real scoped compromises.
- Use source reads, `rg`, human-maintained maps, and standard checks.

## Evidence Cues


- Consider searching all affected imports and consumers.
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
- Consider updating relevant project decisions if platform, directory, source/generated, or interface boundaries change as mature human-owned context.
- Consider updating relevant durable memory if a structural convention is established.
- Report partial refactors or remaining compromise in the final response.

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
Remaining compromise:
```



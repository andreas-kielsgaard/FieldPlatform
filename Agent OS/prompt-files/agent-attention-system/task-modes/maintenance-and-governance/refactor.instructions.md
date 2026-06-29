# Mode: Refactor

## Orientation Cues

- `prompt-files/agent-attention-system/agent-attention-system-usage.md`
- `project-decisions/project-decision-map.md` when refactor changes placement, ownership, or interface boundaries covered by mature project decisions
- Final response notes for partial refactors or real scoped compromises.
- Use source reads, human-maintained maps, and standard checks. Legacy generated-index query tools listed below are inactive for ordinary development.

## Evidence Cues

- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy tool note (inactive): `schema-query` for generated schema index slices relevant to the target.
- Legacy tool note (inactive): `route-query` for generated routing index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching all affected imports and consumers.
- Legacy tool note (inactive): `dependency-query`.
- Legacy skill note (inactive): `boundary-verification`.
- Legacy skill note (inactive): `consumer-impact-preview` when public APIs, exported behavior, examples, fixtures, or shared consumers may be affected.
- Legacy skill note (inactive): `test-relation-scan` when the refactor changes internal processing behind an existing contract.
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
- Legacy tool note (inactive): `build-component-index` if component ownership changes, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-accessor-index` if data boundaries change, legacy index refresh is out of scope unless explicitly requested.
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



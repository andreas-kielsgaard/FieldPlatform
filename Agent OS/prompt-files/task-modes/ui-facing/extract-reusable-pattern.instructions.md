# Mode: Extract Reusable Pattern

## Orientation Cues

- `prompt-files/design-system-map.md`
- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md`
- `project-control-files/technology-architecture-map.md` when extraction crosses area, package, or platform boundaries
- `prompt-files/known-debt.md`

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching for repeated markup, classes, functions, helpers, or compositions.
- Consider Tool: `component-query`.
- Consider Tool: `pattern-candidate-query`.
- Consider Tool: `build-component-index` if component structural indexes need refresh.
- Consider Tool: `dependency-query` when extraction crosses module boundaries.

## Implementation Cues

- Extract only after identifying at least two actual or strongly imminent uses.
- Name the abstraction after the stable structural role, not accidental current content.
- Keep the abstraction narrow.
- Migrate consumers deliberately.
- Avoid extracting unstable product ontology into generic infrastructure.
- If extraction is useful but premature, log it as an extraction candidate instead.

## Cross-Application Impact Cues

- What consumers will migrate now?
- What duplication remains intentionally?
- Does the abstraction create a new convention future work should follow?
- Does extraction change behavior or only structure?

## Documentation Cues

- Consider Tool: `build-component-index` for the new shared component or extraction candidate, or report index refresh may be needed if the tool is unavailable.
- Consider updating the deferred logging strategy if the extraction establishes a convention.
- Consider updating `known-debt.md` if duplication is intentionally left.
- Consider updating `experiments.md` if the extraction remains provisional.

## Regression Cues

- Premature abstraction.
- Wrong abstraction name or ownership.
- Missed consumers.
- Behavior changes hidden inside refactor.
- Overly broad props or options.

## Structural Maintenance Clues

- Consider entering structural maintenance when extraction creates a new owner, centralizes duplicated semantics, establishes a reuse contract, or crosses package, platform, or area boundaries.

## Report Cues

```text
Primary mode: extract reusable pattern
Pattern extracted:
Previous locations:
New abstraction:
Why now:
Consumers migrated:
Remaining duplication:
Behavior changed? yes/no
Docs updated:
Checks run:
```




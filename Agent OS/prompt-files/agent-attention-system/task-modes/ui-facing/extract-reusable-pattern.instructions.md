# Mode: Extract Reusable Pattern

## Orientation Cues

- `prompt-files/design-system-map.md`
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`
- `project-control-files/technology-architecture-map.md` when extraction crosses area, package, or platform boundaries
- `prompt-files/known-debt.md`

## Evidence Cues

- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching for repeated markup, classes, functions, helpers, or compositions.
- Legacy tool note (inactive): `component-query`.
- Legacy tool note (inactive): `pattern-candidate-query`.
- Legacy tool note (inactive): `build-component-index` if component structural indexes need refresh.
- Legacy tool note (inactive): `dependency-query` when extraction crosses module boundaries.

## Implementation Cues

- Extract only after identifying at least two actual or strongly imminent uses.
- Name the abstraction after the stable structural role, not accidental current content.
- Keep the abstraction narrow.
- Migrate consumers deliberately.
- Avoid extracting unstable product ontology into generic infrastructure.
- If extraction is useful but premature, record it as an extraction candidate instead.

## Cross-Application Impact Cues

- What consumers will migrate now?
- What duplication remains intentionally?
- Does the abstraction create a new convention future work should follow?
- Does extraction change behavior or only structure?

## Documentation Cues

- Legacy tool note (inactive): `build-component-index` for the new shared component or extraction candidate, legacy index refresh is out of scope unless explicitly requested.
- Consider updating relevant durable memory if the extraction establishes a convention.
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




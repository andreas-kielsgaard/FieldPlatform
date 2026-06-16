# Mode: Review Before Commit

## Orientation Cues

- `prompt-files/review-checklist.md`
- `prompt-files/known-debt.md`
- `prompt-files/experiments.md`
- All mode files used during the task.

## Evidence Cues

- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider running typecheck, lint, and relevant tests when available and appropriate.
- Consider Skill: `change-report-assembly`.
- Consider Skill: `affected-surface-mapping`.
- Tools: `dependency-query` and `boundary-verification` if architecture changed.
- Consider Skill: `consumer-impact-preview` when the change may affect promised behavior, public APIs, fixtures, examples, or consumers.
- Consider Skill: `test-relation-scan` when contract-relevant internal processing changed.
- Consider Tool: `artifact-query` when generated, indexed, derived, or tool-maintained artifacts changed.
- Consider `build-change-index --commit-view` or `build-all-indexes --commit-view` when generated index artifacts will be committed and `change-index.json` should represent committed truth rather than local dirtiness.
- Consider running visual checks if UI changed.

## Implementation Cues

- Produce a structured review, not a vague completion note.
- Verify that every selected mode's report cues are answered.
- Confirm docs, debt, experiments, and decisions are updated where needed.
- Confirm user-owned unrelated changes were not modified.
- Confirm generated artifacts included in the commit match the source structure being committed; refresh ordinary local generated truth after the commit if local uncommitted work remains.
- Identify any check that could not be run and why.

## Cross-Application Impact Cues

- Components.
- Routes and pages.
- Domain concepts and naming.
- Schema and accessors.
- State.
- Permissions and visibility.
- Mocks and fixtures.
- Tests and checks.
- Docs, decisions, debt, and experiments.

## Documentation Cues

- Consider updating `known-debt.md` if any shortcut remains.
- Consider updating `experiments.md` if provisional code exists.
- Consider updating the deferred logging strategy if a durable choice was made.
- Consider using structural maintenance or update relevant maps if ownership, structure, or durable authority changed.

## Regression Cues

- Missing affected-surface summary.
- Unlogged debt.
- Unmarked provisional work.
- Docs not updated after control-surface changes.
- Checks omitted without explanation.
- User-owned unrelated changes included accidentally.

## Structural Maintenance Clues

- Consider entering structural maintenance when final review reveals unresolved ownership, boundary, authority, contract, audience, or maintenance-path decisions.

## Report Cues

```text
Primary mode:
Secondary modes:
Files changed:
Components affected:
Routes affected:
Domain concepts affected:
Schema/accessors affected:
Mocks affected:
Permissions affected:
Tests/checks run:
Docs updated:
Debt:
Experiments:
Open risks:
```



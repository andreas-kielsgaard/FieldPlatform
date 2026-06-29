# Mode: Review Before Commit

## Orientation Cues

- `prompt-files/review-checklist.md`
- Project decisions if the change affects mature human-owned context.
- Final response notes for real scoped compromises, provisional work, or uncertainty.
- All mode files used during the task.

## Evidence Cues

- Use `change-surface` when the changed target needs affected active source surface mapping.
- Use `test-selection` when the changed target needs runner-discovered test relation selection.
- Use `change-verification` for a concise per-change verification plan.
- Use `repo-health` when final review needs whole-repository health independent of the diff.

- Consider running typecheck, lint, and relevant tests when available and appropriate.
- Legacy skill note (inactive): `change-report-assembly` only when a substantial handoff or review report is explicitly needed.
- Legacy skill note (inactive): `affected-surface-mapping`.
- Use `depcruise:active-source` if architecture or dependency direction changed.
- Legacy tool notes (inactive): `dependency-query` and legacy `boundary-verification` evidence.
- Legacy skill note (inactive): `consumer-impact-preview` when the change may affect promised behavior, public APIs, fixtures, examples, or consumers.
- Legacy skill note (inactive): `test-relation-scan` when contract-relevant internal processing changed.
- Legacy tool note (inactive): `artifact-query` when generated, indexed, derived, or tool-maintained artifacts changed.
- Legacy index note (inactive): `build-change-index --commit-view` and `build-all-indexes --commit-view` were previously used for generated index commit views; do not use them unless explicitly asked for legacy index maintenance.
- Consider running visual checks if UI changed.

## Implementation Cues

- Produce a compact structured review, not a vague completion note.
- Use selected mode report cues as a checklist; answer only the fields material to the final summary unless a fuller report is requested.
- Confirm docs, project decisions, and final-response compromise/provisional notes are handled where needed.
- Confirm user-owned unrelated changes were not modified.
- Confirm any intentionally included generated artifacts are in scope; do not refresh legacy Agent OS generated indexes during ordinary commit preparation.
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
- Docs, decisions, scoped compromises, and provisional work.

## Documentation Cues

- Report any remaining shortcut or real compromise in the final response.
- Report provisional code in the final response unless a mature project decision should change.
- Consider updating relevant durable memory if a durable choice was made.
- Consider using structural maintenance or update relevant maps if ownership, structure, or durable authority changed.

## Regression Cues

- Missing affected-surface summary.
- Unacknowledged compromise.
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
Scoped compromises:
Provisional work or uncertainty:
Open risks:
```

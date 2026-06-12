# Mode: Review Before Commit

## Required Orientation

- `docs/agent/review-checklist.md`
- `docs/agent/known-debt.md`
- `docs/agent/experiments.md`
- All mode files used during the task.

## Required Tools Or Searches

- Tool: `test-surface-selection` when the changed target needs verification-surface selection.

- Run typecheck, lint, and relevant tests when available and appropriate.
- Tool: `summarize-change`.
- Tool: `map-affected-surfaces`.
- Tools: `map-deps` and `check-boundaries` if architecture changed.
- Tool: `contract-impact` when the change may affect promised behavior, public APIs, fixtures, examples, or consumers.
- Tool: `contract-test-coverage` when contract-relevant internal processing changed.
- Tool: `artifact-maintenance-path` when generated, indexed, derived, or tool-maintained artifacts changed.
- Run visual checks if UI changed.

## Implementation Instructions

- Produce a structured review, not a vague completion note.
- Verify that every selected mode's required report fields are answered.
- Confirm docs, debt, experiments, and decisions are updated where needed.
- Confirm user-owned unrelated changes were not modified.
- Identify any check that could not be run and why.

## Cross-Application Impact Checks

- Components.
- Routes and pages.
- Domain concepts and naming.
- Schema and accessors.
- State.
- Permissions and visibility.
- Mocks and fixtures.
- Tests and checks.
- Docs, decisions, debt, and experiments.

## Documentation Updates

- Update `known-debt.md` if any shortcut remains.
- Update `experiments.md` if provisional code exists.
- Update the deferred logging strategy if a durable choice was made.
- Use structural maintenance or update relevant maps if ownership, structure, or durable authority changed.

## Regression Checks

- Missing affected-surface summary.
- Unlogged debt.
- Unmarked provisional work.
- Docs not updated after control-surface changes.
- Checks omitted without explanation.
- User-owned unrelated changes included accidentally.

## Structural Maintenance Clues

- Enter structural maintenance when final review reveals unresolved ownership, boundary, authority, contract, audience, or maintenance-path decisions.

## Required Completion Report

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

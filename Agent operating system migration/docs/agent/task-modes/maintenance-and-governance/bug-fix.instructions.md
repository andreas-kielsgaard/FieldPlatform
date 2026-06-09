# Mode: Bug Fix

## Required Orientation

Read the map for the failing surface:

- `docs/agent/component-registry.md`
- `docs/agent/routing-map.md`
- `docs/agent/accessor-map.md`
- `docs/agent/state-management-map.md`
- `docs/agent/permissions-and-visibility-map.md`
- `docs/agent/testing-map.md`
- `docs/agent/known-debt.md`

## Required Tools Or Searches

- Reproduce the failure or clearly describe why reproduction is not available.
- Run focused tests or manual checks for the failing surface.
- Search for similar bug patterns.
- Search related state, accessor, policy, or component consumers.

## Implementation Instructions

- Identify whether the root cause is local or systemic.
- Prefer fixing the source of truth over patching the symptom.
- Add or update a regression test where practical.
- If no test is added, explain why.
- Check whether the same pattern exists elsewhere.
- Do not hide architectural debt inside a quick patch without logging it.

## Cross-Application Impact Checks

- Does the bug reveal stale documentation or maps?
- Is the same pattern present in other components, routes, accessors, fixtures, or policies?
- Does the fix change behavior for other consumers?
- Does the fix indicate a missing test surface?

## Documentation Updates

- Update `testing-map.md` if regression coverage is added.
- Update `known-debt.md` if root cause is deferred.
- Update `decision-log.md` if the fix changes a convention.
- Update the relevant map if the bug exposed stale project memory.

## Regression Checks

- Symptom patch without root cause.
- Similar bugs left elsewhere.
- Missing regression coverage.
- Behavior changed beyond the failing path.
- Debt introduced but not logged.

## Required Completion Report

```text
Primary mode: bug fix
Bug:
Root cause:
Fix:
Similar locations checked:
Regression test:
Checks run:
Docs/debt updated:
Remaining risk:
```

# Mode: Bug Fix

## Orientation Cues

Use generated-index query tools for the failing surface and read manual context:

- `prompt-files/known-debt.md`

## Evidence Cues

- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Tool: `route-query` for generated routing index slices relevant to the target.
- Consider Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Consider Skill: `state-impact-scan` for generated state-management index slices relevant to the target.
- Consider Tool: `literal-query` for generated permissions and visibility index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Try to reproduce the failure or clearly describe why reproduction is not available.
- Consider running focused tests or manual checks for the failing surface.
- Consider searching for similar bug patterns.
- Consider searching related state, accessor, policy, or component consumers.
- Consider Skill: `consumer-impact-preview` when the fix may change behavior for consumers beyond the failing path.
- Consider Skill: `test-relation-scan` when adding or revising regression coverage for a contract-relevant path.

## Implementation Cues

- Identify whether the root cause is local or systemic.
- Prefer fixing the source of truth over patching the symptom.
- Add or update a regression test where practical.
- If no test is added, explain why.
- Check whether the same pattern exists elsewhere.
- Avoid hiding architectural debt inside a quick patch without logging it.

## Cross-Application Impact Cues

- Does the bug reveal stale documentation or maps?
- Is the same pattern present in other components, routes, accessors, fixtures, or policies?
- Does the fix change behavior for other consumers?
- Does the fix indicate a missing test surface?

## Documentation Cues

- Report regression coverage implications until test behavior is designed.
- Consider updating `known-debt.md` if root cause is deferred.
- Consider updating the deferred logging strategy if the fix changes a convention.
- Consider using the matching generated-index builder if the bug exposed stale generated memory, or report index refresh may be needed if the tool is unavailable.

## Regression Cues

- Symptom patch without root cause.
- Similar bugs left elsewhere.
- Missing regression coverage.
- Behavior changed beyond the failing path.
- Debt introduced but not logged.

## Structural Maintenance Clues

- Consider entering structural maintenance when the fix exposes unclear ownership, boundary leakage, repeated defects, contract ambiguity, or a missing maintenance path.

## Report Cues

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




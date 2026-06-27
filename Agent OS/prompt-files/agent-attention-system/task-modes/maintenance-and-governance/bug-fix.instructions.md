# Mode: Bug Fix

## Orientation Cues

Use source reads, human-maintained maps, and standard checks for the failing surface. Legacy generated-index query tools are inactive for ordinary bug fixes:

- `prompt-files/known-debt.md`

## Evidence Cues

- Legacy tool note (inactive): `component-query` for generated component index slices relevant to the target.
- Legacy tool note (inactive): `route-query` for generated routing index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy skill note (inactive): `state-impact-scan` for generated state-management index slices relevant to the target.
- Legacy tool note (inactive): `literal-query` for generated permissions and visibility index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Try to reproduce the failure or clearly describe why reproduction is not available.
- Consider running focused tests or manual checks for the failing surface.
- Consider searching for similar bug patterns.
- Consider searching related state, accessor, policy, or component consumers.
- Legacy skill note (inactive): `consumer-impact-preview` when the fix may change behavior for consumers beyond the failing path.
- Legacy skill note (inactive): `test-relation-scan` when adding or revising regression coverage for a contract-relevant path.

## Implementation Cues

- Identify whether the root cause is local or systemic.
- Prefer fixing the source of truth over patching the symptom.
- Add or update a regression test where practical.
- If no test is added, explain why.
- Check whether the same pattern exists elsewhere.
- Avoid hiding architectural debt inside a quick patch without recording it.

## Cross-Application Impact Cues

- Does the bug reveal stale documentation or maps?
- Is the same pattern present in other components, routes, accessors, fixtures, or policies?
- Does the fix change behavior for other consumers?
- Does the fix indicate a missing test surface?

## Documentation Cues

- Report regression coverage implications until test behavior is designed.
- Consider updating `known-debt.md` if root cause is deferred.
- Consider updating relevant durable memory if the fix changes a convention.
- Legacy generated-index builder note (inactive): matching builder would previously have been used if the bug exposed stale generated memory, legacy index refresh is out of scope unless explicitly requested.

## Regression Cues

- Symptom patch without root cause.
- Similar bugs left elsewhere.
- Missing regression coverage.
- Behavior changed beyond the failing path.
- Debt introduced but not recorded.

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




# Mode: Bug Fix

## Orientation Cues

Use source reads, `rg`, human-maintained maps, and standard checks for the failing surface.

- Final response notes for deferred root-cause work or real scoped compromises.

## Evidence Cues


- Try to reproduce the failure or clearly describe why reproduction is not available.
- Consider running focused tests or manual checks for the failing surface.
- Consider searching for similar bug patterns.
- Consider searching related state, accessor, policy, or component consumers.

## Implementation Cues

- Identify whether the root cause is local or systemic.
- Prefer fixing the source of truth over patching the symptom.
- Add or update a regression test where practical.
- If no test is added, explain why.
- Check whether the same pattern exists elsewhere.
- Avoid hiding architectural compromise inside a quick patch; report it clearly.

## Cross-Application Impact Cues

- Does the bug reveal stale documentation or maps?
- Is the same pattern present in other components, routes, accessors, fixtures, or policies?
- Does the fix change behavior for other consumers?
- Does the fix indicate a missing test surface?

## Documentation Cues

- Report regression coverage implications until test behavior is designed.
- Report deferred root-cause work in the final response.
- Consider updating relevant durable memory if the fix changes a convention.

## Regression Cues

- Symptom patch without root cause.
- Similar bugs left elsewhere.
- Missing regression coverage.
- Behavior changed beyond the failing path.
- Compromise introduced but not reported.

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
Docs/compromise updated:
Remaining risk:
```

# Mode: Copy Or Naming Change

## Orientation Cues

- `prompt-files/domain-glossary.md`
- `prompt-files/design-system-map.md`

## Evidence Cues

- Consider Tool: `term-query` for generated naming index slices relevant to the target.
- Consider Tool: `route-query` for generated routing index slices relevant to the target.
- Consider Tool: `component-query` for generated component index slices relevant to the target.
- Consider Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Consider Tool: `term-query` for terms being introduced or removed.
- Consider Skill: `rename-impact-preview` for non-trivial renames.
- Consider searching UI literals, identifiers, route labels, fixture keys, tests, and examples.

## Implementation Cues

- Determine whether the change is cosmetic copy or domain language.
- Avoid changing a canonical term in one place only.
- Centralize repeated labels and statuses where appropriate.
- Keep internal identifiers and UI labels intentionally mapped.
- If old and new terms coexist, record why.
- Avoid turning uncertain wording into permanent ontology.

## Cross-Application Impact Cues

- Domain terms and aliases.
- UI copy and status labels.
- Route slugs and labels.
- Component props or variant names.
- Fixture keys and scenarios.
- Tests, examples, and snapshots.

## Documentation Cues

- Consider updating `domain-glossary.md` if meaning changes.
- Consider Tool: `build-term-index`, or report index refresh may be needed if the tool is unavailable.
- Consider updating `design-system-map.md` if status or label families change.
- Consider Tool: `build-route-index` if route labels or slugs change, or report index refresh may be needed if the tool is unavailable.
- Consider updating the deferred logging strategy if a durable naming rule is set.

## Regression Cues

- Partial rename.
- Hidden old labels in tests or fixtures.
- UI label drift without mapping.
- Status text coupled to visual variants.
- Unresolved aliases not recorded.

## Structural Maintenance Clues

- Consider entering structural maintenance when a term becomes canonical, a route-slug or label family becomes durable, a status vocabulary crosses surfaces, or naming authority is unclear.

## Report Cues

```text
Primary mode: copy or naming change
Copy/naming changed:
Cosmetic or domain-level:
Terms searched:
Canonical mapping:
Files affected:
Docs updated:
Remaining aliases:
Checks run:
```






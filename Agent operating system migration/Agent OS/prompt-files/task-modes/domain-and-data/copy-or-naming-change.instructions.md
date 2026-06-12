# Mode: Copy Or Naming Change

## Required Orientation

- `prompt-files/domain-glossary.md`
- `prompt-files/design-system-map.md`

## Required Tools Or Searches

- Tool: `term-query` for generated naming index slices relevant to the target.
- Tool: `route-query` for generated routing index slices relevant to the target.
- Tool: `component-query` for generated component index slices relevant to the target.
- Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Tool: `term-query` for terms being introduced or removed.
- Skill: `rename-impact-preview` for non-trivial renames.
- Search UI literals, identifiers, route labels, fixture keys, tests, and examples.

## Implementation Instructions

- Determine whether the change is cosmetic copy or domain language.
- Do not change a canonical term in one place only.
- Centralize repeated labels and statuses where appropriate.
- Keep internal identifiers and UI labels intentionally mapped.
- If old and new terms coexist, record why.
- Do not turn uncertain wording into permanent ontology.

## Cross-Application Impact Checks

- Domain terms and aliases.
- UI copy and status labels.
- Route slugs and labels.
- Component props or variant names.
- Fixture keys and scenarios.
- Tests, examples, and snapshots.

## Documentation Updates

- Update `domain-glossary.md` if meaning changes.
- Tool: `build-term-index`, or report required index refresh if the tool is unavailable.
- Update `design-system-map.md` if status or label families change.
- Tool: `build-route-index` if route labels or slugs change, or report required index refresh if the tool is unavailable.
- Update the deferred logging strategy if a durable naming rule is set.

## Regression Checks

- Partial rename.
- Hidden old labels in tests or fixtures.
- UI label drift without mapping.
- Status text coupled to visual variants.
- Unresolved aliases not recorded.

## Structural Maintenance Clues

- Enter structural maintenance when a term becomes canonical, a route-slug or label family becomes durable, a status vocabulary crosses surfaces, or naming authority is unclear.

## Required Completion Report

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






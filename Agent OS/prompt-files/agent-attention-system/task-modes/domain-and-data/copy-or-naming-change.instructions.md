# Mode: Copy Or Naming Change

## Orientation Cues

- Source-owned naming/copy surfaces and relevant project decisions if present
- Source-owned tokens/primitives when status or label treatment changes

## Evidence Cues


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

- Consider updating source-owned naming surfaces or a relevant mature project decision if meaning changes.
- Consider updating source-owned tokens/primitives or a relevant mature project decision if status or label families change.
- Consider updating relevant durable memory if a durable naming rule is set.

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





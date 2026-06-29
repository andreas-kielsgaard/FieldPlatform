# Mode: Domain Concept Addition, Change, Or Rename

## Orientation Cues

- Source-owned domain usage and relevant project decisions if present

## Evidence Cues

- Legacy tool note (inactive): `term-query` for generated naming index slices relevant to the target.
- Legacy tool note (inactive): `schema-query` for generated data-model index slices relevant to the target.
- Legacy tool note (inactive): `schema-query` for generated schema index slices relevant to the target.
- Legacy tool note (inactive): `accessor-query` for generated accessor index slices relevant to the target.
- Legacy tool note (inactive): `route-query` for generated routing index slices relevant to the target.
- Legacy tool note (inactive): `literal-query` for generated permissions and visibility index slices relevant to the target.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Legacy tool note (inactive): `term-query`.
- Legacy skill note (inactive): `rename-impact-preview`.
- Consider searching exact terms, aliases, identifiers, route slugs, fixture keys, and UI literals.
- Legacy tool note (inactive): `symbol-query` where typed code exists.

## Implementation Cues

- Distinguish UI copy changes from domain concept changes.
- Check for existing aliases and near-duplicates before introducing new language.
- If the concept is uncertain, mark it as provisional instead of canonizing it.
- If renaming, update identifiers, labels, fixtures, routes, tests, examples, accessors, and docs intentionally.
- Avoid leaving old and new names coexisting unless explicitly recorded as alias, legacy language, or unresolved language.

## Cross-Application Impact Cues

- Schema and validation.
- Accessors, APIs, and return shapes.
- Routes, slugs, and page labels.
- UI copy and status labels.
- Mock data, fixtures, seeds, and examples.
- Permissions, roles, capabilities, and visibility rules.
- Tests and structural indexes.

## Documentation Cues

- Consider updating source-owned naming surfaces or a relevant mature project decision when a durable domain meaning changes.
- Legacy tool note (inactive): `build-term-index`, legacy index refresh is out of scope unless explicitly requested.
- Legacy tool note (inactive): `build-schema-shape-index` if relations or invariants changed, legacy index refresh is out of scope unless explicitly requested.
- Consider updating relevant durable memory if the concept change affects future work.
- Report fixture or scenario implications until test behavior is designed.
- Legacy generated-index builder note (inactive): matching builder would previously have been used for any other generated surface changed, legacy index refresh is out of scope unless explicitly requested.

## Regression Cues

- Partial rename.
- Old and new names coexisting unintentionally.
- UI labels drifting from identifiers without a mapping.
- Fixtures retaining stale semantics.
- Accessors returning mixed concept shapes.
- Tests still asserting old language accidentally.

## Structural Maintenance Clues

- Consider entering structural maintenance when a concept is split, merged, canonized, renamed across surfaces, promoted from provisional use, or assigned to a new authority surface.

## Report Cues

```text
Primary mode: domain concept change
Concept:
Change type: add/change/rename/split/merge
Old names:
New canonical name:
Aliases retained:
Affected surfaces:
Docs updated:
Unresolved language:
Checks run:
```





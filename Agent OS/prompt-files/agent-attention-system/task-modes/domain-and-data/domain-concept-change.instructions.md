# Mode: Domain Concept Addition, Change, Or Rename

## Orientation Cues

- Source-owned domain usage and relevant project decisions if present

## Evidence Cues


- Consider searching exact terms, aliases, identifiers, route slugs, fixture keys, and UI literals.

## Implementation Cues

- Distinguish UI copy changes from domain concept changes.
- Check for existing aliases and near-duplicates before introducing new language.
- If the concept is uncertain, mark it as provisional instead of canonizing it.
- If renaming, update identifiers, labels, fixtures, routes, tests, examples, accessors, and docs intentionally.
- Avoid leaving old and new names coexisting unless explicitly recorded as alias, previous language, or unresolved language.

## Cross-Application Impact Cues

- Schema and validation.
- Accessors, APIs, and return shapes.
- Routes, slugs, and page labels.
- UI copy and status labels.
- Mock data, fixtures, seeds, and examples.
- Permissions, roles, capabilities, and visibility rules.
- Tests and source/config references.

## Documentation Cues

- Consider updating source-owned naming surfaces or a relevant mature project decision when a durable domain meaning changes.
- Consider updating relevant durable memory if the concept change affects future work.
- Report fixture or scenario implications until test behavior is designed.

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





# Mode: Domain Concept Addition, Change, Or Rename

## Required Orientation

- `docs/agent/domain-glossary.md`
- `docs/agent/generated-indexes/naming-index.md`
- `docs/agent/generated-indexes/data-model-map.md`
- `docs/agent/generated-indexes/schema-map.md`
- `docs/agent/generated-indexes/accessor-map.md`
- `docs/agent/generated-indexes/routing-map.md`
- `docs/agent/generated-indexes/permissions-and-visibility-map.md`

## Required Tools Or Searches

- Tool: `find-term`.
- Tool: `rename-impact`.
- Search exact terms, aliases, identifiers, route slugs, fixture keys, and UI literals.
- Tool: `symbol-search` where typed code exists.

## Implementation Instructions

- Distinguish UI copy changes from domain concept changes.
- Check for existing aliases and near-duplicates before introducing new language.
- If the concept is uncertain, mark it as provisional instead of canonizing it.
- If renaming, update identifiers, labels, fixtures, routes, tests, examples, accessors, and docs intentionally.
- Do not leave old and new names coexisting unless explicitly recorded as alias, legacy language, or unresolved language.

## Cross-Application Impact Checks

- Schema and validation.
- Accessors, APIs, and return shapes.
- Routes, slugs, and page labels.
- UI copy and status labels.
- Mock data, fixtures, seeds, and examples.
- Permissions, roles, capabilities, and visibility rules.
- Tests and structural indexes.

## Documentation Updates

- Update `domain-glossary.md`.
- Update `generated-indexes/naming-index.md`.
- Update `generated-indexes/data-model-map.md` if relations or invariants changed.
- Update the deferred logging strategy if the concept change affects future work.
- Report fixture or scenario implications until test behavior is designed.
- Update any other map whose represented surface changed.

## Regression Checks

- Partial rename.
- Old and new names coexisting unintentionally.
- UI labels drifting from identifiers without a mapping.
- Fixtures retaining stale semantics.
- Accessors returning mixed concept shapes.
- Tests still asserting old language accidentally.

## Required Completion Report

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

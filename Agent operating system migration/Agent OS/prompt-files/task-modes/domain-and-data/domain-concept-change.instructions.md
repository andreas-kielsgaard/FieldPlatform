# Mode: Domain Concept Addition, Change, Or Rename

## Required Orientation

- `prompt-files/domain-glossary.md`

## Required Tools Or Searches

- Tool: `term-query` for generated naming index slices relevant to the target.
- Tool: `schema-query` for generated data-model index slices relevant to the target.
- Tool: `schema-query` for generated schema index slices relevant to the target.
- Tool: `accessor-query` for generated accessor index slices relevant to the target.
- Tool: `route-query` for generated routing index slices relevant to the target.
- Tool: `literal-query` for generated permissions and visibility index slices relevant to the target.
- Skill: `test-relation-scan` when the changed target needs verification-surface selection.

- Tool: `term-query`.
- Skill: `rename-impact-preview`.
- Search exact terms, aliases, identifiers, route slugs, fixture keys, and UI literals.
- Tool: `symbol-query` where typed code exists.

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
- Tool: `build-term-index`, or report required index refresh if the tool is unavailable.
- Tool: `build-schema-shape-index` if relations or invariants changed, or report required index refresh if the tool is unavailable.
- Update the deferred logging strategy if the concept change affects future work.
- Report fixture or scenario implications until test behavior is designed.
- Use the matching generated-index update tool for any other generated surface changed, or report required index refresh if the tool is unavailable.

## Regression Checks

- Partial rename.
- Old and new names coexisting unintentionally.
- UI labels drifting from identifiers without a mapping.
- Fixtures retaining stale semantics.
- Accessors returning mixed concept shapes.
- Tests still asserting old language accidentally.

## Structural Maintenance Clues

- Enter structural maintenance when a concept is split, merged, canonized, renamed across surfaces, promoted from provisional use, or assigned to a new authority surface.

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






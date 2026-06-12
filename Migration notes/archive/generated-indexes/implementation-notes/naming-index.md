# Generated Index Note: Naming Index

## Purpose

The naming index should map a concept across UI labels, routes, types, schema objects, accessors, fixture keys, tests, stories, and legacy aliases.

Its role in the Agent OS is to prevent drift when concepts are renamed, split, merged, deprecated, or represented differently across surfaces.

## Expected Contents

- Canonical concept.
- UI labels and copy variants.
- Route slugs.
- Type/interface names.
- Schema/table/field names.
- Accessor names.
- Fixture keys and scenario names.
- Test/story references.
- Legacy names and migration hints.

## Maintained Or Accessed By

- `term-query`
- `rename-impact-preview`
- `symbol-query`
- `authority-resolution`
- `consumer-impact-preview`

## Access Pattern

Agents should query the index for the concept or alias involved in the task. Full ingestion should be avoided because real naming indexes become broad and noisy.

## Implementation Direction

Start with term and identifier extraction. Add route, schema, fixture, and test-specific parsers as those surfaces become stable.




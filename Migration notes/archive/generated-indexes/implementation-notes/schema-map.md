# Generated Index Note: Schema Map

## Purpose

The schema map should index schema sources, validators, migrations, generated artifacts, and drift risks.

Its role in the Agent OS is to protect persistence and validation contracts from drifting across storage, accessors, fixtures, tests, and generated outputs.

## Expected Contents

- Schema concern or entity.
- Source-of-truth file.
- Validation source.
- Migration source.
- Generated artifact paths.
- Known drift risks.
- Related accessors, fixtures, tests, and contract surfaces.

## Maintained Or Accessed By

- `schema-fixture-drift-scan`
- `artifact-query`
- `consumer-impact-preview`
- `test-relation-scan`
- `schema-fixture-drift-scan`
- `dependency-query`

## Access Pattern

Agents should query only the entity, schema file, generated artifact, or migration path relevant to the task. Full ingestion is likely too noisy once real schema coverage exists.

## Implementation Direction

Start by indexing configured schema files and generated output paths. Add validator, migration, fixture, and accessor cross-references incrementally.


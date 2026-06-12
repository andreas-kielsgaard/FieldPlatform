
# Index Map

Stratum 1 indexes are generated or maintained substrates. They make repository facts cheap to retrieve, but they are not semantic authority.

`index-manifest` is the mandatory boot index artifact. It gives compact awareness of index tiers, freshness, size, artifact hashes, shard hashes, semantic-support status, maintenance commands, and first-query guidance. Raw generated index record arrays stay query-only unless selected evidence cues make them useful.

| Index ID | Tier | Builder | Artifact | Capability |
|---|---|---|---|---|
| `index-manifest` | mandatory-boot-context | `build-index-manifest` | `tool-maintained-files/indexes/index-manifest.json` | Compact tier, freshness, size, artifact hash, shard hash, semantic-support, maintenance-command, and first-query guidance for active evidence indexes. |
| `path-index` | boot-core | `build-path-index` | `tool-maintained-files/indexes/path-index.json` | Files, directories, extensions, areas, inferred artifact types, and generated/manual hints. |
| `change-index` | boot-core | `build-change-index` | `tool-maintained-files/indexes/change-index.json` | Current git status, changed files, artifact kind hints, and changed surface hints. |
| `dependency-index` | boot-core | `build-dependency-index` | `tool-maintained-files/indexes/dependency-index.json` | Import, export-from, dynamic import, and require edges with rough cross-area hints. |
| `symbol-index` | boot-core | `build-symbol-index` | `tool-maintained-files/indexes/symbol-index.json` | Exported, imported, and locally declared symbols from lightweight source scanning. |
| `doc-reference-index` | boot-core | `build-doc-reference-index` | `tool-maintained-files/indexes/doc-reference-index.json` | Markdown links, headings, inline path references, inline IDs, and local existence hints. |
| `artifact-metadata-index` | boot-core | `build-artifact-metadata-index` | `tool-maintained-files/indexes/artifact-metadata-index.json` | Artifact kind, generated/manual/hybrid hints, direct-edit policy hints, producer hints, audience, and authority-role hints. |
| `component-index` | strong-cue | `build-component-index` | `tool-maintained-files/indexes/component-index.json` | PascalCase component definitions, consumers, stories, tests, and props hints. |
| `accessor-index` | strong-cue | `build-accessor-index` | `tool-maintained-files/indexes/accessor-index.json` | Accessor/API-like definitions, imports, read/write hints, cache hints, and boundary names. |
| `schema-shape-index` | strong-cue | `build-schema-shape-index` | `tool-maintained-files/indexes/schema-shape-index.json` | Schema-like declarations, validators, fields, relations, and generated type hints. |
| `test-index` | strong-cue | `build-test-index` | `tool-maintained-files/indexes/test-index.json` | Test and story files, imports, likely subjects, fixture references, and route/component hints. |
| `fixture-scenario-index` | strong-cue | `build-fixture-scenario-index` | `tool-maintained-files/indexes/fixture-scenario-index.json` | Fixture, mock, seed, scenario, demo-data, and example artifacts with represented term hints. |
| `route-index` | specialized-cue | `build-route-index` | `tool-maintained-files/indexes/route-index.json` | Route-like files, inferred route paths, params, families, pages, layouts, and handlers. |
| `literal-index` | specialized-cue | `build-literal-index` | `tool-maintained-files/indexes/literal-index.json` | Quoted strings, policy-like values, status-like values, token-like values, and arbitrary style-like values. |
| `term-index` | specialized-cue | `build-term-index` | `tool-maintained-files/indexes/term-index.json` | Domain terms, headings, identifiers, UI-looking literals, and nearby language. |

## Index Maintenance Commands

| Command ID | Script | Semantic File | Capability |
|---|---|---|---|
| `build-all-indexes` | `tool-implementations/indexes/build-all-indexes.ts` | `prompt-files/tools/indexes/build-all-indexes.md` | Refresh or check the explicit active index catalog, running `build-index-manifest` last. |

## Maintenance Rules

- Read this map and the manifest to understand available substrates before selecting query operators.
- Refresh an index before relying on absence, broad impact, or generated/manual maintenance-path evidence.
- Use `build-all-indexes` when more than one index may be stale, when maintenance metadata is missing, or when shard or semantic-support metadata needs deterministic regeneration.
- Keep semantic chunk, embedding, and vector-store builders out of `build-all-indexes` unless their artifacts are explicitly promoted into the active index catalog.
- Do not hand-maintain shard hashes, content hashes, generated timestamps, record counts, semantic-support status, or index maintenance commands.
- Treat missing metadata as uncertainty.
- Update the index semantic file and builder script together when an index contract changes.

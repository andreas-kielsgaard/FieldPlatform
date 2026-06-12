
# Index Map

Stratum 1 indexes are generated or maintained substrates. They make repository facts cheap to retrieve, but they are not semantic authority.

| Index ID | Builder | Artifact | Capability |
|---|---|---|---|
| `path-index` | `build-path-index` | `tool-maintained-files/indexes/path-index.json` | Files, directories, extensions, areas, inferred artifact types, and generated/manual hints. |
| `symbol-index` | `build-symbol-index` | `tool-maintained-files/indexes/symbol-index.json` | Exported, imported, and locally declared symbols from lightweight source scanning. |
| `dependency-index` | `build-dependency-index` | `tool-maintained-files/indexes/dependency-index.json` | Import, export-from, dynamic import, and require edges with rough cross-area hints. |
| `route-index` | `build-route-index` | `tool-maintained-files/indexes/route-index.json` | Route-like files, inferred route paths, params, families, pages, layouts, and handlers. |
| `component-index` | `build-component-index` | `tool-maintained-files/indexes/component-index.json` | PascalCase component definitions, consumers, stories, tests, and props hints. |
| `term-index` | `build-term-index` | `tool-maintained-files/indexes/term-index.json` | Domain terms, headings, identifiers, UI-looking literals, and nearby language. |
| `literal-index` | `build-literal-index` | `tool-maintained-files/indexes/literal-index.json` | Quoted strings, policy-like values, status-like values, token-like values, and arbitrary style-like values. |
| `doc-reference-index` | `build-doc-reference-index` | `tool-maintained-files/indexes/doc-reference-index.json` | Markdown links, headings, inline path references, inline IDs, and local existence hints. |
| `artifact-metadata-index` | `build-artifact-metadata-index` | `tool-maintained-files/indexes/artifact-metadata-index.json` | Artifact kind, generated/manual/hybrid hints, direct-edit policy hints, producer hints, audience, and authority-role hints. |
| `test-index` | `build-test-index` | `tool-maintained-files/indexes/test-index.json` | Test and story files, imports, likely subjects, fixture references, and route/component hints. |
| `fixture-scenario-index` | `build-fixture-scenario-index` | `tool-maintained-files/indexes/fixture-scenario-index.json` | Fixture, mock, seed, scenario, demo-data, and example artifacts with represented term hints. |
| `schema-shape-index` | `build-schema-shape-index` | `tool-maintained-files/indexes/schema-shape-index.json` | Schema-like declarations, validators, fields, relations, and generated type hints. |
| `accessor-index` | `build-accessor-index` | `tool-maintained-files/indexes/accessor-index.json` | Accessor/API-like definitions, imports, read/write hints, cache hints, and boundary names. |
| `change-index` | `build-change-index` | `tool-maintained-files/indexes/change-index.json` | Current git status, changed files, artifact kind hints, and changed surface hints. |

## Maintenance Rules

- Read this map to understand available substrates before selecting query operators.
- Refresh an index before relying on absence, broad impact, or generated/manual maintenance-path evidence.
- Treat missing metadata as uncertainty.
- Update the index semantic file and builder script together when an index contract changes.

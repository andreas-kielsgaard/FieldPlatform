# Legacy Index Map

This catalogue is retained as legacy reference only. The broad generated index pipeline is retired from ordinary development and is not part of normal orientation, testing, or verification.

Do not refresh or rely on these indexes unless the human prompt explicitly asks for legacy Agent OS index maintenance.

Index: `index-manifest`
Maintenance tool: `build-index-manifest`
Output: `tool-maintained-files/indexes/index-manifest.json`
Capability: Compact tier, freshness, size, artifact hash, shard hash, semantic-support, maintenance-command, and first-query guidance for active evidence indexes.

Index: `path-index`
Maintenance tool: `build-path-index`
Output: `tool-maintained-files/indexes/path-index.json`
Capability: Files, directories, extensions, areas, inferred artifact types, and generated/manual hints.

Index: `change-index`
Maintenance tool: `build-change-index`
Output: `tool-maintained-files/indexes/change-index.json`
Capability: Current git status, changed files, artifact kind hints, changed surface hints, and a committed-baseline mode for commit preparation.

Index: `dependency-index`
Maintenance tool: `build-dependency-index`
Output: `tool-maintained-files/indexes/dependency-index.json`
Capability: Import, export-from, dynamic import, and require edges with rough cross-area hints.

Index: `symbol-index`
Maintenance tool: `build-symbol-index`
Output: `tool-maintained-files/indexes/symbol-index.json`
Capability: Exported, imported, and locally declared symbols from lightweight source scanning.

Index: `doc-reference-index`
Maintenance tool: `build-doc-reference-index`
Output: `tool-maintained-files/indexes/doc-reference-index.json`
Capability: Markdown links, headings, inline path references, inline IDs, and local existence hints.

Index: `artifact-metadata-index`
Maintenance tool: `build-artifact-metadata-index`
Output: `tool-maintained-files/indexes/artifact-metadata-index.json`
Capability: Artifact kind, generated/manual/hybrid hints, direct-edit policy hints, producer hints, audience, and authority-role hints.

Index: `component-index`
Maintenance tool: `build-component-index`
Output: `tool-maintained-files/indexes/component-index.json`
Capability: PascalCase component definitions, consumers, stories, tests, and props hints.

Index: `accessor-index`
Maintenance tool: `build-accessor-index`
Output: `tool-maintained-files/indexes/accessor-index.json`
Capability: Accessor/API-like definitions, imports, read/write hints, cache hints, and boundary names.

Index: `schema-shape-index`
Maintenance tool: `build-schema-shape-index`
Output: `tool-maintained-files/indexes/schema-shape-index.json`
Capability: Schema-like declarations, validators, fields, relations, and generated type hints.

Index: `test-index`
Maintenance tool: `build-test-index`
Output: `tool-maintained-files/indexes/test-index.json`
Capability: Test and story files, imports, likely subjects, fixture references, and route/component hints.

Index: `fixture-scenario-index`
Maintenance tool: `build-fixture-scenario-index`
Output: `tool-maintained-files/indexes/fixture-scenario-index.json`
Capability: Fixture, mock, seed, scenario, demo-data, and example artifacts with represented term hints.

Index: `route-index`
Maintenance tool: `build-route-index`
Output: `tool-maintained-files/indexes/route-index.json`
Capability: Route-like files, inferred route paths, params, families, pages, layouts, and handlers.

Index: `literal-index`
Maintenance tool: `build-literal-index`
Output: `tool-maintained-files/indexes/literal-index.json`
Capability: Quoted strings, policy-like values, status-like values, token-like values, and arbitrary style-like values.

Index: `term-index`
Maintenance tool: `build-term-index`
Output: `tool-maintained-files/indexes/term-index.json`
Capability: Domain terms, headings, identifiers, UI-looking literals, and nearby language.

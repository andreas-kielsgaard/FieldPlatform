
# Tool Map

Stratum 2 tools are deterministic query handles over Stratum 1 indexes or bounded file slices.

| Tool ID | Substrate | Runtime handles | Capability |
|---|---|---|---|
| `path-query` | path-index | path, area, artifact type, generated/manual hints, changed files | Query paths by path text, area, artifact kind, generated/manual hint, or changed-file context. |
| `retrieve-slice` | files plus indexes | file path, start line, end line, limit | Retrieve a bounded file slice by line range without loading the whole file. |
| `symbol-query` | symbol-index | definition, usages, imports, exports, dependents | Query definitions, usages, imports, exports, re-exports, and likely dependent files. |
| `dependency-query` | dependency-index | dependencies, dependents, cross-area edges, importer, imported | Query dependencies, dependents, import edges, cross-area edges, and rough boundary evidence. |
| `route-query` | route-index | route, file, params, family, handler | Query route paths, pages, layouts, params, route families, and route-like files. |
| `component-query` | component-index | definition, consumers, stories, tests, props hints | Query component definitions, consumers, stories, tests, props hints, and nearby component names. |
| `term-query` | term-index | canonical, all, identifiers, ui-literals, cooccurs, drift, replace-preview | Query terms across prose, identifiers, headings, UI-looking literals, and co-occurrence contexts. |
| `literal-query` | literal-index | string, role/capability, status, token-like, arbitrary value | Query string literals, policy-like values, status values, token-like values, and arbitrary style-like values. |
| `doc-ref-query` | doc-reference-index | path refs, headings, inline IDs, broken links | Query docs links, headings, file references, inline IDs, and broken local references. |
| `artifact-query` | artifact-metadata-index | maintenance-path, producer, direct-edit policy, audience, authority role | Query generated/manual/hybrid hints, producer hints, direct-edit policy hints, audience, and authority role. |
| `test-query` | test-index | tests by source, tests by symbol, stories by component, e2e by route | Query tests and stories by source, symbol, route, fixture, or likely tested subject. |
| `fixture-query` | fixture-scenario-index | scenario usage, fixture consumers, concept usage, changed fixture impact | Query fixture, mock, seed, scenario, demo, and example artifacts and represented concepts. |
| `schema-query` | schema-shape-index | entity shape, field usage, validator mapping, generated type mapping | Query schema-like declarations, field hints, validators, generated type hints, and relation hints. |
| `accessor-query` | accessor-index | callers, input/output hints, read/write, cache/invalidation notes | Query accessor/API-like definitions, callers, read/write hints, imports, and cache hints. |
| `diff-query` | change-index | changed files, changed symbols by follow-up query, changed docs, generated artifacts | Query changed files, status codes, artifact kinds, and changed area hints. |
| `pattern-candidate-query` | component-index, literal-index, term-index | similar names, repeated literals, nearby terms, candidate patterns | Query repeated component-like names, similar literals, nearby terms, and candidate pattern evidence. |

## Maintenance Rules

- Modes, behaviors, lenses, and skills reference logical tool IDs from this map.
- Tool semantic files describe capability and boundaries; scripts own execution.
- Do not ask tools to decide semantic questions such as rightful ownership, authority, audience, abstraction quality, or whether two patterns mean the same thing.
- If defining the tool input is as expensive as solving the task directly, reason directly or use a smaller query.

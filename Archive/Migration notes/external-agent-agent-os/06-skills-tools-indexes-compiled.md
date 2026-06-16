# Skills, Tools, And Indexes Compiled

## Strata

The Agent OS separates evidence support into strata:

- Stratum 1 indexes: generated or maintained evidence substrates.
- Stratum 2 tools: deterministic query handles over indexes or bounded file slices.
- Stratum 3 skills: aggregator routines that shape bounded multi-tool evidence packets.
- Stratum 4 skills: reasoning workflow guides that help agents use evidence without delegating judgment.

Skills and tools are cues, not mandatory ceremony. Use them when they lower uncertainty, context cost, or repeated choreography.

## Skill Rules

- Use skills when repeated tool choreography, evidence shaping, context budgeting, or semantic workflow guidance helps.
- Skip skills when already-loaded context or a single direct query is enough.
- Skills are not decision authorities.
- Modes, structural behaviors, lenses, and agent judgment still own semantic conclusions.

## Stratum 3 Aggregator Skills

| Skill ID | Use when | Output |
|---|---|---|
| `affected-surface-mapping` | A change may affect more than directly edited files. | Bounded touched and likely affected surface packet. |
| `consumer-impact-preview` | Behavior may affect consumers or examples. | Consumer tree and impacted docs/tests/examples. |
| `rename-impact-preview` | Before non-trivial concept, symbol, label, route, fixture, or file rename. | Rename impact packet without mutation. |
| `test-relation-scan` | Choosing targeted regression checks. | Related tests, stories, examples, and gaps. |
| `boundary-verification` | Placement, movement, or interface decisions depend on dependency direction. | Boundary evidence and likely violations. |
| `generated-artifact-maintenance` | Generated, derived, indexed, or tool-maintained artifacts are touched. | Edit-source/regenerate/manual-exception evidence packet. |
| `docs-reference-drift-scan` | Docs, maps, or instruction references may be stale. | Broken or stale reference evidence. |
| `schema-fixture-drift-scan` | Persisted/data shape may drift from mocks or accessors. | Schema, fixture, accessor, and literal mismatch evidence. |
| `component-reuse-evidence` | Deciding component reuse, extension, branch, or extraction. | Similar components, usage, variants, extraction candidates. |
| `scenario-impact-scan` | Fixture or scenario changes may affect examples, tests, or mock flows. | Scenario consumers, schema alignment, concept references. |
| `state-impact-scan` | Shared state, URL state, cache state, or store ownership changes. | State owner and consumer evidence. |
| `policy-literal-drift-scan` | Permission or visibility wording may drift from policy surfaces. | Policy, role, and capability literal evidence. |
| `design-token-drift-scan` | Design-system or visual rule drift is suspected. | Hardcoded token-like and repeated visual-rule evidence. |
| `source-orientation-refresh` | Source orientation or generated index freshness matters. | Stale orientation/index warning and refresh plan. |
| `change-report-assembly` | Substantial task handoff or review reporting. | Structured completion report scaffold plus evidence. |

## Stratum 4 Reasoning Workflow Skills

| Skill ID | Use when | Output |
|---|---|---|
| `operational-planning` | Choosing which skills/tools are worth activating. | Minimal evidence plan. |
| `context-budgeting-workflow` | Tool use may cost more context than it saves. | Query, slice, or direct-reasoning decision. |
| `index-trust-workflow` | Before relying on absence or generated evidence. | Index trust and freshness judgment. |
| `authority-resolution` | A rule, convention, map entry, or instruction needs a source of truth. | Authority decision prompt plus evidence. |
| `audience-placement` | Content could belong in agent instructions, human docs, product copy, tests, examples, generated output, or migration notes. | Audience placement prompt plus evidence. |
| `human-doc-to-agent-instruction` | Human docs contain agent-operational guidance. | Promoted instruction proposal with authority/audience checks. |
| `safe-rename-workflow` | Distinguishing pure rename, semantic rename, alias, split, merge, or deprecation. | Rename type questions and bounded impact evidence. |
| `reuse-or-branch-evidence-workflow` | A near match exists and abstraction quality is at stake. | Evidence plan for reuse, extend, branch, extract, or define from scratch. |
| `provisional-promotion-workflow` | Local/provisional work may become precedent. | Promotion, keep-local, or defer decision prompt. |
| `bounded-review-workflow` | Exhaustive final review would be noisy. | Narrow review/check path. |
| `exception-and-debt-workflow` | An imperfection is intentionally left in place. | Debt, experiment, or unresolved-language classification prompt. |
| `implementation-handoff-workflow` | Reporting substantial completed implementation work. | Final handoff from deterministic evidence plus judgment. |

## Stratum 1 Indexes

Indexes are generated or maintained substrates. They make facts cheap to retrieve but are not semantic authority.

| Index ID | Tier | Capability |
|---|---|---|
| `index-manifest` | mandatory boot context | Compact awareness of active evidence indexes, freshness, hashes, shards, commands, and first-query guidance. |
| `path-index` | boot-core | Files, directories, extensions, areas, artifact kinds, generated/manual hints. |
| `change-index` | boot-core | Git status, changed files, artifact kind hints, changed surface hints. |
| `dependency-index` | boot-core | Import/export/require edges and rough cross-area hints. |
| `symbol-index` | boot-core | Exported, imported, and local symbols from lightweight scanning. |
| `doc-reference-index` | boot-core | Markdown links, headings, path refs, inline IDs, local existence hints. |
| `artifact-metadata-index` | boot-core | Generated/manual/hybrid hints, producer hints, direct-edit policy, audience, authority role. |
| `component-index` | strong cue | Component definitions, consumers, stories, tests, props hints. |
| `accessor-index` | strong cue | Accessor/API-like definitions, imports, read/write hints, cache hints, boundary names. |
| `schema-shape-index` | strong cue | Schema-like declarations, validators, fields, relations, generated type hints. |
| `test-index` | strong cue | Test and story files, imports, likely subjects, fixture references. |
| `fixture-scenario-index` | strong cue | Fixture, mock, seed, scenario, demo, example artifacts and term hints. |
| `route-index` | specialized cue | Route-like files, inferred route paths, params, pages, handlers. |
| `literal-index` | specialized cue | Strings, policy-like values, status values, token-like values, arbitrary style-like values. |
| `term-index` | specialized cue | Domain terms, headings, identifiers, UI-looking literals, nearby language. |

Current manifest summary from the worktree shows generated records for all active indexes. `change-index` currently reports zero records because its manifest row reflects committed-baseline mode.

## Stratum 2 Deterministic Tools

| Tool ID | Capability |
|---|---|
| `path-query` | Query paths by text, area, artifact kind, generated/manual hint, or changed-file context. |
| `retrieve-slice` | Retrieve a bounded file slice by line range. |
| `symbol-query` | Query definitions, usages, imports, exports, re-exports, and likely dependents. |
| `dependency-query` | Query dependencies, dependents, import edges, and rough boundary evidence. |
| `route-query` | Query route paths, pages, layouts, params, route families, and route-like files. |
| `component-query` | Query component definitions, consumers, stories, tests, props hints, nearby names. |
| `term-query` | Query terms across prose, identifiers, headings, UI-looking literals, and co-occurrences. |
| `literal-query` | Query string literals, policy values, status values, token-like values, arbitrary styles. |
| `doc-ref-query` | Query docs links, headings, file refs, inline IDs, and broken local references. |
| `artifact-query` | Query maintenance path, producer, direct-edit policy, audience, and authority role. |
| `test-query` | Query tests and stories by source, symbol, route, fixture, or likely subject. |
| `fixture-query` | Query fixture/mock/seed/scenario/demo/example artifacts and represented concepts. |
| `schema-query` | Query schema-like declarations, field hints, validators, generated type hints, relations. |
| `accessor-query` | Query API/accessor definitions, callers, read/write hints, imports, and cache notes. |
| `diff-query` | Query changed files, status codes, artifact kinds, and changed area hints. |
| `semantic-candidate-query` | Query deterministic text chunks for fuzzy candidate recall. |
| `pattern-candidate-query` | Query repeated names, similar literals, nearby terms, and candidate patterns. |

Tool semantic files describe capabilities and boundaries. Executable scripts under `tool-implementations/` own execution.

## Semantic Support

Active semantic surfaces:

- `semantic-chunk-index`: deterministic lexical text chunks with no embeddings or vector store.
- `semantic-candidate-query`: bounded lexical candidate chunks for fuzzy recall, near-match discovery, reuse evidence, rename candidates, and broad orientation.

Reserved future surfaces:

- `semantic-embedding-index`
- `semantic-vector-store-manifest`

Semantic candidates are leads. Follow up with exact queries, source reads, or selected skills before drawing semantic conclusions.

## Maintenance Commands

Common checks and builders named by the Agent OS:

```powershell
npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json
npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --check --json
npx --yes tsx tool-implementations/indexes/build-index-manifest.ts --check --json
npx --yes tsx tool-implementations/semantic/build-semantic-chunk-index.ts --check --json
```

For commit preparation when generated artifacts are included:

```powershell
npx --yes tsx tool-implementations/indexes/build-change-index.ts --commit-view --json
npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --commit-view --json
```

Run tools from the Agent OS root or pass `--root`.

## Hard Boundaries

- Do not load raw generated index record arrays as boot context.
- Do not hand-maintain generated metadata.
- Do not let tool output decide authority, ownership, audience, or abstraction quality.
- Treat missing metadata, stale artifacts, and no-match results as uncertainty.
- Keep semantic chunks, embeddings, and vector-store payloads query-only.

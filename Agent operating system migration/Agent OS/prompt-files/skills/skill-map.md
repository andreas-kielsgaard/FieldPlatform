
# Skill Map

Skills are optional operational drivers. They help agents gather, shape, and apply context without turning every task into ceremony.

## Stratum 3 Aggregator Skills

| Skill ID | Use when | Underlying tools | Output | Context risk |
|---|---|---|---|---|
| `affected-surface-mapping` | Use when a planned or actual change may affect more than the directly edited files. | diff-query, symbol-query, dependency-query, route-query, component-query, term-query, doc-ref-query, semantic-candidate-query | Bounded touched and likely affected surface packet. | Medium |
| `consumer-impact-preview` | Use when changed behavior may affect consumers or examples. | symbol-query, component-query, accessor-query, route-query, doc-ref-query, test-query | Consumer tree and impacted docs/tests/examples for a typed surface. | Medium |
| `rename-impact-preview` | Use before a non-trivial concept, symbol, label, route, fixture, or file rename. | term-query, symbol-query, literal-query, route-query, fixture-query, doc-ref-query, semantic-candidate-query | Rename impact packet without mutation. | Medium |
| `test-relation-scan` | Use when deciding targeted regression checks. | test-query, component-query, accessor-query, route-query, fixture-query | Related tests, stories, examples, and obvious gaps. | Low |
| `boundary-verification` | Use when placement, movement, or interface decisions depend on dependency direction. | dependency-query, path-query, artifact-query | Boundary evidence and likely rule violations. | Medium |
| `generated-artifact-maintenance` | Use when generated, derived, indexed, or tool-maintained artifacts are touched. | artifact-query, diff-query, doc-ref-query | Edit-source/regenerate/manual-exception evidence packet. | Low |
| `docs-reference-drift-scan` | Use when docs, maps, or instruction references may be stale. | doc-ref-query, symbol-query, path-query, diff-query | Broken or stale reference evidence. | Low |
| `schema-fixture-drift-scan` | Use when persisted/data shape changes may drift from mocks or accessors. | schema-query, fixture-query, accessor-query, literal-query | Schema, fixture, accessor, and literal shape mismatch evidence. | Medium |
| `component-reuse-evidence` | Use before deciding component reuse, extension, branch, or extraction. | component-query, pattern-candidate-query, literal-query, semantic-candidate-query | Similar components, usage, variant clues, and extraction candidates. | Medium |
| `scenario-impact-scan` | Use when fixture or scenario changes may affect examples, tests, or mock flows. | fixture-query, term-query, test-query, schema-query | Scenario consumers, schema alignment, and concept references. | Low |
| `state-impact-scan` | Use when shared state, URL state, cache state, or store ownership changes. | symbol-query, route-query, accessor-query, test-query | State owner and consumer evidence using generic indexes until state conventions mature. | Medium |
| `policy-literal-drift-scan` | Use when permission or visibility wording may drift from policy surfaces. | literal-query, term-query, path-query | Raw policy/role/capability literal evidence. | Low |
| `design-token-drift-scan` | Use when design-system or visual rule drift is suspected. | literal-query, component-query, path-query | Hardcoded token-like values and repeated visual-rule evidence. | Low |
| `source-orientation-refresh` | Use when source orientation or generated index freshness matters. | index-manifest, build-all-indexes, build-path-index, doc-ref-query, artifact-query, semantic-candidate-query | Stale orientation/index warning and refresh plan. | Low |
| `change-report-assembly` | Use for substantial task handoff or review reporting. | affected-surface-mapping, diff-query, test-relation-scan | Structured completion report scaffold with judgment fields left to the agent. | Low |

## Stratum 4 Reasoning Workflow Skills

| Skill ID | Use when | Tool support | Output | Context risk |
|---|---|---|---|---|
| `operational-planning` | Use when choosing which skills/tools are worth activating for selected modes and behaviors. | any selected tool or skill | Minimal evidence plan. | Low |
| `context-budgeting-workflow` | Use when tool use may cost more context than it saves. | any selected tool or skill | Decision to query, retrieve a slice, or reason from loaded context. | Low |
| `index-trust-workflow` | Use before relying on absence or generated evidence. | index-manifest, artifact-query, path-query, relevant index builders | Index trust and freshness judgment. | Low |
| `authority-resolution` | Use when a rule, convention, map entry, or instruction needs a rightful source of truth. | doc-ref-query, artifact-query, term-query | Authority decision prompt plus evidence. | Medium |
| `audience-placement` | Use when content could belong in agent instructions, human docs, product copy, tests, examples, generated output, or migration notes. | path-query, doc-ref-query, artifact-query | Audience placement decision prompt plus evidence. | Low |
| `human-doc-to-agent-instruction` | Use when human documentation contains guidance agents may need as operating guidance. | authority-resolution, audience-placement, doc-ref-query | Promoted instruction proposal with authority/audience checks. | Medium |
| `safe-rename-workflow` | Use when distinguishing pure rename, semantic rename, alias, split, merge, or deprecation. | rename-impact-preview, term-query, symbol-query, doc-ref-query | Rename type questions and bounded impact evidence. | Medium |
| `reuse-or-branch-evidence-workflow` | Use when a near match exists and abstraction quality is at stake. | component-reuse-evidence, symbol-query, pattern-candidate-query, semantic-candidate-query | Evidence plan for reuse, extend, branch, extract, or define from scratch. | Medium |
| `provisional-promotion-workflow` | Use when local/provisional work may become precedent. | consumer-impact-preview, affected-surface-mapping, artifact-query | Promotion, keep-local, or defer decision prompt. | Medium |
| `bounded-review-workflow` | Use before final review when exhaustive checking would be noisy. | affected-surface-mapping, test-relation-scan, change-report-assembly | Narrow review/check path. | Low |
| `exception-and-debt-workflow` | Use when an imperfection is intentionally left in place. | affected-surface-mapping, artifact-query, doc-ref-query | Debt, experiment, or unresolved-language classification prompt. | Medium |
| `implementation-handoff-workflow` | Use when reporting substantial completed implementation work. | change-report-assembly, diff-query | Final handoff using deterministic evidence plus agent-owned judgment. | Low |

## Skill Rules

- Use a skill when repeated tool choreography, evidence shaping, context budgeting, or semantic workflow guidance would reduce confusion.
- Skip a skill when a single query or already-loaded context is enough.
- Skills are not decision authorities. Modes, behaviors, lenses, and agent judgment still own semantic conclusions.




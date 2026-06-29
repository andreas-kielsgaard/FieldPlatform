# Aggregator Skills
Proposes combined usage of several tools

`File:` entries in this map resolve to `prompt-files/skills/<file>.md`.

Most listed skills were designed around the retired generated index/query catalogue. Use the active replacement tools where listed below; otherwise treat legacy tool notes as historical unless the skill can be applied through source reads and standard checks, or the human prompt explicitly asks for legacy Agent OS index/query maintenance.

## Affected Surface Mapping
Use when a planned or actual change may affect more than the directly edited files.
File: `affected-surface-mapping`
Active command support: `change-surface`
Legacy tool notes (inactive): diff-query, symbol-query, dependency-query, route-query, component-query, term-query, doc-ref-query, semantic-candidate-query

## Consumer Impact Preview
File: `consumer-impact-preview`
Use when changed behavior may affect consumers or examples.
Active command support: `change-surface`; use source reads for semantic consumer judgment.
Legacy tool notes (inactive): symbol-query, component-query, accessor-query, route-query, doc-ref-query, test-query

## Rename Impact Preview
File: `rename-impact-preview`
Use before a non-trivial concept, symbol, label, route, fixture, or file rename.
Legacy tool notes (inactive): term-query, symbol-query, literal-query, route-query, fixture-query, doc-ref-query, semantic-candidate-query

## Test Relation Scan
File: `test-relation-scan`
Use when deciding targeted regression checks.
Active command support: `test-selection`
Legacy tool notes (inactive): test-query, component-query, accessor-query, route-query, fixture-query

## Boundary Verification
File: `boundary-verification`
Use when placement, movement, or interface decisions depend on dependency direction.
Active command support: `depcruise:active-source`, `change-surface`
Legacy tool notes (inactive): dependency-query, path-query, artifact-query

## Generated Artifact Maintenance
File: `generated-artifact-maintenance`
Use when generated, derived, indexed, or tool-maintained artifacts are touched.
Legacy tool notes (inactive): artifact-query, diff-query, doc-ref-query

## Docs Reference Drift Scan
File: `docs-reference-drift-scan`
Use when docs, maps, or instruction references may be stale.
Legacy tool notes (inactive): doc-ref-query, symbol-query, path-query, diff-query

## Schema Fixture Drift Scan
File: `schema-fixture-drift-scan`
Use when persisted/data shape changes may drift from mocks or accessors.
Legacy tool notes (inactive): schema-query, fixture-query, accessor-query, literal-query

## Component Reuse Evidence
File: `component-reuse-evidence`
Use before deciding component reuse, extension, branch, or extraction.
Legacy tool notes (inactive): component-query, pattern-candidate-query, literal-query, semantic-candidate-query

## Scenario Impact Scan
File: `scenario-impact-scan`
Use when fixture or scenario changes may affect examples, tests, or mock flows.
Legacy tool notes (inactive): fixture-query, term-query, test-query, schema-query

## State Impact Scan
File: `state-impact-scan`
Use when shared state, URL state, cache state, or store ownership changes.
Legacy tool notes (inactive): symbol-query, route-query, accessor-query, test-query

## Policy Literal Drift Scan
File: `policy-literal-drift-scan`
Use when permission or visibility wording may drift from policy surfaces.
Legacy tool notes (inactive): literal-query, term-query, path-query

## Design Token Drift Scan
File: `design-token-drift-scan`
Use when design-system or visual rule drift is suspected.
Legacy tool notes (inactive): literal-query, component-query, path-query

## Source Orientation Refresh
File: `source-orientation-refresh`
Use when selected source reads are needed after maps are insufficient; generated index freshness is legacy maintenance only.
Active command support: `change-surface` for changed/affected active source orientation, `repo-health` for broad health context.
Legacy tool notes (inactive): index-manifest, build-all-indexes, build-path-index, doc-ref-query, artifact-query, semantic-candidate-query

## Change Report Assembly
File: `change-report-assembly`
Use only when substantial task handoff or review reporting is explicitly requested or clearly needed.
Active command support: `change-verification`; keep normal completion in compact chat summaries.
Legacy tool notes (inactive): affected-surface-mapping, diff-query, test-relation-scan

# Reasoning Workflow Skills
Combines skils and reasoning proposals

## Operational Planning
File: `operational-planning`
Use when choosing which skills/tools are worth activating for selected modes and behaviors.
Legacy tool notes (inactive): any selected tool or skill

## Context Budgeting Workflow
File: `context-budgeting-workflow`
Use when tool use may cost more context than it saves.
Legacy tool notes (inactive): any selected tool or skill

## Index Trust Workflow
File: `index-trust-workflow`
Use before relying on absence or generated evidence.
Legacy tool notes (inactive): index-manifest, artifact-query, path-query, relevant index builders

## Authority Resolution
File: `authority-resolution`
Use when a rule, convention, map entry, or instruction needs a rightful source of truth.
Legacy tool notes (inactive): doc-ref-query, artifact-query, term-query

## Audience Placement
File: `audience-placement`
Use when content could belong in agent instructions, human docs, product copy, tests, examples, generated output, or migration notes.
Legacy tool notes (inactive): path-query, doc-ref-query, artifact-query

## Human Doc To Agent Instruction
File: `human-doc-to-agent-instruction`
Use when human documentation contains guidance agents may need as operating guidance.
Legacy tool notes (inactive): authority-resolution, audience-placement, doc-ref-query

## Safe Rename Workflow
File: `safe-rename-workflow`
Use when distinguishing pure rename, semantic rename, alias, split, merge, or deprecation.
Legacy tool notes (inactive): rename-impact-preview, term-query, symbol-query, doc-ref-query

## Reuse Or Branch Evidence Workflow
File: `reuse-or-branch-evidence-workflow`
Use when a near match exists and abstraction quality is at stake.
Legacy tool notes (inactive): component-reuse-evidence, symbol-query, pattern-candidate-query, semantic-candidate-query

## Provisional Promotion Workflow
File: `provisional-promotion-workflow`
Use when local/provisional work may become precedent.
Active command support: `change-surface`, `test-selection`
Legacy tool notes (inactive): consumer-impact-preview, affected-surface-mapping, artifact-query

## Bounded Review Workflow
File: `bounded-review-workflow`
Use before final review when exhaustive checking would be noisy.
Active command support: `change-verification`, `repo-health`
Legacy tool notes (inactive): affected-surface-mapping, test-relation-scan, change-report-assembly

## Exception And Compromise Workflow
File: `exception-and-compromise-workflow`
Use when an imperfection is intentionally left in place.
Active command support: `change-verification` when the exception changes planned checks.
Legacy tool notes (inactive): affected-surface-mapping, artifact-query, doc-ref-query

## Implementation Handoff Workflow
File: `implementation-handoff-workflow`
Use only when a substantial implementation handoff is explicitly requested or clearly needed.
Legacy tool notes (inactive): change-report-assembly, diff-query

# Reasoning Skill Map

`File:` entries in this map resolve to `prompt-files/skills/<file>.md`.

Use skills when they add reasoning structure beyond ordinary source reads. Keep activation light; a skill should help select evidence and judgment, not become ceremony.

## Affected Surface Mapping
File: `affected-surface-mapping`
Use when a planned or actual change may affect more than the directly edited files.
How: Use `change-surface`, then inspect source/config for semantic consumers.

## Consumer Impact Preview
File: `consumer-impact-preview`
Use when changed behavior may affect consumers or examples.
How: Use `change-surface`, `rg`, exported APIs, examples, fixtures, and tests to identify consumers.

## Rename Impact Preview
File: `rename-impact-preview`
Use before a non-trivial concept, symbol, label, route, fixture, or file rename.
How: Use `rg`, source reads, tests, route config, and explicit human-approved decisions when present.

## Test Relation Scan
File: `test-relation-scan`
Use when deciding targeted regression checks.
How: Use `test-selection` and `change-verification`; inspect runner output when needed.

## Boundary Verification
File: `boundary-verification`
Use when placement, movement, or interface decisions depend on dependency direction.
How: Use `depcruise:active-source`, dependency-cruiser config, source imports, and boundary reasoning.

## Generated Artifact Maintenance
File: `generated-artifact-maintenance`
Use when generated, derived, or tool-maintained artifacts are touched.
How: Identify the source, generator, and direct-edit policy; avoid refreshing generated outputs unless explicitly in scope.

## Docs Reference Drift Scan
File: `docs-reference-drift-scan`
Use when docs, maps, or instruction references may be stale.
How: Use `rg`, direct path/link inspection, and source reads.

## Schema Fixture Drift Scan
File: `schema-fixture-drift-scan`
Use when persisted/data shape changes may drift from mocks or accessors.
How: Inspect Drizzle schema, migrations, contracts, fixtures, persistence source, and tests.

## Component Reuse Evidence
File: `component-reuse-evidence`
Use before deciding component reuse, extension, branch, or extraction.
How: Inspect shared UI source, nearby components, stories, tests, styles, and consumers found with `rg`.

## State Impact Scan
File: `state-impact-scan`
Use when shared state, URL state, cache state, or store ownership changes.
How: Inspect state owners, route usage, accessors, cache invalidation, call sites, and tests.

## Change Report Assembly
File: `change-report-assembly`
Use only when substantial task handoff or review reporting is explicitly requested or clearly needed.
How: Use `change-verification`, final `git status`, changed files, checks run, and known unresolved risks.

## Operational Planning
File: `operational-planning`
Use when choosing which tools or skills are worth activating.
How: Match the task to evidence that will materially reduce uncertainty.

## Context Budgeting Workflow
File: `context-budgeting-workflow`
Use when evidence gathering may cost more context than it saves.
How: Prefer small source slices, top references, and targeted checks before broader reads.

## Evidence Trust Workflow
File: `evidence-trust-workflow`
Use before relying on absence, generated output, stale docs, or indirect evidence.
How: Prefer source/config/test evidence; treat tool output as bounded evidence with limitations.

## Authority Resolution
File: `authority-resolution`
Use when a rule, convention, map entry, or instruction needs a rightful source of truth.
How: Compare source/config, instructions, tests, docs, project decisions, and audience.

## Audience Placement
File: `audience-placement`
Use when content could belong in agent instructions, human docs, product copy, tests, examples, generated output, or migration notes.
How: Identify who reads or executes the content and move or reference it accordingly.

## Human Doc To Agent Instruction
File: `human-doc-to-agent-instruction`
Use when human documentation contains guidance agents may need as operating guidance.
How: Extract only actionable agent behavior and keep human explanation out of runtime prompts.

## Safe Rename Workflow
File: `safe-rename-workflow`
Use when distinguishing pure rename, semantic rename, alias, split, merge, or deprecation.
How: Use `rg`, source reads, tests, and explicit decisions to separate spelling from meaning.

## Reuse Or Branch Evidence Workflow
File: `reuse-or-branch-evidence-workflow`
Use when a near match exists and abstraction quality is at stake.
How: Inspect consumers, ownership, lifecycle, dependencies, and tests before reusing or branching.

## Provisional Promotion Workflow
File: `provisional-promotion-workflow`
Use when local/provisional work may become precedent.
How: Use `change-surface`, `test-selection`, source reads, and lifecycle reasoning.

## Bounded Review Workflow
File: `bounded-review-workflow`
Use before final review when exhaustive checking would be noisy.
How: Use `change-verification`, `repo-health` when useful, and a concise final risk review.

## Exception And Compromise Workflow
File: `exception-and-compromise-workflow`
Use when an imperfection is intentionally left in place.
How: Identify the compromise, containment, and follow-up trigger; report it in the final response unless durable documentation is explicitly requested.

## Implementation Handoff Workflow
File: `implementation-handoff-workflow`
Use only when a substantial implementation handoff is explicitly requested or clearly needed.
How: Summarize changed surfaces, intent, checks, decisions, and open risks.

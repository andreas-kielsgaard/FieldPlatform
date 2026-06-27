# Task Mode Map

This map tells agents when to ingest and use each task-mode instruction file.

Task modes classify the main kind of work being requested. Select the primary mode from the main source of change, then add secondary modes when the task crosses another surface.

Paths in this map that start with `task-modes/` are relative to `prompt-files/agent-attention-system/`.

Legacy tool notes are historical only. The broad generated index/query catalogue is retired from ordinary development; use human-maintained maps, selected source reads, `rg`, standard project checks, and the replacement development tools instead: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

## UI-Facing

Task mode: Exploratory UI build
Task mode details: `task-modes/ui-facing/exploratory-ui-build.instructions.md`
Proposed for: Building a new visible surface when product direction, component shape, copy, mock data, or visual treatment may still be exploratory.
Proposed secondary modes: `task-modes/ui-facing/new-component.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/domain-and-data/copy-or-naming-change.instructions.md`, `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Legacy tool notes (inactive): `component-query`, `route-query`, `test-relation-scan`, `term-query`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, `prompt-files/design-system-map.md`, `prompt-files/experiments.md`

Task mode: New component
Task mode details: `task-modes/ui-facing/new-component.instructions.md`
Proposed for: Creating a new reusable or local UI component, component API, visual variant, story, or component-owned interaction.
Proposed secondary modes: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Legacy tool notes (inactive): `component-query`, `literal-query`, `test-relation-scan`
Proposed semantic context: `prompt-files/design-system-map.md`, existing component examples or stories

Task mode: Modify existing component
Task mode details: `task-modes/ui-facing/modify-existing-component.instructions.md`
Proposed for: Changing behavior, props, layout, visual treatment, or usage of an existing component.
Proposed secondary modes: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`, `task-modes/maintenance-and-governance/review-before-commit.instructions.md`
Legacy tool notes (inactive): `component-query`, `consumer-impact-preview`, `test-relation-scan`
Proposed semantic context: component examples, stories, tests, and `prompt-files/design-system-map.md`

Task mode: Extract reusable pattern
Task mode details: `task-modes/ui-facing/extract-reusable-pattern.instructions.md`
Proposed for: Repeated page or component markup appears ready to become a reusable component, helper, layout, or shared UI pattern.
Proposed secondary modes: `task-modes/maintenance-and-governance/refactor.instructions.md`, `task-modes/ui-facing/modify-existing-component.instructions.md`, `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Legacy tool notes (inactive): `component-query`, `pattern-candidate-query`, `dependency-query`, `test-relation-scan`
Proposed semantic context: `prompt-files/design-system-map.md`, component examples, area-specific maps

Task mode: New route or page
Task mode details: `task-modes/ui-facing/new-route-or-page.instructions.md`
Proposed for: Adding or changing a navigable route, URL, page shell, route params, page loader/action, or route-level surface.
Proposed secondary modes: `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/state-management-change.instructions.md`, `task-modes/domain-and-data/copy-or-naming-change.instructions.md`
Legacy tool notes (inactive): `route-query`, `component-query`, `accessor-query`, `test-relation-scan`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, route examples, visibility rails when relevant

Task mode: Visual or design system change
Task mode details: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Proposed for: Changing design tokens, shared visual rules, status treatments, interaction patterns, primitive usage, or visual consistency.
Proposed secondary modes: `task-modes/ui-facing/new-component.instructions.md`, `task-modes/ui-facing/modify-existing-component.instructions.md`
Legacy tool notes (inactive): `literal-query`, `component-query`, `design-token-drift-scan`
Proposed semantic context: `prompt-files/design-system-map.md`, component examples or stories

## Domain And Data

Task mode: Domain concept change
Task mode details: `task-modes/domain-and-data/domain-concept-change.instructions.md`
Proposed for: Changing a domain term, concept, status, role, entity meaning, relationship, invariant, or product interpretation.
Proposed secondary modes: `task-modes/domain-and-data/copy-or-naming-change.instructions.md`, `task-modes/domain-and-data/data-model-change.instructions.md`, `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Legacy tool notes (inactive): `term-query`, `schema-query`, `fixture-query`, `accessor-query`
Proposed semantic context: `prompt-files/domain-glossary.md`, `project-control-files/field-platform-domain-rails.md`, area-specific maps

Task mode: Copy or naming change
Task mode details: `task-modes/domain-and-data/copy-or-naming-change.instructions.md`
Proposed for: Changing user-facing text, labels, naming families, identifiers, terminology, route names, or adjacent vocabulary.
Proposed secondary modes: `task-modes/domain-and-data/domain-concept-change.instructions.md`, `task-modes/ui-facing/new-route-or-page.instructions.md`, `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Legacy tool notes (inactive): `term-query`, `literal-query`, `rename-impact-preview`, `docs-reference-drift-scan`
Proposed semantic context: `prompt-files/domain-glossary.md`, product copy surfaces, relevant UI surfaces

Task mode: Data model change
Task mode details: `task-modes/domain-and-data/data-model-change.instructions.md`
Proposed for: Changing an entity, relation, lifecycle, invariant, domain data shape, contract, or data ownership model.
Proposed secondary modes: `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`
Legacy tool notes (inactive): `schema-query`, `accessor-query`, `fixture-query`, `test-relation-scan`
Proposed semantic context: `project-control-files/project-setup/data-model-rails.md`, `project-control-files/field-platform-domain-rails.md`, schema files

Task mode: Database schema or persistence change
Task mode details: `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`
Proposed for: Changing persisted fields, schema declarations, migrations, database indexes, storage behavior, or persistence contracts.
Proposed secondary modes: `task-modes/domain-and-data/data-model-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`
Legacy tool notes (inactive): `schema-query`, `fixture-query`, `accessor-query`, `test-relation-scan`
Proposed semantic context: `project-control-files/project-setup/data-model-rails.md`, schema and migration artifacts

Task mode: API or accessor change
Task mode details: `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Proposed for: Changing accessors, API boundaries, queries, mutations, caching, invalidation, server actions, or consumers of data contracts.
Proposed secondary modes: `task-modes/domain-and-data/state-management-change.instructions.md`, `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`
Legacy tool notes (inactive): `accessor-query`, `schema-query`, `dependency-query`, `consumer-impact-preview`, `test-relation-scan`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, accessor files, relevant schema contracts

Task mode: Mock data change
Task mode details: `task-modes/domain-and-data/mock-data-change.instructions.md`
Proposed for: Changing mocks, seeds, fixtures, scenarios, demo data, examples, or represented scenario assumptions.
Proposed secondary modes: `task-modes/domain-and-data/domain-concept-change.instructions.md`, component examples or stories
Legacy tool notes (inactive): `fixture-query`, `schema-query`, `term-query`, `scenario-impact-scan`, `test-relation-scan`
Proposed semantic context: fixture files, scenario examples, `prompt-files/domain-glossary.md`

Task mode: State management change
Task mode details: `task-modes/domain-and-data/state-management-change.instructions.md`
Proposed for: Changing shared state, URL state, server state, cache state, store/context behavior, state ownership, or data flow.
Proposed secondary modes: `task-modes/maintenance-and-governance/bug-fix.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/ui-facing/new-route-or-page.instructions.md`
Legacy tool notes (inactive): `state-impact-scan`, `symbol-query`, `route-query`, `accessor-query`, `test-query`
Proposed semantic context: state owners, route surfaces, accessor contracts

Task mode: Permissions or visibility change
Task mode details: `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`
Proposed for: Changing permission, capability, visibility rule, publication state, review state, policy, guard, or access behavior.
Proposed secondary modes: `task-modes/ui-facing/new-route-or-page.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Legacy tool notes (inactive): `literal-query`, `term-query`, `policy-literal-drift-scan`, `accessor-query`, `test-relation-scan`
Proposed semantic context: `project-control-files/project-setup/visibility-review-publication-model.md`, policy files, guarded UI surfaces

## Maintenance And Governance

Task mode: Refactor
Task mode details: `task-modes/maintenance-and-governance/refactor.instructions.md`
Proposed for: Structural cleanup without intended behavior change, including movement, extraction, simplification, or local organization.
Proposed secondary modes: the component, accessor, schema, route, or structural-maintenance behavior for the target area
Legacy tool notes (inactive): `dependency-query`, `symbol-query`, `component-query`, `test-relation-scan`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, area-specific maps

Task mode: Bug fix
Task mode details: `task-modes/maintenance-and-governance/bug-fix.instructions.md`
Proposed for: Fixing broken, regressed, inconsistent, or unintended behavior.
Proposed secondary modes: the task mode for the layer that caused the bug
Legacy tool notes (inactive): `test-query`, `symbol-query`, `component-query`, `accessor-query`, `route-query`
Proposed semantic context: failing tests, bug reproduction, impacted source surfaces

Task mode: Documentation or context update
Task mode details: `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Proposed for: Changing agent instructions, project maps, ledgers, checklists, tool contracts, generated-index guidance, context files, or documentation memory.
Proposed secondary modes: any mode whose project memory or instructions changed
Legacy tool notes (inactive): `path-query`, `docs-reference-drift-scan`, `authority-resolution`, `audience-placement`, `artifact-query`
Proposed semantic context: `AGENTS.md`, relevant prompt files, project-control files, `prompt-files/known-debt.md`

Task mode: Review before commit
Task mode details: `task-modes/maintenance-and-governance/review-before-commit.instructions.md`
Proposed for: Handoff, commit preparation, final self-review, or checking a completed change before reporting it.
Proposed secondary modes: all modes used during the task
Legacy tool notes (inactive): `affected-surface-mapping`, `test-relation-scan`, `change-report-assembly`, `diff-query`
Proposed semantic context: changed files, selected mode files, selected behavior files

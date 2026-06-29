# Task Mode Map

Task modes classify the main kind of work being requested. Select the primary mode from the main source of change, then add secondary modes only when the task crosses another surface.

Paths in this map that start with `task-modes/` are relative to `prompt-files/agent-attention-system/`.

Use source reads, `rg`, standard checks, active replacement tools, and reasoning for evidence. Human-owned project decisions under repository-root `project-decisions/` are advisory context; load only the relevant decision file when mature project decisions are directly relevant.

## UI-Facing

Task mode: Exploratory UI build
Task mode details: `task-modes/ui-facing/exploratory-ui-build.instructions.md`
Proposed for: Building a new visible surface when product direction, component shape, copy, mock data, or visual treatment may still be exploratory.
Proposed secondary modes: `task-modes/ui-facing/new-component.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/domain-and-data/copy-or-naming-change.instructions.md`, `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Useful context: nearby source, route/page examples, component examples, styles, tests, and relevant advisory project decisions.

Task mode: New component
Task mode details: `task-modes/ui-facing/new-component.instructions.md`
Proposed for: Creating a reusable or local UI component, component API, visual variant, story, or component-owned interaction.
Proposed secondary modes: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Useful context: existing component examples, shared UI source, styles, stories, and tests.

Task mode: Modify existing component
Task mode details: `task-modes/ui-facing/modify-existing-component.instructions.md`
Proposed for: Changing behavior, props, layout, visual treatment, or usage of an existing component.
Proposed secondary modes: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`, `task-modes/maintenance-and-governance/review-before-commit.instructions.md`
Useful context: component source, consumers found with `rg`, stories, tests, and shared UI/style source.

Task mode: Extract reusable pattern
Task mode details: `task-modes/ui-facing/extract-reusable-pattern.instructions.md`
Proposed for: Repeated page or component markup appears ready to become a reusable component, helper, layout, or shared UI pattern.
Proposed secondary modes: `task-modes/maintenance-and-governance/refactor.instructions.md`, `task-modes/ui-facing/modify-existing-component.instructions.md`, `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Useful context: repeated source, current consumers, nearby examples, dependency boundaries, and relevant advisory project decisions.

Task mode: New route or page
Task mode details: `task-modes/ui-facing/new-route-or-page.instructions.md`
Proposed for: Adding or changing a navigable route, URL, page shell, route params, page loader/action, or route-level surface.
Proposed secondary modes: `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/state-management-change.instructions.md`, `task-modes/domain-and-data/copy-or-naming-change.instructions.md`
Useful context: route config, nearby route modules, module public entrypoints, guarded UI/source, tests, and relevant advisory project decisions.

Task mode: Visual or design system change
Task mode details: `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Proposed for: Changing design tokens, shared visual rules, status treatments, interaction patterns, primitive usage, or visual consistency.
Proposed secondary modes: `task-modes/ui-facing/new-component.instructions.md`, `task-modes/ui-facing/modify-existing-component.instructions.md`
Useful context: shared UI source, styles, component examples, stories, screenshots or browser checks when relevant.

## Domain And Data

Task mode: Domain concept change
Task mode details: `task-modes/domain-and-data/domain-concept-change.instructions.md`
Proposed for: Changing a domain term, concept, status, role, entity meaning, relationship, invariant, or product interpretation.
Proposed secondary modes: `task-modes/domain-and-data/copy-or-naming-change.instructions.md`, `task-modes/domain-and-data/data-model-change.instructions.md`, `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Useful context: source occurrences found with `rg`, schema/contracts, fixtures, tests, UI copy, and relevant advisory project decisions.

Task mode: Copy or naming change
Task mode details: `task-modes/domain-and-data/copy-or-naming-change.instructions.md`
Proposed for: Changing user-facing text, labels, naming families, identifiers, terminology, route names, or adjacent vocabulary.
Proposed secondary modes: `task-modes/domain-and-data/domain-concept-change.instructions.md`, `task-modes/ui-facing/new-route-or-page.instructions.md`, `task-modes/ui-facing/visual-or-design-system-change.instructions.md`
Useful context: `rg` occurrences, UI/source copy, tests, route labels, fixture names, and explicit human-approved decisions when present.

Task mode: Data model change
Task mode details: `task-modes/domain-and-data/data-model-change.instructions.md`
Proposed for: Changing an entity, relation, lifecycle, invariant, domain data shape, contract, or data ownership model.
Proposed secondary modes: `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`
Useful context: domain source, contracts, persistence source, Drizzle schema/migrations, fixtures, tests, and relevant advisory project decisions.

Task mode: Database schema or persistence change
Task mode details: `task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`
Proposed for: Changing persisted fields, schema declarations, migrations, database indexes, storage behavior, or persistence contracts.
Proposed secondary modes: `task-modes/domain-and-data/data-model-change.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/domain-and-data/mock-data-change.instructions.md`
Useful context: Drizzle schema, migrations, persistence source, Zod/contracts, database config, fixtures, tests, and change-verification.

Task mode: API or accessor change
Task mode details: `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Proposed for: Changing accessors, API boundaries, queries, mutations, caching, invalidation, server actions, or consumers of data contracts.
Proposed secondary modes: `task-modes/domain-and-data/state-management-change.instructions.md`, `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`
Useful context: module public entrypoints, call sites found with `rg`, contracts, persistence source, tests, dependency boundaries, and change-surface.

Task mode: Mock data change
Task mode details: `task-modes/domain-and-data/mock-data-change.instructions.md`
Proposed for: Changing mocks, seeds, fixtures, scenarios, demo data, examples, or represented scenario assumptions.
Proposed secondary modes: `task-modes/domain-and-data/domain-concept-change.instructions.md`, component examples or stories
Useful context: fixture source, schema/contracts, tests, consuming stories/examples, and source occurrences found with `rg`.

Task mode: State management change
Task mode details: `task-modes/domain-and-data/state-management-change.instructions.md`
Proposed for: Changing shared state, URL state, server state, cache state, store/context behavior, state ownership, or data flow.
Proposed secondary modes: `task-modes/maintenance-and-governance/bug-fix.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`, `task-modes/ui-facing/new-route-or-page.instructions.md`
Useful context: state owners, route surfaces, accessor contracts, call sites, and targeted tests.

Task mode: Permissions or visibility change
Task mode details: `task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`
Proposed for: Changing permission, capability, visibility rule, publication state, review state, policy, guard, or access behavior.
Proposed secondary modes: `task-modes/ui-facing/new-route-or-page.instructions.md`, `task-modes/domain-and-data/api-or-accessor-change.instructions.md`
Useful context: policy source, guarded routes/UI, server checks, tests, fixtures, and source literals found with `rg`.

## Maintenance And Governance

Task mode: Refactor
Task mode details: `task-modes/maintenance-and-governance/refactor.instructions.md`
Proposed for: Structural cleanup without intended behavior change, including movement, extraction, simplification, or local organization.
Proposed secondary modes: the component, accessor, schema, route, or structural-maintenance behavior for the target area.
Useful context: changed source, imports/consumers, dependency-cruiser output, tests, and relevant advisory project decisions.

Task mode: Bug fix
Task mode details: `task-modes/maintenance-and-governance/bug-fix.instructions.md`
Proposed for: Fixing broken, regressed, inconsistent, or unintended behavior.
Proposed secondary modes: the task mode for the layer that caused the bug.
Useful context: failing tests, reproduction steps, impacted source, recent changes, and targeted verification.

Task mode: Documentation or context update
Task mode details: `task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
Proposed for: Changing agent instructions, project maps, checklists, tool contracts, context files, or documentation.
Proposed secondary modes: any mode whose project context or instructions changed.
Useful context: `AGENTS.md`, relevant prompt files, project-control routing files, source/config references, and advisory project decisions when affected.

Task mode: Review before commit
Task mode details: `task-modes/maintenance-and-governance/review-before-commit.instructions.md`
Proposed for: Handoff, commit preparation, final self-review, or checking a completed change before reporting it.
Proposed secondary modes: all modes used during the task.
Useful context: changed files, selected mode/behavior files, change-verification, repo-health when useful, and final `git status`.

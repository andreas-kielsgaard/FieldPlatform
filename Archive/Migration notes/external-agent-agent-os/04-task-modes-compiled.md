# Task Modes Compiled

## Purpose

Task modes classify the kind of work being done and cue the right context, evidence, checks, documentation updates, and report fields.

The task-mode layer is not meant to make every task ceremonial. Select one primary mode based on the main source of entropy, then add secondary modes for concrete cross-surface concerns.

## Selection Process

1. Read the user request.
2. Identify the main change being made.
3. Choose the primary mode from the main source of entropy.
4. Add secondary modes for triggered cross-surface concerns.
5. Read each selected mode file before meaningful edits.
6. Enter structural maintenance when placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority decisions appear.

## Declaration Shape

For implementation, refactor, review, or documentation work, state:

```text
Primary mode:
Secondary modes:
Reason for mode selection:
Surfaces likely affected:
```

## Escalation Triggers

- Domain term, concept, status, role, or relationship: domain concept change.
- User-facing text, label, or naming family: copy or naming change.
- Route, URL, page shell, or navigable surface: new route or page.
- Schema, persisted field, migration, index, or storage behavior: database schema or persistence change.
- Entity, relation, lifecycle, invariant, or data shape: data model change.
- Accessor, API boundary, query, mutation, caching, or invalidation: API or accessor change.
- Mock, seed, fixture, scenario, or demo data: mock data change.
- Shared state, URL state, server state, store, or context behavior: state-management change.
- Permission, capability, visibility rule, policy, or guard: permissions or visibility change.
- Shared component, reusable pattern, component API, or variant: new or modified component.
- Design token, primitive, visual rule, status treatment, or interaction pattern: visual or design-system change.
- Structural cleanup without intended behavior change: refactor.
- Broken or regressed behavior: bug fix.
- Agent instructions, maps, ledgers, checklists, tool contracts, generated indexes, or maintenance paths: documentation or context update.
- Handoff, commit preparation, or final self-review: review before commit.

## Domain And Data Modes

### API Or Accessor Change

Use when data access, service boundaries, query/mutation behavior, caching, invalidation, DTOs, or caller contracts change.

Primary concerns: boundary ownership, input/output contracts, consumers, validation, permissions, cache behavior, tests, and documentation of changed access patterns.

### Copy Or Naming Change

Use when labels, user-facing text, route names, object names, field names, status text, or naming families change.

Primary concerns: canonical terms, aliases, avoided names, drift across UI/schema/mocks/tests/docs, and whether the change is local copy or durable ontology.

### Data Model Change

Use when entities, relations, lifecycle state, invariants, domain objects, or data shapes change.

Primary concerns: domain glossary, schema, accessors, fixtures, UI assumptions, tests, and whether the model is source-of-truth or derived.

### Database Schema Or Persistence Change

Use when tables, migrations, persisted fields, indexes, constraints, generated DB artifacts, or persistence behavior change.

Primary concerns: schema/source boundary, migration validity, generated output, data accessors, fixtures, validation, and rollback or compatibility expectations.

### Domain Concept Change

Use when a product/domain concept, role, status, relationship, authority, lifecycle, or meaning changes.

Primary concerns: glossary, naming, model, schema, policy, UI language, mocks, tests, and whether multiple surfaces now share the same semantic rule.

### Mock Data Change

Use when fixtures, seeds, demo data, examples, stories, or mock scenarios change.

Primary concerns: realism, hidden contracts, schema alignment, represented concepts, scenario consumers, and caveats when mocks are provisional.

### Permissions Or Visibility Change

Use when capability, policy, guard, visibility, publishing, review, or access decisions change.

Primary concerns: policy authority, guarded routes/components, accessors, raw literals, tests, and preventing local UI logic from becoming policy source-of-truth.

### State Management Change

Use when shared state, URL state, server state, cache ownership, store/context boundaries, or state lifecycle changes.

Primary concerns: state owner, consumers, derived state, cache invalidation, route behavior, test coverage, and preventing local state from absorbing shared concerns.

## Maintenance And Governance Modes

### Bug Fix

Use for broken or regressed behavior.

Primary concerns: root cause, failing behavior, smallest credible fix, related tests, regression risk, and any structural mode for the layer that caused the bug.

### Documentation Or Context Update

Use for agent instructions, project maps, ledgers, checklists, documentation, tool contracts, generated/indexed artifacts, and project memory.

Primary concerns: source-of-truth ownership, audience, duplicate/conflicting instructions, generated/manual boundaries, smallest owning document, and whether structural maintenance is needed.

### Refactor

Use for structural cleanup without intended behavior change.

Primary concerns: preserving behavior and contracts, dependency direction, affected consumers, tests, generated maps/indexes, debt, and avoiding opportunistic behavior changes.

### Review Before Commit

Use for final review, handoff, or commit preparation.

Primary concerns: changed files, affected surfaces, checks, generated artifacts, unresolved debt, branch safety, coherent commit slicing, and concise report fields.

## UI-Facing Modes

### Exploratory UI Build

Use for building a visible surface while product shape is still emerging.

Primary concerns: real usable experience, likely components, mock data assumptions, copy/naming, visual system cues, accessibility, and what remains provisional.

### Extract Reusable Pattern

Use when repeated UI or behavior may become a reusable pattern.

Primary concerns: whether repetition shares meaning, whether extraction is premature, component API, consumers, design tokens, examples, tests, and debt if partial.

### Modify Existing Component

Use when an existing component changes.

Primary concerns: component contract, variants, consumers, visual states, examples/stories, tests, accessibility, and whether a local change should remain local.

### New Component

Use when adding a component or UI primitive.

Primary concerns: rightful owner, naming, API, variants, accessibility, stories/examples, design-system map, tests, and whether it is local, provisional, or stable.

### New Route Or Page

Use when adding or changing a route, URL, navigable page, layout, loader/action, or page shell.

Primary concerns: route config, policy/visibility, data access, URL state, page shell, copy, tests, and not letting route modules own domain invariants or SQL.

### Visual Or Design-System Change

Use when tokens, visual rules, primitives, status treatments, layout conventions, or interaction patterns change.

Primary concerns: design-system map, shared primitives, hardcoded tokens, visual checks, examples, and preventing one-off styles from becoming hidden system rules.

## Completion

Final reports should combine selected mode cues without repeating the same information. Usually include selected modes, affected surfaces, checks run or skipped, docs/maps/ledgers updated, and remaining risks.

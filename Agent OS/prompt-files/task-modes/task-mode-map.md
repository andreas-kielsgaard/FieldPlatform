# Task Mode Map

This file clues agents on how to choose task modes before meaningful work.

`AGENTS.md` acts as the global router. `task-mode-usage.instructions.md` explains how to consume the task-mode layer. This map focuses on selecting primary and secondary modes as orientation cues.

## Selection Process

1. Read the user request and identify the main change being made.
2. Choose the primary mode from the main source of entropy.
3. Check the escalation triggers below.
4. Add secondary modes for every triggered cross-surface concern.
5. Read each selected mode file before meaningful edits.
6. Use the selected mode files to decide likely orientation, evidence, updates, checks, and report fields.

## Escalation Triggers

Escalate beyond the local file when a change touches any of these:

| Trigger | Add this secondary mode |
|---|---|
| Domain term, concept, status, role, or relationship | `domain-and-data/domain-concept-change.instructions.md` |
| User-facing text, label, or naming family | `domain-and-data/copy-or-naming-change.instructions.md` |
| Route, URL, page shell, or navigable surface | `ui-facing/new-route-or-page.instructions.md` |
| Schema, persisted field, migration, index, or storage behavior | `domain-and-data/database-schema-or-persistence-change.instructions.md` |
| Entity, relation, lifecycle, invariant, or domain data shape | `domain-and-data/data-model-change.instructions.md` |
| Accessor, API boundary, query, mutation, caching, or invalidation | `domain-and-data/api-or-accessor-change.instructions.md` |
| Mock, seed, fixture, scenario, or demo data | `domain-and-data/mock-data-change.instructions.md` |
| Shared state, URL state, server state, or store/context behavior | `domain-and-data/state-management-change.instructions.md` |
| Permission, capability, visibility rule, policy, or guard | `domain-and-data/permissions-or-visibility-change.instructions.md` |
| Shared component, reusable pattern, component API, or variant | `ui-facing/new-component.instructions.md` or `ui-facing/modify-existing-component.instructions.md` |
| Design token, primitive, visual rule, status treatment, or interaction pattern | `ui-facing/visual-or-design-system-change.instructions.md` |
| Structural cleanup without intended behavior change | `maintenance-and-governance/refactor.instructions.md` |
| Broken or regressed behavior | `maintenance-and-governance/bug-fix.instructions.md` |
| Agent instructions, project maps, ledgers, or checklists | `maintenance-and-governance/documentation-or-context-update.instructions.md` |
| Tool contracts, generated indexes, derived artifacts, or artifact maintenance paths | `maintenance-and-governance/documentation-or-context-update.instructions.md` |
| Handoff, commit preparation, or final self-review | `maintenance-and-governance/review-before-commit.instructions.md` |

When the task raises a concrete decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority of a durable maintained element, use `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` after task-mode selection. Structural maintenance complements the selected task modes.

## Common Mode Combinations

| Primary mode file | Common secondary mode files or surfaces to review |
|---|---|
| `ui-facing/exploratory-ui-build.instructions.md` | `ui-facing/new-component.instructions.md`, `domain-and-data/mock-data-change.instructions.md`, `domain-and-data/copy-or-naming-change.instructions.md`, `ui-facing/visual-or-design-system-change.instructions.md`. |
| `ui-facing/new-component.instructions.md` | `ui-facing/visual-or-design-system-change.instructions.md`, `domain-and-data/mock-data-change.instructions.md`, `maintenance-and-governance/documentation-or-context-update.instructions.md`. |
| `ui-facing/modify-existing-component.instructions.md` | `ui-facing/visual-or-design-system-change.instructions.md`, `maintenance-and-governance/review-before-commit.instructions.md`. |
| `ui-facing/extract-reusable-pattern.instructions.md` | `maintenance-and-governance/refactor.instructions.md`, `ui-facing/modify-existing-component.instructions.md`, `maintenance-and-governance/documentation-or-context-update.instructions.md`. |
| `ui-facing/new-route-or-page.instructions.md` | `domain-and-data/permissions-or-visibility-change.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, `domain-and-data/state-management-change.instructions.md`, `domain-and-data/copy-or-naming-change.instructions.md`. |
| `domain-and-data/domain-concept-change.instructions.md` | `domain-and-data/copy-or-naming-change.instructions.md`, `domain-and-data/data-model-change.instructions.md`, `domain-and-data/database-schema-or-persistence-change.instructions.md`, `domain-and-data/mock-data-change.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`. |
| `domain-and-data/data-model-change.instructions.md` | `domain-and-data/database-schema-or-persistence-change.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, `domain-and-data/mock-data-change.instructions.md`. |
| `domain-and-data/database-schema-or-persistence-change.instructions.md` | `domain-and-data/data-model-change.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, `domain-and-data/mock-data-change.instructions.md`. |
| `domain-and-data/api-or-accessor-change.instructions.md` | `domain-and-data/state-management-change.instructions.md`, `domain-and-data/permissions-or-visibility-change.instructions.md`. |
| `domain-and-data/mock-data-change.instructions.md` | `domain-and-data/domain-concept-change.instructions.md`, component examples or stories. |
| `domain-and-data/state-management-change.instructions.md` | `maintenance-and-governance/bug-fix.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, `ui-facing/new-route-or-page.instructions.md`. |
| `domain-and-data/permissions-or-visibility-change.instructions.md` | `ui-facing/new-route-or-page.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, UI visibility surfaces. |
| `domain-and-data/copy-or-naming-change.instructions.md` | `domain-and-data/domain-concept-change.instructions.md`, `ui-facing/new-route-or-page.instructions.md`, `ui-facing/visual-or-design-system-change.instructions.md`. |
| `maintenance-and-governance/refactor.instructions.md` | The component, accessor, schema, route, or structural-maintenance behavior for the target area. |
| `maintenance-and-governance/bug-fix.instructions.md` | The mode for the layer that caused the bug. |
| `ui-facing/visual-or-design-system-change.instructions.md` | `ui-facing/new-component.instructions.md` or `ui-facing/modify-existing-component.instructions.md`, visual checks, examples or stories. |
| `maintenance-and-governance/documentation-or-context-update.instructions.md` | Any mode that changed project memory. |
| `maintenance-and-governance/review-before-commit.instructions.md` | All modes used during the task. |

## Ambiguous Task Examples

| User request | Primary mode | Secondary modes |
|---|---|---|
| Build a new visible surface. | `ui-facing/exploratory-ui-build.instructions.md` | `ui-facing/new-component.instructions.md`, `domain-and-data/mock-data-change.instructions.md`, `domain-and-data/copy-or-naming-change.instructions.md`, `ui-facing/visual-or-design-system-change.instructions.md`. |
| Rename a domain term across the product. | `domain-and-data/domain-concept-change.instructions.md` | `domain-and-data/copy-or-naming-change.instructions.md`, `domain-and-data/mock-data-change.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, `maintenance-and-governance/documentation-or-context-update.instructions.md`. |
| Fix a bug in a guarded page. | `maintenance-and-governance/bug-fix.instructions.md` | `domain-and-data/permissions-or-visibility-change.instructions.md`, `ui-facing/new-route-or-page.instructions.md`, `domain-and-data/api-or-accessor-change.instructions.md`, depending on root cause. |
| Add a reusable card from repeated page markup. | `ui-facing/extract-reusable-pattern.instructions.md` | `ui-facing/new-component.instructions.md`, `ui-facing/visual-or-design-system-change.instructions.md`, `maintenance-and-governance/refactor.instructions.md`. |
| Move fetched data into a shared cache. | `domain-and-data/api-or-accessor-change.instructions.md` | `domain-and-data/state-management-change.instructions.md`. |

## Maintenance Cues

- Consider updating this map when a mode is added, renamed, split, merged, or retired.
- Consider an update when repeated agent mistakes reveal a missing escalation trigger.
- Consider an update when a tool or check becomes available for a standing instruction, subject to the Agent OS self-update gate.

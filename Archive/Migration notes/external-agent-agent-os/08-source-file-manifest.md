# Source File Manifest

## Bundle Scope

This compact bundle was prepared from source context already encountered during the prompt on 2026-06-15.

It is a discussion artifact under:

```text
Migration notes/external-agent-agent-os/
```

It does not change the canonical staged Agent OS under:

```text
Agent operating system migration/Agent OS/
```

## Source State Caveats

Branch:

```text
codex/development-readiness
```

Observed worktree state included existing modified, deleted, and untracked files. These were treated as user-owned unless clearly part of this bundle.

Important observed bootloader wrinkle:

- Root `AGENTS.md` points at `Agent operating system migration/Agent OS/migration_agents.md`.
- That file is currently deleted in the worktree.
- `Agent operating system migration/Agent OS/agents.md` currently contains the bootloader text used for this bundle.

This bundle records the condition but does not resolve it.

## Represented Source Categories

The files below were represented in compact form through direct reads, map reads, source inventories, and line-count inspection during this prompt. Large families such as task modes, behaviors, lenses, skills, and tool semantic files were condensed by operating role rather than reproduced verbatim.

Use the real scaffold for exact wording.

### Root Migration Instructions

- `AGENTS.md`

### Agent OS Bootloader And Map

- `Agent operating system migration/Agent OS/agents.md`
- `Agent operating system migration/Agent OS/prompt-files/agent-os-map.md`

### Project Control Files

- `Agent operating system migration/Agent OS/project-control-files/technology-architecture-map.md`
- `Agent operating system migration/Agent OS/project-control-files/field-platform-product-rails.md`
- `Agent operating system migration/Agent OS/project-control-files/field-platform-domain-rails.md`
- `Agent operating system migration/Agent OS/project-control-files/pre-development-readiness.md`

### Task-Mode Files

- `prompt-files/task-modes/task-mode-map.md`
- `prompt-files/task-modes/task-mode-usage.instructions.md`
- `prompt-files/task-modes/domain-and-data/api-or-accessor-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/copy-or-naming-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/data-model-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/database-schema-or-persistence-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/domain-concept-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/mock-data-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/permissions-or-visibility-change.instructions.md`
- `prompt-files/task-modes/domain-and-data/state-management-change.instructions.md`
- `prompt-files/task-modes/maintenance-and-governance/bug-fix.instructions.md`
- `prompt-files/task-modes/maintenance-and-governance/documentation-or-context-update.instructions.md`
- `prompt-files/task-modes/maintenance-and-governance/refactor.instructions.md`
- `prompt-files/task-modes/maintenance-and-governance/review-before-commit.instructions.md`
- `prompt-files/task-modes/ui-facing/exploratory-ui-build.instructions.md`
- `prompt-files/task-modes/ui-facing/extract-reusable-pattern.instructions.md`
- `prompt-files/task-modes/ui-facing/modify-existing-component.instructions.md`
- `prompt-files/task-modes/ui-facing/new-component.instructions.md`
- `prompt-files/task-modes/ui-facing/new-route-or-page.instructions.md`
- `prompt-files/task-modes/ui-facing/visual-or-design-system-change.instructions.md`

### Structural Maintenance Files

- `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md`
- `prompt-files/structural-maintenance/behavior-map.md`
- `prompt-files/structural-maintenance/lens-map.md`
- all behavior files under `prompt-files/structural-maintenance/behavior/`
- all lens files under `prompt-files/structural-maintenance/lenses/`

### Skills

- `prompt-files/skills/skill-map.md`
- `prompt-files/skills/skill-usage.instructions.md`
- all skill files under `prompt-files/skills/`

### Tools, Indexes, Semantic Support

- `prompt-files/tools/index-map.md`
- `prompt-files/tools/tool-map.md`
- `prompt-files/tools/semantic-map.md`
- `prompt-files/tools/tool-usage.instructions.md`
- `prompt-files/tools/checks/agent-os-contract-check.md`
- semantic files under `prompt-files/tools/indexes/`
- semantic files under `prompt-files/tools/operators/`
- semantic files under `prompt-files/tools/semantic/`
- compact manifest summary from `tool-maintained-files/indexes/index-manifest.json`

### Memory Surfaces

- `prompt-files/change-impact-checklists.md`
- `prompt-files/design-system-map.md`
- `prompt-files/domain-glossary.md`
- `prompt-files/known-debt.md`
- `prompt-files/experiments.md`
- `prompt-files/review-checklist.md`

## Omitted From The Bundle

The bundle intentionally omits full content from:

- `tool-implementations/**/*.ts`
- raw generated JSON index records under `tool-maintained-files/indexes/*.json`
- raw generated semantic JSON under `tool-maintained-files/semantic/*.json`
- `Pre-migration project/`
- app/runtime source under `Agent operating system migration/apps/`
- infrastructure and package-manager files outside the Agent OS context

Reasons:

- generated records are evidence substrates, not semantic authority
- tool implementation code is relevant for execution or maintenance, but too detailed for compact external-agent discussion
- pre-migration content is out of scope unless explicitly requested
- app/runtime scaffolding is separate from Agent OS discussion

## Maintenance Note

If the real Agent OS changes materially, regenerate or revise this bundle rather than letting it drift. The canonical scaffold remains the source of truth.

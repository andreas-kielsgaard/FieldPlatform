# Real Agent OS Layout And Context

## Repository Migration Shape

The repository root is currently a migration control layer.

```text
/
  AGENTS.md
  Agent operating system migration/
    Agent OS/
    apps/
    infra/
    tools/
    package.json
    pnpm-workspace.yaml
  Pre-migration project/
  Migration notes/
```

Important boundary rules:

- Root `AGENTS.md` owns migration safety, branch/worktree protection, promotion gates, pre-migration boundaries, migration-note handling, documentation reflection, and progress reporting.
- `Pre-migration project/` is preserved source material. Do not update its product, design, code, or context unless explicitly asked.
- `Agent operating system migration/` contains the proposed migrated scaffold. Do not add migration caveats to target OS content unless explicitly asked.
- `Migration notes/` is for deferred review points, temporary coordination, and migration-only questions.

## Current Branch And Worktree Context

Expected branch:

```text
codex/development-readiness
```

The branch is currently `codex/development-readiness`. The worktree already has user-owned modified, deleted, and untracked files. `App.code-workspace` is explicitly user-owned and should be left alone.

The root `AGENTS.md` still names `Agent OS/migration_agents.md` as the active staged bootloader. In the current worktree that file is deleted, while `Agent OS/agents.md` contains the bootloader text. That appears to be migration state, not something this bundle resolves.

## Agent OS Top-Level Areas

Inside the real staged Agent OS:

```text
Agent OS/
  agents.md
  project-control-files/
  prompt-files/
  tool-implementations/
  tool-maintained-files/
```

`agents.md` is the available bootloader text in the current worktree. It is intended to become or replace the final `AGENTS.md` style entrypoint, but the root migration instructions still refer to `migration_agents.md` while the migration remains staged.

`project-control-files/` contains project-specific rails:

- technology and architecture map
- Field Platform product rails
- Field Platform domain rails
- pre-development readiness

`prompt-files/` contains agent-facing operating context:

- `agent-os-map.md`: orientation router
- `task-modes/`: task classification and mode instructions
- `structural-maintenance/`: behavior selection, behavior procedures, and lenses
- `skills/`: operational workflows and evidence choreography
- `tools/`: index, operator, semantic, and check contracts
- memory surfaces such as glossary, design-system map, known debt, experiments, review checklist, and change-impact checklists

`tool-implementations/` contains deterministic TypeScript builders, query operators, checks, and shared helpers.

`tool-maintained-files/` contains generated evidence artifacts such as JSON indexes and semantic chunk indexes. These are evidence surfaces, not semantic authority.

## Runtime Model

The Agent OS has a firm initiation step followed by cue-based runtime behavior.

At initiation, an agent should load the bootloader, compact maps, the index manifest, and task-mode usage. The bootloader names these boot maps:

- `prompt-files/task-modes/task-mode-map.md`
- `prompt-files/structural-maintenance/behavior-map.md`
- `prompt-files/structural-maintenance/lens-map.md`
- `prompt-files/skills/skill-map.md`
- `prompt-files/tools/index-map.md`
- `prompt-files/tools/tool-map.md`
- `prompt-files/tools/semantic-map.md`
- `tool-maintained-files/indexes/index-manifest.json`
- `prompt-files/task-modes/task-mode-usage.instructions.md`

After initiation, agents should not load everything. They select task modes, structural behaviors, skills, tools, maps, or ledgers based on the actual task.

## Authority Model

Authority roughly flows like this:

1. Explicit user request.
2. Root migration instructions during the staged migration.
3. Agent OS bootloader.
4. Nearest scoped `AGENTS.md` if present.
5. Agent OS map and boot maps.
6. Selected task-mode instructions.
7. Selected structural-maintenance behavior files.
8. Selected skills and tools as evidence support.
9. Task-relevant source, tests, examples, ledgers, and bounded generated-index slices.

Generated indexes, semantic chunks, embeddings, vector-store payloads, and tool outputs are not semantic authority. They are evidence and retrieval support.

## Source And Generated Boundaries

Manual authority surfaces include bootloader rules, maps, task-mode instructions, structural-maintenance behaviors, skill files, tool semantic files, project-control files, and ledgers.

Generated or derived surfaces include:

- `tool-maintained-files/indexes/*.json`
- `tool-maintained-files/semantic/*.json`
- future generated reports or rendered context views

Generated files should be refreshed through their builders. Do not hand-maintain generated hashes, timestamps, record counts, shards, semantic-support metadata, or maintenance commands.

## Why This Compact Bundle Exists

The real Agent OS is intentionally modular, but that creates too many files for an external agent input window. This bundle preserves the shape and operating intent while compressing the most AI-relevant material into a small file set.

The bundle is best for discussion. For implementation or exact instruction edits, use the real scaffold.

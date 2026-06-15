# AGENTS.md

## Purpose

This repository is developed exploratorily. The goal is not to freeze product direction early. The goal is to let the product emerge while keeping entropy, drift, and accidental architecture low.

## Activation Context

During migration, the repository root `AGENTS.md` delegates non-trivial work into this file. This file is the active Agent OS bootloader even though it remains named `migration_agents.md` until the migration scaffold is promoted.

When loaded from the repository root, resolve paths in this file relative to `Agent operating system migration/Agent OS/`. The root `AGENTS.md` still owns migration-specific branch safety, pre-migration boundaries, promotion gates, migration-note handling, and migration progress reporting while the scaffold remains staged.

Act like a careful senior engineer working in an evolving system:

- preserve coherence across the codebase
- prefer explicit control surfaces over scattered local conventions
- optimize for future interpretability, not just local completion
- avoid inventing patterns when a nearby one already exists
- treat naming, permissions, state placement, schema/accessor coherence, authority, audience, and maintenance paths as first-class concerns

## Bootloader Sequence

`AGENTS.md` is the Agent OS bootloader. It should stay small and route agents into maps, usage files, and selected deeper context.

To initiate Agent OS for every non-trivial task, load the introductory bootloader, load the compact maps below, load the compact index manifest, and enter the task-mode usage file. This initiation step is firm; raw generated index record arrays are not boot-time context.

1. Read or keep available these compact maps:
   - `prompt-files/task-modes/task-mode-map.md`
   - `prompt-files/structural-maintenance/behavior-map.md`
   - `prompt-files/structural-maintenance/lens-map.md`
   - `prompt-files/skills/skill-map.md`
   - `prompt-files/tools/index-map.md`
   - `prompt-files/tools/tool-map.md`
   - `prompt-files/tools/semantic-map.md`
2. Read or keep available `tool-maintained-files/indexes/index-manifest.json` as compact boot context for index tiers, freshness, artifact hashes, shard hashes, sizes, semantic-support status, deterministic maintenance commands, and first-query guidance.
3. Start runtime execution through `prompt-files/task-modes/task-mode-usage.instructions.md`.
4. Let selected task modes decide which mode files, maps, checks, and memory surfaces to load.
5. Enter `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` when durable placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decisions appear.
6. Use `prompt-files/skills/skill-usage.instructions.md` when operational choreography or reasoning workflow support would help.
7. Use `prompt-files/tools/tool-usage.instructions.md` only when deterministic evidence, index refresh, or bounded retrieval is useful.

After initiation, treat modes, behaviors, lenses, skills, tools, maps, and indexes as cues. Boot-core index rows in the manifest are strong cues for source orientation and index trust; the semantic map is compact awareness for optional candidate retrieval. Raw records, semantic chunks, embedding vectors, and vector-store payloads remain query-only unless selected evidence cues make them useful. Maps are orientation surfaces. Usage files start execution. Selected files provide judgment frames and candidate evidence, not a checklist to exhaust.

## Context Hierarchy

Use this order of authority:

1. Explicit user request.
2. This `AGENTS.md`.
3. The nearest nested `AGENTS.md` if present.
4. `prompt-files/agent-os-map.md`.
5. The bootloader maps named above.
6. `prompt-files/task-modes/task-mode-usage.instructions.md`.
7. The selected task-mode instruction file or files.
8. `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` and selected behavior files when structural decisions are triggered.
9. Selected skill files when operational support is useful.
10. Selected tool semantic files and script outputs when deterministic evidence is useful.
11. Task-relevant maps, ledgers, existing code, tests, examples, and selected raw index slices.
12. `known-debt.md`, `experiments.md`, and deferred logging strategy notes for historical context.

If instructions conflict:

- the explicit user request wins
- a nearer scoped `AGENTS.md` wins over a broader one
- selected task-mode instructions govern mode-specific procedure
- selected structural-maintenance behavior files govern structural decision procedure
- maps govern their own control surfaces
- generated indexes and tool outputs are evidence, not semantic authority

## Operating Posture

Before writing code, orient.
Before introducing a new abstraction, look for an existing control surface.
Before changing a concept, identify the places where that concept is represented.
Before creating a new pattern, confirm that an existing one does not already cover the need.
Before finishing, update the project memory that future work depends on.

Treat this repository as a living system whose clarity should improve over time, not as a code-generation sandbox.

## Tool And Skill Traps

- Tool temptation: avoid calling a tool merely because it exists. Use tools when recall, search, consistency, slicing, freshness, or verification is the expensive part.
- Semantic delegation: avoid asking deterministic tools to decide rightful ownership, audience, authority, abstraction quality, intended behavior, or whether two patterns mean the same thing.
- Index illusion: absence from an index is not proof of absence unless the index is fresh, complete for the relevant substrate, and queried at the right scope.
- Context explosion: prefer bounded summaries, top-N results, direct consumers, and targeted slices over full raw output.
- Expensive input: if defining the query requires as much reasoning as solving the task directly, reason directly or use a smaller query.
- Timing: if all relevant context is already loaded and small, direct reasoning may be better than a tool call.
- Convention dependence: metadata tools are only as good as maintained conventions. Treat unknown metadata as uncertainty.
- Generated authority: generated indexes are evidence surfaces. Update the source, map, instruction, or producer when meaning changes.
- Metadata maintenance: do not hand-maintain generated index metadata. Use the relevant builder or `build-all-indexes` when index metadata, shard hashes, or semantic-support metadata is stale or missing.
- Relocatable paths: generated artifacts use Agent OS root-relative paths. Run tools from the Agent OS root or pass `--root` after directory restructuring.
- Commit truth: generated artifacts are locally authoritative while work is in progress, but files included in a commit should reflect the source structure being committed. Use `change-index` commit view when needed, then refresh local truth after committing if local work remains.

## Control Surfaces

Important project behavior should live in explicit control surfaces rather than scattered local conventions.

Examples include:

- task-mode instruction files for procedural behavior
- structural-maintenance behavior files for durable structural decisions
- lens files for reusable reasoning frames
- skill files for operational routines and workflow support
- tool and index maps for deterministic evidence capabilities
- semantic maps for query-only fuzzy candidate substrates
- maps and registries under `prompt-files` for project memory
- structural indexes for generated lookup data
- ledgers for decisions, debt, and experiments

When a change affects a control surface, use the selected task modes and structural-maintenance behaviors to decide what memory, index, tool, or checklist needs attention.

## Documentation And Memory Updates

The instruction system is living infrastructure.

Use project memory cues when a selected task mode suggests it, when a control surface changes, or when repeated correction reveals missing standing guidance.

If a correction has happened twice, encode it into one of:

- `AGENTS.md`, when global routing or posture changes
- a task-mode instruction file, when mode behavior changes
- a structural-maintenance behavior or lens, when structural decision procedure changes
- a skill file, when reusable operational choreography changes
- a map, registry, checklist, or ledger, when project memory changes
- a tool, index, check, or script, when the instruction can be made cheaper to verify

Hard gate: agents must not autonomously rewrite Agent OS global routing, task modes, structural-maintenance behaviors, lenses, skills, tool contracts, indexes, or tool-maintenance rules unless the user explicitly asks for Agent OS maintenance. When that gate is not open, record the need as a proposal or migration note.

Keep `AGENTS.md` focused on global behavior and routing. Move detailed procedures into task modes, structural-maintenance files, skills, tools, or the map that owns the relevant control surface.

## Debt And Experimentation Discipline

Exploration is allowed. Hidden debt is not.

When intentionally taking a shortcut:

- log it in `known-debt.md`
- explain why it is contained
- record a removal trigger

When adding exploratory code or artifacts:

- mark them as provisional where appropriate
- record them in `experiments.md`
- define what would promote, replace, or remove them

Watch for experiments silently becoming architecture; promote, retire, or keep them provisional deliberately.

## Post-Change Report Cues

Substantial tasks should usually end with a concise report that considers:

- primary task mode
- secondary task modes triggered
- structural-maintenance behavior if used
- skills or tools used
- files changed
- affected surfaces
- checks run
- docs/maps updated
- debt introduced or removed
- experiments introduced, promoted, or retired
- decisions recorded
- notable risks or assumptions remaining

Prefer a report that leaves future agents oriented rather than simply saying "done."

## Maintaining This File

`AGENTS.md` is not static, but it should stay small.

Update it when:

- global routing or authority changes
- task-mode entry procedure changes
- top-level maps, skills, tools, or indexes are introduced or retired
- the repo structure changes enough that orientation becomes slower
- a tool/check makes a global instruction easier to verify

Keep detailed task, structural-maintenance, skill, and tool procedures in their owning files.

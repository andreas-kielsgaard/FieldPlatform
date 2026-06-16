# Bootloader And Global Rules

## Root Migration Rules

Work on:

```text
codex/development-readiness
```

Always inspect branch and status before broad migration work:

```powershell
git status --short --branch
```

Assume existing modified or untracked files are user-owned unless clearly part of the current migration work. `App.code-workspace` is user-owned and should be left alone.

Do not move files from `Agent operating system migration/` into a live migrated repo structure, delete pre-migration content, or collapse migration folders unless the user explicitly asks. Before any broad move, rename, deletion, or promotion step, verify branch/status, summarize the intended move, and keep migration notes separate from target scaffold content.

Use `Migration notes/` for deferred review points, migration-only questions, and temporary coordination. Do not treat those notes as target OS content unless later promoted.

At the end of each prompt, reflect on whether the work revealed documentation requirements for the Agent OS. Update `Migration notes/documentation/agent-driven-documentation-note.md` only from context encountered during the prompt.

## Bootloader Purpose

The Agent OS bootloader keeps the entrypoint small and routes agents into selected maps, mode files, behaviors, skills, tools, indexes, and memory surfaces.

The current available bootloader content says:

- start by loading compact maps
- read the index manifest as compact boot context
- enter runtime through task-mode usage
- let task modes select deeper files
- use structural maintenance for durable placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decisions
- use skills and tools only when they reduce uncertainty or context cost

## Boot Sequence

For non-trivial work, make these compact surfaces available:

```text
prompt-files/task-modes/task-mode-map.md
prompt-files/structural-maintenance/behavior-map.md
prompt-files/structural-maintenance/lens-map.md
prompt-files/skills/skill-map.md
prompt-files/tools/index-map.md
prompt-files/tools/tool-map.md
prompt-files/tools/semantic-map.md
tool-maintained-files/indexes/index-manifest.json
prompt-files/task-modes/task-mode-usage.instructions.md
```

Then select the task-mode file or files and only load deeper context when selected cues require it.

## Context Hierarchy

Use this order when instructions conflict:

1. Explicit user request.
2. Root migration safety during the staged migration.
3. Agent OS bootloader.
4. Nearest nested `AGENTS.md`.
5. `prompt-files/agent-os-map.md`.
6. Bootloader maps.
7. Task-mode usage.
8. Selected task-mode instruction file or files.
9. Structural-maintenance usage and selected behavior files.
10. Selected skill files.
11. Selected tool semantic files and script outputs.
12. Task-relevant source, tests, examples, maps, ledgers, and bounded generated-index slices.
13. Historical ledgers such as debt, experiments, and deferred logging notes.

## Operating Posture

- Before writing code, orient.
- Before creating a new abstraction, look for an existing control surface.
- Before changing a concept, identify where that concept is represented.
- Before creating a pattern, confirm no nearby pattern already covers it.
- Before finishing, update project memory that future work depends on.
- Prefer explicit control surfaces over scattered local conventions.
- Optimize for future interpretability, not only local completion.

## Control Surfaces

Important project behavior should live in explicit control surfaces:

- task-mode instructions
- structural-maintenance behaviors
- lenses
- skill files
- tool and index maps
- semantic maps
- project maps and registries
- generated structural indexes
- debt and experiment ledgers

## Tool And Index Traps

- Avoid calling a tool merely because it exists.
- Do not ask deterministic tools to decide rightful ownership, audience, authority, abstraction quality, or whether two patterns mean the same thing.
- Absence from an index is not proof of absence unless the index is fresh, complete for the relevant substrate, and queried at the right scope.
- Prefer bounded summaries, top-N results, direct consumers, and targeted slices over full raw output.
- Do not hand-maintain generated index metadata. Use the relevant builder or `build-all-indexes`.
- Generated artifacts use Agent OS root-relative paths.

## Agent OS Self-Maintenance Gate

Agents must not autonomously rewrite Agent OS global routing, task modes, structural-maintenance behaviors, lenses, skills, tool contracts, indexes, or tool-maintenance rules unless the user explicitly asks for Agent OS maintenance.

When that gate is not open, record the need as a proposal or migration note.

## Debt And Experiment Discipline

Exploration is allowed. Hidden debt is not.

When intentionally taking a shortcut, log it in `known-debt.md` with containment and a removal trigger.

When adding exploratory code or artifacts, mark them as provisional where appropriate and record them in `experiments.md` with promotion or retirement criteria.

## Completion Report Cues

Substantial tasks should usually report:

- primary task mode
- secondary task modes
- structural-maintenance behavior if used
- skills or tools used
- files changed
- affected surfaces
- checks run
- docs, maps, or ledgers updated
- debt or experiments introduced, promoted, or retired
- decisions recorded
- remaining risks or assumptions

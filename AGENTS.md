# AGENTS.md

Root instructions for agents working in the active Field Platform repository.

## Agent OS Required

For every non-trivial task, load:

- `Agent OS/agent-os-bootloader.md`

Treat that file as the active Agent OS bootloader. Resolve paths named by the bootloader relative to:

- `Agent OS/`

Follow the bootloader sequence before making code, schema, architecture, testing, or documentation changes.

## Field Platform Project Context

For Field Platform architecture, feature, schema, boundary, testing, deployment, or structural-maintenance work, use:

- `Agent OS/project-control-files/project-setup-map.md`

The project setup map is a router to source/config/tooling and human-owned project decisions. Load only the relevant project decision file when mature project decisions are needed.

## Archive Boundary

`Archive/` is historical material. It includes the pre-migration project and migration notes.

Ignore `Archive/` unless the user explicitly asks to inspect, compare, restore, or modify archived material.

Archived files are not active product, architecture, or Agent OS authority.

## Safety

- Do not touch `main`, commit, or push unless explicitly asked.
- Preserve user-owned files and unrelated local changes.
- Do not edit `App.code-workspace` unless explicitly asked.
- Treat Agent OS source and guidance as protected during ordinary development. Read and follow it, but do not edit `Agent OS/agent-os-*.md`, `Agent OS/prompt-files/**`, `Agent OS/project-control-files/**`, or `Agent OS/tool-implementations/**` unless the human prompt explicitly asks for Agent OS maintenance.
- Treat tool-maintained/generated outputs as evidence, not semantic authority.
- Tool-maintained files under `Agent OS/tool-maintained-files/**` may be updated only by intentionally running the corresponding approved tool. Do not hand-edit them or refresh them by default.
- Do not refresh generated Agent OS evidence unless explicitly asked for compatibility maintenance.
- For ordinary development verification support, prefer the small replacement tool surface: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

## Active Commands

Run commands from the repository root unless a task-specific instruction says otherwise:

```powershell
corepack pnpm install
corepack pnpm check
corepack pnpm change-surface
corepack pnpm test-selection
corepack pnpm change-verification
corepack pnpm repo-health
corepack pnpm depcruise:active-source
corepack pnpm --filter web build
```

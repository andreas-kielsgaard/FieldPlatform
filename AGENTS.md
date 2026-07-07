# AGENTS.md

Root instructions for agents working in the active Field Platform repository.

## Agent OS Required

For every non-trivial task, load the pinned upstream Agent OS bootloader:

- `.agent-os/upstream/core/agent-os-bootloader.md`

Then load the Field Platform adapter:

- `.agent-os/adapter/adapter.md`

Treat `.agent-os/upstream/` as upstream-owned read-only guidance. Resolve upstream paths relative to `.agent-os/upstream/`, and resolve Field-local project routes through `.agent-os/adapter/`.

## Field Platform Project Context

For Field Platform architecture, feature, schema, boundary, testing, deployment, or structural-maintenance work, use:

- `.agent-os/adapter/project-setup-map.md`

The project setup map is a router to source/config/tooling and human-owned project decisions. Load only the relevant project decision file when mature project decisions are needed.

## Archive Boundary

`Archive/` is historical material. It includes the pre-migration project and migration notes.

Ignore `Archive/` unless the user explicitly asks to inspect, compare, restore, or modify archived material.

Archived files are not active product, architecture, or Agent OS authority.

## Safety

- Do not touch `main`, commit, or push unless explicitly asked.
- Preserve user-owned files and unrelated local changes.
- Do not edit `App.code-workspace` unless explicitly asked.
- Treat `.agent-os/upstream/**` as protected upstream Agent OS guidance. Read and follow it, but do not edit it from Field Platform tasks.
- Treat `.agent-os/adapter/**` as Field-owned Agent OS adapter material. Edit it only during explicit adapter, install-state, project-control, or local tool routing maintenance.
- Do not recreate the retired `Agent OS/` route as active guidance.
- Treat generated outputs as evidence, not semantic authority.
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

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

- `Agent OS/project-control-files/project-setup/project-setup-map.md`

The project setup map is a router. Load only the adjacent setup rail that matches the task.

## Archive Boundary

`Archive/` is historical material. It includes the pre-migration project and migration notes.

Ignore `Archive/` unless the user explicitly asks to inspect, compare, restore, or modify archived material.

Archived files are not active product, architecture, or Agent OS authority.

## Safety

- Do not touch `main`, commit, or push unless explicitly asked.
- Preserve user-owned files and unrelated local changes.
- Do not edit `App.code-workspace` unless explicitly asked.
- Treat generated Agent OS indexes and project indexes as evidence, not semantic authority.
- After structural, routing, schema, Agent OS, or project setup changes, refresh generated evidence with `corepack pnpm agent:index`.

## Active Commands

Run commands from the repository root unless a task-specific instruction says otherwise:

```powershell
corepack pnpm install
corepack pnpm check
corepack pnpm agent:index
corepack pnpm agent:index:check
corepack pnpm --filter web build
```

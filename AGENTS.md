# AGENTS.md

Migration coordination instructions for agents working at the root of this repository.

## Current Migration Task

This root is being used to migrate the project into a new agent-aware development operating system.

The pre-migration project has been nested under:

- `Pre-migration project/`

The proposed migrated operating-system scaffold is being built under:

- `Agent operating system migration/`

The root folder is the migration control layer. Keep migration-specific notes, decisions, and temporary coordination material here unless the user asks to promote them into the migrated scaffold.

## Branch And Worktree Safety

Do this migration work on the development readiness branch:

```powershell
git status --short --branch
```

Expected branch:

- `codex/development-readiness`

If there are existing modified or untracked files, assume they are user-owned unless they are clearly part of this migration work. Do not overwrite, reformat, revert, or commit unrelated user-owned files.

`App.code-workspace` is currently user-owned/untracked. Leave it alone unless the user explicitly asks otherwise.

## Instruction Boundaries

Use the nearest relevant `AGENTS.md` for the area being edited:

- Root `AGENTS.md`: migration coordination, root folder notes, and how to interpret nested instruction sets during the migration.
- `Pre-migration project/AGENTS.md`: pre-migration project instructions. Use this when inspecting or editing pre-migration project content.
- `Agent operating system migration/Agent OS/migration_agents.md`: proposed migrated repo instruction contract. This is intentionally not named `AGENTS.md` during migration so it is not automatically ingested as an active instruction file.

The current user instruction always wins for the immediate task.

## Migration Scaffold Boundary

The scaffold under `Agent operating system migration/` should describe the target operating system, not the temporary migration state.

Do not add migration caveats, transitional folder references, or root coordination notes to the migrated scaffold unless the user explicitly asks. Capture migration-only issues under `Migration notes/` or in the root `AGENTS.md`.

## Pre-Migration Project Boundary

The pre-migration project under `Pre-migration project/` is preserved as the source being migrated from.

Do not update its product, design, code, or context files unless the user explicitly asks for a pre-migration project change. If inspection is needed, follow `Pre-migration project/AGENTS.md`.

## Promotion Gate

Do not move files from `Agent operating system migration/` into the live migrated repo structure, delete pre-migration content, or collapse the migration folders unless the user explicitly asks.

Before any broad move, rename, deletion, or promotion step:

- verify the current branch
- inspect `git status --short --branch`
- summarize the intended move
- keep root migration notes separate from target scaffold content

## Migration Notes

Use `Migration notes/` for deferred review points, migration-only questions, and issues the user has asked to postpone.

Do not treat migration notes as target operating-system content unless the user later asks to promote them.

## Documentation During Migration

README files are for human consumption. Do not rely on README files for agent-critical operating-system behavior.

If README material contains guidance that agents must follow, move or restate that guidance in the corresponding `AGENTS.md`, scoped instruction file, task-mode instruction file, checklist, or map before relying on it.

Human-facing documentation planning for the agent operating system belongs under:

- `Migration notes/documentation/`

At the end of each prompt, reflect on whether the work revealed documentation requirements for the agent operating system. Revise `Migration notes/documentation/agent-driven-documentation-note.md` when the current prompt changed, clarified, or exposed a documentation need.

This reflection must be based only on the content already encountered while executing the prompt. Do not read extra files just to update the documentation note. Update only the parts of the note that pertain to the changes or considerations from the current prompt.

## Reporting

When reporting migration progress, include:

- branch used
- root areas changed
- whether pre-migration content was moved or edited
- whether migrated scaffold content was edited
- whether changes were committed or pushed
- whether `main` was touched
- what remains deferred in `Migration notes/`

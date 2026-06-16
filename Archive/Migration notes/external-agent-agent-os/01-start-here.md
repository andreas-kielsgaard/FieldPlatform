# External-Agent Agent OS Bundle

## Purpose

This folder is a compact handoff packet for discussing the Agent OS with an external agent that cannot ingest the full repository scaffold.

Use this folder as context for conversation, review, critique, or planning. It is not the canonical Agent OS source. The canonical staged scaffold remains under:

```text
Agent operating system migration/Agent OS/
```

## Suggested Read Order

1. `01-start-here.md`: this file.
2. `02-real-agent-os-layout-and-context.md`: how the real scaffold is arranged and how this bundle relates to it.
3. `03-bootloader-and-global-rules.md`: root migration safety plus the Agent OS bootloader behavior.
4. `04-task-modes-compiled.md`: all task-mode routing and mode intent in one compact file.
5. `05-structural-maintenance-compiled.md`: structural-maintenance usage, behaviors, and lenses in one compact file.
6. `06-skills-tools-indexes-compiled.md`: skills, deterministic tools, indexes, semantic support, and checks.
7. `07-project-context-rails-compiled.md`: Field Platform product, domain, architecture, readiness, and memory rails.
8. `08-source-file-manifest.md`: what was compiled, what was omitted, and current source-state caveats.

The bundle has 8 files total, under the requested 10-file cap.

## How To Treat This Bundle

- Treat this as a condensed discussion artifact.
- Treat the real scaffold files as source of truth if they are available.
- Do not infer that a rule omitted from this compact bundle was intentionally retired.
- Do not edit the pre-migration project based only on this bundle.
- Do not promote migration folders or collapse the migration layout based only on this bundle.
- Do not treat generated indexes as semantic authority; they are evidence and retrieval substrates.

## Current Migration Context

The root `AGENTS.md` says non-trivial work should load:

```text
Agent operating system migration/Agent OS/migration_agents.md
```

In the current worktree, that file is deleted and the available bootloader content is present at:

```text
Agent operating system migration/Agent OS/agents.md
```

This bundle records that wrinkle for external-agent discussion. It does not resolve or promote the rename.

## Primary Discussion Questions

Good external-agent questions include:

- Is the initiation step clear enough without causing context overload?
- Are task modes, structural-maintenance behaviors, skills, tools, and indexes separated cleanly?
- Does the OS preserve agent judgment while still giving enough procedure?
- Are generated artifacts clearly separated from semantic authority?
- Is there too much indirection for ordinary implementation work?
- What should become human-facing documentation after the migration is promoted?

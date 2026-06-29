# Field Platform

Field Platform is a field-orientation and participation platform. The current MVP direction is to prove orientation, entry, light continuity, stewarded representation, reviewable relation claims, and controlled visibility, publication, and review states.

It is intentionally not a feed, chat app, generic social network, event directory, community operating system, or recommendation engine.

## Current State

This repository now uses the promoted Agent OS scaffold as the active root workspace. The old pre-migration project and migration-era notes are preserved under `Archive/` for historical reference only.

Active development happens from the repository root:

- `apps/web` - React Router framework-mode web app.
- `apps/web/src/modules` - folders-first product modules.
- `apps/web/src/shared` - shared auth, contracts, config, db, errors, policy, UI, and utilities.
- `apps/web/drizzle` - current Drizzle schema and generated migration artifacts.
- `tools/agent-tools` - project maintenance and verification tools.
- `Agent OS` - active agent operating system, maps, checks, and generated evidence.
- `infra` - infrastructure placeholders and deployment-adjacent material.
- `Archive` - deprecated pre-migration material, ignored unless explicitly needed.

## Stack

- Node 24
- pnpm 11.6.0 workspaces
- React Router 7 framework mode
- TypeScript
- PostgreSQL 18 through Docker Compose
- Drizzle ORM and Drizzle Kit
- Zod at runtime boundaries
- Auth.js behind the shared auth boundary
- Tailwind CSS, Radix primitives, and product-owned UI components
- Vitest, Playwright, Storybook, Biome, dependency-cruiser, and advisory Knip

## Prerequisites

Install or enable:

- Node.js 24
- Corepack
- Docker Desktop or a compatible Docker engine
- Git

Then activate the pinned package manager:

```powershell
corepack enable
corepack prepare pnpm@11.6.0 --activate
```

## Setup

Install dependencies:

```powershell
corepack pnpm install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env
```

Start local PostgreSQL:

```powershell
corepack pnpm db:up
corepack pnpm db:ps
```

Run the web app:

```powershell
corepack pnpm dev
```

## Common Commands

```powershell
corepack pnpm check
corepack pnpm change-surface
corepack pnpm test-selection
corepack pnpm change-verification
corepack pnpm repo-health
corepack pnpm depcruise:active-source
corepack pnpm --filter web build
corepack pnpm test:e2e
corepack pnpm storybook
```

`corepack pnpm check` runs linting, typechecking, unit tests, dependency-cruiser, and boundary-rule validation.

The replacement development-tool surface is intentionally small:

- `change-surface`: changed files and structurally affected active source surfaces.
- `test-selection`: runner-discovered Vitest and Playwright test relations.
- `change-verification`: per-change verification plan without running checks.
- `repo-health`: whole-repository health summary independent of a diff.
- `depcruise:active-source`: dependency-cruiser over active app and development-tool source.

## Agent OS

Agents should start with `AGENTS.md`, then load `Agent OS/agent-os-bootloader.md` for non-trivial work. Field Platform-specific project context and decision routing starts at:

```text
Agent OS/project-control-files/project-setup-map.md
```

Mature human-owned project decisions live under `project-decisions/`; exact executable details remain in source, config, package scripts, and tool configuration.

Legacy Agent OS and project indexes are evidence, not authority, and are retired from ordinary development. Use human-maintained maps, source reads, the replacement development tools, and standard project checks for normal work; do not refresh legacy indexes unless explicitly asked for legacy Agent OS index maintenance.

## Git Hygiene

The repository ignores dependency installs, local environment files, local workspace/editor state, app build output, React Router generated type output, Storybook output, Playwright reports, coverage, logs, and transient Agent OS report files.

`Archive/` is intentionally preserved, but it is not active source. Do not use archived files as current product or architecture authority unless a task explicitly asks for archive inspection or restoration.

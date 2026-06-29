# Pre-Development Readiness

## Purpose

Use this project-control surface before making application architecture and technology choices or starting product development.

The goal is to make the development substrate ready for the current architecture decision context without pretending unresolved choices are already settled.

Project decisions are advisory human-owned context. Source/config/package scripts/tests/tools are executable truth when they directly answer the question.

## Deterministic Check Cues

Run deterministic checks when their substrate exists and their cost is reasonable:

- `git status --short --branch` to confirm branch, untracked files, and local change shape.
- `corepack pnpm change-surface` to identify changed and dependency-affected active source surfaces.
- `corepack pnpm test-selection` to identify runner-discovered test relations.
- `corepack pnpm change-verification` to produce a per-change verification plan.
- `corepack pnpm repo-health` to summarize whole-repository health independent of a diff.
- `corepack pnpm depcruise:active-source` to check dependency-cruiser rules over active app and development-tool source.

These checks are evidence. They do not decide product architecture, technology fit, ownership, or readiness by themselves.

## Generated Output Policy

Generated and tool-maintained outputs are evidence only. Do not refresh or commit generated evidence during ordinary development unless the human explicitly asks for compatibility maintenance.

Avoid partial commits where generated artifacts were refreshed from a different source shape than the source files being committed.

## Development Environment Cues

Before product development begins, set up only the development environment pieces that support current architecture decision context:

- Node and package-manager version policy.
- TypeScript workspace layout.
- Formatting, linting, and typecheck commands.
- Test runner and initial verification profile.
- App framework scaffold only after the web-app direction is accepted.
- Persistence tooling only after the database and ORM direction is accepted.
- Environment variable and secret-handling conventions before integrations or auth are wired.

Do not let missing tooling silently become architecture. If a setup step depends on an unresolved choice, report the decision needed and defer the implementation unless the human asks for durable documentation.

## Right-Timed Deferred Actions

Consider deferred work only when its substrate exists and it would solve a present problem. Report deferred work and the trigger that would make it worth doing in the final response unless the human asks for durable documentation.

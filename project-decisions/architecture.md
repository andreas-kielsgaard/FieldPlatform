# Architecture Decisions

## Purpose

Record mature Field Platform architecture decisions that are useful to future agents but are not already fully defined by source, config, or tooling.

## Source Of Truth Boundaries

- Exact Node, pnpm, package, script, and dependency versions are defined in `package.json`, package manifests, and lockfiles.
- Dependency boundaries are enforced by `dependency-cruiser.config.cjs` and checked with the configured dependency-cruiser commands.
- Database structure is defined by Drizzle schema source and generated migrations; those files outrank prose summaries.
- Source, config, tests, and tools remain authoritative where they are more precise than this decision note.

## Current Architecture Decision Context

Field Platform starts as an application-owned modular monolith in a TypeScript and Node workspace.

The first runtime application is `apps/web`, using React Router framework mode. Keep route modules thin: validate route/input boundaries, call module-owned public entrypoints, and return responses or view models. Product behavior belongs in modules and shared policy/application boundaries rather than route components.

Prefer folders-first modules under `apps/web/src/modules` before introducing extra packages. Cross-module imports go through each module's public `index.ts`; module internals should keep domain, contracts, application, persistence, and UI responsibilities distinct.

`apps/web/src/shared` owns shared runtime infrastructure and primitives such as auth, config, contracts, database client setup, errors, policy, UI primitives, and utilities. Shared UI remains presentation-oriented and should not reach into persistence, server auth internals, or policy engines.

Drizzle schema files under `apps/web/src/shared/db/schema` are database-definition artifacts, not domain models or application behavior. They may be used by Drizzle Kit, database setup/tooling, shared database client setup, and module persistence implementations. Routes, UI, domain logic, and application orchestration should use module-owned persistence functions or interfaces rather than importing table objects directly.

Generated migrations under `apps/web/drizzle` are derived artifacts that should be reviewed and committed when intentionally generated, not casually hand-edited.

Runtime source must not import Agent OS tool-maintained evidence artifacts. Agent OS generated outputs are evidence only, not product runtime dependencies.

Keep deployment local-first and portable for now. Concrete executable environment details live in source/config such as `.env.example`, `docker-compose.yml`, and package scripts.

## Deferred Defaults

A separate frontend/backend split, BaaS-first architecture, Prisma as the default ORM, SQLite as the real application database, GraphQL/OpenAPI-first generation, vector or graph database infrastructure, recommendation-engine architecture, Turborepo/Nx, and many physical packages are deferred by default unless real project pressure justifies the additional surface.

## Revisit Triggers

Revisit these decisions when the first vertical slice exposes real friction: framework ergonomics block delivery, persistence workflows become materially worse, authentication setup blocks MVP velocity, modules need independent release or ownership cadence, access patterns require stronger database-level protection, recurring UI primitives need a larger workshop surface, or search/retrieval requirements outgrow relational and lexical approaches.

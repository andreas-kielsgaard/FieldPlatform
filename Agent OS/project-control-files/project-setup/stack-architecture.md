# Stack And Architecture

## Accepted Direction

Field Platform starts as an application-owned modular monolith in a TypeScript and Node workspace.

Use:

- React Router framework mode for `apps/web`
- pnpm workspaces without Turborepo or Nx initially
- folders-first modules under `apps/web/src/modules`
- PostgreSQL as the system of record
- Drizzle for default data access
- Zod at runtime boundaries
- Auth.js behind `apps/web/src/shared/auth`
- Tailwind, CSS variables, Radix primitives, and named product components
- Vitest, Playwright, Storybook, Biome, dependency-cruiser, and advisory Knip

## Boundary Shape

Routes stay thin and call module public entrypoints. Module internals own product behavior. Persistence stays behind module/application boundaries. Shared UI remains presentation-only. Runtime code must not import Agent OS generated artifacts.

Use `../technology-architecture-map.md` for the fuller accepted stack, dependency direction, and deferred defaults.

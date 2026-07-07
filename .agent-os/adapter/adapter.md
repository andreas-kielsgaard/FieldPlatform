# Field Platform Agent OS Adapter

This adapter binds the pinned upstream Agent OS snapshot to Field Platform. It owns local routes, tools, validation cues, source policy, plugin/evidence-producer state, and install facts.

## Load Order

1. Load the upstream bootloader: `.agent-os/upstream/core/agent-os-bootloader.md`
2. Load this adapter.
3. Use `.agent-os/adapter/project-setup-map.md` for Field-owned project routes.
4. Use `.agent-os/adapter/tool-map.md` for supported local evidence tools.

If the upstream snapshot is missing, partial, or unreadable, check `.agent-os/adapter/install-state.md` and do not substitute remote `HEAD`, another target repository copy, or local edits under `.agent-os/upstream/**`.

## Ownership

| Surface | Owner | Rule |
| --- | --- | --- |
| `.agent-os/upstream/**` | Agent OS upstream | Read-only from Field Platform; update only through explicit pin maintenance. |
| `.agent-os/adapter/**` | Field Platform | Target-owned local routing, tools, source policy, validation, capability notes, and install state. |
| `AGENTS.md` | Field Platform | Entry contract only; routes to upstream plus adapter. |
| `project-decisions/**` | Field Platform humans | Human-owned project decisions and tradeoffs. |
| `apps/web/**`, `tools/agent-tools/**`, project config | Field Platform source/tool owners | Source, schema, config, validation, and local evidence tooling authority. |

## Source Policy

Active Field source and config authority includes:

- `apps/web/app/**`
- `apps/web/src/**`
- `apps/web/drizzle.config.ts`
- `apps/web/src/shared/db/schema/**`
- `apps/web/drizzle/**` when migrations are intentionally generated and reviewed
- `project-decisions/**`
- package manifests, lockfiles, TypeScript/Biome/Knip/dependency-cruiser config, `.env.example`, and `docker-compose.yml`
- `tools/agent-tools/**` as Field-owned local evidence tooling

Generated or transient evidence includes:

- `apps/web/.react-router/**`
- `apps/web/build/**`
- `apps/web/storybook-static/**`
- `apps/web/playwright-report/**`
- `apps/web/test-results/**`
- `coverage/**`
- `.agent-os/adapter/output-files/**`
- `.agent-os/adapter/tool-maintained-files/**`

Historical material:

- `Archive/**` is historical and excluded from active authority unless the user explicitly asks for archive inspection or restoration.
- The legacy root `Agent OS/` path is retired by this pinned install. Do not recreate it as an active route.

Protected Agent OS surfaces:

- Do not edit `.agent-os/upstream/**` from Field Platform tasks.
- Edit `.agent-os/adapter/**` only for explicit Agent OS adapter, install-state, project-control, or local tool routing maintenance.

## Capabilities

Enabled local evidence tools are listed in `.agent-os/adapter/tool-map.md`. Tools produce bounded evidence only; they do not decide ownership, product intent, architecture quality, or correctness.

Unavailable or disabled capabilities should be reported honestly and replaced with bounded source reads, `rg`, and repository-supported checks rather than inferred from another target repository.

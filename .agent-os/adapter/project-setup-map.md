# Field Platform Project Setup Map

This Field-owned project-control router connects the pinned Agent OS installation to current Field Platform authority surfaces. It routes agents; it does not own product decisions, architecture decisions, source truth, or local policy.

| Route | Local Surface | Owner | Use | Notes |
| --- | --- | --- | --- | --- |
| Upstream Agent OS snapshot | `.agent-os/upstream/` | Agent OS upstream | Pinned reusable bootloader, core guidance, install, adapter, plugin, and evidence-producer contracts. | Read-only from Field Platform; update only through explicit pin maintenance. |
| Local Agent OS adapter | `.agent-os/adapter/adapter.md` | Field Platform | Source policy, local routes, validation profile, active tools, plugin/evidence status, and protected-surface rules. | Adapter binds the upstream snapshot to this repo. |
| Install state | `.agent-os/adapter/install-state.md` | Field Platform | Installed upstream pin, submodule delivery, restoration guidance, and known gaps. | Keep concise and factual. |
| Active tool map | `.agent-os/adapter/tool-map.md` | Field Platform | Logical tool IDs, commands, evidence outputs, and limitations. | Tools produce bounded evidence only. |
| Human-owned project decisions | `project-decisions/project-decision-map.md` | Field Platform humans | Mature project decisions and explicit tradeoffs. | Load only relevant decision files. Decisions may lag source/config. |
| Architecture and testing decisions | `project-decisions/**` | Field Platform humans | Architecture, testing, and project-control context. | Source/config truth outranks advisory decisions when they conflict. |
| Active web source | `apps/web/app/**`, `apps/web/src/**` | Field Platform source owners | Product routes, modules, shared runtime infrastructure, UI, auth, policy, contracts, and data boundaries. | Source truth; Agent OS only guides attention and review. |
| Database authority | `apps/web/src/shared/db/schema/**`, `apps/web/drizzle/**`, `apps/web/drizzle.config.ts` | Field Platform source/config owners | Drizzle schema, migrations, and generation config. | Generated migrations should be reviewed and committed only when intentionally generated. |
| Local service config | `.env.example`, `docker-compose.yml` | Field Platform config owners | Development environment and service setup. | Do not promote local service semantics into upstream Agent OS core. |
| Package and command authority | `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `apps/web/package.json`, `tools/agent-tools/package.json` | Field Platform tooling owners | Exact script names, versions, and package-manager policy. | Prefer exact scripts over copied summaries. |
| Dependency boundaries | `dependency-cruiser.config.cjs`, `tsconfig.depcruise.json` | Field Platform tooling owners | Import-boundary evidence and active-source graph inputs. | Upstream dependency-boundary docs are contracts/examples, not local config replacements. |
| Local evidence tooling | `tools/agent-tools/**` | Field Platform tooling owners | Change surface, test relation, verification planning, repo health, dependency evidence, and context evidence commands. | Keep local unless a separate extraction is approved. |
| Context adapter config | `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs` | Field Platform tooling owners | Context source groups, generated/archive policy, and capability metadata. | Must not treat `.agent-os/upstream/**` as active Field source. |
| Generated outputs | `.agent-os/adapter/output-files/**`, `apps/web/.react-router/**`, `apps/web/build/**`, `apps/web/storybook-static/**`, `apps/web/playwright-report/**`, `apps/web/test-results/**`, `coverage/**` | Generated evidence | Evidence only. | Do not use as semantic authority. |
| Historical archive | `Archive/**` | Historical material | Inspect only when explicitly requested. | Not active product, architecture, or Agent OS authority. |
| Legacy Agent OS migration evidence | `.agent-os/adapter/project-control/agent-os-migration-map.md` | Field Platform adapter | Records the accepted classification of legacy Agent OS surfaces. | Retained as migration evidence, not as an active boot route. |

When a route is unknown, inspect source/config and report uncertainty instead of inventing an authority surface.

# Field Platform Agent OS Migration Map

## Purpose

Classify the current Field Platform Agent OS surfaces before any pinned install, file move, deletion, archive step, or cleanup.

This map is a planning artifact for Field Platform. It does not select the final Agent OS pin, perform a pinned install, resolve the final legacy `Agent OS/` treatment, or change the reusable Agent-OS pinned-consumption contract.

## Contract Basis

Grounding source:

- Agent-OS repository: `C:\Users\user\Documents\Code Projects\Agent-OS`
- Accepted contract commit: `5da7e90748a26f253ff894c76acfa66118c566f7`
- Contract docs inspected:
  - `install/pinned-consumption.md`
  - `install/templates/install-state.md`
  - `install/templates/AGENTS.md`
  - `install/templates/project-setup-map.md`
  - `install/templates/tool-map.md`
  - `adapters/adapter-contract.md`
  - `plugins/plugin-contract.md`
  - `plugins/evidence-producer-contract.md`
  - `plugins/dependency-boundary/README.md`

The accepted contract establishes this target split:

- `.agent-os/upstream/**` is upstream-owned external Agent OS content. It is readable guidance for Field Platform agents, but it is not active Field source and must not be edited from Field Platform.
- `.agent-os/adapter/**` is Field-owned adapter content for local routes, source policy, tools, validation, plugin/evidence-producer state, install state, and known gaps.
- `AGENTS.md` remains Field-owned as the repository entry contract.

## Disposition Legend

- `replace with upstream`: use the pinned upstream snapshot later; do not hand-maintain the legacy copy as Field source after install.
- `keep local adapter/project-control`: preserve as Field-owned routing, policy, project-control, or adapter context.
- `keep as Field source/config authority`: preserve as Field-owned source, schema, config, or local-service truth; Agent OS may route to it but must not own or replace it.
- `convert to template instance`: create or update a Field-owned file from an upstream template during the later install.
- `keep as local evidence tooling`: preserve as Field-owned deterministic tooling, config, evidence producer implementation, or test evidence.
- `later extract only if separately approved`: do not extract now; reusable extraction requires a separate approved task.
- `archive/remove only after later human decision`: do not delete now; final treatment requires explicit human approval.
- `compatibility pointer candidate`: may need a pointer, alias, or reference update after install, depending on the final legacy path decision.

## Surface Classification

| Surface | Current status | Disposition | Migration note |
| --- | --- | --- | --- |
| `AGENTS.md` | Field-owned root entry contract that currently routes to `Agent OS/agent-os-bootloader.md`. | `convert to template instance` | Later install should adapt the upstream `install/templates/AGENTS.md` pattern to Field Platform. It remains Field-owned and should route to pinned upstream plus Field adapter. |
| `README.md` Agent OS section | Human-facing explanation of current legacy path and tool commands. | `compatibility pointer candidate` | Update only during later install/legacy-treatment work so human docs match the chosen route. |
| `.agent-os/upstream/**` | Not present in Field Platform. | `replace with upstream` | Future pinned install should create or restore this as upstream-owned external content. Treat it as not active Field source. |
| `.agent-os/adapter/**` | Not present in Field Platform. | `convert to template instance` | Future pinned install should create Field-owned adapter files for install state, project-control routing, active tools, validation, plugins, and evidence-producer status. |
| `Agent OS/agent-os-bootloader.md` | Legacy local bootloader. | `replace with upstream` | Reusable core behavior should come from the pinned upstream snapshot after install. Do not edit this legacy copy during this map slice. |
| `Agent OS/agent-os-execution-instructions.md` | Legacy local execution guidance. | `replace with upstream` | Reusable execution guidance belongs in upstream core after install. |
| `Agent OS/prompt-files/agent-attention-system/agent-attention-system-usage.md` | Legacy local core usage guidance. | `replace with upstream` | Reusable attention-system usage belongs in upstream core after install. |
| `Agent OS/prompt-files/agent-attention-system/task-modes/**` | Legacy local reusable task-mode procedures. | `replace with upstream` | Treat as reusable core unless a later adapter task identifies a Field-only addition. |
| `Agent OS/prompt-files/agent-attention-system/behavior/**` | Legacy local reusable structural-maintenance procedures. | `replace with upstream` | Treat as reusable core unless a later adapter task identifies a Field-only addition. |
| `Agent OS/prompt-files/agent-attention-system/lenses/**` | Legacy local reusable reasoning lenses. | `replace with upstream` | Treat as reusable core unless a later adapter task identifies a Field-only addition. |
| `Agent OS/prompt-files/skills/**` | Legacy local reusable reasoning workflows. | `replace with upstream` | Treat as reusable core unless a later adapter task identifies a Field-only addition. |
| `Agent OS/prompt-files/review-checklist.md` | Legacy local review prompt. | `replace with upstream` | Reusable review prompt belongs in upstream core after install. |
| `Agent OS/prompt-files/change-impact-checklists.md` | Legacy local impact prompt. | `replace with upstream` | Reusable impact prompt belongs in upstream core after install. |
| `Agent OS/prompt-files/agent-os-map.md` | Legacy local orientation map for the scaffold. | `replace with upstream` | If upstream no longer has this exact file, later install should use upstream's chosen core orientation surface rather than preserve this by default. |
| `Agent OS/prompt-files/agent-attention-system/maps/task-mode-map.md`, `behavior-map.md`, `lens-map.md`, `skill-map.md` | Legacy local reusable routing maps. | `replace with upstream` | Core maps should come from pinned upstream. |
| `Agent OS/prompt-files/agent-attention-system/maps/tool-map.md` | Current Field-specific active tool router under the legacy core tree. | `convert to template instance` | Later install should preserve Field commands in a Field-owned adapter tool map, likely `.agent-os/adapter/tool-map.md`, based on the upstream template. |
| `Agent OS/project-control-files/project-setup-map.md` | Current Field-specific project-control router. | `convert to template instance` | Later install should preserve the Field routes in a Field-owned adapter project-control map, likely `.agent-os/adapter/project-setup-map.md`, based on the upstream template. |
| `Agent OS/project-control-files/agent-os-installation-state.md` | Current Field-local installation-state map for the legacy local install. | `convert to template instance` | Later install should become the Field-owned install-state file, usually `.agent-os/adapter/install-state.md`, and record the selected immutable pin. |
| `Agent OS/project-control-files/pre-development-readiness.md` | Field-local readiness cues and project-control context. | `keep local adapter/project-control` | Preserve as Field-specific adapter/project-control material unless a future human decision retires it. |
| `Agent OS/project-control-files/agent-os-reusable-extraction-handoff.md` | Field reference-installation handoff for possible reusable extraction. | `later extract only if separately approved` | Keep as planning context for now. Do not use it as permission to extract `tools/agent-tools` or plugin/runtime tooling in this slice. |
| `Agent OS/project-control-files/agent-os-migration-map.md` | This map. | `keep local adapter/project-control` | Keep as Field-owned migration planning evidence until a later install task supersedes it. |
| `Agent OS/output-files/reports/agent/.gitkeep` | Empty legacy transient-report placeholder. | `archive/remove only after later human decision` | No cleanup in this slice. If legacy `Agent OS/` is removed later, decide whether this placeholder survives, moves, or disappears. |
| `Agent OS/tool-maintained-files/**` | Not present as an active directory; appears only in tests as a non-persistent/generated-output expectation. | `archive/remove only after later human decision` | Do not create it during install. Existing tests already assert this generated-output location should not be persisted. |
| `project-decisions/**` | Human-owned Field architecture/testing decisions and decision map. | `keep local adapter/project-control` | Preserve outside Agent OS. Adapter/project-control routes should point here without making Agent OS the owner. |
| `apps/web/app/**`, `apps/web/src/**`, and `apps/web/drizzle.config.ts` | Active Field application source, route delivery, shared runtime infrastructure, module source, and Drizzle configuration. | `keep as Field source/config authority` | Future adapter/project-control routes should identify these as Field-owned source/config truth. Agent OS should guide attention but must not replace source reads, route/module ownership, or executable config authority. |
| `apps/web/src/shared/db/schema/**` and `apps/web/drizzle/**` | Field database schema source and generated Drizzle migrations. | `keep as Field source/config authority` | Preserve the distinction from `project-decisions/architecture.md`: schema source owns database definitions, while generated migrations are derived artifacts that should be reviewed and committed only when intentionally generated. |
| `.env.example` and `docker-compose.yml` | Field local environment and service configuration for development and database workflows. | `keep as Field source/config authority` | Adapter/project-control routes may point here for local service setup, but install work should not copy these meanings into reusable Agent OS core. |
| `.gitignore` | Field ignore/source-policy config for dependency installs, local environment files, editor state, generated app output, coverage/reports, logs, caches, and transient Agent OS reports. | `keep as Field source/config authority` | Preserve as local source-policy evidence. Later adapter source policy should reflect these generated and transient surfaces without making ignored outputs active source. |
| Repository `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `apps/web/package.json`, and `tools/agent-tools/package.json` | Field executable command and dependency truth. | `keep as local evidence tooling` | Preserve exact script and version authority in source/config. Adapter/tool map should reference supported commands rather than duplicate their semantics. |
| `dependency-cruiser.config.cjs` and `tsconfig.depcruise.json` | Field dependency-boundary config and active-source graph inputs. | `keep as local evidence tooling` | Preserve as Field-owned boundary evidence tooling. Upstream dependency-boundary plugin docs are examples/contracts, not a replacement for this local config. |
| `biome.json`, `tsconfig.base.json`, `apps/web/tsconfig.json`, `knip.json` | Field lint/type/config surfaces. | `keep as local evidence tooling` | Preserve as executable/config authority for validation and source policy. |
| `tools/agent-tools/src/change-surface.mjs`, `test-selection.mjs`, `change-verification.mjs`, `repo-health.mjs`, `agent-os.mjs` | Field-local replacement tool and context CLI implementations. | `keep as local evidence tooling` | Do not extract or generalize now. Later extraction is allowed only under a separate approved task. |
| `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs` | Active Field Platform context adapter config. | `keep local adapter/project-control` | Preserve Field source groups, generated/archive policy, capabilities, and dependency-cruiser producer enablement as target-owned adapter material. |
| `tools/agent-tools/src/context/adapters/default-adapter.mjs` | Binds the default context adapter to Field Platform. | `keep local adapter/project-control` | Preserve until a later install or adapter task changes the binding deliberately. |
| `tools/agent-tools/src/context/core/**`, `schemas/**`, and `cli/**` | Context command envelope, schema registry, manifest, search, symbol, bundle, and evidence implementation. | `keep as local evidence tooling` | These may contain reusable ideas, but the current implementation remains Field-local unless separately approved for extraction. |
| `tools/agent-tools/src/context/evidence-producers/dependency-cruiser/**` | Field implementation of dependency-cruiser evidence producer. | `keep as local evidence tooling` | Preserve locally. The upstream dependency-boundary plugin example does not make this implementation upstream-owned. |
| `tools/agent-tools/docs/context-usage.md` | Field-local context command docs. | `keep as local evidence tooling` | Preserve as documentation for local deterministic evidence commands. |
| `tools/agent-tools/test/**` | Test-contract evidence for agent tools, schemas, source policy, generated/archive handling, and old generated-output paths. | `keep as local evidence tooling` | Preserve tests as local evidence-tool contract coverage. Old `Agent OS/tool-maintained-files` strings in tests are compatibility/reference evidence, not active generated files. |
| `tools/agent-tools/test/context/fixtures/**` | Test fixtures, including synthetic archive/generated cases. | `keep as local evidence tooling` | Preserve as test evidence. Fixture `Archive/` paths are not active product archive authority. |
| `Archive/**` | Present but intentionally excluded from active authority. | `archive/remove only after later human decision` | Not inspected for this map except through active-source policy references. Do not use it for install authority. |
| Generated outputs: `apps/web/.react-router/**`, `apps/web/build/**`, `apps/web/storybook-static/**`, `apps/web/playwright-report/**`, `apps/web/test-results/**`, `coverage/**` | Excluded/generated by adapter config and README policy; may or may not exist locally. | `keep as local evidence tooling` | Generated outputs remain evidence only. Do not make them Agent OS source or install inputs. |

## Compatibility Pointer Candidates

These active references should be revisited only during the later pinned install or legacy-treatment task:

- `AGENTS.md` and `README.md` currently send agents to `Agent OS/agent-os-bootloader.md` and `Agent OS/project-control-files/project-setup-map.md`.
- `dependency-cruiser.config.cjs` has a `runtime-does-not-import-agent-os` rule for `Agent OS/`; after install it should also protect the chosen pinned/adapter paths as appropriate.
- `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs` currently includes legacy `Agent OS/` project-guidance paths.
- `tools/agent-tools/src/validate-boundary-rules.mjs` and context-tool tests contain legacy `Agent OS/` path examples.
- `Agent OS/project-control-files/agent-os-installation-state.md` and `agent-os-reusable-extraction-handoff.md` describe the legacy reference installation; later adapter install-state should record the new pin and path split.

## Open Decisions

Do not resolve these in this map:

- Exact Agent-OS pin commit for the Field Platform install.
- Final treatment for the legacy `Agent OS/` tree: delete, archive, keep as compatibility pointer, or another human-approved treatment.

## Guardrail Notes

- No pinned install has been performed.
- No legacy cleanup has been performed.
- No files have been moved, deleted, or archived.
- No reusable extraction of `tools/agent-tools`, runtime tooling, plugin tooling, or evidence producers has been performed.
- The completed Agent-OS pinned-consumption contract is treated as external contract truth; this map does not change it.

## Evidence Used

Field Platform evidence inspected:

- `AGENTS.md`
- `README.md`
- `Agent OS/**`, excluding historical `Archive/**`
- `Agent OS/project-control-files/agent-os-installation-state.md`
- `Agent OS/project-control-files/agent-os-reusable-extraction-handoff.md`
- `tools/agent-tools/**`
- `tools/agent-tools/docs/context-usage.md`
- root and package `package.json` files
- `.gitignore`
- `apps/web/drizzle.config.ts`, `apps/web/src/shared/db/schema/**`, and `apps/web/drizzle/**`
- `.env.example` and `docker-compose.yml`
- `dependency-cruiser.config.cjs`
- `project-decisions/**`
- targeted `rg` searches for `Agent OS`, `.agent-os`, `project-control`, `change-surface`, `test-selection`, `change-verification`, `repo-health`, `depcruise:active-source`, `dependency-cruiser`, `agent-os context`, and evidence-producer references

Not inspected:

- `Archive/**` contents, because repository instructions define it as historical and the delegation did not ask to inspect archive material.
- Optional Convivial Medicine context, because this slice is Field Platform migration-map work and Convivial Medicine dry-run work is parked.

# Field Platform Agent OS Installation State

## Purpose

Map the current Field Platform Agent OS installation so future extraction and install instructions can be reverse-engineered from an explicit local state.

This file describes the installed state only. It is not a generic installer, roadmap, or reusable Agent OS repository contract.

## Operating Boundary

- Agent OS guides attention, context selection, scope management, routing, and reporting.
- Deterministic tools provide bounded evidence.
- Tools and generated outputs do not decide ownership, meaning, authority, architecture quality, or product intent.
- Human-owned Field Platform project decisions live in repository-root `project-decisions/`, routed by `project-setup-map.md`.

## Agent OS Core Surfaces Installed Locally

- `AGENTS.md`: repository entry contract that requires the Agent OS bootloader for non-trivial work.
- `Agent OS/agent-os-bootloader.md`: active bootloader and context hierarchy.
- `Agent OS/agent-os-execution-instructions.md`: turn execution and reporting guidance.
- `Agent OS/prompt-files/agent-attention-system/agent-attention-system-usage.md`: task-mode, behavior, lens, and skill loading discipline.
- `Agent OS/prompt-files/agent-attention-system/maps/*.md`: task-mode, behavior, lens, skill, and tool routing.
- `Agent OS/prompt-files/agent-attention-system/task-modes/**`: task-mode procedures.
- `Agent OS/prompt-files/agent-attention-system/behavior/**`: structural-maintenance procedures.
- `Agent OS/prompt-files/agent-attention-system/lenses/**`: lightweight reasoning prompts.
- `Agent OS/prompt-files/skills/**`: optional reasoning workflows.
- `Agent OS/prompt-files/review-checklist.md` and `Agent OS/prompt-files/change-impact-checklists.md`: review and impact prompts.

## Field Platform Adapter And Project-Specific Surfaces

- `Agent OS/project-control-files/project-setup-map.md`: routes Agent OS into source/config/tooling and Field Platform project decisions.
- `Agent OS/project-control-files/agent-os-installation-state.md`: this installation-state map.
- `Agent OS/project-control-files/pre-development-readiness.md`: Field Platform readiness cues.
- `project-decisions/**`: human-owned Field Platform architecture and testing decisions.
- `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs`: active context adapter, including Field Platform source groups, generated/archive exclusions, and capability metadata.
- `tools/agent-tools/src/context/adapters/default-adapter.mjs`: currently binds the default local context adapter to Field Platform.
- Repository `package.json` and `tools/agent-tools/package.json`: exact local command profile and script names.
- `dependency-cruiser.config.cjs`, Biome config, TypeScript config, and package manifests: executable project/tooling truth.

## Enabled Context And Evidence Plugins

Active evidence tooling is repository-local under `tools/agent-tools`.

- Replacement verification tools: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.
- Agent OS context command family: `agent-os context schemas`, `manifest`, `evidence`, `inspect`, `symbols`, `search`, and `bundle`.
- Context evidence producers enabled by the active adapter: manifest/source-policy metadata, TypeScript/TSX declaration and chunk extraction, direct dependency-edge evidence, literal search, optional freshness evidence, and schema/capability inspection.
- Enabled producers and included paths may vary when a different project adapter is installed.

See `tools/agent-tools/docs/context-usage.md` for command behavior and limitations.

## Local Command Profile

Run from the repository root unless a task-specific instruction says otherwise.

```powershell
corepack pnpm install
corepack pnpm check
corepack pnpm change-surface
corepack pnpm test-selection
corepack pnpm change-verification
corepack pnpm repo-health
corepack pnpm depcruise:active-source
corepack pnpm --filter web build
corepack pnpm agent-os context --help
```

The exact scripts, package manager version, dependency versions, and runner wiring are source/config authority, not this summary.

## Generated, Archive, And Protected Surfaces

- `Archive/` is historical material and is excluded from active authority unless explicitly requested.
- Generated outputs such as React Router build output, web build output, Storybook static output, Playwright reports, test results, and coverage are evidence only.
- Agent OS source and guidance under `Agent OS/agent-os-*.md`, `Agent OS/prompt-files/**`, and `Agent OS/project-control-files/**` are protected during ordinary development and should change only during explicit Agent OS maintenance.
- Context command outputs are generated on demand and should not be treated as semantic authority.
- Test fixtures and goldens under `tools/agent-tools/test/**` are tool-contract evidence; update them only when an intentional tool contract or output-shape change requires it.

## Validation Commands

Use the validation requested for this installation-state pass when touching Agent OS routing, context tooling docs, or adapter boundaries:

```powershell
corepack pnpm --filter agent-tools test
corepack pnpm boundary:validate
corepack pnpm depcruise:active-source
corepack pnpm lint
corepack pnpm check
corepack pnpm agent-os context manifest --json
corepack pnpm agent-os context evidence --json
corepack pnpm agent-os context bundle --path=apps/web/app/root.tsx --json
```

## Reusable Extraction Candidates

- Bootloader and attention-system routing structure.
- Task-mode, behavior, lens, skill, and tool-map patterns.
- Context command envelope, schemas, CLI command family, and core evidence producers.
- Adapter contract shape: source groups, source policy, generated/archive exclusions, and capability metadata.
- Replacement evidence-tool pattern: small deterministic commands that support agent judgment without replacing it.

## Should Remain Project-Specific

- Field Platform source groups, app paths, generated-output paths, archive policy, and default adapter binding.
- Field Platform project decisions in `project-decisions/**`.
- Exact package scripts, validation command composition, dependency config, and local runtime/package versions.
- App architecture, domain vocabulary, schema ownership, testing priorities, deployment assumptions, and boundary rules.
- Any future install instructions for a reusable Agent OS distribution until a separate extraction task creates them.

## Open Extraction Ambiguity

- The eventual package boundary between Agent OS core prompts and repository-local `agent-os context` tooling is not decided here.
- Generic installation flow, adapter authoring instructions, plugin packaging, and reusable repo layout remain future work.
- Field Platform is the reference installation state, not yet the reusable source of truth for other projects.

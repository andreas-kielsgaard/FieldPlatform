# Project Context Router

## Purpose

Route agents from Agent OS into human-owned Field Platform project decisions without making Agent OS the owner of those decisions.

Load this map for architecture-shaping, schema, feature, boundary, testing, deployment, or structural-maintenance tasks where project context may matter.

## Lookup

| Need | Load |
|---|---|
| Human-owned project decision routing | repository-root `project-decisions/project-decision-map.md` |
| Exact executable versions, package commands, dependency versions, and scripts | Source/config such as `package.json`, package manifests, lockfiles, and tool config |
| Enforced dependency boundaries | `dependency-cruiser.config.cjs` and `corepack pnpm depcruise:active-source` |
| Active development-tool surface and standard evidence sources | `prompt-files/agent-attention-system/maps/tool-map.md` |

## Rules

- This map routes only; it does not own product, business, domain, data-model, deployment, testing, or architecture decisions.
- Do not load every project decision by default. Use repository-root `project-decisions/project-decision-map.md` to choose only the relevant decision file.
- Project decisions are advisory, human-owned, and may lag source/config/tools.
- Source, config, package scripts, dependency rules, schema, migrations, and tests remain authoritative where they directly answer the question.
- If no mature project decision exists for a question, inspect the current source/config and report uncertainty or scoped compromise instead of inferring a decision from Agent OS.
- Generated outputs are evidence. They do not replace source files, project decisions, task modes, structural-maintenance behavior, or explicit human decisions.

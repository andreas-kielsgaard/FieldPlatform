# Tooling Map

This file lists the logical tools available to the agent operating system and routes each tool to its instruction file.

Modes refer to tool IDs from this map. Modes do not name script paths or execution details directly.

## Tool Inventory

| Tool ID | Purpose | Instruction file |
|---|---|---|
| `accessor-usage` | Find accessor/API callers and usage patterns. | `docs/agent/tools/accessor-usage.instructions.md` |
| `build-source-map` | Refresh the source map and structural-index awareness. | `docs/agent/tools/build-source-map.instructions.md` |
| `check-boundaries` | Check architectural boundaries and layer-direction rules. | `docs/agent/tools/check-boundaries.instructions.md` |
| `check-docs` | Check documentation freshness, references, and required map updates. | `docs/agent/tools/check-docs.instructions.md` |
| `check-permission-literals` | Find raw role, capability, or permission literals outside approved locations. | `docs/agent/tools/check-permission-literals.instructions.md` |
| `check-schema-drift` | Compare schema, validators, accessors, mocks, and generated artifacts for drift. | `docs/agent/tools/check-schema-drift.instructions.md` |
| `check-token-literals` | Find hardcoded visual tokens outside approved design-system sources. | `docs/agent/tools/check-token-literals.instructions.md` |
| `component-usage` | Find component consumers, examples, and usage patterns. | `docs/agent/tools/component-usage.instructions.md` |
| `find-similar-pattern` | Find repeated local patterns that may be extraction candidates. | `docs/agent/tools/find-similar-pattern.instructions.md` |
| `find-term` | Search canonical terms, aliases, literals, and identifiers. | `docs/agent/tools/find-term.instructions.md` |
| `map-affected-surfaces` | Summarize files and control surfaces affected by a change. | `docs/agent/tools/map-affected-surfaces.instructions.md` |
| `map-components` | Generate or refresh component structural index data. | `docs/agent/tools/map-components.instructions.md` |
| `map-deps` | Generate or inspect dependency graph data. | `docs/agent/tools/map-deps.instructions.md` |
| `map-routes` | Generate or inspect route/page structural data. | `docs/agent/tools/map-routes.instructions.md` |
| `rename-impact` | Identify likely impacted surfaces for a concept, identifier, or label rename. | `docs/agent/tools/rename-impact.instructions.md` |
| `scenario-usage` | Find mock scenario, fixture, seed, story, and test usage. | `docs/agent/tools/scenario-usage.instructions.md` |
| `state-consumer-search` | Find state owners, consumers, update paths, and duplicated state patterns. | `docs/agent/tools/state-consumer-search.instructions.md` |
| `summarize-change` | Produce a structured change summary for review and handoff. | `docs/agent/tools/summarize-change.instructions.md` |
| `symbol-search` | Search exported and imported code symbols. | `docs/agent/tools/symbol-search.instructions.md` |
| `validate-fixtures` | Validate fixtures, seeds, and scenarios against expected shape. | `docs/agent/tools/validate-fixtures.instructions.md` |

## Maintenance Rules

- When a mode requires a new tool, a human maintainer must verify that the tool exists, has an instruction file, and functions as expected.
- Do not add a tool reference to a mode file without adding or updating this map.
- Tool instruction files own script paths, parameters, execution instructions, and output interpretation.
- Mode files own when a logical tool is required, not how to execute it.

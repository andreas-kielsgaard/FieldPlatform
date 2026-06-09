# Task Modes

Task modes are executable instruction profiles for agent work.

A mode is not only a type of task. A mode is a reasoning protocol for containing the kind of entropy that task usually creates.

## How Agents Use This Layer

1. Read `task-mode-map.md`.
2. Select one primary mode.
3. Identify any secondary modes triggered by cross-surface impact.
4. Read the instruction file for every selected mode.
5. Use the selected modes to choose orientation docs, tools, checks, memory updates, and report fields.

## File Structure

| Folder | Purpose |
|---|---|
| `ui-facing/` | Modes for visible surfaces, components, routes, and visual-system work. |
| `domain-and-data/` | Modes for naming, concepts, data shape, access, state, mocks, permissions, and persistence. |
| `maintenance-and-governance/` | Modes for refactors, fixes, documentation updates, and pre-commit review. |

## Shared Mode Schema

Each mode file uses the same sections:

- Use this mode when.
- Do not use this mode when.
- Required orientation.
- Required tools or searches.
- Implementation instructions.
- Cross-application impact checks.
- Documentation updates.
- Regression checks.
- Required completion report.

## Update Rules

- Add a mode when repeated work needs a distinct reasoning protocol.
- Prefer updating an existing mode when the task family already exists.
- Keep cross-mode routing rules in `task-mode-map.md`.
- Keep mode files procedural and concise.

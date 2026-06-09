# Documenting The Agent Operating System

## Status

Open migration note.

## Note

The agent operating system needs both human-facing documentation and agent-facing instructions, but those should not be treated as the same layer.

README files should explain the system to humans. Agent-critical behavior should live in `AGENTS.md`, scoped instruction files, task-mode instruction files, checklists, maps, or tool-backed checks.

During the migration review, decide how the final repository should document:

- the purpose of the agent operating system for human maintainers
- which files are human-facing orientation versus agent-facing instruction
- how README material routes to authoritative agent instructions
- how to prevent human documentation from becoming hidden agent policy
- how generated or tool-maintained documentation should be described

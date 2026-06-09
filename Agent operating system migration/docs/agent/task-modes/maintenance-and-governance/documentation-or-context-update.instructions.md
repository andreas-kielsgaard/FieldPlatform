# Mode: Documentation Or Context Update

## Required Orientation

- `AGENTS.md`
- `docs/agent/source-map.md`
- The relevant `docs/agent` file being changed.
- `docs/agent/decision-log.md`
- `docs/agent/known-debt.md`

## Required Tools Or Searches

- Search for duplicate or conflicting instructions.
- Tool: `check-docs`.
- Tool: `build-source-map` if documentation depends on generated structure.
- Search references to renamed docs or modes.

## Implementation Instructions

- Update the smallest document that owns the relevant memory.
- Do not duplicate the same rule across many files unless one file clearly routes to the other.
- Move detailed procedures out of `AGENTS.md` into mode files.
- Keep `AGENTS.md` as routing and behavioral contract.
- If a correction has happened more than once, encode it as a mode instruction, checklist item, script/check, lint rule, or structural index.
- Mark provisional migration docs honestly when they are not yet active.

## Cross-Application Impact Checks

- Does this change routing for future agents?
- Does it conflict with other instruction files?
- Does it create or retire a control surface?
- Do tool adapters need to point somewhere new?

## Documentation Updates

- Update `source-map.md` if doc structure changes.
- Update `AGENTS.md` if routing or instruction hierarchy changes.
- Update mode files if task behavior changes.
- Update `decision-log.md` if documentation policy changes.

## Regression Checks

- Conflicting instructions.
- Rules duplicated across many files.
- Prose-only instructions where a check/script should exist.
- Active instructions pointing to empty or retired files.
- Missing migration status.

## Required Completion Report

```text
Primary mode: documentation or context update
Docs changed:
Reason:
Instruction moved/added/removed:
Affected modes:
Generated maps refreshed:
Potential conflicts removed:
Checks run:
```

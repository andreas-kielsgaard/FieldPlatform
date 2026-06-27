# Mode: Documentation Or Context Update

## Orientation Cues

- `AGENTS.md`
- `prompt-files/agent-attention-system/agent-attention-system-usage.md` when documentation changes source-of-truth structure, instruction ownership, or durable authority
- `project-control-files/technology-architecture-map.md` when documentation changes platform/component layout or boundary expectations
- The relevant `prompt-files` file being changed.
- `prompt-files/known-debt.md`

## Evidence Cues

- Legacy tool note (inactive): `path-query` when documentation depends on source-directory structure.
- Legacy tool note (inactive): `build-path-index` when `path-index.json` needs refresh, legacy index refresh is out of scope unless explicitly requested.
- Legacy skill note (inactive): `test-relation-scan` when the changed target needs verification-surface selection.

- Consider searching for duplicate or conflicting instructions.
- Legacy skill note (inactive): `docs-reference-drift-scan`.
- Legacy skill note (inactive): `authority-resolution` when a rule, map entry, instruction, or source-of-truth statement may have multiple candidate owners.
- Legacy skill note (inactive): `audience-placement` when content may belong in agent-facing instructions, human docs, product copy, tests, examples, tool output, or migration notes.
- Legacy tool note (inactive): `artifact-query` when documentation or maps may be generated, indexed, derived, or tool-maintained.
- Consider searching references to renamed docs or modes.

## Implementation Cues

- Consider updating the smallest document that owns the relevant memory.
- Prefer one routed source for a rule instead of duplicating it across many files.
- Keep agent-critical behavior in agent-facing instruction surfaces; keep README-style explanation human-facing.
- Move detailed procedures out of `AGENTS.md` into mode files.
- Keep `AGENTS.md` as routing and behavioral contract.
- If a correction has happened more than once, encode it as a mode instruction, checklist item, script/check, lint rule, or structural index.
- Mark provisional migration docs honestly when they are not yet active.

## Cross-Application Impact Cues

- Does this change routing for future agents?
- Does it conflict with other instruction files?
- Does it create or retire a control surface?
- Do tool adapters need to point somewhere new?

## Documentation Cues

- Consider using structural maintenance if doc structure, instruction ownership, or durable authority changes.
- Consider updating `project-control-files/technology-architecture-map.md` if documentation changes platform/component layout or boundary expectations.
- Consider updating `AGENTS.md` if routing or instruction hierarchy changes.
- Consider updating mode files if task behavior changes.
- Consider updating relevant durable memory if documentation policy changes.

## Regression Cues

- Conflicting instructions.
- Rules duplicated across many files.
- Prose-only instructions where a check/script should exist.
- Active instructions pointing to empty or retired files.
- Missing migration status.

## Structural Maintenance Clues

- Consider entering structural maintenance when documentation changes source-of-truth ownership, audience, authority, tool contracts, generated/manual boundaries, or maintenance paths.

## Report Cues

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




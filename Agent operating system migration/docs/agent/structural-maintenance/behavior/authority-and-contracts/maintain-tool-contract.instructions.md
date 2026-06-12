# Structural Maintenance Behavior: Maintain Tool Contract

## Purpose

Maintain the contract between a logical tool ID, tooling-map row, tool instruction file, script placeholder, parameters, expected outputs, and known limitations.

This behavior assumes tool capability may exist conceptually without implementing tool internals in the current pass.

Active tool contract changes require an explicit human-initiated Agent OS maintenance task. When ordinary work or reflective review exposes a tool gap, record a proposal note instead of changing active tool contracts autonomously.

## Lens Prompts

- Contract: tool IDs promise an invocation shape, output meaning, limitations, and consumer expectations.
- Authority: `docs/agent/tools/tooling-map.md` owns tool discovery; tool instruction files own script paths and execution details; mode and behavior files should refer to logical tool IDs.
- Boundary: modes and behaviors may require tools but should not reach into script implementation details.
- Audience: distinguish agent-facing execution instructions from human review notes and implementation plans.
- Authority: active tool contracts are maintained only through human-initiated Agent OS maintenance, while incidental observations belong in proposal notes.
- Memory: record human-approved tool contract changes in the tooling map and tool instruction files where future agents resolve tool IDs.

## Procedure

1. State the logical tool ID, the contract change being considered, and whether the current task explicitly initiated Agent OS tool maintenance.
2. Verify whether the tool ID has a `docs/agent/tools/tooling-map.md` row, a tool instruction file, a script placeholder, or a migration note.
3. Use `authority-surface-search` when a tool contract may already be described or contradicted across maps, modes, notes, and instruction files.
4. Use `artifact-maintenance-path` when a tool output, generated index, or script-maintained artifact is part of the contract.
5. Align the tooling-map row, instruction file, script path, parameters, outputs, and limitations only when the current task explicitly initiated active tool-contract maintenance.
6. Keep incidental tool suggestions outside the active tooling map; record them as proposal notes for human review.
7. Do not claim implementation, execution, or deterministic evidence unless the script exists and was actually run.
8. Add secondary generated-artifact, authority, or documentation behavior when tool outputs feed maps, docs, or instructions.

## Contract Outcomes

Choose one:

- Add or update an active tool contract during human-initiated Agent OS maintenance.
- Add or update a proposed tool review note.
- Deprecate, retire, or remove a tool contract during human-initiated Agent OS maintenance.
- Clarify parameters, outputs, limitations, or script path.
- Defer because capability or ownership needs human review.

## Stop Or Escalate When

- A task mode or behavior requires a tool that is not mapped or reviewed.
- A proposed tool would become mandatory without a functioning script.
- Script behavior, parameters, or output schema are being guessed.
- Tool outputs would alter authoritative maps or agent instructions.
- Active tool contract changes are suggested during ordinary work rather than explicitly requested as Agent OS maintenance.

## Memory Updates

Update `docs/agent/tools/tooling-map.md` and the relevant tool instruction file only for human-initiated active tool contract changes.

Update migration notes for proposed tools, incidental tool-change suggestions, or missing implementation review.

Update the deferred logging strategy when a tool contract establishes a durable Agent OS convention.

## Completion Output

```text
Tool ID:
Human-initiated maintenance? yes/no
Instruction file:
Script path:
Parameters:
Expected output:
Limitations:
Proposal note:
Memory updated:
Remaining uncertainty:
```

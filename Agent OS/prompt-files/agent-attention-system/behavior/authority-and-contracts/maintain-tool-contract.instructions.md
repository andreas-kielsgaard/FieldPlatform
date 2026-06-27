# Structural Maintenance Behavior: Maintain Tool Contract

## Purpose

Maintain the contract between a logical tool ID, tool-map row, tool semantic file, script, parameters, expected outputs, and known limitations.

The retired Stratum 1 and 2 index/query tools are legacy surfaces. Proposed future tools may still exist only as review notes until their semantic file, map row, and script are added together.

Active tool contract changes require an explicit human-initiated Agent OS maintenance task. When ordinary work or reflective review exposes a tool gap, record a proposal note instead of changing active tool contracts autonomously.

## Lens Prompts

- Contract: tool IDs promise an invocation shape, output meaning, limitations, and consumer expectations.
- Authority: `prompt-files/agent-attention-system/maps/tool-map.md` owns tool discovery; tool semantic files own script paths and execution details; mode and behavior files should refer to logical tool IDs.
- Boundary: modes and behaviors may require tools but should not reach into script implementation details.
- Audience: distinguish agent-facing execution instructions from human review notes and implementation plans.
- Authority: active tool contracts are maintained only through human-initiated Agent OS maintenance, while incidental observations belong in proposal notes.
- Memory: record human-approved tool contract changes in the tool map and tool semantic files where future agents resolve tool IDs.

## Procedure

1. State the logical tool ID, the contract change being considered, and whether the current task explicitly initiated Agent OS tool maintenance.
2. Verify whether the tool ID has a `prompt-files/agent-attention-system/maps/tool-map.md` row, a tool semantic file, a script, or a migration note.
3. Use `authority-resolution` when a tool contract may already be described or contradicted across maps, modes, notes, and instruction files.
4. Use source reads and `rg` when a tool output, generated index, or script-maintained artifact is part of the contract. Legacy `artifact-query` is inactive unless the task explicitly requests legacy Agent OS index/tool maintenance.
5. Align the tool-map row, semantic file, script path, parameters, outputs, and limitations only when the current task explicitly initiated active tool-contract maintenance.
6. Keep incidental tool suggestions outside the active tool map; record them as proposal notes for human review.
7. Only claim implementation, execution, or deterministic evidence when the script exists and was actually run.
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

Update `prompt-files/agent-attention-system/maps/tool-map.md` and the relevant tool semantic file only for human-initiated active tool contract changes.

Update migration notes for proposed tools, incidental tool-change suggestions, or missing implementation review.

Update relevant durable memory when a tool contract establishes a durable Agent OS convention.

## Completion Output

```text
Tool ID:
Human-initiated maintenance? yes/no
Semantic file:
Script path:
Parameters:
Expected output:
Limitations:
Proposal note:
Memory updated:
Remaining uncertainty:
```



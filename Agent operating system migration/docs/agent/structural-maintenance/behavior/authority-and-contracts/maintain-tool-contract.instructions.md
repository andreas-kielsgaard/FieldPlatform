# Structural Maintenance Behavior: Maintain Tool Contract

## Purpose

Maintain the contract between a logical tool ID, tooling-map row, tool instruction file, script placeholder, parameters, expected outputs, and known limitations.

This behavior assumes tool capability may exist conceptually without implementing tool internals in the current pass.

## Lens Prompts

- Contract: tool IDs promise an invocation shape, output meaning, limitations, and consumer expectations.
- Authority: `docs/agent/tools/tooling-map.md` owns tool discovery; tool instruction files own script paths and execution details; mode and behavior files should refer to logical tool IDs.
- Boundary: modes and behaviors may require tools but should not reach into script implementation details.
- Audience: distinguish agent-facing execution instructions from human review notes and implementation plans.
- Lifecycle: classify new or changed tools as proposed, placeholder, active, deprecated, or retired.
- Memory: record tool contract changes in the tooling map and tool instruction files where future agents resolve tool IDs.

## Procedure

1. State the logical tool ID and the contract change being considered.
2. Verify whether the tool ID has a `docs/agent/tools/tooling-map.md` row, a tool instruction file, a script placeholder, or a migration note.
3. Use `authority-surface-search` when a tool contract may already be described or contradicted across maps, modes, notes, and instruction files.
4. Use `artifact-maintenance-path` when a tool output, generated index, or script-maintained artifact is part of the contract.
5. Align the tooling-map row, instruction file, script path, parameters, outputs, and limitations when the tool is active.
6. Keep proposed tools outside the active tooling map until a human maintainer approves them.
7. Do not claim implementation, execution, or deterministic evidence unless the script exists and was actually run.
8. Add secondary generated-artifact, authority, or documentation behavior when tool outputs feed maps, docs, or instructions.

## Contract Outcomes

Choose one:

- Add or update an active tool contract.
- Add or update a proposed tool review note.
- Deprecate or retire a tool contract.
- Clarify parameters, outputs, limitations, or script path.
- Defer because capability or ownership needs human review.

## Stop Or Escalate When

- A task mode or behavior requires a tool that is not mapped or reviewed.
- A proposed tool would become mandatory without a functioning script.
- Script behavior, parameters, or output schema are being guessed.
- Tool outputs would alter authoritative maps or agent instructions.

## Memory Updates

Update `docs/agent/tools/tooling-map.md` and the relevant tool instruction file for active tool contract changes.

Update migration notes for proposed tools or missing implementation review.

Update the deferred logging strategy when a tool contract establishes a durable Agent OS convention.

## Completion Output

```text
Tool ID:
Lifecycle: proposed/placeholder/active/deprecated/retired
Instruction file:
Script path:
Parameters:
Expected output:
Limitations:
Memory updated:
Remaining uncertainty:
```

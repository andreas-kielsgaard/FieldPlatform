# Structural Maintenance Behavior: Define Authoritative Surface

## Purpose

Decide which maintained element is allowed to define a rule, expectation, source-of-truth statement, map entry, schema promise, test expectation, tool contract, or documentation claim.

This behavior protects against authority being duplicated across nearby prose, examples, maps, and implementation details until agents cannot tell which surface should win.

## Lens Prompts

- Authority: distinguish defining, explaining, referencing, implementing, summarizing, and deriving authority.
- Audience: keep agent-critical rules in agent-facing surfaces and human explanations in human-facing surfaces.
- Ownership: assign authority to the narrowest rightful owner with the same reason to change.
- Contract: if the rule defines promised behavior, identify consumers, compatibility expectations, and tests.
- Memory: record source-of-truth changes only when future agents should rely on the chosen authority.

## Procedure

1. State the rule, expectation, or claim whose authority is unclear.
2. Locate existing mentions and classify each as defining, explaining, referencing, implementing, generated, provisional, or stale.
3. Use source reads and `rg` when a bounded repository search is needed to find duplicate, conflicting, explanatory, generated, or stale authority candidates.
4. Inspect current loading chains and target audiences when the likely authority surface and intended audience may not match.
5. Choose the authoritative surface or decide that authority remains provisional.
6. Replace duplicate authority with references or narrower explanatory text when needed.
7. Add secondary naming, contract, movement, centralization, or documentation behavior when authority changes reveal a separate structural decision.

## Authority Outcomes

Choose one:

- Keep the current authoritative surface.
- Move authority to a better owned surface.
- Centralize duplicated authority.
- Mark an artifact as explanatory only.
- Preserve provisional authority and record uncertainty.
- Defer authority choice for human review.

## Stop Or Escalate When

- Active instructions conflict.
- Agent-critical behavior exists only in human-facing documentation.
- A generated or tool-maintained artifact is being treated as semantic authority.
- Product, security, data, public API, schema, permission, or tool contract promises change.
- The authoritative owner cannot be identified from available context.

## Memory Updates

Update the relevant authoritative map, instruction file, schema, tool contract, or decision log when authority changes.

Update documentation notes when a human-facing surface should explain the authority without owning it.

Report duplicated, stale, or provisional authority in the final response when it remains by choice.

## Completion Output

```text
Authority question:
Chosen authoritative surface:
Other mentions classified:
Contract impact:
Consumer/test impact:
Memory updated:
Remaining uncertainty:
```

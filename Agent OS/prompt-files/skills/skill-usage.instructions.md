
# Skill Usage Instructions

## Purpose

Use this file to activate reasoning skills without making them mandatory ceremony.

## Activation

1. Start from selected task modes and structural-maintenance behaviors.
2. Use `prompt-files/agent-attention-system/maps/skill-map.md` when operational support is needed.
3. Prefer lightweight reasoning directly from maps, selected source reads, `rg`, source/config/tooling, and standard checks.
4. Use active replacement tools named by skill files where appropriate: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.
5. Skip a skill when the active mode, behavior, or lens already gives enough procedure.

## Traps

- Tool temptation: use a skill only when it materially improves evidence gathering or reasoning.
- Semantic delegation: a skill can guide reasoning, but it should not pretend deterministic evidence decides semantic meaning.
- Context explosion: keep the retained skill output compact.
- Timing: skip a skill when the active mode/behavior/lens already gives enough procedure.
- Generated authority: generated output can support judgment; it does not define the rule.

## Output Shape

Retain a compact packet:

```text
Skill:
Why activated:
Evidence gathered:
Agent-owned judgment still applies:
Next checks:
Warnings:
```

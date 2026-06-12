
# Skill: component-reuse-evidence

Stratum: 3 aggregator skill.

## Purpose

Use before deciding component reuse, extension, branch, or extraction.

## Underlying Tools

component-query, pattern-candidate-query, literal-query

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent must still decide semantically.

## Output

Similar components, usage, variant clues, and extraction candidates.

## Context Risk

Medium. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.

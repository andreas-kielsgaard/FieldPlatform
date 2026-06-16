
# Skill: safe-rename-workflow

Stratum: 4 reasoning workflow skill.

## Purpose

Use when distinguishing pure rename, semantic rename, alias, split, merge, or deprecation.

## Underlying Tools

rename-impact-preview, term-query, symbol-query, doc-ref-query

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent still owns semantically.

## Output

Rename type questions and bounded impact evidence.

## Context Risk

Medium. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.




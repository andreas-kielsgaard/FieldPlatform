
# Skill: index-trust-workflow

Stratum: 4 reasoning workflow skill.

## Purpose

Use before relying on absence or generated evidence.

## Underlying Tools

artifact-query, path-query, relevant index builders

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent must still decide semantically.

## Output

Index trust and freshness judgment.

## Context Risk

Low. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.


# Skill: boundary-verification

Stratum: 3 aggregator skill.

## Purpose

Use when placement, movement, or interface decisions depend on dependency direction.

## Underlying Tools

dependency-query, path-query, artifact-query

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent still owns semantically.

## Output

Boundary evidence and likely rule violations.

## Context Risk

Medium. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.

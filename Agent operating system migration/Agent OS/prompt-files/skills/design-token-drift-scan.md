
# Skill: design-token-drift-scan

Stratum: 3 aggregator skill.

## Purpose

Use when design-system or visual rule drift is suspected.

## Underlying Tools

literal-query, component-query, path-query

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent must still decide semantically.

## Output

Hardcoded token-like values and repeated visual-rule evidence.

## Context Risk

Low. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.

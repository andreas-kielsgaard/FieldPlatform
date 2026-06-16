
# Skill: change-report-assembly

Stratum: 3 aggregator skill.

## Purpose

Use for substantial task handoff or review reporting.

## Underlying Tools

affected-surface-mapping, diff-query, test-relation-scan

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent still owns semantically.

## Output

Structured completion report scaffold with judgment fields left to the agent.

## Context Risk

Low. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.


# Skill: human-doc-to-agent-instruction

Stratum: 4 reasoning workflow skill.

## Purpose

Use when human documentation contains guidance agents may need as operating guidance.

## Underlying Tools

authority-resolution, audience-placement, doc-ref-query

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Gather only the evidence needed for the current decision.
3. Keep raw output bounded and retain a compact evidence packet.
4. State what the agent still owns semantically.

## Output

Promoted instruction proposal with authority/audience checks.

## Context Risk

Medium. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.

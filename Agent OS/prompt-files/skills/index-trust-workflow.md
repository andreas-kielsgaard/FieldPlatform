
# Skill: index-trust-workflow

Stratum: 4 reasoning workflow skill.

## Purpose

Use before relying on absence or generated evidence.

## Underlying Tools

index-manifest, artifact-query, path-query, relevant index builders

## Operating Pattern

1. Confirm the active task mode, structural-maintenance behavior, and relevant lens.
2. Check `tool-maintained-files/indexes/index-manifest.json` for tier, freshness, size, artifact hash, shard hash, semantic-support status, maintenance commands, and suggested first operator.
3. Prefer the relevant builder or `build-all-indexes` when freshness, shard metadata, or semantic-support metadata is stale or missing.
4. Gather only the evidence needed for the current decision.
5. Keep raw output bounded and retain a compact evidence packet.
6. State what the agent still owns semantically.

## Output

Index trust and freshness judgment.

## Context Risk

Low. Use the smallest useful evidence path and stop when the decision has enough support.

## Does Not

This skill does not replace mode, behavior, lens, or agent judgment. It does not mutate files unless a separate explicit implementation task does so.

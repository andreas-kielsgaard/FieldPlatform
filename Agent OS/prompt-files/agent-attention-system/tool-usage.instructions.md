
# Legacy Tool Usage Instructions

## Purpose

This file documents the retired Stratum 1 and 2 generated index/query tool surface. It is retained as transitional reference only.

The broad generated index/query system is not active normal development guidance. Do not use these tools for ordinary orientation, implementation, or verification. Use human-maintained maps, selected source reads, `rg`, standard project checks, and the replacement development tools instead: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

## Activation

Use this file only when the human prompt explicitly asks for legacy Agent OS index/query maintenance or investigation.

1. Confirm the task explicitly asks for legacy Agent OS index/query work.
2. Treat `prompt-files/agent-attention-system/maps/index-map.md`, the legacy section of `tool-map.md`, and `semantic-map.md` as legacy catalogues, not active routing.
3. Do not refresh or modify `tool-maintained-files/**` unless intentionally running the corresponding legacy tool for that explicit task.

## Traps

- Tool temptation: avoid calling a tool merely because it exists.
- Semantic delegation: avoid asking deterministic tools to decide ownership, audience, authority, abstraction quality, or intended behavior.
- Index illusion: absence from a legacy index is not proof of absence for ordinary development.
- Context explosion: prefer bounded summaries, top-N results, direct consumers, and file slices.
- Expensive input: if defining the query requires as much reasoning as the task, reason directly or use a smaller query.
- Timing: if all relevant context is already loaded and small, direct reasoning may be better.
- Convention dependence: metadata tools are only as good as the conventions humans and agents preserve.
- Generated authority: generated indexes are evidence surfaces, not semantic authority.
- Manual metadata drift: do not hand-edit generated index metadata. Use the relevant approved builder only when the task intentionally refreshes generated evidence.
- Relocatable paths: generated artifacts should use Agent OS root-relative paths. Run tools from the Agent OS root or pass `--root` after directory restructuring.
- Commit truth: legacy generated artifacts should not be included in ordinary development commits unless explicitly requested.
- Semantic payload boundary: semantic chunk, embedding, and vector-store builders are not active ordinary navigation surfaces.
- Semantic overreach: do not use `semantic-candidate-query` as normal fuzzy navigation; inspect source directly.

## Contract Checks

`agent-os-contract-check` is a maintenance aid after Agent OS maps, tool rows, index rows, semantic-layer rows, scripts, or generated artifact locations change. It checks alignment; it does not prove semantic correctness.

## Output Use

Tool output should be retained as evidence: observed facts, inferred risk, suggested next checks, warnings, and limitations. The agent remains responsible for semantic judgment.

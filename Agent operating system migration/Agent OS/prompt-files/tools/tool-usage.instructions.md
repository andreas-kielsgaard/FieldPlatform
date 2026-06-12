
# Tool Usage Instructions

## Purpose

Use this file to activate deterministic Stratum 1 and 2 tools without treating them as reasoning authorities.

## Activation

1. Start from the active task mode, structural-maintenance behavior, lens, or skill.
2. Use `index-map.md` and `tool-maintained-files/indexes/index-manifest.json` to understand available substrates, tiers, freshness, shard metadata, semantic-support status, maintenance commands, and first-query guidance.
3. Use `semantic-map.md` when fuzzy recall, near-match discovery, or candidate chunks may reduce uncertainty after exact indexes feel too narrow.
4. Use `tool-map.md` to choose the smallest useful query handle.
5. Open the selected semantic file only when the map row is not enough.
6. Run the script only when search, recall, consistency, slicing, freshness, or verification is the expensive part.

## Traps

- Tool temptation: avoid calling a tool merely because it exists.
- Semantic delegation: avoid asking deterministic tools to decide ownership, audience, authority, abstraction quality, or intended behavior.
- Index illusion: absence from an index is not proof of absence unless freshness, coverage, and query scope match the task.
- Context explosion: prefer bounded summaries, top-N results, direct consumers, and file slices.
- Expensive input: if defining the query requires as much reasoning as the task, reason directly or use a smaller query.
- Timing: if all relevant context is already loaded and small, direct reasoning may be better.
- Convention dependence: metadata tools are only as good as the conventions humans and agents preserve.
- Generated authority: generated indexes are evidence surfaces, not semantic authority.
- Manual metadata drift: do not hand-edit generated index metadata. Use the relevant builder or `build-all-indexes` when generated metadata is missing, stale, or inconsistent.
- Semantic payload boundary: semantic chunk, embedding, and vector-store builders should remain separate from `build-all-indexes` until their artifacts are explicitly promoted into the active index catalog.
- Semantic overreach: use `semantic-candidate-query` as fuzzy candidate evidence, then verify with source, exact operators, or bounded slices before drawing conclusions.

## Contract Checks

`agent-os-contract-check` is a maintenance aid after Agent OS maps, tool rows, index rows, semantic-layer rows, scripts, or generated artifact locations change. It checks alignment; it does not prove semantic correctness.

## Output Use

Tool output should be retained as evidence: observed facts, inferred risk, suggested next checks, warnings, and limitations. The agent remains responsible for semantic judgment.

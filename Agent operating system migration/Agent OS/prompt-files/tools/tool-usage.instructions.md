
# Tool Usage Instructions

## Purpose

Use this file to activate deterministic Stratum 1 and 2 tools without treating them as reasoning authorities.

## Activation

1. Start from the active task mode, structural-maintenance behavior, lens, or skill.
2. Use `index-map.md` to understand the available substrates.
3. Use `tool-map.md` to choose the smallest useful query handle.
4. Open the selected semantic file only when the map row is not enough.
5. Run the script only when search, recall, consistency, slicing, freshness, or verification is the expensive part.

## Traps

- Tool temptation: do not call a tool merely because it exists.
- Semantic delegation: do not ask deterministic tools to decide ownership, audience, authority, abstraction quality, or intended behavior.
- Index illusion: absence from an index is not proof of absence unless freshness, coverage, and query scope match the task.
- Context explosion: prefer bounded summaries, top-N results, direct consumers, and file slices.
- Expensive input: if defining the query requires as much reasoning as the task, reason directly or use a smaller query.
- Timing: if all relevant context is already loaded and small, direct reasoning may be better.
- Convention dependence: metadata tools are only as good as the conventions humans and agents preserve.
- Generated authority: generated indexes are evidence surfaces, not semantic authority.

## Output Use

Tool output should be retained as evidence: observed facts, inferred risk, suggested next checks, warnings, and limitations. The agent remains responsible for semantic judgment.

# Implementation Note: query-routing-index

Instruction file: `docs/agent/tools/index-access/query-routing-index.instructions.md`

Generated artifact: `docs/agent/generated-indexes/routing-map.md`

Future implementation should parse or load the generated artifact through structured metadata where available, apply scope and limit controls, and return freshness or uncertainty information with every result set.

Do not treat generated index content as authority. When evidence conflicts with source files or manual authority surfaces, report the conflict instead of silently resolving it.

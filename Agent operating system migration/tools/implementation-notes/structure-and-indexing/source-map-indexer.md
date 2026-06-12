# Implementation Note: source-map-indexer

Instruction file: `docs/agent/tools/structure-and-indexing/source-map-indexer.instructions.md`

Generated artifact: `docs/agent/structural-indexes/source-directory-map.json`

Future implementation should enumerate allowed repository directories, apply ignore rules, write a compact generated directory map, and include generation metadata for freshness checks.

Do not include file contents. Directory and file names support navigation only and do not establish semantic ownership.

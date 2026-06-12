# Implementation Note: source-map-query

Instruction file: `docs/agent/tools/structure-and-indexing/source-map-query.instructions.md`

Generated artifact: `docs/agent/structural-indexes/source-directory-map.json`

Future implementation should read the generated directory map, validate the requested scope, return only bounded child names, and include freshness or missing-scope uncertainty.

Do not return file contents or broad recursive trees by default.

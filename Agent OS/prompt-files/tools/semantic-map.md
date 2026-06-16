# Semantic Map

Phase 3 semantic support is a query-only layer beside the active Stratum 1 index catalog. Phase 4 hardens that layer with stronger freshness and contract checks without turning semantic payloads into boot context or authority.

During boot, this compact map can be read with the other tool maps. Raw semantic chunk records, embedding vectors, and vector-store payloads stay query-only unless a selected mode, skill, or tool evidence need makes them useful.

## Active Semantic Surfaces

| Semantic ID | Status | Builder Or Operator | Artifact Or Substrate | Semantic File | Capability |
|---|---|---|---|---|---|
| `semantic-chunk-index` | active deterministic scaffold | `build-semantic-chunk-index` | `tool-maintained-files/semantic/semantic-chunk-index.json` | `prompt-files/tools/semantic/semantic-chunk-index.md` | Line-bounded text chunks with content hashes, lexical terms, excerpts, and explicit no-embedding/no-vector status. |
| `semantic-candidate-query` | active lexical candidate operator | `semantic-candidate-query` | `semantic-chunk-index` | `prompt-files/tools/operators/semantic-candidate-query.md` | Bounded candidate chunks for fuzzy recall, near-match discovery, reuse evidence, rename candidates, and broad orientation. |

## Reserved Future Semantic Surfaces

| Semantic ID | Status | Intended Builder | Intended Artifact | Current Boundary |
|---|---|---|---|---|
| `semantic-embedding-index` | reserved, not active | `build-semantic-embedding-index` | `tool-maintained-files/semantic/semantic-embedding-index.json` | No embeddings are generated or required by Phase 3 start. |
| `semantic-vector-store-manifest` | reserved, not active | `build-semantic-vector-store-manifest` | `tool-maintained-files/semantic/semantic-vector-store-manifest.json` | No vector store is generated or required by Phase 3 start. |

## Use Cues

- Consider `semantic-candidate-query` when exact path, term, symbol, dependency, or doc-reference queries are too narrow for fuzzy recall.
- Prefer exact deterministic operators when you already know the identifier, path, literal, symbol, route, component, accessor, schema, fixture, or test surface.
- Use semantic candidates as leads for follow-up `retrieve-slice`, exact queries, source reads, or selected skills.
- Treat no-match results as weak absence because embeddings and vector recall are not active.
- Treat stale or contract-invalid semantic artifacts as uncertainty until the relevant builder/check path is run.
- Keep semantic builders out of `build-all-indexes` until their artifacts are deliberately promoted into the active index catalog.
- Use the contract check when adding or changing semantic map rows, semantic files, scripts, or generated semantic artifacts.

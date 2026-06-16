# Tool Script Placeholder Alignment

## Status

Partially addressed; source-map placeholder ambiguity resolved.

## Note

After the tool grouping pass, the tool layer is modeled as:

```text
logical tool ID -> docs/agent/tools/tooling-map.md -> docs/agent/tools/<group>/<tool>.instructions.md -> tools/agent/<group>/<tool>.ts
```

Tool instruction files reference grouped `tools/agent/<group>/*.ts` script paths, but tool implementation is explicitly out of scope for the current structural-maintenance integration pass.

This pass added placeholders for:

- `artifact-maintenance-path`
- `authority-surface-search`
- `audience-surface-check`
- `contract-impact`
- `contract-test-coverage`
- `source-map-indexer`
- `source-map-query`
- `test-surface-selection`
- generated-index query/update tools under `index-access`

The broader placeholder alignment question remains for implementation completeness and future output schemas. The source-map-to-technology-architecture naming cleanup is no longer represented by `build-source-map`; active source-tree discovery uses the generated source-directory map plus query/indexer tools.

Follow-up work should decide whether to:

- implement the grouped script placeholders
- add more implementation-note groups as additional tool groups become implementation-ready
- define shared output schemas for query/update index tools and test-surface selection

Do not treat missing tool implementations as blocking structural-maintenance routing. Until tools exist, tool IDs are evidence categories and agents should use available local inspection without claiming tool-backed evidence.

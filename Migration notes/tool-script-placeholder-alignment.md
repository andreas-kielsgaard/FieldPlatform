# Tool Script Placeholder Alignment

## Status

Partially addressed.

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

The broader placeholder alignment question remains for implementation completeness, tooling-map consistency, and future source-map-to-technology-architecture naming cleanup.

Follow-up work should decide whether to:

- implement the grouped script placeholders
- rename source-map-related tool IDs such as `build-source-map`
- add more implementation-note groups as additional tool groups become implementation-ready

Do not treat missing tool implementations as blocking structural-maintenance routing. Until tools exist, tool IDs are evidence categories and agents should use available local inspection without claiming tool-backed evidence.

export type ActiveIndexCatalogRow = {
  indexId: string;
  tier: string;
  suggestedFirstOperator: string;
  capability: string;
  artifactPath: string;
  semanticFile: string;
  builder: string;
};

export const ACTIVE_INDEX_CATALOG: ActiveIndexCatalogRow[] = [
  row("index-manifest", "mandatory-boot-context", "path-query or bounded read", "Compact tier, freshness, size, hash, and first-query guidance for active evidence indexes."),
  row("path-index", "boot-core", "path-query", "Files, directories, extensions, areas, inferred artifact types, and generated/manual hints."),
  row("change-index", "boot-core", "diff-query", "Current git status, changed files, artifact kind hints, and changed surface hints."),
  row("dependency-index", "boot-core", "dependency-query", "Import, export-from, dynamic import, and require edges with rough cross-area hints."),
  row("symbol-index", "boot-core", "symbol-query", "Exported, imported, and locally declared symbols from lightweight source scanning."),
  row("doc-reference-index", "boot-core", "doc-ref-query", "Markdown links, headings, inline path references, inline IDs, and local existence hints."),
  row("artifact-metadata-index", "boot-core", "artifact-query", "Artifact kind, generated/manual hints, direct-edit policy hints, producer hints, audience, and authority-role hints."),
  row("component-index", "strong-cue", "component-query", "PascalCase component definitions, consumers, stories, tests, and props hints."),
  row("accessor-index", "strong-cue", "accessor-query", "Accessor/API-like definitions, imports, read/write hints, cache hints, and boundary names."),
  row("schema-shape-index", "strong-cue", "schema-query", "Schema-like declarations, validators, fields, relations, and generated type hints."),
  row("test-index", "strong-cue", "test-query", "Test and story files, imports, likely subjects, fixture references, and route/component hints."),
  row("fixture-scenario-index", "strong-cue", "fixture-query", "Fixture, mock, seed, scenario, demo-data, and example artifacts with represented term hints."),
  row("route-index", "specialized-cue", "route-query", "Route-like files, inferred route paths, params, families, pages, layouts, and handlers."),
  row("literal-index", "specialized-cue", "literal-query", "Quoted strings, policy-like values, status-like values, token-like values, and arbitrary style-like values."),
  row("term-index", "specialized-cue", "term-query", "Domain terms, headings, identifiers, UI-looking literals, and nearby language."),
];

export function activeIndexBuildersInMaintenanceOrder(): string[] {
  const manifestBuilder = "build-index-manifest";
  return [...ACTIVE_INDEX_CATALOG.map((entry) => entry.builder).filter((builder) => builder !== manifestBuilder), manifestBuilder].filter(
    (builder, index, builders) => builders.indexOf(builder) === index,
  );
}

function row(indexId: string, tier: string, suggestedFirstOperator: string, capability: string): ActiveIndexCatalogRow {
  return {
    indexId,
    tier,
    suggestedFirstOperator,
    capability,
    artifactPath: `tool-maintained-files/indexes/${indexId}.json`,
    semanticFile: `prompt-files/tools/indexes/${indexId}.md`,
    builder: `build-${indexId}`,
  };
}

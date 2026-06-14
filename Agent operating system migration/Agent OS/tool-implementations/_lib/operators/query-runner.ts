import path from "node:path";
import { emit, parseArgs, resolveRoot, toNumber } from "../cli.ts";
import { readJsonIfExists } from "../json.ts";
import { escapeRegex, normalizePath, recordText } from "../text-utils.ts";
import type { IndexArtifact, IndexMaintenanceMetadata, LoadedIndex, ParsedArgs, QueryOperatorSpec } from "../types.ts";

const TERM_HANDLES = new Set(["canonical", "all", "identifiers", "ui-literals", "cooccurs", "drift", "replace-preview"]);

export function runQueryOperator(spec: QueryOperatorSpec): void {
  const args = parseArgs(process.argv.slice(2));
  const root = resolveRoot(args);
  const indexes = spec.indexIds.map((indexId) => loadIndex(root, indexId));
  const limit = toNumber(args.flags.limit, 20);
  const { handle, query, secondaryQuery } = parseOperatorQuery(spec.operatorId, args);
  const records = indexes.flatMap((entry) =>
    entry.index.records.map((record) => ({
      indexId: entry.index.indexId,
      generatedAt: entry.index.generatedAt,
      sourceRevision: entry.index.sourceRevision,
      record,
    })),
  );

  const findings = filterRecords(spec.operatorId, handle, query, secondaryQuery, records).slice(0, limit);
  const missingIndexes = indexes.filter((entry) => entry.missing).map((entry) => entry.indexId);

  emit(
    {
      operatorId: spec.operatorId,
      stratum: 2,
      handle,
      query,
      secondaryQuery,
      limit,
      indexes: indexes.map((entry) => ({
        indexId: entry.indexId,
        artifactPath: normalizePath(path.relative(root, entry.path)),
        schemaVersion: entry.index.schemaVersion,
        generatedAt: entry.index.generatedAt,
        sourceRevision: entry.index.sourceRevision,
        missing: entry.missing,
        recordCount: entry.index.recordCount,
        shardCount: entry.index.maintenance.sharding.shardCount,
        metadataMaintainedBy: entry.index.maintenance.maintainedBy,
        semanticSupportStatus: entry.index.maintenance.semanticSupport.status,
      })),
      observedEvidence: findings,
      inferredRisk: inferRisks(spec.operatorId, handle, findings, missingIndexes),
      suggestedNextChecks: suggestNextChecks(spec.operatorId, handle, findings, missingIndexes),
      warnings: [
        ...missingIndexes.map((indexId) => `Index ${indexId} is missing; run build-${indexId} before relying on absence.`),
        "Absence from an index is not proof of absence unless freshness, coverage, and query scope are adequate.",
      ],
      limitations: [
        "This Stratum 2 operator returns bounded evidence only.",
        "It does not make ownership, authority, audience, contract, or abstraction decisions.",
        "It never edits repository files.",
      ],
    },
    args,
  );
}

function parseOperatorQuery(operatorId: string, args: ParsedArgs): { handle: string; query: string; secondaryQuery?: string } {
  const positional = [...args.positional];
  let handle = String(args.flags.handle || "search");

  if (operatorId === "term-query" && positional[0] && TERM_HANDLES.has(positional[0])) {
    handle = positional.shift() || handle;
  } else if (operatorId === "doc-ref-query" && positional[0] === "broken") {
    handle = positional.shift() || handle;
  } else if (operatorId === "artifact-query" && positional[0] === "maintenance-path") {
    handle = positional.shift() || handle;
  }

  const query = String(args.flags.query || positional.shift() || "");
  const secondaryQuery = positional.shift();
  return { handle, query, secondaryQuery };
}

function filterRecords(
  operatorId: string,
  handle: string,
  query: string,
  secondaryQuery: string | undefined,
  records: { indexId: string; record: Record<string, unknown>; generatedAt: string; sourceRevision: string | null }[],
): Record<string, unknown>[] {
  const q = query.toLowerCase();
  const second = String(secondaryQuery || "").toLowerCase();

  if (operatorId === "doc-ref-query" && handle === "broken") {
    return records
      .filter(({ record }) => record.kind === "markdown-link" || record.kind === "inline-path")
      .filter(({ record }) => record.local === true && record.resolvedExists === false)
      .map(toFinding);
  }

  if (operatorId === "term-query" && handle === "cooccurs") {
    return records
      .filter(({ record }) => {
        const haystack = recordText(record).toLowerCase();
        return haystack.includes(q) && haystack.includes(second);
      })
      .map(toFinding);
  }

  if (operatorId === "term-query" && handle === "replace-preview") {
    return records
      .filter(({ record }) => recordText(record).toLowerCase().includes(q))
      .map((entry) => ({
        ...toFinding(entry),
        replacementPreview: secondaryQuery ? recordText(entry.record).replace(new RegExp(escapeRegex(query), "gi"), secondaryQuery) : undefined,
      }));
  }

  if (operatorId === "artifact-query" && handle === "maintenance-path") {
    return records
      .filter(({ record }) => (q ? recordText(record).toLowerCase().includes(q) : true))
      .map((entry) => ({
        ...toFinding(entry),
        maintenancePath: entry.record.directEditPolicy || "unknown",
        generatedHint: entry.record.generatedHint,
        possibleProducer: entry.record.possibleProducer,
      }));
  }

  if (operatorId === "path-query" && !query) {
    return records.slice(0, 50).map(toFinding);
  }

  return records
    .filter(({ record }) => {
      if (!q) {
        return true;
      }
      if (operatorId === "term-query" && handle === "identifiers") {
        return String(record.surface || "").includes("identifier") && recordText(record).toLowerCase().includes(q);
      }
      if (operatorId === "term-query" && handle === "ui-literals") {
        return String(record.surface || "").includes("ui") && recordText(record).toLowerCase().includes(q);
      }
      return recordText(record).toLowerCase().includes(q);
    })
    .map((entry) => {
      const finding = toFinding(entry);
      if (operatorId === "doc-ref-query" && (entry.record.kind === "markdown-link" || entry.record.kind === "inline-path")) {
        return { ...finding, local: entry.record.local, resolvedExists: entry.record.resolvedExists };
      }
      if (operatorId === "diff-query") {
        return { ...finding, status: entry.record.status, artifactKind: entry.record.artifactKind };
      }
      return finding;
    });
}

function toFinding(entry: { indexId: string; record: Record<string, unknown>; generatedAt: string; sourceRevision: string | null }): Record<string, unknown> {
  const file = String(entry.record.file || entry.record.path || entry.record.importer || "");
  return {
    indexId: entry.indexId,
    file: file || undefined,
    line: entry.record.line,
    name: entry.record.name || entry.record.component || entry.record.accessor || entry.record.term || entry.record.value || entry.record.route,
    detail: entry.record.text || entry.record.nearby || entry.record.target || entry.record.imported || entry.record.kind || entry.record.declarationKind,
    record: entry.record,
  };
}

function inferRisks(operatorId: string, handle: string, findings: Record<string, unknown>[], missingIndexes: string[]): string[] {
  const risks: string[] = [];
  if (missingIndexes.length > 0) {
    risks.push("One or more required indexes are missing, so absence evidence is unreliable.");
  }
  if (findings.length === 0) {
    risks.push("No matching records were found; treat this as weak absence unless indexes are fresh and in scope.");
  }
  if (operatorId === "doc-ref-query" && handle === "broken" && findings.length > 0) {
    risks.push("Broken or unresolved local documentation references may indicate stale maps or renamed artifacts.");
  }
  if (operatorId === "artifact-query" && findings.some((finding) => finding.generatedHint === true)) {
    risks.push("Generated or tool-maintained artifacts may require source updates or regeneration rather than direct edits.");
  }
  return risks;
}

function suggestNextChecks(operatorId: string, handle: string, findings: Record<string, unknown>[], missingIndexes: string[]): string[] {
  const suggestions: string[] = [];
  for (const indexId of missingIndexes) {
    suggestions.push(`Run build-${indexId} --json before relying on this operator for absence.`);
  }
  if (operatorId === "symbol-query" && findings.length > 0) {
    suggestions.push("Use dependency-query or consumer-impact-preview if symbol consumers matter.");
  }
  if (operatorId === "term-query" && ["drift", "replace-preview"].includes(handle)) {
    suggestions.push("Use safe-rename-workflow before editing because rename type is semantic.");
  }
  if (operatorId === "component-query" && findings.length > 0) {
    suggestions.push("Use component-reuse-evidence or reuse-or-branch-evidence-workflow when deciding reuse versus branch.");
  }
  if (operatorId === "diff-query" && findings.length > 0) {
    suggestions.push("Use affected-surface-mapping or change-report-assembly for review packaging.");
  }
  return suggestions;
}

function loadIndex(root: string, indexId: string): LoadedIndex {
  const artifactPath = path.resolve(root, "tool-maintained-files", "indexes", `${indexId}.json`);
  const json = readJsonIfExists(artifactPath) as Partial<IndexArtifact> | null;
  if (!json) {
    return {
      indexId,
      path: artifactPath,
      missing: true,
      index: {
        artifactId: indexId,
        indexId,
        stratum: 1,
        generated: true,
        schemaVersion: 1,
        generatedAt: "",
        sourceRoot: ".",
        pathReference: "Paths in this artifact are relative to the Agent OS root. Run tools from that root or pass --root to relocate safely.",
        sourceState: "missing-index",
        sourceRevision: null,
        producer: `build-${indexId}`,
        artifactPath: normalizePath(path.relative(root, artifactPath)),
        sourceInputs: [],
        freshnessPolicy: "Missing index.",
        coverage: "unknown",
        knownBlindSpots: [],
        recordCount: 0,
        maintenance: {
          metadataVersion: 1,
          maintainedBy: `build-${indexId}`,
          manualMaintenance: false,
          refreshCommand: `npx --yes tsx tool-implementations/indexes/build-${indexId}.ts --json`,
          checkCommand: `npx --yes tsx tool-implementations/indexes/build-${indexId}.ts --check --json`,
          sharding: {
            strategy: "record-count",
            targetRecordsPerShard: 500,
            shardCount: 0,
            shards: [],
          },
          semanticSupport: {
            status: "missing-index",
            embeddingsGenerated: false,
            vectorStoreGenerated: false,
            deterministicPath: "Build the index before using semantic retrieval metadata.",
            bootPolicy: "Missing indexes provide no boot-safe semantic metadata.",
            suggestedActivation: [],
          },
        },
        records: [],
      },
    };
  }
  const maintenance: IndexMaintenanceMetadata =
    json.maintenance && typeof json.maintenance === "object"
      ? (json.maintenance as IndexMaintenanceMetadata)
      : {
          metadataVersion: 1,
          maintainedBy: String(json.producer || `build-${indexId}`),
          manualMaintenance: false,
          refreshCommand: `npx --yes tsx tool-implementations/indexes/${String(json.producer || `build-${indexId}`)}.ts --json`,
          checkCommand: `npx --yes tsx tool-implementations/indexes/${String(json.producer || `build-${indexId}`)}.ts --check --json`,
          sharding: {
            strategy: "legacy-unsharded",
            targetRecordsPerShard: 0,
            shardCount: 0,
            shards: [],
          },
          semanticSupport: {
            status: "legacy-metadata-missing",
            embeddingsGenerated: false,
            vectorStoreGenerated: false,
            deterministicPath: "Regenerate this index to add deterministic maintenance metadata.",
            bootPolicy: "Legacy indexes should not be treated as semantic retrieval substrates.",
            suggestedActivation: [],
          },
        };
  return {
    indexId,
    path: artifactPath,
    missing: false,
    index: {
      ...json,
      artifactId: String(json.artifactId || indexId),
      indexId: String(json.indexId || indexId),
      stratum: 1,
      generated: true,
      schemaVersion: Number(json.schemaVersion || 1),
      generatedAt: String(json.generatedAt || ""),
      sourceRoot: String(json.sourceRoot || "."),
      pathReference: String(json.pathReference || "Paths are relative to the Agent OS root."),
      sourceState: String(json.sourceState || "working-tree"),
      sourceRevision: typeof json.sourceRevision === "string" ? json.sourceRevision : null,
      producer: String(json.producer || `build-${indexId}`),
      artifactPath: String(json.artifactPath || normalizePath(path.relative(root, artifactPath))),
      sourceInputs: Array.isArray(json.sourceInputs) ? json.sourceInputs.map(String) : [],
      freshnessPolicy: String(json.freshnessPolicy || ""),
      coverage: String(json.coverage || ""),
      knownBlindSpots: Array.isArray(json.knownBlindSpots) ? json.knownBlindSpots.map(String) : [],
      recordCount: Array.isArray(json.records) ? json.records.length : 0,
      maintenance,
      records: Array.isArray(json.records) ? (json.records as Record<string, unknown>[]) : [],
    },
  };
}

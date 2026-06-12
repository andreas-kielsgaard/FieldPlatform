import path from "node:path";
import { emit, parseArgs, resolveRoot, toNumber } from "../_lib/cli.ts";
import { gitLines, gitSha } from "../_lib/git.ts";
import { readJsonIfExists } from "../_lib/json.ts";
import { normalizePath } from "../_lib/text-utils.ts";
import type { IndexArtifact } from "../_lib/types.ts";

const args = parseArgs(process.argv.slice(2));
const root = resolveRoot(args);
const limit = toNumber(args.flags.limit, 20);
const query = String(args.flags.query || args.positional.join(" ")).trim();
const artifactPath = path.resolve(root, "tool-maintained-files", "semantic", "semantic-chunk-index.json");
const artifact = readJsonIfExists(artifactPath) as IndexArtifact | null;
const missing = !artifact || !Array.isArray(artifact.records);
const currentSourceRevision = gitSha(root);
const workingTreeChanges = semanticInputChanges(root);
const artifactIssues = semanticArtifactIssues(artifact, missing);
const freshnessWarnings = semanticFreshnessWarnings(missing, workingTreeChanges);
const queryTerms = normalizeQuery(query);
const records = missing ? [] : artifact.records;
const findings = records
  .map((record) => scoreRecord(record, queryTerms))
  .filter((entry) => !query || entry.score > 0)
  .sort((a, b) => b.score - a.score || String(a.record.file).localeCompare(String(b.record.file)) || Number(a.record.startLine) - Number(b.record.startLine))
  .slice(0, limit)
  .map(({ score, matchedTerms, record }) => ({
    indexId: "semantic-chunk-index",
    file: record.file,
    line: record.startLine,
    name: record.chunkId,
    detail: record.excerpt,
    score,
    matchedTerms,
    chunk: {
      chunkId: record.chunkId,
      startLine: record.startLine,
      endLine: record.endLine,
      chunkHash: record.chunkHash,
      surface: record.surface,
      embeddingStatus: record.embeddingStatus,
      vectorStatus: record.vectorStatus,
    },
  }));

emit(
  {
    operatorId: "semantic-candidate-query",
    stratum: 2,
    handle: "lexical-candidate",
    query,
    limit,
    indexes: [
      {
        indexId: "semantic-chunk-index",
        artifactPath: normalizePath(path.relative(root, artifactPath)),
        schemaVersion: artifact?.schemaVersion ?? null,
        generatedAt: artifact?.generatedAt ?? null,
        sourceRevision: artifact?.sourceRevision ?? null,
        currentSourceRevision,
        missing,
        recordCount: artifact?.recordCount ?? 0,
        shardCount: artifact?.maintenance?.sharding?.shardCount ?? 0,
        metadataMaintainedBy: artifact?.maintenance?.maintainedBy ?? "build-semantic-chunk-index",
        semanticSupportStatus: artifact?.maintenance?.semanticSupport?.status ?? "missing",
        freshnessWarnings,
        contractWarnings: artifactIssues,
      },
    ],
    observedEvidence: findings,
    inferredRisk: inferRisks(findings, missing, query, artifactIssues, freshnessWarnings),
    suggestedNextChecks: suggestNextChecks(findings, missing, artifactIssues, freshnessWarnings),
    warnings: [
      ...(missing ? ["semantic-chunk-index is missing; run build-semantic-chunk-index before relying on candidate absence."] : []),
      ...freshnessWarnings,
      ...artifactIssues.map((issue) => `Semantic artifact contract issue: ${issue}`),
      "Semantic candidates are lexical unless an explicit embedding/vector layer is later added.",
      "Candidate relevance is evidence, not semantic authority.",
    ],
    limitations: [
      "This operator never edits repository files.",
      "It returns bounded candidate chunks only.",
      "It does not decide ownership, audience, authority, abstraction quality, or whether two concepts mean the same thing.",
    ],
  },
  args,
);

function normalizeQuery(value: string): string[] {
  return Array.from(new Set(value.toLowerCase().match(/[a-z][a-z0-9_-]{1,}/g) || []));
}

function scoreRecord(record: Record<string, unknown>, terms: string[]): { record: Record<string, unknown>; score: number; matchedTerms: string[] } {
  if (terms.length === 0) {
    return { record, score: 1, matchedTerms: [] };
  }

  const haystack = [
    record.file,
    record.surface,
    record.excerpt,
    record.text,
    Array.isArray(record.terms) ? record.terms.join(" ") : "",
  ]
    .join(" ")
    .toLowerCase();
  const matchedTerms = terms.filter((term) => haystack.includes(term));
  const fileBoost = matchedTerms.some((term) => String(record.file || "").toLowerCase().includes(term)) ? 3 : 0;
  const termBoost = Array.isArray(record.terms) ? matchedTerms.filter((term) => record.terms.includes(term)).length : 0;
  return {
    record,
    score: matchedTerms.length + fileBoost + termBoost,
    matchedTerms,
  };
}

function semanticInputChanges(rootPath: string): string[] {
  return gitLines(rootPath, ["status", "--porcelain", "--", "."]).filter((line) => {
    const filePath = line.slice(3).replace(/\\/g, "/");
    const agentOsRelativePath = filePath.includes("Agent operating system migration/Agent OS/")
      ? filePath.split("Agent operating system migration/Agent OS/").pop() || filePath
      : filePath;
    return isSemanticInputPath(agentOsRelativePath);
  });
}

function isSemanticInputPath(filePath: string): boolean {
  return (
    filePath === "migration_agents.md" ||
    filePath.startsWith("prompt-files/") ||
    filePath.startsWith("project-control-files/") ||
    filePath.startsWith("tool-implementations/")
  );
}

function semanticArtifactIssues(artifactValue: IndexArtifact | null, missingArtifact: boolean): string[] {
  if (missingArtifact || !artifactValue) {
    return [];
  }

  const issues: string[] = [];
  const recordsValue = Array.isArray(artifactValue.records) ? artifactValue.records : [];
  if (artifactValue.schemaVersion !== 2) {
    issues.push("schemaVersion is not 2.");
  }
  if (artifactValue.generated !== true) {
    issues.push("generated flag is not true.");
  }
  if (artifactValue.producer !== "build-semantic-chunk-index") {
    issues.push("producer is not build-semantic-chunk-index.");
  }
  if (artifactValue.artifactPath !== "tool-maintained-files/semantic/semantic-chunk-index.json") {
    issues.push("artifactPath does not match the semantic chunk artifact path.");
  }
  if (artifactValue.recordCount !== recordsValue.length) {
    issues.push("recordCount does not match records length.");
  }
  if (artifactValue.maintenance?.maintainedBy !== "build-semantic-chunk-index") {
    issues.push("maintenance.maintainedBy is not build-semantic-chunk-index.");
  }
  if (artifactValue.maintenance?.semanticSupport?.embeddingsGenerated !== false) {
    issues.push("semanticSupport.embeddingsGenerated should be false for the current Phase 4 boundary.");
  }
  if (artifactValue.maintenance?.semanticSupport?.vectorStoreGenerated !== false) {
    issues.push("semanticSupport.vectorStoreGenerated should be false for the current Phase 4 boundary.");
  }
  const malformedRecord = recordsValue.find((record) => !isValidSemanticRecord(record));
  if (malformedRecord) {
    issues.push("one or more chunk records are missing required bounded candidate fields.");
  }
  return issues;
}

function isValidSemanticRecord(record: Record<string, unknown>): boolean {
  return (
    typeof record.chunkId === "string" &&
    typeof record.file === "string" &&
    typeof record.startLine === "number" &&
    typeof record.endLine === "number" &&
    typeof record.chunkHash === "string" &&
    typeof record.excerpt === "string" &&
    typeof record.text === "string" &&
    record.embeddingStatus === "not-generated" &&
    record.vectorStatus === "not-generated"
  );
}

function semanticFreshnessWarnings(missingArtifact: boolean, inputChanges: string[]): string[] {
  if (missingArtifact || inputChanges.length === 0) {
    return [];
  }
  return [
    `Working tree has ${inputChanges.length} Agent OS semantic input change(s); run build-semantic-chunk-index --check --json before relying on absence.`,
  ];
}

function inferRisks(
  findings: Record<string, unknown>[],
  missing: boolean,
  queryText: string,
  contractIssues: string[],
  freshnessIssues: string[],
): string[] {
  const risks: string[] = [];
  if (missing) {
    risks.push("The semantic chunk artifact is missing, so absence evidence is unavailable.");
  }
  if (contractIssues.length > 0) {
    risks.push("The semantic chunk artifact has contract issues, so candidate evidence may be incomplete or malformed.");
  }
  if (freshnessIssues.length > 0) {
    risks.push("The semantic chunk artifact may be stale relative to local Agent OS changes.");
  }
  if (queryText && findings.length === 0) {
    risks.push("No candidate chunks matched; this is weak absence unless freshness and query scope are adequate.");
  }
  return risks;
}

function suggestNextChecks(findings: Record<string, unknown>[], missing: boolean, contractIssues: string[], freshnessIssues: string[]): string[] {
  if (missing) {
    return ["Run npx --yes tsx tool-implementations/semantic/build-semantic-chunk-index.ts --json."];
  }
  if (contractIssues.length > 0 || freshnessIssues.length > 0) {
    return [
      "Run npx --yes tsx tool-implementations/semantic/build-semantic-chunk-index.ts --check --json.",
      "Regenerate semantic chunks before relying on absence if the check reports stale output.",
    ];
  }
  if (findings.length > 0) {
    return ["Use retrieve-slice on promising chunks before editing or drawing a semantic conclusion."];
  }
  return ["Try a narrower term-query, symbol-query, path-query, or a related synonym before treating absence as meaningful."];
}

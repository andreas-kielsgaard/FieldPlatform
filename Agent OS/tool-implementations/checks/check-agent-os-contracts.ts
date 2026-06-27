import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parseArgs, resolveRoot } from "../_lib/cli.ts";
import { ACTIVE_INDEX_CATALOG } from "../_lib/index-catalog.ts";
import { readJsonIfExists } from "../_lib/json.ts";
import { normalizePath } from "../_lib/text-utils.ts";

type ContractFinding = {
  severity: "error" | "warning";
  surface: string;
  message: string;
};

const args = parseArgs(process.argv.slice(2));
const root = resolveRoot(args);
const findings: ContractFinding[] = [];

checkLegacyIndexCatalog();
checkToolMap();
checkSemanticLayer();
checkGeneratedArtifactPortability();

const errors = findings.filter((finding) => finding.severity === "error");
const result = {
  checkId: "agent-os-contract-check",
  root: normalizePath(root),
  passed: errors.length === 0,
  errorCount: errors.length,
  warningCount: findings.length - errors.length,
  observedEvidence: findings,
  inferredRisk: errors.length > 0 ? ["Legacy Agent OS maps, semantic files, scripts, or generated artifacts are out of sync."] : [],
  suggestedNextChecks:
    errors.length > 0
      ? ["Repair the missing or mismatched legacy contract surface, then rerun this check only if the legacy maintenance task calls for it."]
      : ["Rerun only after explicit legacy Agent OS map, tool-contract, index-builder, or semantic-layer maintenance."],
  warnings: findings.filter((finding) => finding.severity === "warning").map((finding) => finding.message),
  limitations: [
    "This check verifies structural contract alignment only.",
    "It does not prove semantic correctness of prompt guidance, builder records, or operator ranking.",
  ],
};

if (args.flags.json) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`agent-os-contract-check: ${result.passed ? "passed" : "failed"}\n`);
  for (const finding of findings) {
    process.stdout.write(`- ${finding.severity}: ${finding.surface}: ${finding.message}\n`);
  }
}

if (errors.length > 0) {
  process.exit(1);
}

function checkLegacyIndexCatalog(): void {
  const indexMapPath = "prompt-files/agent-attention-system/maps/index-map.md";
  const indexMap = readText(indexMapPath);
  const indexMapIds = parseBacktickedIds(indexMap);
  const manifest = readJsonIfExists(path.join(root, "tool-maintained-files", "indexes", "index-manifest.json")) as
    | Record<string, unknown>
    | null;
  const manifestRecords = Array.isArray(manifest?.records) ? (manifest.records as Record<string, unknown>[]) : [];

  if (!manifest) {
    add("error", "index-manifest", "Missing or unparsable tool-maintained-files/indexes/index-manifest.json.");
  } else if (manifest.schemaVersion !== 2) {
    add("error", "index-manifest", "index-manifest artifact schemaVersion should be 2.");
  }

  for (const entry of ACTIVE_INDEX_CATALOG) {
    if (!indexMapIds.has(entry.indexId)) {
      add("error", "index-map", `Missing legacy index row for ${entry.indexId}.`);
    }
    expectFile(entry.semanticFile, `${entry.indexId} semantic file`);
    expectFile(`tool-implementations/indexes/${entry.builder}.ts`, `${entry.indexId} builder`);
    expectFile(entry.artifactPath, `${entry.indexId} artifact`);

    const manifestRow = manifestRecords.find((record) => record.indexId === entry.indexId);
    if (!manifestRow) {
      add("error", "index-manifest", `Missing manifest record for ${entry.indexId}.`);
      continue;
    }
    if (manifestRow.tier !== entry.tier) {
      add("error", "index-manifest", `${entry.indexId} tier mismatch: manifest has ${String(manifestRow.tier)}; catalog has ${entry.tier}.`);
    }
    if (entry.indexId === "index-manifest" && manifestRow.schemaVersion !== 2) {
      add("error", "index-manifest", "index-manifest self-row schemaVersion should be 2.");
    }
  }

  if (!indexMapIds.has("build-all-indexes")) {
    add("error", "index-map", "Missing build-all-indexes maintenance command row.");
  }
  expectFile("prompt-files/tools/indexes/build-all-indexes.md", "build-all-indexes semantic file");
  expectFile("tool-implementations/indexes/build-all-indexes.ts", "build-all-indexes script");
}

function checkToolMap(): void {
  const toolMap = readText("prompt-files/agent-attention-system/maps/tool-map.md");
  const toolIds = Array.from(parseBacktickedIds(toolMap)).filter((id) => id.endsWith("-query") || id === "retrieve-slice");
  for (const toolId of toolIds) {
    expectFile(`prompt-files/tools/operators/${toolId}.md`, `${toolId} semantic file`);
    expectFile(`tool-implementations/operators/${toolId}.ts`, `${toolId} operator script`);
  }
}

function checkSemanticLayer(): void {
  const semanticMapPath = "prompt-files/agent-attention-system/maps/semantic-map.md";
  const semanticMap = readText(semanticMapPath);
  const semanticIds = parseBacktickedIds(semanticMap);
  const requiredIds = ["semantic-chunk-index", "build-semantic-chunk-index", "semantic-candidate-query"];
  for (const id of requiredIds) {
    if (!semanticIds.has(id)) {
      add("error", "semantic-map", `Missing Phase 3 semantic-layer row or reference for ${id}.`);
    }
  }

  expectFile("prompt-files/tools/semantic/semantic-chunk-index.md", "semantic-chunk-index semantic file");
  expectFile("tool-implementations/semantic/build-semantic-chunk-index.ts", "semantic-chunk-index builder");
  expectFile("tool-maintained-files/semantic/semantic-chunk-index.json", "semantic-chunk-index artifact");
  expectFile("prompt-files/tools/operators/semantic-candidate-query.md", "semantic-candidate-query semantic file");
  expectFile("tool-implementations/operators/semantic-candidate-query.ts", "semantic-candidate-query operator script");
  validateSemanticChunkArtifact();

  for (const reservedId of ["semantic-embedding-index", "semantic-vector-store-manifest"]) {
    if (!semanticIds.has(reservedId)) {
      add("error", "semantic-map", `Missing reserved future semantic ID ${reservedId}.`);
    }
  }

  const embeddingArtifact = "tool-maintained-files/semantic/semantic-embedding-index.json";
  const vectorArtifact = "tool-maintained-files/semantic/semantic-vector-store-manifest.json";
  if (existsRelative(embeddingArtifact)) {
    add("warning", "semantic-layer", `${embeddingArtifact} exists even though embeddings are not active in the current semantic map.`);
  }
  if (existsRelative(vectorArtifact)) {
    add("warning", "semantic-layer", `${vectorArtifact} exists even though vector-store payloads are not active in the current semantic map.`);
  }
}

function validateSemanticChunkArtifact(): void {
  const relativePath = "tool-maintained-files/semantic/semantic-chunk-index.json";
  const artifact = readJsonIfExists(path.join(root, relativePath)) as Record<string, unknown> | null;
  if (!artifact) {
    add("error", "semantic-chunk-index", `${relativePath} is missing or unparsable.`);
    return;
  }

  const records = Array.isArray(artifact.records) ? (artifact.records as Record<string, unknown>[]) : [];
  const maintenance = artifact.maintenance && typeof artifact.maintenance === "object" ? (artifact.maintenance as Record<string, unknown>) : null;
  const semanticSupport =
    maintenance?.semanticSupport && typeof maintenance.semanticSupport === "object" ? (maintenance.semanticSupport as Record<string, unknown>) : null;

  if (artifact.schemaVersion !== 2) {
    add("error", "semantic-chunk-index", "schemaVersion should be 2.");
  }
  if (artifact.generated !== true) {
    add("error", "semantic-chunk-index", "generated should be true.");
  }
  if (artifact.producer !== "build-semantic-chunk-index") {
    add("error", "semantic-chunk-index", "producer should be build-semantic-chunk-index.");
  }
  if (artifact.artifactPath !== relativePath) {
    add("error", "semantic-chunk-index", `artifactPath should be ${relativePath}.`);
  }
  if (artifact.recordCount !== records.length) {
    add("error", "semantic-chunk-index", "recordCount should match records length.");
  }
  if (maintenance?.maintainedBy !== "build-semantic-chunk-index") {
    add("error", "semantic-chunk-index", "maintenance.maintainedBy should be build-semantic-chunk-index.");
  }
  if (semanticSupport?.embeddingsGenerated !== false) {
    add("error", "semantic-chunk-index", "semanticSupport.embeddingsGenerated should remain false until embeddings are active.");
  }
  if (semanticSupport?.vectorStoreGenerated !== false) {
    add("error", "semantic-chunk-index", "semanticSupport.vectorStoreGenerated should remain false until vector stores are active.");
  }

  const malformedRecordIndex = records.findIndex((record) => !isValidSemanticChunkRecord(record));
  if (malformedRecordIndex >= 0) {
    add("error", "semantic-chunk-index", `record ${malformedRecordIndex} is missing required bounded candidate fields.`);
  }
}

function checkGeneratedArtifactPortability(): void {
  const artifactFiles = listJsonFiles("tool-maintained-files");
  for (const relativePath of artifactFiles) {
    const artifact = readJsonIfExists(path.join(root, relativePath));
    if (!artifact) {
      continue;
    }
    inspectPortableValue(relativePath, artifact, []);
  }
}

function listJsonFiles(relativeDir: string): string[] {
  const absoluteDir = path.join(root, relativeDir);
  if (!existsSync(absoluteDir)) {
    return [];
  }

  const results: string[] = [];
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    const childRelative = normalizePath(path.join(relativeDir, entry.name));
    if (entry.isDirectory()) {
      results.push(...listJsonFiles(childRelative));
    } else if (entry.isFile() && childRelative.endsWith(".json")) {
      results.push(childRelative);
    }
  }
  return results;
}

function inspectPortableValue(surface: string, value: unknown, keyPath: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => inspectPortableValue(surface, entry, [...keyPath, String(index)]));
    return;
  }
  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    const nextPath = [...keyPath, key];
    if (key === "absolutePath") {
      add("error", surface, `Generated artifact contains absolutePath at ${nextPath.join(".")}. Use Agent OS root-relative paths instead.`);
    }
    if (typeof entry === "string" && looksLikeAbsoluteLocalPath(entry) && shouldCheckAbsolutePathValue(key)) {
      add("error", surface, `Generated artifact contains local absolute path at ${nextPath.join(".")}. Use Agent OS root-relative paths instead.`);
    }
    inspectPortableValue(surface, entry, nextPath);
  }
}

function shouldCheckAbsolutePathValue(key: string): boolean {
  return !["text", "excerpt", "nearby", "detail"].includes(key);
}

function looksLikeAbsoluteLocalPath(value: string): boolean {
  return /^[A-Za-z]:[\\/]/.test(value) || /^\/(Users|home)\//.test(value);
}

function isValidSemanticChunkRecord(record: Record<string, unknown>): boolean {
  return (
    typeof record.chunkId === "string" &&
    typeof record.file === "string" &&
    typeof record.startLine === "number" &&
    typeof record.endLine === "number" &&
    typeof record.lineCount === "number" &&
    typeof record.chunkHash === "string" &&
    typeof record.surface === "string" &&
    Array.isArray(record.terms) &&
    typeof record.excerpt === "string" &&
    typeof record.text === "string" &&
    record.embeddingStatus === "not-generated" &&
    record.vectorStatus === "not-generated"
  );
}

function readText(relativePath: string): string {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    add("error", relativePath, "Missing file.");
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function expectFile(relativePath: string, label: string): void {
  if (!existsRelative(relativePath)) {
    add("error", label, `Missing ${relativePath}.`);
  }
}

function existsRelative(relativePath: string): boolean {
  return existsSync(path.join(root, relativePath));
}

function parseBacktickedIds(markdown: string): Set<string> {
  const ids = new Set<string>();
  for (const line of markdown.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) {
      continue;
    }
    for (const match of line.matchAll(/`([^`]+)`/g)) {
      ids.add(match[1]);
    }
  }
  return ids;
}

function add(severity: "error" | "warning", surface: string, message: string): void {
  findings.push({ severity, surface, message });
}

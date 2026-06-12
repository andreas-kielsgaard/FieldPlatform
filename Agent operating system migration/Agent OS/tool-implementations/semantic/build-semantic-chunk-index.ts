import { createHash } from "node:crypto";
import { runIndexBuilder } from "../_lib/index-runner.ts";
import { COMMON_WORDS } from "../_lib/source-extractors.ts";
import type { FileRecord, IndexDefinition } from "../_lib/types.ts";

const CHUNK_LINE_COUNT = 80;

const definition: IndexDefinition = {
  id: "semantic-chunk-index",
  producer: "build-semantic-chunk-index",
  artifactPath: "tool-maintained-files/semantic/semantic-chunk-index.json",
  sourceInputs: ["Agent OS prompt files, tool implementation files, project control files, and other text sources"],
  coverage: "Deterministic bounded text chunks for fuzzy recall, near-match discovery, broad source orientation, and future semantic retrieval substrates.",
  knownBlindSpots: [
    "Chunk boundaries are mechanical and may split a semantic unit.",
    "Embeddings and vector-store payloads are not generated in this phase.",
    "Candidate relevance is lexical until a deterministic embedding pipeline is explicitly added.",
  ],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildSemanticChunkRecords(contentFiles) });

function buildSemanticChunkRecords(files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  for (const file of files) {
    const nonEmptyLines = file.lines.filter((line) => line.trim().length > 0);
    if (nonEmptyLines.length === 0) {
      continue;
    }

    for (let start = 0; start < file.lines.length; start += CHUNK_LINE_COUNT) {
      const chunkLines = file.lines.slice(start, start + CHUNK_LINE_COUNT);
      const text = trimTrailingBlankLines(chunkLines).join("\n");
      if (!text.trim()) {
        continue;
      }

      const startLine = start + 1;
      const endLine = start + chunkLines.length;
      const chunkId = `${file.path}#L${startLine}-L${endLine}`;

      records.push({
        chunkId,
        file: file.path,
        startLine,
        endLine,
        lineCount: chunkLines.length,
        chunkHash: sha256(text),
        surface: classifySurface(file.path),
        terms: extractTerms(text).slice(0, 40),
        excerpt: excerptFor(text),
        text,
        embeddingStatus: "not-generated",
        vectorStatus: "not-generated",
      });
    }
  }

  return records;
}

function trimTrailingBlankLines(lines: string[]): string[] {
  const result = [...lines];
  while (result.length > 0 && result[result.length - 1].trim() === "") {
    result.pop();
  }
  return result;
}

function classifySurface(filePath: string): string {
  if (filePath.startsWith("prompt-files/")) {
    return "prompt";
  }
  if (filePath.startsWith("tool-implementations/")) {
    return "tool-implementation";
  }
  if (filePath.startsWith("project-control-files/")) {
    return "project-control";
  }
  if (/\.md$/.test(filePath)) {
    return "docs";
  }
  if (/\.(cjs|js|jsx|mjs|ts|tsx)$/.test(filePath)) {
    return "code";
  }
  return "text";
}

function extractTerms(text: string): string[] {
  const seen = new Set<string>();
  const terms: string[] = [];
  for (const match of text.matchAll(/[A-Za-z][A-Za-z0-9_-]{2,}/g)) {
    const term = match[0].toLowerCase();
    if (COMMON_WORDS.has(term) || seen.has(term)) {
      continue;
    }
    seen.add(term);
    terms.push(term);
  }
  return terms;
}

function excerptFor(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, 320);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

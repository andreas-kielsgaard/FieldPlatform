import { fieldPlatformContextAdapterConfig } from "../adapters/field-platform-adapter-config.mjs";
import { contextBundleLimitations, contextBundleWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildContextEvidenceSnapshot } from "../core/context-evidence-snapshot.mjs";
import {
  DEFAULT_LITERAL_SEARCH_LIMIT,
  LITERAL_SEARCH_SOURCE_TOOL,
  searchManifestIncludedFiles,
} from "../core/literal-search.mjs";
import { isRepoRelativePosixPath, toRepoRelativePosixPath } from "../core/repo-paths.mjs";

export const DEFAULT_CONTEXT_BUNDLE_LIMITS = Object.freeze({
  files: 20,
  symbols: 40,
  chunks: 40,
  dependencyEdges: 40,
  searchMatches: 40,
});

export function buildBundleEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  paths,
  symbols,
  queries,
  withFreshness = false,
  limits = DEFAULT_CONTEXT_BUNDLE_LIMITS,
  manifest,
  dependencyEvidence,
} = {}) {
  const validation = validateBundleRequest({
    paths,
    symbols,
    queries,
    limits,
    repoRoot,
  });

  if (!validation.ok) {
    return createBundleEnvelope({
      generatedAt,
      status: "error",
      data: buildEmptyBundleData({
        generatedAt,
        requestedSelectors: validation.requestedSelectors,
        limits: validation.limits,
      }),
      warnings: validation.warnings,
      withFreshness,
    });
  }

  const snapshot = buildContextEvidenceSnapshot({
    generatedAt,
    repoRoot,
    withFreshness,
    manifest,
    dependencyEvidence,
  });
  const data = buildBundleData({
    snapshot,
    repoRoot,
    requestedSelectors: validation.requestedSelectors,
    limits: validation.limits,
    withFreshness,
  });
  const warnings = [
    ...contextBundleWarnings({ withFreshness }),
    ...data.selectorWarnings,
    ...buildTruncationWarnings(data.summary.truncated, data.summary.available, validation.limits),
  ];

  return createBundleEnvelope({
    generatedAt,
    status: determineBundleStatus({ snapshot, data }),
    data,
    warnings,
    withFreshness,
  });
}

export function printBundleSummary(envelope, stdout) {
  const summary = envelope.data.summary;

  stdout.write("agent-os context bundle\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Requested paths: ${envelope.data.requestedSelectors.paths.length}\n`);
  stdout.write(`Requested symbols: ${envelope.data.requestedSelectors.symbols.length}\n`);
  stdout.write(`Requested queries: ${envelope.data.requestedSelectors.queries.length}\n`);
  stdout.write(`Files: ${summary.files}\n`);
  stdout.write(`Symbols: ${summary.symbols}\n`);
  stdout.write(`Chunks: ${summary.chunks}\n`);
  stdout.write(`Dependency edges: ${summary.dependencyEdges}\n`);
  stdout.write(`Search matches: ${summary.searchMatches}\n`);
  stdout.write(`Freshness evidence: ${summary.freshnessEvidence}\n`);
  stdout.write(`Truncated: ${summary.truncated.any}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}

function validateBundleRequest({ paths, symbols, queries, limits, repoRoot }) {
  const warnings = [];
  const requestedSelectors = {
    paths: [],
    symbols: [],
    queries: [],
  };

  for (const requestedPath of asArray(paths)) {
    const pathResult = normalizeRequestedPath(requestedPath, repoRoot);
    if (!pathResult.ok) {
      warnings.push(pathResult.message);
    } else {
      requestedSelectors.paths.push(pathResult.path);
    }
  }

  for (const symbol of asArray(symbols)) {
    if (typeof symbol !== "string" || symbol.length === 0) {
      warnings.push("Symbol selector must use --symbol=<exact-symbol-name>.");
    } else {
      requestedSelectors.symbols.push(symbol);
    }
  }

  for (const query of asArray(queries)) {
    if (typeof query !== "string" || query.length === 0) {
      warnings.push("Query selector must use --query=<literal-text>.");
    } else {
      requestedSelectors.queries.push(query);
    }
  }

  const limitResult = normalizeBundleLimits(limits);
  if (!limitResult.ok) {
    warnings.push(...limitResult.warnings);
  }

  const selectorCount =
    requestedSelectors.paths.length +
    requestedSelectors.symbols.length +
    requestedSelectors.queries.length;
  if (selectorCount === 0) {
    warnings.push(
      "Missing selector. Provide at least one of --path=<path>, --symbol=<name>, or --query=<literal-text>.",
    );
  }

  return {
    ok: warnings.length === 0,
    requestedSelectors: deduplicateSelectors(requestedSelectors),
    limits: limitResult.limits,
    warnings,
  };
}

function normalizeRequestedPath(requestedPath, repoRoot) {
  if (typeof requestedPath !== "string" || requestedPath.length === 0) {
    return {
      ok: false,
      message: "Path selector must use --path=<repo-relative-posix-path>.",
    };
  }

  if (!isRepoRelativePosixPath(requestedPath)) {
    return {
      ok: false,
      message:
        "Path selector must be repository-relative POSIX without drive, root, backslash, or traversal.",
    };
  }

  try {
    const normalizedPath = toRepoRelativePosixPath(requestedPath, { repoRoot });
    if (normalizedPath !== requestedPath) {
      return {
        ok: false,
        message: "Path selector must use normalized repository-relative POSIX syntax.",
      };
    }

    return {
      ok: true,
      path: normalizedPath,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

function normalizeBundleLimits(limits) {
  const warnings = [];
  const normalized = {};

  for (const [key, defaultValue] of Object.entries(DEFAULT_CONTEXT_BUNDLE_LIMITS)) {
    const rawLimit = limits?.[key] ?? defaultValue;
    const numericLimit =
      typeof rawLimit === "number" ? rawLimit : Number.parseInt(String(rawLimit), 10);

    if (!Number.isInteger(numericLimit) || numericLimit < 1) {
      warnings.push(`Bundle ${key} limit must be a positive integer.`);
      normalized[key] = defaultValue;
    } else {
      normalized[key] = numericLimit;
    }
  }

  return {
    ok: warnings.length === 0,
    limits: normalized,
    warnings,
  };
}

function deduplicateSelectors(requestedSelectors) {
  return {
    paths: uniqueStrings(requestedSelectors.paths).sort(compareStrings),
    symbols: uniqueStrings(requestedSelectors.symbols).sort(compareStrings),
    queries: uniqueStrings(requestedSelectors.queries).sort(compareStrings),
  };
}

function buildBundleData({ snapshot, repoRoot, requestedSelectors, limits, withFreshness }) {
  const selectors = {
    paths: [],
    symbols: [],
    queries: [],
  };
  const selectorWarnings = [];
  const fileByPath = new Map(snapshot.files.map((file) => [file.path, file]));
  const includedSourcePathSet = new Set(
    snapshot.files.filter(isIncludedSourceFile).map((file) => file.path),
  );
  const selectedFilePathSet = new Set();
  const anchorFilePathSet = new Set();
  const symbolCandidates = new Map();
  const chunkCandidates = new Map();
  const searchMatchCandidates = new Map();

  for (const requestedPath of requestedSelectors.paths) {
    const manifestFile = fileByPath.get(requestedPath) ?? null;
    const includedSource = manifestFile ? isIncludedSourceFile(manifestFile) : false;
    selectors.paths.push({
      path: requestedPath,
      manifestKnown: Boolean(manifestFile),
      includedSource,
      excluded: manifestFile?.inclusionStatus === "excluded" || false,
      generated: manifestFile?.flags?.generated === true,
      archive: manifestFile?.flags?.archive === true,
    });

    if (!manifestFile) {
      selectorWarnings.push(`Path selector produced no manifest evidence: ${requestedPath}.`);
      continue;
    }

    selectedFilePathSet.add(requestedPath);
    if (!includedSource) {
      selectorWarnings.push(`Path selector is excluded by source policy: ${requestedPath}.`);
      continue;
    }

    anchorFilePathSet.add(requestedPath);
    for (const symbol of snapshot.symbols.filter(
      (candidate) => candidate.definingLocation?.path === requestedPath,
    )) {
      symbolCandidates.set(symbolKey(symbol), symbol);
    }
    for (const chunk of snapshot.chunks.filter(
      (candidate) => candidate.filePath === requestedPath,
    )) {
      chunkCandidates.set(candidateChunkKey(chunk), chunk);
    }
  }

  for (const requestedSymbol of requestedSelectors.symbols) {
    const matchedSymbols = snapshot.symbols.filter((symbol) => symbol.name === requestedSymbol);
    selectors.symbols.push({
      name: requestedSymbol,
      matchedSymbols: matchedSymbols.length,
      exactNameMatch: true,
    });

    if (matchedSymbols.length === 0) {
      selectorWarnings.push(
        `Symbol selector produced no exact symbol evidence: ${requestedSymbol}.`,
      );
      continue;
    }

    const matchedSymbolNames = new Set(matchedSymbols.map((symbol) => symbol.name));
    const definingFilePaths = uniqueStrings(
      matchedSymbols.map((symbol) => symbol.definingLocation?.path),
    );
    for (const filePath of definingFilePaths) {
      selectedFilePathSet.add(filePath);
      anchorFilePathSet.add(filePath);
    }
    for (const symbol of matchedSymbols) {
      symbolCandidates.set(symbolKey(symbol), symbol);
    }
    for (const chunk of snapshot.chunks.filter(
      (chunk) =>
        definingFilePaths.includes(chunk.filePath) &&
        chunkMentionsMatchedSymbol(chunk, matchedSymbolNames),
    )) {
      chunkCandidates.set(candidateChunkKey(chunk), chunk);
    }
  }

  for (const requestedQuery of requestedSelectors.queries) {
    const search = searchManifestIncludedFiles({
      repoRoot,
      manifest: {
        files: snapshot.files,
      },
      query: requestedQuery,
      appliedFilters: {
        path: null,
        language: null,
        caseSensitive: false,
        includeTests: false,
        limit: Math.max(limits.searchMatches, DEFAULT_LITERAL_SEARCH_LIMIT),
      },
    });
    selectors.queries.push({
      query: requestedQuery,
      literal: true,
      matchedFiles: search.matchingPaths.length,
      returnedMatches: search.matches.length,
      totalMatches: search.summary.totalMatches,
      truncated: search.summary.truncated,
    });

    if (search.summary.totalMatches === 0) {
      selectorWarnings.push(
        `Query selector produced no literal search evidence: ${requestedQuery}.`,
      );
      continue;
    }

    for (const filePath of search.matchingPaths) {
      selectedFilePathSet.add(filePath);
      anchorFilePathSet.add(filePath);
    }
    for (const match of search.matches) {
      searchMatchCandidates.set(searchMatchKey(match), match);
      for (const chunk of chunksContainingMatch(snapshot.chunks, match)) {
        chunkCandidates.set(candidateChunkKey(chunk), chunk);
      }
    }
  }

  const dependencyEdgeCandidates = collectDependencyEdges({
    snapshot,
    anchorFilePathSet,
    includedSourcePathSet,
  });
  for (const edge of dependencyEdgeCandidates) {
    selectedFilePathSet.add(edge.source.path);
    selectedFilePathSet.add(edge.target.path);
  }

  const availableFiles = [...selectedFilePathSet]
    .map((filePath) => fileByPath.get(filePath))
    .filter(Boolean)
    .sort(compareFiles);
  const files = limitArray(availableFiles, limits.files);
  const returnedFilePathSet = new Set(files.map((file) => file.path));
  const includedReturnedFilePathSet = new Set(
    files.filter(isIncludedSourceFile).map((file) => file.path),
  );

  const availableSymbols = [...symbolCandidates.values()]
    .filter((symbol) => returnedFilePathSet.has(symbol.definingLocation.path))
    .sort(compareSymbols);
  const availableChunks = [...chunkCandidates.values()]
    .filter((chunk) => returnedFilePathSet.has(chunk.filePath))
    .sort(compareChunks);
  const availableDependencyEdges = dependencyEdgeCandidates
    .filter(
      (edge) =>
        includedReturnedFilePathSet.has(edge.source.path) &&
        includedReturnedFilePathSet.has(edge.target.path),
    )
    .sort(compareDependencyEdges);
  const availableSearchMatches = [...searchMatchCandidates.values()]
    .filter((match) => returnedFilePathSet.has(match.path))
    .sort(compareSearchMatches);

  const symbols = limitArray(availableSymbols, limits.symbols);
  const chunks = limitArray(availableChunks, limits.chunks);
  const dependencyEdges = limitArray(availableDependencyEdges, limits.dependencyEdges);
  const searchMatches = limitArray(availableSearchMatches, limits.searchMatches);
  const freshnessEvidence = withFreshness
    ? files.map((file) => ({
        path: file.path,
        freshnessEvidence: file.freshnessEvidence ?? null,
      }))
    : null;

  return {
    adapterId: snapshot.adapterId,
    schemaVersion: snapshot.schemaVersion,
    generatedAt: snapshot.generatedAt,
    requestedSelectors,
    selectors,
    files,
    freshnessEvidence,
    symbols,
    chunks,
    dependencyEdges,
    searchMatches,
    summary: buildBundleSummary({
      files,
      symbols,
      chunks,
      dependencyEdges,
      searchMatches,
      freshnessEvidence,
      available: {
        files: availableFiles.length,
        symbols: availableSymbols.length,
        chunks: availableChunks.length,
        dependencyEdges: availableDependencyEdges.length,
        searchMatches: availableSearchMatches.length,
      },
      limits,
      selectors,
    }),
    selectorWarnings,
    producers: {
      ...snapshot.producers,
      search:
        requestedSelectors.queries.length > 0
          ? {
              sourceTool: LITERAL_SEARCH_SOURCE_TOOL,
              exactLiteralMatch: true,
              persistentIndexWritten: false,
            }
          : null,
      bundle: {
        deterministic: true,
        persistentArtifactWritten: false,
        graphTraversal: "direct-edges-only",
      },
    },
  };
}

function buildEmptyBundleData({ generatedAt, requestedSelectors, limits }) {
  return {
    adapterId: fieldPlatformContextAdapterConfig.adapterId,
    schemaVersion: null,
    generatedAt,
    requestedSelectors,
    selectors: {
      paths: [],
      symbols: [],
      queries: [],
    },
    files: [],
    freshnessEvidence: null,
    symbols: [],
    chunks: [],
    dependencyEdges: [],
    searchMatches: [],
    summary: buildBundleSummary({
      files: [],
      symbols: [],
      chunks: [],
      dependencyEdges: [],
      searchMatches: [],
      freshnessEvidence: null,
      available: {
        files: 0,
        symbols: 0,
        chunks: 0,
        dependencyEdges: 0,
        searchMatches: 0,
      },
      limits,
      selectors: {
        paths: [],
        symbols: [],
        queries: [],
      },
    }),
    selectorWarnings: [],
    producers: null,
  };
}

function collectDependencyEdges({ snapshot, anchorFilePathSet, includedSourcePathSet }) {
  const edges = new Map();

  for (const edge of snapshot.dependencyEdges) {
    if (!anchorFilePathSet.has(edge.source.path) && !anchorFilePathSet.has(edge.target.path)) {
      continue;
    }
    if (
      !includedSourcePathSet.has(edge.source.path) ||
      !includedSourcePathSet.has(edge.target.path)
    ) {
      continue;
    }
    edges.set(dependencyEdgeKey(edge), edge);
  }

  return [...edges.values()].sort(compareDependencyEdges);
}

function buildBundleSummary({
  files,
  symbols,
  chunks,
  dependencyEdges,
  searchMatches,
  freshnessEvidence,
  available,
  limits,
  selectors,
}) {
  const truncated = {
    files: available.files > files.length,
    symbols: available.symbols > symbols.length,
    chunks: available.chunks > chunks.length,
    dependencyEdges: available.dependencyEdges > dependencyEdges.length,
    searchMatches: available.searchMatches > searchMatches.length,
  };

  return {
    selectorCounts: {
      paths: selectors.paths.length,
      symbols: selectors.symbols.length,
      queries: selectors.queries.length,
    },
    files: files.length,
    includedFiles: files.filter(isIncludedSourceFile).length,
    excludedFiles: files.filter((file) => file.inclusionStatus === "excluded").length,
    freshnessEvidence: freshnessEvidence?.length ?? 0,
    symbols: symbols.length,
    chunks: chunks.length,
    dependencyEdges: dependencyEdges.length,
    searchMatches: searchMatches.length,
    available,
    limits,
    truncated: {
      ...truncated,
      any: Object.values(truncated).some(Boolean),
    },
  };
}

function buildTruncationWarnings(truncated, available, limits) {
  return Object.entries(truncated)
    .filter(([key, wasTruncated]) => key !== "any" && wasTruncated)
    .map(
      ([key]) =>
        `Bundle ${key} truncated to ${limits[key]} of ${available[key]} available selected entries.`,
    );
}

function determineBundleStatus({ snapshot, data }) {
  const selectorCount =
    data.requestedSelectors.paths.length +
    data.requestedSelectors.symbols.length +
    data.requestedSelectors.queries.length;
  const evidenceCount =
    data.files.length +
    data.symbols.length +
    data.chunks.length +
    data.dependencyEdges.length +
    data.searchMatches.length;

  if (selectorCount === 0) {
    return "error";
  }
  if (
    evidenceCount === 0 ||
    snapshot.producers.dependencyCruiser.exitCode !== 0 ||
    data.selectorWarnings.length > 0 ||
    data.summary.truncated.any
  ) {
    return "warning";
  }
  return "ok";
}

function createBundleEnvelope({ generatedAt, status, data, warnings, withFreshness }) {
  return createCommandEnvelope({
    name: "bundle",
    generatedAt,
    adapterId: fieldPlatformContextAdapterConfig.adapterId,
    status,
    data,
    warnings,
    limitations: contextBundleLimitations({ withFreshness }),
  });
}

function isIncludedSourceFile(file) {
  return (
    file?.inclusionStatus === "included" &&
    file.flags?.generated !== true &&
    file.flags?.archive !== true
  );
}

function chunkMentionsMatchedSymbol(chunk, symbolNameSet) {
  if (symbolNameSet.has(chunk.name)) {
    return true;
  }

  return [...(chunk.symbols ?? []), ...(chunk.exports ?? [])].some((name) =>
    symbolNameSet.has(name),
  );
}

function chunksContainingMatch(chunks, match) {
  return chunks.filter(
    (chunk) =>
      chunk.filePath === match.path &&
      comparePositions(chunk.range.start, match.range.start) <= 0 &&
      comparePositions(chunk.range.end, match.range.end) >= 0,
  );
}

function asArray(value) {
  if (value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function limitArray(values, limit) {
  return values.slice(0, limit);
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))];
}

function compareStrings(left, right) {
  return left.localeCompare(right);
}

function compareFiles(left, right) {
  return left.path.localeCompare(right.path);
}

function compareSymbols(left, right) {
  return (
    left.definingLocation.path.localeCompare(right.definingLocation.path) ||
    compareRanges(left.definingLocation.range, right.definingLocation.range) ||
    left.name.localeCompare(right.name) ||
    left.kind.localeCompare(right.kind)
  );
}

function compareChunks(left, right) {
  return (
    left.filePath.localeCompare(right.filePath) ||
    compareRanges(left.range, right.range) ||
    left.kind.localeCompare(right.kind) ||
    String(left.name ?? "").localeCompare(String(right.name ?? ""))
  );
}

function compareDependencyEdges(left, right) {
  return (
    left.source.path.localeCompare(right.source.path) ||
    left.target.path.localeCompare(right.target.path) ||
    left.edgeType.localeCompare(right.edgeType) ||
    String(left.provenance?.importSpecifier ?? "").localeCompare(
      String(right.provenance?.importSpecifier ?? ""),
    )
  );
}

function compareSearchMatches(left, right) {
  return left.path.localeCompare(right.path) || compareRanges(left.range, right.range);
}

function compareRanges(left, right) {
  return comparePositions(left.start, right.start) || comparePositions(left.end, right.end);
}

function comparePositions(left, right) {
  return left.line - right.line || left.character - right.character;
}

function symbolKey(symbol) {
  const location = symbol.definingLocation;
  return [
    location.path,
    rangeKey(location.range),
    symbol.name,
    symbol.kind,
    symbol.visibility,
    symbol.container ?? "",
  ].join("\u0000");
}

function candidateChunkKey(chunk) {
  return chunk.chunkId;
}

function dependencyEdgeKey(edge) {
  return [
    edge.source.path,
    edge.target.path,
    edge.edgeType,
    edge.provenance?.importSpecifier ?? "",
  ].join("\u0000");
}

function searchMatchKey(match) {
  return [match.path, rangeKey(match.range)].join("\u0000");
}

function rangeKey(range) {
  return [range.start.line, range.start.character, range.end.line, range.end.character].join(":");
}

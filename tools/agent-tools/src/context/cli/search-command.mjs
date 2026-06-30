import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextSearchLimitations, contextSearchWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildFileManifest } from "../core/file-manifest.mjs";
import {
  DEFAULT_LITERAL_SEARCH_LIMIT,
  LITERAL_SEARCH_SOURCE_TOOL,
  searchManifestIncludedFiles,
} from "../core/literal-search.mjs";
import { isRepoRelativePosixPath, toRepoRelativePosixPath } from "../core/repo-paths.mjs";

export function buildSearchEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  query,
  path,
  language,
  caseSensitive = false,
  includeTests = false,
  limit = DEFAULT_LITERAL_SEARCH_LIMIT,
  withFreshness = false,
  manifest,
  adapterConfig,
} = {}) {
  const contextAdapter = resolveContextAdapter({ adapterConfig });
  const validation = validateSearchRequest({
    query,
    path,
    language,
    caseSensitive,
    includeTests,
    limit,
    repoRoot,
  });

  if (!validation.ok) {
    return createSearchEnvelope({
      generatedAt,
      status: "error",
      data: buildEmptySearchData({
        generatedAt,
        query: validation.query,
        appliedFilters: validation.appliedFilters,
        adapterConfig: contextAdapter.adapterConfig,
      }),
      warnings: validation.warnings,
      withFreshness,
      adapterConfig: contextAdapter.adapterConfig,
    });
  }

  const fileManifest =
    manifest ??
    buildFileManifest({
      adapterConfig: contextAdapter.adapterConfig,
      repoRoot,
      generatedAt,
      withFreshness,
    });
  const search = searchManifestIncludedFiles({
    repoRoot,
    manifest: fileManifest,
    query: validation.query,
    appliedFilters: validation.appliedFilters,
  });
  const matchingPathSet = new Set(search.matchingPaths);
  const matchingFiles = fileManifest.files.filter((file) => matchingPathSet.has(file.path));
  const freshnessEvidence = withFreshness
    ? matchingFiles.map((file) => ({
        path: file.path,
        freshnessEvidence: file.freshnessEvidence ?? null,
      }))
    : null;
  const data = buildSearchData({
    generatedAt,
    manifest: fileManifest,
    query: validation.query,
    appliedFilters: validation.appliedFilters,
    matches: search.matches,
    matchingFiles,
    freshnessEvidence,
    searchSummary: search.summary,
  });
  const warnings = [...contextSearchWarnings({ withFreshness })];

  if (data.matches.length === 0) {
    warnings.push("No manifest-included files matched the literal query and filters.");
  }

  return createSearchEnvelope({
    generatedAt,
    status: data.matches.length === 0 ? "warning" : "ok",
    data,
    warnings,
    withFreshness,
    adapterConfig: contextAdapter.adapterConfig,
  });
}

export function printSearchSummary(envelope, stdout) {
  const summary = envelope.data.summary;

  stdout.write("agent-os context search\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Query: ${envelope.data.query}\n`);
  stdout.write(`Searched files: ${summary.searchedFiles}\n`);
  stdout.write(`Returned matches: ${summary.returnedMatches}\n`);
  stdout.write(`Total matches: ${summary.totalMatches}\n`);
  stdout.write(`Matching files: ${summary.matchingFiles}\n`);
  stdout.write(`Truncated: ${summary.truncated}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}

function validateSearchRequest({
  query,
  path,
  language,
  caseSensitive,
  includeTests,
  limit,
  repoRoot,
}) {
  const warnings = [];
  const appliedFilters = {
    path: null,
    language: null,
    caseSensitive: caseSensitive === true,
    includeTests: includeTests === true,
    limit: DEFAULT_LITERAL_SEARCH_LIMIT,
  };

  if (typeof query !== "string" || query.length === 0) {
    warnings.push("Missing required --query=<literal-text>.");
  }

  if (path !== undefined) {
    const pathResult = normalizeRequestedPath(path, repoRoot);
    if (!pathResult.ok) {
      warnings.push(pathResult.message);
    } else {
      appliedFilters.path = pathResult.path;
    }
  }

  if (language !== undefined) {
    if (typeof language !== "string" || language.length === 0) {
      warnings.push("Language filter must use --language=<language>.");
    } else {
      appliedFilters.language = language;
    }
  }

  const limitResult = normalizeLimit(limit);
  if (!limitResult.ok) {
    warnings.push(limitResult.message);
  } else {
    appliedFilters.limit = limitResult.limit;
  }

  return {
    ok: warnings.length === 0,
    query: typeof query === "string" && query.length > 0 ? query : null,
    appliedFilters,
    warnings,
  };
}

function normalizeRequestedPath(requestedPath, repoRoot) {
  if (typeof requestedPath !== "string" || requestedPath.length === 0) {
    return {
      ok: false,
      message: "Path filter must use --path=<repo-relative-posix-path>.",
    };
  }

  if (!isRepoRelativePosixPath(requestedPath)) {
    return {
      ok: false,
      message:
        "Path filter must be repository-relative POSIX without drive, root, backslash, or traversal.",
    };
  }

  try {
    const normalizedPath = toRepoRelativePosixPath(requestedPath, { repoRoot });
    if (normalizedPath !== requestedPath) {
      return {
        ok: false,
        message: "Path filter must use normalized repository-relative POSIX syntax.",
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

function normalizeLimit(limit) {
  const numericLimit =
    typeof limit === "number"
      ? limit
      : Number.parseInt(String(limit ?? DEFAULT_LITERAL_SEARCH_LIMIT), 10);

  if (!Number.isInteger(numericLimit) || numericLimit < 1) {
    return {
      ok: false,
      message: "Limit must be a positive integer.",
    };
  }

  return {
    ok: true,
    limit: numericLimit,
  };
}

function buildSearchData({
  generatedAt,
  manifest,
  query,
  appliedFilters,
  matches,
  matchingFiles,
  freshnessEvidence,
  searchSummary,
}) {
  return {
    adapterId: manifest.adapterId,
    schemaVersion: manifest.schemaVersion,
    generatedAt,
    query,
    appliedFilters,
    matches,
    matchingFiles,
    freshnessEvidence,
    summary: buildSearchSummary({
      query,
      appliedFilters,
      searchSummary,
      freshnessEvidence,
    }),
    producers: {
      manifest: {
        adapterId: manifest.adapterId,
        withFreshness: Boolean(freshnessEvidence),
      },
      search: {
        sourceTool: LITERAL_SEARCH_SOURCE_TOOL,
        exactLiteralMatch: true,
        persistentIndexWritten: false,
      },
    },
  };
}

function buildEmptySearchData({ generatedAt, query, appliedFilters, adapterConfig }) {
  return {
    adapterId: adapterConfig.adapterId,
    schemaVersion: null,
    generatedAt,
    query,
    appliedFilters,
    matches: [],
    matchingFiles: [],
    freshnessEvidence: null,
    summary: buildSearchSummary({
      query,
      appliedFilters,
      searchSummary: {
        searchedFiles: 0,
        candidateFiles: 0,
        skippedTestFiles: 0,
        totalMatches: 0,
        returnedMatches: 0,
        matchingFiles: 0,
        limit: appliedFilters.limit,
        truncated: false,
      },
      freshnessEvidence: null,
    }),
    producers: null,
  };
}

function buildSearchSummary({ query, appliedFilters, searchSummary, freshnessEvidence }) {
  return {
    query,
    literal: true,
    caseSensitive: appliedFilters.caseSensitive,
    filtersApplied: countAppliedFilters(appliedFilters),
    candidateFiles: searchSummary.candidateFiles,
    searchedFiles: searchSummary.searchedFiles,
    skippedTestFiles: appliedFilters.includeTests ? 0 : searchSummary.skippedTestFiles,
    totalMatches: searchSummary.totalMatches,
    returnedMatches: searchSummary.returnedMatches,
    matchingFiles: searchSummary.matchingFiles,
    freshnessEvidence: freshnessEvidence?.length ?? 0,
    limit: searchSummary.limit,
    truncated: searchSummary.truncated,
  };
}

function countAppliedFilters(appliedFilters) {
  return [
    appliedFilters.path,
    appliedFilters.language,
    appliedFilters.caseSensitive ? "case-sensitive" : null,
    appliedFilters.includeTests ? "include-tests" : null,
    appliedFilters.limit !== DEFAULT_LITERAL_SEARCH_LIMIT ? "limit" : null,
  ].filter((value) => value !== null).length;
}

function createSearchEnvelope({
  generatedAt,
  status,
  data,
  warnings,
  withFreshness,
  adapterConfig,
}) {
  return createCommandEnvelope({
    name: "search",
    generatedAt,
    adapterId: adapterConfig.adapterId,
    status,
    data,
    warnings,
    limitations: contextSearchLimitations({ withFreshness }),
  });
}

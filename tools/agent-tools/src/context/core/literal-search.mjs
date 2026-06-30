import { readFileSync } from "node:fs";

import { CONTEXT_PATH_FORMAT, resolveRepoRelativePath } from "./repo-paths.mjs";

export const DEFAULT_LITERAL_SEARCH_LIMIT = 100;
export const LITERAL_SEARCH_SOURCE_TOOL = "agent-os-literal-search";

export function searchManifestIncludedFiles({
  repoRoot = process.cwd(),
  manifest,
  query,
  appliedFilters,
} = {}) {
  const files = Array.isArray(manifest?.files) ? manifest.files : [];
  const searchableFiles = files
    .filter((file) => file.inclusionStatus === "included")
    .filter((file) => file.flags?.generated !== true)
    .filter((file) => file.flags?.archive !== true);
  const candidateFiles = searchableFiles.filter((file) => fileMatchesFilters(file, appliedFilters));
  const matches = [];
  const matchingPathSet = new Set();
  let totalMatches = 0;

  for (const file of candidateFiles) {
    const content = readTextFileOrNull(repoRoot, file.path);
    if (content === null) {
      continue;
    }

    const fileMatches = findLiteralMatchesInFile({
      file,
      content,
      query,
      caseSensitive: appliedFilters.caseSensitive,
    });

    if (fileMatches.length > 0) {
      matchingPathSet.add(file.path);
    }

    totalMatches += fileMatches.length;

    for (const match of fileMatches) {
      if (matches.length < appliedFilters.limit) {
        matches.push(match);
      }
    }
  }

  return {
    matches,
    matchingPaths: [...matchingPathSet].sort((left, right) => left.localeCompare(right)),
    summary: {
      searchedFiles: candidateFiles.length,
      candidateFiles: searchableFiles.length,
      skippedTestFiles: searchableFiles.filter((file) => file.documentKind === "test").length,
      totalMatches,
      returnedMatches: matches.length,
      matchingFiles: matchingPathSet.size,
      limit: appliedFilters.limit,
      truncated: totalMatches > matches.length,
    },
  };
}

function fileMatchesFilters(file, appliedFilters) {
  if (appliedFilters.path !== null && file.path !== appliedFilters.path) {
    return false;
  }
  if (appliedFilters.language !== null && file.language !== appliedFilters.language) {
    return false;
  }
  if (!appliedFilters.includeTests && file.documentKind === "test") {
    return false;
  }
  return true;
}

function findLiteralMatchesInFile({ file, content, query, caseSensitive }) {
  const matches = [];
  const needle = caseSensitive ? query : query.toLowerCase();
  const lines = content.split(/\r?\n/);

  for (const [lineIndex, lineText] of lines.entries()) {
    const haystack = caseSensitive ? lineText : lineText.toLowerCase();
    let searchFrom = 0;

    while (searchFrom <= haystack.length) {
      const foundAt = haystack.indexOf(needle, searchFrom);
      if (foundAt < 0) {
        break;
      }

      matches.push({
        path: file.path,
        pathFormat: CONTEXT_PATH_FORMAT,
        range: {
          lineBase: 0,
          encoding: "utf-16",
          start: {
            line: lineIndex,
            character: foundAt,
          },
          end: {
            line: lineIndex,
            character: foundAt + query.length,
          },
        },
        snippet: buildSnippet(lineText, foundAt, foundAt + query.length),
        language: file.language,
        documentKind: file.documentKind,
        sourceGroup: file.sourceGroup,
      });

      searchFrom = foundAt + Math.max(query.length, 1);
    }
  }

  return matches;
}

function buildSnippet(lineText, start, end) {
  const maxLength = 240;
  if (lineText.length <= maxLength) {
    return lineText;
  }

  const matchLength = end - start;
  const contextLength = Math.max(20, Math.floor((maxLength - matchLength - 6) / 2));
  const snippetStart = Math.max(0, start - contextLength);
  const snippetEnd = Math.min(lineText.length, end + contextLength);
  const prefix = snippetStart > 0 ? "..." : "";
  const suffix = snippetEnd < lineText.length ? "..." : "";

  return `${prefix}${lineText.slice(snippetStart, snippetEnd)}${suffix}`;
}

function readTextFileOrNull(repoRoot, repoPath) {
  try {
    return readFileSync(resolveRepoRelativePath(repoRoot, repoPath), "utf8");
  } catch {
    return null;
  }
}

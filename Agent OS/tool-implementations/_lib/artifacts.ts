import path from "node:path";
import { isCodeLike, isStoryFile, isTestFile } from "./repo-files.ts";

export function inferArtifactKind(filePath: string): string {
  if (/\.instructions\.md$/.test(filePath) || /(^|\/)(AGENTS|migration_agents|CLAUDE)\.md$/.test(filePath)) {
    return "agent-instruction";
  }
  if (/prompt-files\/skills\//.test(filePath)) {
    return "skill";
  }
  if (/prompt-files\/tools\/indexes\//.test(filePath)) {
    return "index-semantic-file";
  }
  if (/prompt-files\/tools\/operators\//.test(filePath)) {
    return "operator-semantic-file";
  }
  if (/prompt-files\/tools\/semantic\//.test(filePath)) {
    return "semantic-substrate-file";
  }
  if (/prompt-files\/tools\/checks\//.test(filePath)) {
    return "check-semantic-file";
  }
  if (/tool-implementations\/indexes\//.test(filePath)) {
    return "index-builder-script";
  }
  if (/tool-implementations\/operators\//.test(filePath)) {
    return "operator-script";
  }
  if (/tool-implementations\/semantic\//.test(filePath)) {
    return "semantic-builder-script";
  }
  if (/tool-implementations\/checks\//.test(filePath)) {
    return "check-script";
  }
  if (/tool-maintained-files\/(indexes|project-indexes)\/.+\.json$/.test(filePath)) {
    return "generated-index";
  }
  if (/tool-maintained-files\/semantic\/.+\.json$/.test(filePath)) {
    return "generated-semantic-artifact";
  }
  if (/map\.md$|index\.md$|registry\.md$|glossary\.md$|debt\.md$|experiments\.md$|checklist/i.test(filePath)) {
    return "map-or-memory";
  }
  if (isTestFile(filePath)) {
    return "test";
  }
  if (isStoryFile(filePath)) {
    return "story";
  }
  if (isCodeLike(filePath)) {
    return "source";
  }
  return path.extname(filePath).replace(".", "") || "file";
}

export function hasGeneratedHint(filePath: string, lines: string[]): boolean {
  if (/tool-maintained-files\/(indexes|project-indexes|semantic)\/.+\.json$/.test(filePath)) {
    return true;
  }

  const headerLines = lines.slice(0, 12);
  if (headerLines.some((line) =>
    /@generated\b/i.test(line) ||
    /\b(?:code\s+)?generated\s+by\b/i.test(line) ||
    /\bdo\s+not\s+edit\b/i.test(line),
  )) {
    return true;
  }

  return !isCodeLike(filePath) && headerLines.some((line) => /^\s*(?:producer|producerTool)\s*[:=]\s*["']?[A-Za-z0-9_-]+/i.test(line));
}

export function directEditPolicy(filePath: string, lines: string[]): string {
  if (hasGeneratedHint(filePath, lines)) {
    return "verify producer or regenerate before direct edits";
  }
  if (/prompt-files\/tools\/indexes\/|prompt-files\/tools\/operators\/|prompt-files\/tools\/semantic\/|prompt-files\/tools\/checks\/|prompt-files\/skills\//.test(filePath)) {
    return "manual semantic surface";
  }
  return "unknown";
}

export function possibleProducer(filePath: string, lines: string[]): string | null {
  if (!isCodeLike(filePath)) {
    const match = lines
      .slice(0, 20)
      .map((line) => line.match(/^\s*(?:producer|producerTool)\s*[:=]\s*["']?([A-Za-z0-9_-]+)/i))
      .find(Boolean);
    if (match) {
      return match[1];
    }
  }
  if (/tool-maintained-files\/(indexes|project-indexes)\/(.+)\.json$/.test(filePath)) {
    const id = filePath.match(/tool-maintained-files\/(?:indexes|project-indexes)\/(.+)\.json$/)?.[1];
    return id ? `build-${id}` : null;
  }
  if (/tool-maintained-files\/semantic\/(.+)\.json$/.test(filePath)) {
    const id = filePath.match(/tool-maintained-files\/semantic\/(.+)\.json$/)?.[1];
    return id ? `build-${id}` : null;
  }
  return null;
}

export function inferAudience(filePath: string): string {
  if (/prompt-files\/|tool-implementations\//.test(filePath)) {
    return "agent-or-maintainer";
  }
  if (/\.github\//.test(filePath)) {
    return "tool-adapter";
  }
  return "project";
}

export function inferAuthorityRole(filePath: string): string {
  if (/migration_agents\.md$|AGENTS\.md$/.test(filePath)) {
    return "global-router";
  }
  if (/task-mode-map|behavior-map|lens-map|skill-map|tool-map|index-map/.test(filePath)) {
    return "map";
  }
  if (/tool-maintained-files\/(indexes|project-indexes|semantic)\//.test(filePath)) {
    return "generated-evidence";
  }
  return "unknown";
}

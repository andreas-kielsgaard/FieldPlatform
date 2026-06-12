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
  if (/tool-implementations\/indexes\//.test(filePath)) {
    return "index-builder-script";
  }
  if (/tool-implementations\/operators\//.test(filePath)) {
    return "operator-script";
  }
  if (/tool-maintained-files\/indexes\/.+\.json$/.test(filePath)) {
    return "generated-index";
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
  return /tool-maintained-files\/indexes\/.+\.json$/.test(filePath) || lines.slice(0, 8).some((line) => /generated|do not edit|producer/i.test(line));
}

export function directEditPolicy(filePath: string, lines: string[]): string {
  if (hasGeneratedHint(filePath, lines)) {
    return "verify producer or regenerate before direct edits";
  }
  if (/prompt-files\/tools\/indexes\/|prompt-files\/tools\/operators\/|prompt-files\/skills\//.test(filePath)) {
    return "manual semantic surface";
  }
  return "unknown";
}

export function possibleProducer(filePath: string, lines: string[]): string | null {
  const joined = lines.slice(0, 20).join("\n");
  const match = joined.match(/producer(?:Tool)?["':\s]+([A-Za-z0-9_-]+)/i);
  if (match) {
    return match[1];
  }
  if (/tool-maintained-files\/indexes\/(.+)\.json$/.test(filePath)) {
    const id = filePath.match(/tool-maintained-files\/indexes\/(.+)\.json$/)?.[1];
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
  if (/tool-maintained-files\/indexes\//.test(filePath)) {
    return "generated-evidence";
  }
  return "unknown";
}

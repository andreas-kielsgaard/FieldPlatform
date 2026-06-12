import path from "node:path";
import type { FileRecord } from "../types.ts";
import { hasGeneratedHint, inferArtifactKind } from "../artifacts.ts";
import { normalizePath } from "../text-utils.ts";

export function buildPathRecords(root: string, files: FileRecord[]): Record<string, unknown>[] {
  const dirs = new Map<string, { path: string; kind: string; fileCount: number; childDirs: Set<string> }>();

  for (const file of files) {
    let current = path.posix.dirname(file.path);
    if (current === ".") {
      current = "";
    }

    const parts = current ? current.split("/") : [];
    for (let index = 0; index <= parts.length; index += 1) {
      const dirPath = parts.slice(0, index).join("/");
      const existing = dirs.get(dirPath) || { path: dirPath || ".", kind: "directory", fileCount: 0, childDirs: new Set<string>() };
      if (index === parts.length) {
        existing.fileCount += 1;
      }
      if (index < parts.length) {
        existing.childDirs.add(parts.slice(0, index + 1).join("/"));
      }
      dirs.set(dirPath, existing);
    }
  }

  const dirRecords = Array.from(dirs.values()).map((dir) => ({
    path: dir.path,
    kind: dir.kind,
    area: dir.path === "." ? "." : dir.path.split("/")[0],
    fileCount: dir.fileCount,
    childDirs: Array.from(dir.childDirs).sort(),
  }));

  const fileRecords = files.map((file) => ({
    path: file.path,
    kind: inferArtifactKind(file.path),
    area: file.path.split("/")[0] || ".",
    name: file.name,
    ext: file.ext,
    size: file.size,
    generatedHint: hasGeneratedHint(file.path, file.lines),
    absolutePath: normalizePath(path.resolve(root, file.path)),
  }));

  return [...dirRecords, ...fileRecords];
}

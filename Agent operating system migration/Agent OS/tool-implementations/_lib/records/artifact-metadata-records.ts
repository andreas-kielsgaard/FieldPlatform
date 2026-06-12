import type { FileRecord } from "../types.ts";
import { directEditPolicy, hasGeneratedHint, inferArtifactKind, inferAudience, inferAuthorityRole, possibleProducer } from "../artifacts.ts";

export function buildArtifactMetadataRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files.map((file) => ({
    path: file.path,
    kind: inferArtifactKind(file.path),
    generatedHint: hasGeneratedHint(file.path, file.lines),
    directEditPolicy: directEditPolicy(file.path, file.lines),
    possibleProducer: possibleProducer(file.path, file.lines),
    audience: inferAudience(file.path),
    authorityRole: inferAuthorityRole(file.path),
  }));
}

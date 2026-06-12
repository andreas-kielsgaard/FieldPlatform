import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildArtifactMetadataRecords } from "../_lib/records/artifact-metadata-records.ts";

const definition: IndexDefinition = {
  id: "artifact-metadata-index",
  producer: "build-artifact-metadata-index",
  artifactPath: "tool-maintained-files/indexes/artifact-metadata-index.json",
  sourceInputs: ["file paths, extensions, frontmatter-like headers, generated markers, and producer hints"],
  coverage: "Artifact kind, generated/manual/hybrid hints, direct-edit safety hints, and possible producers.",
  knownBlindSpots: ["Humans can bypass conventions; unknown metadata is uncertainty, not proof."],
};

runIndexBuilder({ definition, buildRecords: ({ files }) => buildArtifactMetadataRecords(files) });

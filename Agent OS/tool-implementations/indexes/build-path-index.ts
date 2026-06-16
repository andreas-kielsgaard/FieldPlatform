import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildPathRecords } from "../_lib/records/path-records.ts";

const definition: IndexDefinition = {
  id: "path-index",
  producer: "build-path-index",
  artifactPath: "tool-maintained-files/indexes/path-index.json",
  sourceInputs: ["repository file tree"],
  coverage: "Files, directories, extensions, areas, inferred artifact kinds, and generated/manual hints.",
  knownBlindSpots: ["Artifact kind is inferred from paths and file names, not full semantic ownership."],
};

runIndexBuilder({ definition, buildRecords: ({ files }) => buildPathRecords(files) });

import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildDependencyRecords } from "../_lib/records/dependency-records.ts";

const definition: IndexDefinition = {
  id: "dependency-index",
  producer: "build-dependency-index",
  artifactPath: "tool-maintained-files/indexes/dependency-index.json",
  sourceInputs: ["import, export-from, dynamic import, and require statements"],
  coverage: "Import edges, module specifiers, relative resolutions, and rough dependency direction evidence.",
  knownBlindSpots: ["Does not resolve package exports, TS path aliases, or runtime dependency injection."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildDependencyRecords(contentFiles) });

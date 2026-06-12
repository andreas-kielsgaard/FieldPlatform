import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildTestRecords } from "../_lib/records/test-records.ts";

const definition: IndexDefinition = {
  id: "test-index",
  producer: "build-test-index",
  artifactPath: "tool-maintained-files/indexes/test-index.json",
  sourceInputs: ["test, spec, story, fixture, and e2e file paths plus imports"],
  coverage: "Test and story files, likely tested subjects, imports, fixture references, and route/component hints.",
  knownBlindSpots: ["Does not execute tests or prove semantic coverage."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildTestRecords(contentFiles) });

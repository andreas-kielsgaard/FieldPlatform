import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildFixtureRecords } from "../_lib/records/fixture-records.ts";

const definition: IndexDefinition = {
  id: "fixture-scenario-index",
  producer: "build-fixture-scenario-index",
  artifactPath: "tool-maintained-files/indexes/fixture-scenario-index.json",
  sourceInputs: ["fixture, mock, seed, scenario, and demo paths/content"],
  coverage: "Fixture/scenario artifacts, consumers, represented terms, and shape hints.",
  knownBlindSpots: ["Project-specific scenario registries may require custom parsing later."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildFixtureRecords(contentFiles) });

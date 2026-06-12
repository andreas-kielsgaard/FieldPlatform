import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildAccessorRecords } from "../_lib/records/accessor-records.ts";

const definition: IndexDefinition = {
  id: "accessor-index",
  producer: "build-accessor-index",
  artifactPath: "tool-maintained-files/indexes/accessor-index.json",
  sourceInputs: ["api, accessor, service, repository, query, mutation, and fetch-like source"],
  coverage: "Accessor/API-like definitions, callers, read/write hints, cache hints, and boundary names.",
  knownBlindSpots: ["Does not infer runtime behavior, authorization, caching semantics, or compatibility promises."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildAccessorRecords(contentFiles) });

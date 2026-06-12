import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildRouteRecords } from "../_lib/records/route-records.ts";

const definition: IndexDefinition = {
  id: "route-index",
  producer: "build-route-index",
  artifactPath: "tool-maintained-files/indexes/route-index.json",
  sourceInputs: ["app, pages, route, page, and layout file paths"],
  coverage: "Route-like files, inferred route paths, params, route families, pages, layouts, and handlers.",
  knownBlindSpots: ["Framework-specific routing beyond common file conventions is not fully resolved."],
};

runIndexBuilder({ definition, buildRecords: ({ files }) => buildRouteRecords(files) });

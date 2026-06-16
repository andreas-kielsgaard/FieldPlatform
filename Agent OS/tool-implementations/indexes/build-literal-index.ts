import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildLiteralRecords } from "../_lib/records/literal-records.ts";

const definition: IndexDefinition = {
  id: "literal-index",
  producer: "build-literal-index",
  artifactPath: "tool-maintained-files/indexes/literal-index.json",
  sourceInputs: ["quoted strings, inline literals, and token-like values"],
  coverage: "String literals, role-like values, status-like values, token-like values, and arbitrary style-like values.",
  knownBlindSpots: ["Does not know whether a literal is product copy, test data, or implementation detail without context."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildLiteralRecords(contentFiles) });

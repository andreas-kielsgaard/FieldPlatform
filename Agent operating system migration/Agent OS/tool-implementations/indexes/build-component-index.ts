import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildComponentRecords } from "../_lib/records/component-records.ts";

const definition: IndexDefinition = {
  id: "component-index",
  producer: "build-component-index",
  artifactPath: "tool-maintained-files/indexes/component-index.json",
  sourceInputs: ["TS/JS/TSX/JSX source files and story/test paths"],
  coverage: "PascalCase component definitions, consumers, stories, tests, and props hints.",
  knownBlindSpots: ["Does not execute framework compilers and may confuse non-component PascalCase symbols."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildComponentRecords(contentFiles) });

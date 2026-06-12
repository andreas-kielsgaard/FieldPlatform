import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildSymbolRecords } from "../_lib/records/source-symbols.ts";

const definition: IndexDefinition = {
  id: "symbol-index",
  producer: "build-symbol-index",
  artifactPath: "tool-maintained-files/indexes/symbol-index.json",
  sourceInputs: ["text source files"],
  coverage: "Exported, imported, and locally declared symbols discoverable with lightweight source scanning.",
  knownBlindSpots: ["Regex scanning is not a full compiler or AST and may miss dynamic or language-specific symbols."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildSymbolRecords(contentFiles) });

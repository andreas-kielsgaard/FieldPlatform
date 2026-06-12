import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildTermRecords } from "../_lib/records/term-records.ts";

const definition: IndexDefinition = {
  id: "term-index",
  producer: "build-term-index",
  artifactPath: "tool-maintained-files/indexes/term-index.json",
  sourceInputs: ["markdown, source, JSON, and configuration text"],
  coverage: "Domain terms, headings, identifiers, UI-looking literals, and nearby language occurrences.",
  knownBlindSpots: ["Term meaning and canonical status remain semantic judgments."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildTermRecords(contentFiles) });

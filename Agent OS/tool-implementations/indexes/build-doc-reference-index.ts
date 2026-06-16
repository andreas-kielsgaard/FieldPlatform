import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildDocReferenceRecords } from "../_lib/records/doc-reference-records.ts";

const definition: IndexDefinition = {
  id: "doc-reference-index",
  producer: "build-doc-reference-index",
  artifactPath: "tool-maintained-files/indexes/doc-reference-index.json",
  sourceInputs: ["markdown links, markdown headings, and inline path/tool references"],
  coverage: "Markdown links, headings, file references, instruction references, tool IDs, and likely broken local links.",
  knownBlindSpots: ["External URLs, generated anchors, and prose-only references may need manual review."],
};

runIndexBuilder({ definition, buildRecords: ({ root, contentFiles }) => buildDocReferenceRecords(root, contentFiles) });

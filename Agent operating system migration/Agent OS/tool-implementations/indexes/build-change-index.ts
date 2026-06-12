import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildChangeRecords } from "../_lib/records/change-records.ts";

const definition: IndexDefinition = {
  id: "change-index",
  producer: "build-change-index",
  artifactPath: "tool-maintained-files/indexes/change-index.json",
  sourceInputs: ["git status --short --untracked-files=all, git diff --name-only, and changed file metadata"],
  coverage: "Changed files, status codes, generated/manual hints, and likely changed surfaces.",
  knownBlindSpots: ["Only reflects the current working tree and available git metadata."],
};

runIndexBuilder({ definition, buildRecords: ({ root, files }) => buildChangeRecords(root, files) });

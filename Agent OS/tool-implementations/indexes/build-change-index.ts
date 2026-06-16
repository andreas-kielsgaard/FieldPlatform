import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildChangeRecords } from "../_lib/records/change-records.ts";

const definition: IndexDefinition = {
  id: "change-index",
  producer: "build-change-index",
  artifactPath: "tool-maintained-files/indexes/change-index.json",
  sourceInputs: ["git status --short --untracked-files=all, git diff --name-only, changed file metadata, or committed-baseline mode"],
  coverage: "Changed files, status codes, generated/manual hints, likely changed surfaces, and optional committed-baseline view for commit preparation.",
  knownBlindSpots: [
    "Default mode reflects the current working tree and available git metadata.",
    "Committed-baseline mode intentionally omits local working-tree changes so committed generated artifacts do not preserve pre-commit dirtiness.",
  ],
};

runIndexBuilder({ definition, buildRecords: ({ root, files, args }) => buildChangeRecords(root, files, args) });

import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";
import { buildSchemaRecords } from "../_lib/records/schema-records.ts";

const definition: IndexDefinition = {
  id: "schema-shape-index",
  producer: "build-schema-shape-index",
  artifactPath: "tool-maintained-files/indexes/schema-shape-index.json",
  sourceInputs: ["schema, model, validator, type, interface, and migration-like files"],
  coverage: "Schema-like declarations, validators, fields, relation hints, and generated type references.",
  knownBlindSpots: ["Does not replace database, ORM, or validator-specific introspection."],
};

runIndexBuilder({ definition, buildRecords: ({ contentFiles }) => buildSchemaRecords(contentFiles) });

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type ParsedArgs = {
  positional: string[];
  flags: Record<string, string | boolean>;
};

export type FileRecord = {
  path: string;
  absolutePath: string;
  name: string;
  ext: string;
  size: number;
  lines: string[];
};

export type IndexDefinition = {
  id: string;
  producer: string;
  artifactPath: string;
  sourceInputs: string[];
  coverage: string;
  knownBlindSpots: string[];
};

export type IndexBuildContext = {
  root: string;
  files: FileRecord[];
  contentFiles: FileRecord[];
};

export type IndexBuilderSpec = {
  definition: IndexDefinition;
  buildRecords: (context: IndexBuildContext) => Record<string, unknown>[];
};

export type IndexArtifact = {
  artifactId: string;
  indexId: string;
  stratum: 1;
  generated: true;
  schemaVersion: number;
  generatedAt: string;
  sourceRoot: string;
  sourceRevision: string | null;
  producer: string;
  artifactPath: string;
  sourceInputs: string[];
  freshnessPolicy: string;
  coverage: string;
  knownBlindSpots: string[];
  recordCount: number;
  records: Record<string, unknown>[];
};

export type QueryOperatorSpec = {
  operatorId: string;
  indexIds: string[];
};

export type LoadedIndex = {
  indexId: string;
  path: string;
  missing: boolean;
  index: IndexArtifact;
};

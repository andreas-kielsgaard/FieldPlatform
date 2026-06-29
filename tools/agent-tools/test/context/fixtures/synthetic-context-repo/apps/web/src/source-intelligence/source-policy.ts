export type SourcePolicyKind = "active-source" | "test-source" | "generated-like";

export function classifySourcePolicyPath(path: string): SourcePolicyKind {
  if (path.endsWith(".test.ts")) {
    return "test-source";
  }
  if (path.includes("/generated/") || path.endsWith(".generated.json")) {
    return "generated-like";
  }

  return "active-source";
}

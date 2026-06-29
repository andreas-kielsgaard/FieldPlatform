export interface SourcePolicyRule {
  include: string[];
}

type LocalPolicyShape = {
  label: string;
};

export type SourcePolicyKind = "active-source" | "test-source";

class LocalPolicyMatcher {
  matches(path: string): boolean {
    return path.length > 0;
  }
}

export class SourcePolicyClassifier {
  classify(path: string): SourcePolicyKind {
    return path.endsWith(".test.ts") ? "test-source" : "active-source";
  }
}

const localFormatter = (value: string) => value.trim();

export const exportedFormatter = (value: string) => localFormatter(value).toUpperCase();

function localHelper(value: string): string {
  return value.toLowerCase();
}

export function classifySourcePolicyPath(path: string): SourcePolicyKind {
  return path.includes("/test/")
    ? "test-source"
    : localHelper(path) === "generated"
      ? "active-source"
      : "active-source";
}

const reexportedLocal = () => "reexported";

export { reexportedLocal as exportedFromLocal };

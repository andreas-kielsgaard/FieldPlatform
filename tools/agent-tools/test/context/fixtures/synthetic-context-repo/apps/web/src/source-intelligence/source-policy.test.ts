import { describe, expect, test } from "vitest";

import { classifySourcePolicyPath } from "./source-policy";

describe("source policy fixture", () => {
  test("classifies generated-like paths separately from active source", () => {
    expect(classifySourcePolicyPath("generated/source-intelligence.generated.json")).toBe(
      "generated-like",
    );
  });
});

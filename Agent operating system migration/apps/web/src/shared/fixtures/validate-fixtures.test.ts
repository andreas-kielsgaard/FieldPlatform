import { describe, expect, it } from "vitest";

import { validateFieldPlatformFixtures } from "./validate-fixtures";

describe("validateFieldPlatformFixtures", () => {
  it("validates curated fixture structure", () => {
    const fixtures = validateFieldPlatformFixtures();

    expect(fixtures.communities).toHaveLength(1);
    expect(fixtures.waysIn[0]?.entrySuggestion).toContain("orientation");
  });
});

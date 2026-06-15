import { describe, expect, it } from "vitest";

import { validateWaysInItems } from "./ways-in";

describe("validateWaysInItems", () => {
  it("keeps ways-in structure explicit", () => {
    expect(
      validateWaysInItems([
        {
          access: "Open drop-in",
          audience: "First-time participants",
          entrySuggestion: "Join the first 20 minutes for orientation.",
          experienceLevel: "beginner",
          threshold: "No prior experience required",
        },
      ]),
    ).toHaveLength(1);
  });

  it("rejects empty ways-in lists", () => {
    expect(() => validateWaysInItems([])).toThrow();
  });
});

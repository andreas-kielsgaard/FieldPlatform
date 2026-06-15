import { describe, expect, it } from "vitest";

import { hasStewardshipRole } from "./authority";

describe("hasStewardshipRole", () => {
  it("does not infer publisher authority from stewardship alone", () => {
    const grants = [
      {
        accountId: "account-1",
        representationId: "representation-1",
        role: "steward" as const,
      },
    ];

    expect(
      hasStewardshipRole(grants, {
        accountId: "account-1",
        representationId: "representation-1",
        role: "publisher",
      }),
    ).toBe(false);
  });
});

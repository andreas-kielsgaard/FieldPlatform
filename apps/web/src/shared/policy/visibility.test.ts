import { describe, expect, it } from "vitest";

import { canViewRepresentation } from "./visibility";

describe("canViewRepresentation", () => {
  it("allows public published accepted representations", () => {
    expect(
      canViewRepresentation({
        id: "representation-1",
        publicationStatus: "published",
        reviewState: "accepted",
        visibilityScope: "public",
      }),
    ).toBe(true);
  });

  it("does not show draft content publicly", () => {
    expect(
      canViewRepresentation({
        id: "representation-1",
        publicationStatus: "draft",
        reviewState: "accepted",
        visibilityScope: "public",
      }),
    ).toBe(false);
  });

  it("allows stewards to see steward-visible pending representations", () => {
    expect(
      canViewRepresentation(
        {
          id: "representation-1",
          publicationStatus: "draft",
          reviewState: "pending_review",
          visibilityScope: "steward_visible",
        },
        { stewardedRepresentationIds: ["representation-1"] },
      ),
    ).toBe(true);
  });
});

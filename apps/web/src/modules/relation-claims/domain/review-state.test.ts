import { describe, expect, it } from "vitest";

import { canTransitionReviewState, transitionReviewState } from "./review-state";

describe("review-state transitions", () => {
  it("allows pending claims to be accepted", () => {
    expect(canTransitionReviewState("pending_review", "accepted")).toBe(true);
    expect(transitionReviewState("pending_review", "accepted")).toBe("accepted");
  });

  it("does not allow accepted claims to return to pending review", () => {
    expect(canTransitionReviewState("accepted", "pending_review")).toBe(false);
    expect(() => transitionReviewState("accepted", "pending_review")).toThrow(
      "Cannot transition review state",
    );
  });
});

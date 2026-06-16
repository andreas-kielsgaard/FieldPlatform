import type { ReviewState } from "~/shared/contracts";

const allowedTransitions: Record<ReviewState, readonly ReviewState[]> = {
  not_required: ["pending_review"],
  pending_review: ["accepted", "rejected", "superseded"],
  accepted: ["superseded"],
  rejected: ["pending_review", "superseded"],
  superseded: [],
};

export function canTransitionReviewState(from: ReviewState, to: ReviewState) {
  return allowedTransitions[from].includes(to);
}

export function transitionReviewState(from: ReviewState, to: ReviewState) {
  if (!canTransitionReviewState(from, to)) {
    throw new Error(`Cannot transition review state from ${from} to ${to}.`);
  }

  return to;
}

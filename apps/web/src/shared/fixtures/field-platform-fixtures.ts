import type { CommunityOrientationView } from "~/modules/communities";
import type { WaysInItem } from "~/modules/ways-in";

export const communityFixtures: CommunityOrientationView[] = [
  {
    representationId:
      "7a8f9299-3a90-45c3-a1b3-26cdbb67cc81" as CommunityOrientationView["representationId"],
    name: "Harbor Repair Circle",
    slug: "harbor-repair-circle",
    summary: "A stewarded orientation surface for repair-oriented participation.",
    visibilityScope: "public",
    reviewState: "accepted",
    waysInCount: 2,
  },
];

export const waysInFixtures: WaysInItem[] = [
  {
    audience: "First-time participants",
    threshold: "No prior repair experience required",
    access: "Open drop-in",
    priceText: "Free",
    experienceLevel: "beginner",
    entrySuggestion: "Arrive for the first 20 minutes and join the tool orientation.",
  },
];

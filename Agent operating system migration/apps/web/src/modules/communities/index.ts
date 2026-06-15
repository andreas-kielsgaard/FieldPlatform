export function getHomeOrientationView() {
  return {
    kicker: "Field Platform",
    title: "Orientation, entry, and light continuity",
    summary:
      "This scaffold starts with stewarded representations, ways in, visibility, review, and relation claims as first-class concepts.",
    links: [
      { href: "/communities", label: "Communities" },
      { href: "/signals", label: "Field signals" },
      { href: "/steward/dashboard", label: "Steward dashboard" },
    ],
  };
}

export function getCommunitiesIndexView() {
  return {
    title: "Community orientation surfaces",
    summary:
      "Communities will be represented as stewarded field-orientation artifacts, not generic social groups.",
  };
}

export function getCommunityDetailView(slug: string) {
  return {
    slug,
    name: slugToTitle(slug),
    summary:
      "This placeholder keeps community detail routes thin while domain behavior moves into module services.",
  };
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export * from "./contracts/community.view";

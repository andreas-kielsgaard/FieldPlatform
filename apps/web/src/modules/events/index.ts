export function getEventDetailView(slug: string) {
  return {
    slug,
    title: slug
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    summary:
      "Events enter through orientation and ways-in context; event CRUD is not the starting product shape.",
  };
}

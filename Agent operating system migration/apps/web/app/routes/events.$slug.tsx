import { getEventDetailView } from "~/modules/events";
import type { Route } from "./+types/events.$slug";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} event | Field Platform` }];
}

export function loader({ params }: Route.LoaderArgs) {
  return getEventDetailView(params.slug);
}

export default function EventDetailRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Linked event</p>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

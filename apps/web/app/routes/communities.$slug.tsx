import { getCommunityDetailView } from "~/modules/communities";
import type { Route } from "./+types/communities.$slug";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.slug} | Field Platform` }];
}

export function loader({ params }: Route.LoaderArgs) {
  return getCommunityDetailView(params.slug);
}

export default function CommunityDetailRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Community orientation</p>
        <h1>{loaderData.name}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

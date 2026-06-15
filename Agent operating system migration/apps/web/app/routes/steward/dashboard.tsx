import { getStewardDashboardView } from "~/modules/stewardship";
import type { Route } from "./+types/dashboard";

export function meta() {
  return [{ title: "Steward dashboard | Field Platform" }];
}

export function loader() {
  return getStewardDashboardView();
}

export default function StewardDashboardRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Stewardship</p>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

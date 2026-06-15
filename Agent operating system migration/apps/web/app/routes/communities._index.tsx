import { getCommunitiesIndexView } from "~/modules/communities";
import type { Route } from "./+types/communities._index";

export function meta() {
  return [{ title: "Communities | Field Platform" }];
}

export function loader() {
  return getCommunitiesIndexView();
}

export default function CommunitiesIndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Communities</p>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

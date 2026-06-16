import { getSignalsIndexView } from "~/modules/field-signals";
import type { Route } from "./+types/signals._index";

export function meta() {
  return [{ title: "Field signals | Field Platform" }];
}

export function loader() {
  return getSignalsIndexView();
}

export default function SignalsIndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Signals</p>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

import { getHomeOrientationView } from "~/modules/communities";
import type { Route } from "./+types/_index";

export function meta() {
  return [
    { title: "Field Platform" },
    { name: "description", content: "Field orientation and entry." },
  ];
}

export function loader() {
  return getHomeOrientationView();
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">{loaderData.kicker}</p>
        <h1>{loaderData.title}</h1>
        <p>{loaderData.summary}</p>
        <ul className="route-list" aria-label="Initial scaffold routes">
          {loaderData.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

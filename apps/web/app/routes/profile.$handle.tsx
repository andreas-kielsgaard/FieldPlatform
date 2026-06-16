import { getProfileView } from "~/modules/profiles";
import type { Route } from "./+types/profile.$handle";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.handle} profile | Field Platform` }];
}

export function loader({ params }: Route.LoaderArgs) {
  return getProfileView(params.handle);
}

export default function ProfileRoute({ loaderData }: Route.ComponentProps) {
  return (
    <main className="page-shell">
      <section className="placeholder-surface">
        <p className="eyebrow">Profile</p>
        <h1>{loaderData.displayName}</h1>
        <p>{loaderData.summary}</p>
      </section>
    </main>
  );
}

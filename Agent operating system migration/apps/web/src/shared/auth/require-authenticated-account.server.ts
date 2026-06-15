import { getCurrentActorFromRequest } from "./session.server";

export async function requireAuthenticatedAccount(request: Request) {
  const actor = await getCurrentActorFromRequest(request);

  if (!actor) {
    throw new Response("Authentication required.", { status: 401 });
  }

  return actor;
}

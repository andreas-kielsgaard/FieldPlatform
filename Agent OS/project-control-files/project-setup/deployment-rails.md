# Deployment Rails

## Local First

The development path is local first:

- Node 24
- pnpm 11.6.0
- Docker Desktop or compatible Docker engine
- PostgreSQL 18 through Docker Compose
- `.env.example` as the non-secret environment template

## Deployable Later

Keep the app compatible with Render or Railway style deployment unless a later explicit decision chooses another host.

Do not introduce provider-specific architecture, hosted database features, auth organization primitives, or infrastructure assumptions before they are needed by a real deployment slice.

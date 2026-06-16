# Data Model Rails

## Spine

Do not start with one generic mega-entity table.

Use explicit artifact tables for stable artifact types such as communities, events, offerings, and field signals. A thin representation spine may hold cross-cutting concerns:

- visibility
- publication
- review
- stewardship
- attribution
- relation claims

## Ways In

Ways-in content is first-class product structure. Model fields such as audience, threshold, access, price, experience level, and concrete entry suggestion.

## JSONB

Use JSONB only for unstable metadata or extension points. Do not hide core visibility, review, publication, stewardship, attribution, relation claims, or ways-in semantics inside loose JSON.

## Database

Use PostgreSQL locally through Docker and Drizzle migrations. Raw SQL is allowed for complex queries when Drizzle makes the workflow materially worse.

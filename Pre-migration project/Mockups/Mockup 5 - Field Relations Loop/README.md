# Mockup 5 - Field Relations Loop

This mockup tests the core FieldPlatform loop:

See an object, understand existing connections, suggest a missing connection, let a steward review it, and see clearer ways in after a connection is accepted or clarified.

## What It Uses

- Shared Platform data layer browser scripts.
- Managed access through `platform.fieldRelations`, `platform.events`, `platform.communities`, `platform.venues`, `platform.users`, and `platform.generatedFields`.
- Relation explanations and movement options from the data layer.
- Steward review methods for accept, refine, redirect, decline, and keeping a suggestion as a calculated pattern.

The mockup has a small view-model layer, but it only translates domain objects into display objects and UI copy. It does not duplicate seeded data or relation calculations.

## What It Does Not Try To Solve

- It is not a full platform redesign.
- It is not Mockup 5 as a complete participant app.
- It does not add a new stored pathway model.
- It does not implement full permissions or privacy enforcement.
- It does not change Mockup 4.

## How To Open

Open `index.html` directly in a browser from this folder.

The page resets its demo storage on load so review and suggestion flows start from the same seeded state each time.

## Review Clickthrough

1. Choose `Friday Contact Jam with Beginner Landing`.
2. Read the accepted connection and its `Ways in`.
3. Choose `Post-Dance Harbor Tea`.
4. Open `Suggest connection`, select a community, add a reason, and submit.
5. Use the steward queue to accept, refine, redirect, decline, or keep a suggestion as a pattern.
6. Return to the selected object and confirm the connection card and `Ways in` update.
7. Open the dev/debug panel if you need to compare the UI with raw relation records.

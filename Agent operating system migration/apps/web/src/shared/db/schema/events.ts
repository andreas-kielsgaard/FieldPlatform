import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const events = pgTable("events", {
  representationId: uuid("representation_id")
    .primaryKey()
    .references(() => representations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  place: text("place"),
  priceText: text("price_text"),
  experienceLevel: text("experience_level"),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

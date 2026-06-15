import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const waysIn = pgTable("ways_in", {
  id: uuid("id").primaryKey().defaultRandom(),
  representationId: uuid("representation_id")
    .notNull()
    .references(() => representations.id, { onDelete: "cascade" }),
  audience: text("audience").notNull(),
  threshold: text("threshold").notNull(),
  access: text("access").notNull(),
  priceText: text("price_text"),
  experienceLevel: text("experience_level"),
  entrySuggestion: text("entry_suggestion").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

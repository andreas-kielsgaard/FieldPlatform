import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const offerings = pgTable("offerings", {
  representationId: uuid("representation_id")
    .primaryKey()
    .references(() => representations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  access: text("access").notNull(),
  priceText: text("price_text"),
  experienceLevel: text("experience_level"),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

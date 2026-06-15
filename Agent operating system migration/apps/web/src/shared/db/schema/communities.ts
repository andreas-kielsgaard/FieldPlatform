import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const communities = pgTable(
  "communities",
  {
    representationId: uuid("representation_id")
      .primaryKey()
      .references(() => representations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    city: text("city"),
    description: text("description").notNull(),
    rhythmSummary: text("rhythm_summary"),
    stewardNote: text("steward_note"),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [uniqueIndex("communities_slug_unique").on(table.slug)],
);

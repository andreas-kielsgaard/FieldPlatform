import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const fieldSignals = pgTable("field_signals", {
  representationId: uuid("representation_id")
    .primaryKey()
    .references(() => representations.id, { onDelete: "cascade" }),
  signalType: text("signal_type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

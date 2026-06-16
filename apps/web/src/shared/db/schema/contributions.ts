import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const contributions = pgTable("contributions", {
  id: uuid("id").primaryKey().defaultRandom(),
  representationId: uuid("representation_id")
    .notNull()
    .references(() => representations.id, { onDelete: "cascade" }),
  contributorAccountId: uuid("contributor_account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  contributionType: text("contribution_type").notNull(),
  summary: text("summary").notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { representations, reviewStateEnum } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const relationClaims = pgTable("relation_claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceRepresentationId: uuid("source_representation_id")
    .notNull()
    .references(() => representations.id, { onDelete: "cascade" }),
  targetRepresentationId: uuid("target_representation_id")
    .notNull()
    .references(() => representations.id, { onDelete: "cascade" }),
  relationType: text("relation_type").notNull(),
  proposerAccountId: uuid("proposer_account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  rationale: text("rationale").notNull(),
  reviewState: reviewStateEnum("review_state").notNull().default("pending_review"),
  reviewerAccountId: uuid("reviewer_account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  resolutionNote: text("resolution_note"),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

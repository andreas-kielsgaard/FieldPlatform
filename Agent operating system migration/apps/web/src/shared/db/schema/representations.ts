import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const representationKindEnum = pgEnum("representation_kind", [
  "community",
  "event",
  "offering",
  "field_signal",
]);

export const visibilityScopeEnum = pgEnum("visibility_scope", [
  "private",
  "steward_visible",
  "community_visible",
  "link_visible",
  "public",
]);

export const publicationStatusEnum = pgEnum("publication_status", [
  "draft",
  "published",
  "archived",
]);

export const reviewStateEnum = pgEnum("review_state", [
  "not_required",
  "pending_review",
  "accepted",
  "rejected",
  "superseded",
]);

export const representations = pgTable("representations", {
  id: uuid("id").primaryKey().defaultRandom(),
  kind: representationKindEnum("kind").notNull(),
  visibilityScope: visibilityScopeEnum("visibility_scope").notNull().default("private"),
  publicationStatus: publicationStatusEnum("publication_status").notNull().default("draft"),
  reviewState: reviewStateEnum("review_state").notNull().default("not_required"),
  createdByAccountId: uuid("created_by_account_id").references(() => accounts.id, {
    onDelete: "set null",
  }),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
  archivedAtReason: text("archived_reason"),
});

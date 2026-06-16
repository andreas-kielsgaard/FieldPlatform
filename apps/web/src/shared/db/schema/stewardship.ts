import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { representations } from "./representations";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const stewardshipRoleEnum = pgEnum("stewardship_role", ["steward", "reviewer", "publisher"]);

export const stewardships = pgTable(
  "stewardships",
  {
    representationId: uuid("representation_id")
      .notNull()
      .references(() => representations.id, { onDelete: "cascade" }),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    role: stewardshipRoleEnum("role").notNull(),
    rationale: text("rationale"),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (table) => [
    primaryKey({
      columns: [table.representationId, table.accountId, table.role],
      name: "stewardships_representation_account_role_pk",
    }),
  ],
);

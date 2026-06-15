import { pgEnum, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { representations } from "./representations";
import { createdAtColumn } from "./shared";

export const participationKindEnum = pgEnum("participation_kind", ["saved", "followed", "tracked"]);

export const participationRelations = pgTable(
  "participation_relations",
  {
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    representationId: uuid("representation_id")
      .notNull()
      .references(() => representations.id, { onDelete: "cascade" }),
    kind: participationKindEnum("kind").notNull(),
    createdAt: createdAtColumn(),
  },
  (table) => [
    primaryKey({
      columns: [table.accountId, table.representationId, table.kind],
      name: "participation_relations_account_representation_kind_pk",
    }),
  ],
);

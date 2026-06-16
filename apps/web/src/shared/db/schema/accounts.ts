import { pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { authUsers } from "./auth";
import { createdAtColumn, textRequired, updatedAtColumn } from "./shared";

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authUserId: uuid("auth_user_id").references(() => authUsers.id, { onDelete: "set null" }),
    email: textRequired("email"),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
    disabledAt: timestamp("disabled_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("accounts_auth_user_id_unique").on(table.authUserId),
    uniqueIndex("accounts_email_unique").on(table.email),
  ],
);

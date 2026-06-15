import { boolean, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { createdAtColumn, updatedAtColumn } from "./shared";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    handle: text("handle").notNull(),
    displayName: text("display_name").notNull(),
    bio: text("bio"),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex("profiles_account_id_unique").on(table.accountId),
    uniqueIndex("profiles_handle_unique").on(table.handle),
  ],
);

export const profileVisibilitySettings = pgTable("profile_visibility_settings", {
  profileId: uuid("profile_id")
    .primaryKey()
    .references(() => profiles.id, { onDelete: "cascade" }),
  showEmail: boolean("show_email").notNull().default(false),
  showParticipation: boolean("show_participation").notNull().default(false),
  showStewardships: boolean("show_stewardships").notNull().default(true),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
});

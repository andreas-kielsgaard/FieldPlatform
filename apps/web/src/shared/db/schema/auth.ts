import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const authUsers = pgTable("auth_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
});

export const authProviderAccounts = pgTable(
  "auth_provider_accounts",
  {
    authUserId: uuid("auth_user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
  },
  (table) => [
    primaryKey({
      columns: [table.provider, table.providerAccountId],
      name: "auth_provider_accounts_provider_account_pk",
    }),
  ],
);

export const authSessions = pgTable("auth_sessions", {
  sessionToken: text("session_token").primaryKey(),
  authUserId: uuid("auth_user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const authVerificationTokens = pgTable(
  "auth_verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.identifier, table.token],
      name: "auth_verification_tokens_identifier_token_pk",
    }),
  ],
);

import { text, timestamp } from "drizzle-orm/pg-core";

export function textRequired(name: string) {
  return text(name).notNull();
}

export function createdAtColumn() {
  return timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
}

export function updatedAtColumn() {
  return timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();
}

export const databaseBoundary = {
  name: "db",
  status: "Drizzle schema and server client live behind this shared db boundary.",
} as const;

export type { Database } from "./client.server";
export { getDatabase } from "./client.server";
export * as schema from "./schema";

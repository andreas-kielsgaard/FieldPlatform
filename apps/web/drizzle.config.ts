import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgres://field_platform:field_platform@localhost:5432/field_platform",
  },
  out: "./drizzle",
  schema: "./src/shared/db/schema/index.ts",
});

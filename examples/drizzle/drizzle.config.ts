// Paths are relative to the repository root.
export default {
  dialect: "sqlite",
  schema: "./examples/drizzle/schema.ts",
  out: "./dist/examples/drizzle/migrations",
  dbCredentials: {
    url: "./examples/db/sqlite3.sqlite3",
  },
} as const;

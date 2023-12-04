import type { Config } from "drizzle-kit";
export default {
  schema: "./src/adapters/out/drizzle/schemas/*",
  out: "./src/adapters/out/drizzle/migrations",
  driver: 'better-sqlite',
  dbCredentials: {
    url: './sqlite.db', // 👈 this could also be a path to the local sqlite file
  }
} satisfies Config



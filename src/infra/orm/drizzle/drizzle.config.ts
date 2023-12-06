import type { Config } from "drizzle-kit";
export default {
  schema: "./src/infra/orm/drizzle/schemas/*",
  out: "./src/infra/orm/drizzle/migrations",
  driver: 'libsql',
  dbCredentials: {
    // url: './sqlite.db', // 👈 this could also be a path to the local sqlite file
    url: "file:./sqlite.db"
  }
} satisfies Config



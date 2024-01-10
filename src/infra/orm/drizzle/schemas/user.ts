
import { sql } from 'drizzle-orm';
import { sqliteTable, text, } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

type userId = string;

export const users = sqliteTable('users', {
  id: text('id').$type<userId>().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

export const insertUser = createInsertSchema(users);
export type userModel = typeof users.$inferSelect;

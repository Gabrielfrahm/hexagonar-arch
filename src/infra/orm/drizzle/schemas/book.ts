
import { sql } from 'drizzle-orm';
import { sqliteTable, text, } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

type bookId = string;

export const books = sqliteTable('books', {
  id: text('id').$type<bookId>().primaryKey(),
  name: text('name').notNull(),
  genre: text('genre').notNull(),
  author: text('author').notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

export const insertBook = createInsertSchema(books);
export type bookModel = typeof books.$inferSelect;

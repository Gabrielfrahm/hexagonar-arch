
import { randomUUID } from 'crypto';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

type bookId = string;

export const books = sqliteTable('books', {
  id: text('id').$type<bookId>().primaryKey().default(randomUUID()),
  name: text('name').notNull(),
  genre: text('genre').notNull(),
  author: text('author').notNull()
});

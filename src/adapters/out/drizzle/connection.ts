import Database from 'better-sqlite3';
import { Connection } from "../../../ports/out/connection.contract";
import {BetterSQLite3Database, drizzle} from 'drizzle-orm/better-sqlite3';
import  {books} from '../drizzle/schemas/book';
import { SQLiteTableWithColumns, SQLiteColumn } from 'drizzle-orm/sqlite-core';

export class DrizzleConnection implements Connection {
  public db: BetterSQLite3Database<{ books: SQLiteTableWithColumns<{ name: "books"; schema: undefined; columns: { id: SQLiteColumn<{ name: "id"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: true; enumValues: [string, ...string[]]; baseColumn: never; }, object>; name: SQLiteColumn<{ name: "name"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; genre: SQLiteColumn<{ name: "genre"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; author: SQLiteColumn<{ name: "author"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; }; dialect: "sqlite"; }>; }>;
  constructor(){
    const client = new Database('sqlite.db');
    this.db = drizzle(client, {schema: {books}, logger: true})
  }
  async connection(): Promise<any> {
    return this.db;
  }

  async close(): Promise<any> {
    throw new Error("Method not implemented")
  }

}

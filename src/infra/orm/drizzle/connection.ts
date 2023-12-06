// import  Database  from 'better-sqlite3';
import { createClient } from '@libsql/client';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { Connection } from "../../../ports/out/connection.contract";
// import {BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';

import  {books} from '../drizzle/schemas/book';
import { SQLiteTableWithColumns, SQLiteColumn } from 'drizzle-orm/sqlite-core';
// import { SQLiteTableWithColumns, SQLiteColumn } from 'drizzle-orm/sqlite-core';

export class DrizzleConnection implements Connection {
  private static instance: DrizzleConnection;
  public db: LibSQLDatabase<{ books: SQLiteTableWithColumns<{ name: "books"; schema: undefined; columns: { id: SQLiteColumn<{ name: "id"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; name: SQLiteColumn<{ name: "name"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; genre: SQLiteColumn<{ name: "genre"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; author: SQLiteColumn<{ name: "author"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; }; dialect: "sqlite"; }>; }>;
  public constructor() {

    const client = createClient({url: "file:../../../sqlite.db"})
    // const client2 =  new Database("./sqlite.db");
    this.db = drizzle(client, { schema: { books }, logger: true });
  }

  public static getInstance(): DrizzleConnection {
    if (!DrizzleConnection.instance) {
      DrizzleConnection.instance = new DrizzleConnection();
    }
    return DrizzleConnection.instance;
  }

  async connection(): Promise<any> {
    return this.db;
  }

  async close(): Promise<any> {
    throw new Error("Method not implemented")
  }
}


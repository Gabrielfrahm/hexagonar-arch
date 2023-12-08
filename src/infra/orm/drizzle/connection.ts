
import * as dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import { LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { Connection } from "../../../ports/out/connection.contract";

import  {books} from '../drizzle/schemas/book';
import { SQLiteTableWithColumns, SQLiteColumn } from 'drizzle-orm/sqlite-core';
dotenv.config({ path: '../../../.env' });
export class DrizzleConnection implements Connection {

  private static instance: DrizzleConnection;
  public db: LibSQLDatabase<{ books: SQLiteTableWithColumns<{ name: "books"; schema: undefined; columns: { id: SQLiteColumn<{ name: "id"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; name: SQLiteColumn<{ name: "name"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; genre: SQLiteColumn<{ name: "genre"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; author: SQLiteColumn<{ name: "author"; tableName: "books"; dataType: "string"; columnType: "SQLiteText"; data: string; driverParam: string; notNull: true; hasDefault: false; enumValues: [string, ...string[]]; baseColumn: never; }, object>; }; dialect: "sqlite"; }>; }>;
  public constructor() {
    console.log(process.env.DATABASE_URL)
    const client = createClient({url: "file:../../../sqlite.db"})
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


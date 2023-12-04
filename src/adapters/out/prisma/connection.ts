import { PrismaClient } from "@prisma/client";
import { Connection } from "../../../ports/out/connection.contract";


export const PrismaConnection = new PrismaClient();

export class PrismaConnectionClass extends Connection {
  public prisma = PrismaConnection;
}

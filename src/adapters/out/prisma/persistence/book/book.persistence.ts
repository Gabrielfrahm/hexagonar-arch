import { Book } from "../../../../../domain/book/entities/book";
import { BookRepositoryPort } from "../../../../../ports/out/book/book-repository.port";
import { Connection } from "../../../../../ports/out/connection.contract";

import { PrismaConnection } from "../../connection";

export class PersistenceBook extends BookRepositoryPort {
  // constructor(private readonly prismaConnection: Connection){
  //   super(prismaConnection)
  // }

  async create(entity: Book): Promise<Book> {

    await PrismaConnection.book.create({
      data: {
        id: entity.id,
        name: entity.name,
        genre: entity.genre,
        author: entity.author,
      }
    });

    return entity;
  }
}

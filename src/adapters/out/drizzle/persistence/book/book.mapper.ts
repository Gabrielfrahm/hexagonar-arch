import { Book } from "../../../../../domain/book/entities/book";
import { bookModel } from "../../../../../infra/orm/drizzle/schemas/book";

export class BookMapper {
  static toEntity(model: bookModel) {
    return new Book({
      id: model.id,
      name: model.name,
      author: model.author,
      genre: model.genre,
      created_at: new Date(model.created_at),
    })
  }
}

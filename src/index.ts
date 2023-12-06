
import { SaveBookController } from "./adapters/in/http/express/controllers/book/save-book.controller";
import ExpressAdapter from "./adapters/in/http/express/express.adapter";
import { configureBookRoutes } from "./adapters/in/http/express/routes/book.routes";

import { PersistenceBook } from "./adapters/out/drizzle/persistence/book/book.persistence";

import { SaveBookService } from "./application/services/book/save-book.service";
import { SaveBookUseCase } from "./domain/book/use-cases/save-book.use-case";
import { DrizzleConnection } from "./infra/orm/drizzle/connection";


const connection = DrizzleConnection.getInstance();
const bookPersistence = new PersistenceBook(connection);
const saveBookUseCase = new SaveBookUseCase();
const saveBookService = new SaveBookService(saveBookUseCase, bookPersistence);
const saveBookController = new SaveBookController(saveBookService);
const expressAdapter = new ExpressAdapter();

expressAdapter.register("get", '/' ,async (req, res) => {
  const result = await connection.db.query.books.findMany().prepare().execute();
  return res.json(result)
});

configureBookRoutes(expressAdapter, saveBookController);

expressAdapter.listen(3333);

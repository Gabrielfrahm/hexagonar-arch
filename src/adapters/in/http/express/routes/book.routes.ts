import { Request, Response } from "express";
import { SaveBookController } from "../controllers/book/save-book.controller";
import ExpressAdapter from "../express.adapter";

export function configureBookRoutes(expressAdapter: ExpressAdapter, saveBookController: SaveBookController): void {
  expressAdapter.register('post', '/books', (async (req: Request, res: Response) => await saveBookController.save(req, res)));
}

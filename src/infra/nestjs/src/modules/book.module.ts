import { Module } from '@nestjs/common';
import { SaveBookController } from '../../../../adapters/in/http/controllers/book/save-book.controller';
import { BookRoutes } from 'src/routes/books/book.routes';
import { SaveBookService } from '../../../../application/services/book/save-book.service';
import { SaveBookUseCase } from '../../../../domain/book/use-cases/save-book.use-case';
import { PersistenceBook } from '../../../../adapters/out/drizzle/persistence/book/book.persistence';
import { DrizzleConnection } from '../../../orm/drizzle/connection';
import { ConfigModule } from '@nestjs/config';
import { FindAllBooksService } from '../../../../application/services/book/find-all-books.service';
import { FindAllBooksController } from '../../../../adapters/in/http/controllers/book/find-all-books.controller';
import { PinoElasticsearchLoggerAdapter } from '../../../../adapters/out/logger/logger.adapter';
import { LoggerPort } from '../../../../ports/out/logger/logger.interface';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { JwtAdapter } from '../../../../adapters/out/jwt/token.adapter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [BookRoutes],
  providers: [
    {
      provide: 'drizzleConnection',
      useFactory: async () => {
        return DrizzleConnection.getInstance();
      },
    },
    {
      provide: 'logger',
      useFactory: () => {
        return new PinoElasticsearchLoggerAdapter();
      },
    },
    {
      provide: PersistenceBook,
      useFactory: (connection: DrizzleConnection) =>
        new PersistenceBook(connection),
      inject: ['drizzleConnection'],
    },
    {
      provide: JwtAdapter,
      useFactory: () => {
        return new JwtAdapter();
      },
    },
    {
      provide: AuthenticationMiddleware,
      useFactory: (tokenAdapter: JwtAdapter): AuthenticationMiddleware =>
        new AuthenticationMiddleware(tokenAdapter),
      inject: [JwtAdapter],
    },
    {
      provide: SaveBookUseCase,
      useFactory: () => new SaveBookUseCase(),
    },
    {
      provide: SaveBookService,
      useFactory: (
        saveBookUseCase: SaveBookUseCase,
        persistenceBook: PersistenceBook,
      ) => new SaveBookService(saveBookUseCase, persistenceBook),
      inject: [SaveBookUseCase, PersistenceBook],
    },
    {
      provide: FindAllBooksService,
      useFactory: (persistenceBook: PersistenceBook, logger: LoggerPort) =>
        new FindAllBooksService(persistenceBook, logger),
      inject: [PersistenceBook, 'logger'],
    },
    {
      provide: SaveBookController,
      useFactory: (saveBookService: SaveBookService): SaveBookController =>
        new SaveBookController(saveBookService),
      inject: [SaveBookService],
    },
    {
      provide: FindAllBooksController,
      useFactory: (
        findAllBooksService: FindAllBooksService,
      ): FindAllBooksController =>
        new FindAllBooksController(findAllBooksService),
      inject: [FindAllBooksService],
    },
  ],
})
export class BookModule {}

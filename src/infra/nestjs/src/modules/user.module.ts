import { Module } from '@nestjs/common';
import { SaveUserController } from '../../../../adapters/in/http/controllers/user/save-user.controller';
import { SaveUserService } from '../../../../application/services/user/save-user.service';
import { SaveUserUseCase } from '../../../../domain/user/use-cases/save-user.use-case';
import { PersistenceUser } from '../../../../adapters/out/drizzle/persistence/user/user.persistence';
import { DrizzleConnection } from '../../../orm/drizzle/connection';
import { PinoElasticsearchLoggerAdapter } from '../../../../adapters/out/logger/logger.adapter';
import { HashAdapter } from '../../../../adapters/out/hasher/hash.adapater';
import { UserRoutes } from 'src/routes/user/user.routes';

@Module({
  controllers: [UserRoutes],
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
      provide: HashAdapter,
      useFactory: () => {
        return new HashAdapter(12);
      },
    },
    {
      provide: PersistenceUser,
      useFactory: (connection: DrizzleConnection) =>
        new PersistenceUser(connection),
      inject: ['drizzleConnection'],
    },
    {
      provide: SaveUserUseCase,
      useFactory: () => new SaveUserUseCase(),
    },
    {
      provide: SaveUserService,
      useFactory: (
        saveUserUseCase: SaveUserUseCase,
        persistenceUser: PersistenceUser,
        hashAdapter: HashAdapter,
      ) => new SaveUserService(saveUserUseCase, persistenceUser, hashAdapter),
      inject: [SaveUserUseCase, PersistenceUser, HashAdapter],
    },

    {
      provide: SaveUserController,
      useFactory: (saveUserService: SaveUserService): SaveUserController =>
        new SaveUserController(saveUserService),
      inject: [SaveUserService],
    },
  ],
})
export class UserModule {}

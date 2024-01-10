import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

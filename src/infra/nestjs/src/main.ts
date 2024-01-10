import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EitherExceptionFilter } from './error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EitherExceptionFilter());
  await app.listen(3333);
}
bootstrap();

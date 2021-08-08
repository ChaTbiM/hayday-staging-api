import { NestFactory } from '@nestjs/core';
import { join } from 'path/posix';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();

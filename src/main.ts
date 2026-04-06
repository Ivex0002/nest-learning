import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const DEFAULT_PORT = 4001;

const config = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`app running on port ${port}`);
}

bootstrap().catch(console.error);

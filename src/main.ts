import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import config from 'config';

// const DEFAULT_PORT = 4001;

export interface ServerConfig {
  port: number;
}

const swaggerConfig = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  const logger = new Logger('main');

  if (!config.has('server')) {
    throw new Error('Configuration "server" is missing in yaml file');
  }
  const serverConfig = config.get<ServerConfig>('server');

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = serverConfig.port;
  logger.log(`process.env.PORT : ${port}`);
  await app.listen(port);
  logger.log(`app running on port ${port}`);
}

bootstrap().catch(console.error);

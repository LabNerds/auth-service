import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {
  getDbConnectionOptions,
  runDbMigrations,
} from '@root/shared/db/connection';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDbConnectionOptions(process.env.NODE_ENV)),
  );

  await runDbMigrations();

  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();

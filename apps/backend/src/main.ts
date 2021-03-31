/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

import { environment } from "./environments/environment";
import { AppModule } from './app/app.module';

async function bootstrap() {

  let appOptions = {};
  if (environment.ssl.enable){
    const httpsOptions = {
      key: fs.readFileSync(environment.ssl.key),
      cert: fs.readFileSync(environment.ssl.cert),
    };
    appOptions = { ...appOptions, httpsOptions };
  }

  const app = await NestFactory.create(AppModule, appOptions);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

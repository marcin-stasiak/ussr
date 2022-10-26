import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './app.module';

(async function () {
  const app = await NestFactory.create(ApplicationModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
})();

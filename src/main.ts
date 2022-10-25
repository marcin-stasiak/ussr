import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ServerSideRendererModule } from './ssr.module';

(async function () {
  const app = await NestFactory.create(ServerSideRendererModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
})();

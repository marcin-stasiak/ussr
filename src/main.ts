import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { ApplicationModule } from './app.module';

(async function () {
  const app = await NestFactory.create(ApplicationModule);
  const configService = app.get(ConfigService);

  const name = configService.get('queuing.name');
  const host = configService.get('queuing.host');
  const user = configService.get('queuing.user');
  const password = configService.get('queuing.password');

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: name,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(configService.get('port'));
})();

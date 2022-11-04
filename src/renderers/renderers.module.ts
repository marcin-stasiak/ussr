import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { CacheModule } from '../cache/cache.module';
import { BrowserProvider } from './browser.provider';
import { RenderersProvider } from './renderers.provider';

@Module({
  imports: [ConfigModule, CacheModule],
  exports: [RenderersProvider],
  providers: [
    {
      provide: 'QUEUE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const name = configService.get('queue.name');
        const host = configService.get('queue.host');
        const user = configService.get('queue.user');
        const password = configService.get('queue.password');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: name,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    BrowserProvider,
    RenderersProvider,
  ],
})
export class RenderersModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly browserService: BrowserProvider) {}

  public async onModuleInit(): Promise<void> {
    await this.browserService.launchBrowser();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.browserService.destroyBrowser();
  }
}

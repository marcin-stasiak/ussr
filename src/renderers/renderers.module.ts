import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CachesModule } from '../caches/caches.module';
import { BrowserProvider } from './browser.provider';
import { RenderersProvider } from './renderers.provider';

@Module({
  imports: [ConfigModule, CachesModule],
  exports: [RenderersProvider],
  providers: [BrowserProvider, RenderersProvider],
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

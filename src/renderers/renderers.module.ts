import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagesCacheModule } from '../pages/pages.module';
import { BrowserProvider } from './browser.provider';
import { RenderersService } from './renderers.service';

@Module({
  imports: [ConfigModule, PagesCacheModule],
  exports: [BrowserProvider, RenderersService],
  providers: [BrowserProvider, RenderersService],
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

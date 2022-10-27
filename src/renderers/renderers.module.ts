import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PagesCacheModule } from '../pages/pages.module';
import { BrowserService } from './browser.service';
import { RenderersService } from './renderers.service';

@Module({
  imports: [ConfigModule, PagesCacheModule],
  exports: [BrowserService, RenderersService],
  providers: [BrowserService, RenderersService],
})
export class RenderersModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly browserService: BrowserService) {}

  public async onModuleInit(): Promise<void> {
    await this.browserService.launchBrowser();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.browserService.destroyBrowser();
  }
}

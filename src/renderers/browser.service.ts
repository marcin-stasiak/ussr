import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import puppeteer, { Browser } from 'puppeteer';

import { PagesCacheService } from '../pages/pages.service';

@Injectable()
export class BrowserService {
  private readonly logger = new Logger(BrowserService.name);
  public browser: Browser;

  constructor(private readonly configService: ConfigService) {}

  public async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({ headless: true, args: ['--single-process'] });

    if (this.browser) {
      this.logger.log('Browser launched');
    }
  }

  public async destroyBrowser(): Promise<void> {
    await this.browser.close();

    if (!this.browser) {
      this.logger.log('Browser destroyed');
    }
  }
}

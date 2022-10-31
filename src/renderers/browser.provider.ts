import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class BrowserProvider {
  private readonly logger = new Logger(BrowserProvider.name);
  public browser: Browser;

  constructor(private readonly configService: ConfigService) {}

  public async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: this.configService.get('ssr.args'),
    });

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

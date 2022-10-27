import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PagesCacheService } from '../pages/pages.service';
import { BrowserService } from './browser.service';

@Injectable()
export class RenderersService {
  private readonly logger = new Logger(RenderersService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly browserService: BrowserService,
    private readonly pagesCacheService: PagesCacheService,
  ) {}

  public async initialize(url: string): Promise<string> {
    if (!this.browserService.browser) {
      await this.browserService.launchBrowser();
    }

    const page = await this.browserService.browser.newPage();
    const response = await page.goto(`https://eko-instal.com/${url}`, { waitUntil: 'networkidle0' });
    const html = await page.content();

    console.log(response.status());
    // await page.close();
    return html;
  }
}

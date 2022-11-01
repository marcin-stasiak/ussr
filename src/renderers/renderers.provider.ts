import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HTTPResponse } from 'puppeteer';

import { CachesService } from '../caches/caches.service';
import { BrowserProvider } from './browser.provider';

@Injectable()
export class RenderersProvider {
  private readonly logger = new Logger(RenderersProvider.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly browserService: BrowserProvider,
    private readonly cachesService: CachesService,
  ) {}

  public async initialize(path: string): Promise<string> {
    const cache = await this.cachesService.findOneByPath(path);

    if (!this.browserService.browser) {
      await this.browserService.launchBrowser();
    }

    if (cache) {
      return cache.content;
    } else {
      return await this.render(path);
    }

    // await page.setRequestInterception(true);

    // page.on('request', (request) => {
    //   console.log(request.resourceType());
    //
    //   if (request.resourceType() === 'image') {
    //     request.abort();
    //   } else {
    //     request.continue();
    //   }
    // });
  }

  private async render(path: string): Promise<string> {
    const dd = await this.createPage();
  }

  private async createPage(path: string): Promise<HTTPResponse> {
    const timeout = this.configService.get('ssr.timeout');
    const secure = this.configService.get('ssr.secure') ? 'https' : 'http';
    const domain = this.configService.get('ssr.domain');
    const url = `${secure}://${domain}${path}?isSsr=1`;

    const page = await this.browserService.browser.newPage();

    const response = await page.goto(url, {
      timeout: timeout,
      waitUntil: 'networkidle0',
    });

    await page.close();

    return response;
  }
}

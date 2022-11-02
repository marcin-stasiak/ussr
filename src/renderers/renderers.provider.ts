import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CachesService } from '../caches/caches.service';
import { Cache } from '../caches/entities/cache.entity';
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
  }

  private async render(path: string): Promise<string> {
    const timeout = this.configService.get('ssr.timeout');
    const secure = this.configService.get('ssr.secure') ? 'https' : 'http';
    const domain = this.configService.get('ssr.domain');
    const url = `${secure}://${domain}${path}?isSsr=1`;

    const page = await this.browserService.browser.newPage();

    const result = page
      .goto(url, {
        timeout: timeout,
        waitUntil: 'networkidle0',
      })
      .then(async (response) => {
        const cache = new Cache();
        const status = response.status();
        const content = await page.content();

        await page.close();

        if (status === 200) {
          this.logger.log(`${status}: ${url}`);

          cache.path = path;
          cache.content = content;

          await this.cachesService.create(cache);

          return content;
        } else {
          this.logger.error(`${status}: ${url}`);
        }
      });

    return result;
  }
}

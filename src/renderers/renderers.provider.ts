import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import { CacheService } from '../cache/cache.service';
import { Cache } from '../cache/entities/cache.entity';
import { BrowserProvider } from './browser.provider';

@Injectable()
export class RenderersProvider {
  private readonly logger = new Logger(RenderersProvider.name);

  constructor(
    private readonly browserService: BrowserProvider,
    private readonly cachesService: CacheService,
    private readonly configService: ConfigService,
    @Inject('QUEUE_SERVICE')
    private readonly queueService: ClientProxy,
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
    const timeout = this.configService.get('render.timeout');
    const secure = this.configService.get('render.secure') ? 'https' : 'http';
    const domain = this.configService.get('render.domain');
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

        if (status > 1) {
          this.logger.log(`${status}: ${url}`);

          cache.path = path;
          cache.content = content;

          const dd = await this.queueService.send(
            {
              cmd: 'add-subscriber',
            },
            'dd',
          );

          console.log(dd);

          await this.cachesService.create(cache);

          return content;
        } else {
          this.logger.error(`${status}: ${url}`);
        }
      });

    return result;
  }
}

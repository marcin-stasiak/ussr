import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BrowserProvider } from './browser.provider';

@Injectable()
export class RenderersProvider {
  private readonly logger = new Logger(RenderersProvider.name);

  constructor(private readonly configService: ConfigService, private readonly browserService: BrowserProvider) {}

  public async initialize(host: string, path: string): Promise<string> {
    if (!this.browserService.browser) {
      await this.browserService.launchBrowser();
    }

    const page = await this.browserService.browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      console.log(request);
      console.log(request.resourceType());
      console.log('DD^^');

      if (request.resourceType() === 'image') {
        request.abort();
      } else {
        request.continue();
      }
    });

    const response = await page.goto(`https://${host}/${path}`, { waitUntil: 'networkidle0' });
    const html = await page.content();

    console.log(response.status());
    // await page.close();
    return html;
  }
}

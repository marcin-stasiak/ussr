import { Injectable } from '@nestjs/common';

import puppeteer, { Puppeteer } from 'puppeteer';

@Injectable()
export class ServerSideRendererService {
  public async renderer(url: string): Promise<string> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://wp.pl/${url}`, { waitUntil: 'networkidle0' });
    const html = await page.content();
    await browser.close();
    return html;
  }
}

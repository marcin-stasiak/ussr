import { Controller, Get, Req } from '@nestjs/common';

import { RenderersProvider } from './renderers/renderers.provider';

@Controller()
export class ApplicationController {
  constructor(private readonly renderersProvider: RenderersProvider) {}

  @Get('*')
  public async renderer(@Req() request): Promise<string> {
    if (request.headers.accept.includes('text/html')) {
      return await this.renderersProvider.initialize(request.path);
    }
  }
}

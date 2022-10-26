import { Controller, Get, Req } from '@nestjs/common';

import { ServerSideRendererService } from './renderers/renderers.service';

@Controller()
export class ApplicationController {
  constructor(private readonly ssrService: ServerSideRendererService) {}

  @Get('*')
  public async renderer(@Req() request): Promise<string> {
    return await this.ssrService.renderer(request.url);
  }
}

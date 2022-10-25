import { Controller, Get, Req } from '@nestjs/common';

import { ServerSideRendererService } from './ssr.service';

@Controller()
export class ServerSideRendererController {
  constructor(private readonly ssrService: ServerSideRendererService) {}

  @Get('*')
  public async renderer(@Req() request): Promise<string> {
    return await this.ssrService.renderer(request.url);
  }
}

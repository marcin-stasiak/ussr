import { Controller, Get, Req } from '@nestjs/common';

import { RenderersService } from './renderers/renderers.service';

@Controller()
export class ApplicationController {
  constructor(private readonly renderersService: RenderersService) {}

  @Get('*')
  public async renderer(@Req() request): Promise<string> {
    return await this.renderersService.initialize(request.url);
  }
}

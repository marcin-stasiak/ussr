import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class ApplicationController {
  @Get('/')
  public async renderer(@Req() request): Promise<string> {
    return 'Hello World!';
  }
}

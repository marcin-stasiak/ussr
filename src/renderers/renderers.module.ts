import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RenderersService } from './renderers.service';

@Module({
  imports: [ConfigModule],
  exports: [RenderersService],
  providers: [RenderersService],
})
export class RenderersModule {}

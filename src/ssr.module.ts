import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import defaultConfig from './configs/default.config';

import { ServerSideRendererController } from './ssr.controller';
import { ServerSideRendererService } from './ssr.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [defaultConfig],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [ServerSideRendererController],
  providers: [ServerSideRendererService],
})
export class ServerSideRendererModule {}

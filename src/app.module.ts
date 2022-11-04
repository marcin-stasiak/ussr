import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import appConfig from './configs/app.config';
import queuingConfig from './configs/queue.config';
import rendererConfig from './configs/render.config';

import { ApplicationController } from './app.controller';
import { CacheModule } from './cache/cache.module';
import { RenderersModule } from './renderers/renderers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, queuingConfig, rendererConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('render.cache'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('development'),
      }),
      inject: [ConfigService],
    }),
    CacheModule,
    RenderersModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

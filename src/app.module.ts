import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import appConfig from './configs/app.config';
import cacheConfig from './configs/ssr.config';

import { ApplicationController } from './app.controller';
import { CachesModule } from './caches/caches.module';
import { RenderersModule } from './renderers/renderers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, cacheConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('ssr.cache'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('development'),
      }),
      inject: [ConfigService],
    }),
    CachesModule,
    RenderersModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

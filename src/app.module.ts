import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';

import { ApplicationController } from './app.controller';
import { PagesCacheModule } from './pages/pages.module';
import { RenderersModule } from './renderers/renderers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('database.name'),
        // username: configService.get('database.username'),
        // password: configService.get('database.password'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('development'),
      }),
      inject: [ConfigService],
    }),
    PagesCacheModule,
    RenderersModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

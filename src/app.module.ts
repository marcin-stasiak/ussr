import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';

import { ServerSideRendererController } from './ssr.controller';
import { ServerSideRendererService } from './ssr.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        database: configService.get('database.name'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        synchronize: true,
        logging: configService.get('development'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ServerSideRendererController],
  providers: [ServerSideRendererService],
})
export class ApplicationModule {}

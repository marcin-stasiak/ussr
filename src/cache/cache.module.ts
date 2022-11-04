import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CacheService } from './cache.service';
import { Cache } from './entities/cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cache])],
  exports: [CacheService],
  providers: [CacheService],
})
export class CacheModule {}

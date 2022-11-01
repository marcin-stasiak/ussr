import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CachesService } from './caches.service';
import { Cache } from './entities/cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cache])],
  exports: [CachesService],
  providers: [CachesService],
})
export class CachesModule {}

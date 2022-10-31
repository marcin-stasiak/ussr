import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CachesService } from './caches.service';
import { Cache } from './entities/cache.entity';
import { Page } from './entities/page.entity';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cache, Page])],
  exports: [CachesService, PagesService],
  providers: [CachesService, PagesService],
  controllers: [PagesController],
})
export class CachesModule {}

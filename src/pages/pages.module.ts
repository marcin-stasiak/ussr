import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Page } from './entities/page.entity';
import { PagesCacheService } from './pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [PagesCacheService],
  providers: [PagesCacheService],
})
export class PagesCacheModule {}

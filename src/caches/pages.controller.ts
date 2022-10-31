import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { DeleteResult } from 'typeorm';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';

@Controller('api/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  public async create(@Body() createPageDto: CreatePageDto): Promise<Page> {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  public async findAll(): Promise<Page[]> {
    return this.pagesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Page> {
    return this.pagesService.findOneById(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto): Promise<Page> {
    return this.pagesService.update(updatePageDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.pagesService.remove(id);
  }
}

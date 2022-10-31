import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  k;
  constructor(@InjectRepository(Page) private readonly pageRepository: Repository<Page>) {}

  public async create(createPage: CreatePageDto): Promise<Page> {
    const create = this.pageRepository.create(createPage);

    return await this.pageRepository.save(create);
  }

  public async findAll(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  public async findOneById(id: string): Promise<Page> {
    return await this.pageRepository.findOne({ where: { id: id } });
  }

  public async update(updatePage: UpdatePageDto): Promise<Page> {
    const found = await this.pageRepository.findOne({ where: { id: updatePage.id } });

    if (found) {
      return await this.pageRepository.save({ ...found, ...updatePage });
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    const found = await this.pageRepository.findOne({ where: { id: id } });

    if (found) {
      return await this.pageRepository.delete(found.id);
    }
  }
}

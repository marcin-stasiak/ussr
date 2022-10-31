import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { CreateCacheDto } from './dto/create-cache.dto';
import { UpdateCacheDto } from './dto/update-cache.dto';
import { Cache } from './entities/cache.entity';

@Injectable()
export class CachesService {
  constructor(@InjectRepository(Cache) private readonly cacheRepository: Repository<Cache>) {}

  public async create(createCache: CreateCacheDto): Promise<Cache> {
    const create = this.cacheRepository.create(createCache);

    return await this.cacheRepository.save(create);
  }

  public async findAll(): Promise<Cache[]> {
    return this.cacheRepository.find();
  }

  public async findOneById(id: string): Promise<Cache> {
    return await this.cacheRepository.findOne({ where: { id: id } });
  }

  public async findOneByUrl(path: string): Promise<Cache> {
    return await this.cacheRepository.findOne({ where: { path: path } });
  }

  public async update(updateCache: UpdateCacheDto): Promise<Cache> {
    const found = await this.cacheRepository.findOne({ where: { id: updateCache.id } });

    if (found) {
      return await this.cacheRepository.save({ ...found, ...updateCache });
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    const found = await this.cacheRepository.findOne({ where: { id: id } });

    if (found) {
      return await this.cacheRepository.delete(found.id);
    }
  }
}

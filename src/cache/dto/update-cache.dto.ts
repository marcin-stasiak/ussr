import { PartialType } from '@nestjs/mapped-types';

import { IsUUID } from 'class-validator';

import { CreateCacheDto } from './create-cache.dto';

export class UpdateCacheDto extends PartialType(CreateCacheDto) {
  @IsUUID()
  public id: string;
}

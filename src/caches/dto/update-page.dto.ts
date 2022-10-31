import { PartialType } from '@nestjs/mapped-types';

import { IsUUID } from 'class-validator';

import { CreatePageDto } from './create-page.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @IsUUID()
  public id: string;
}

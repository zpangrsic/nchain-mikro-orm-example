import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Tag } from '../tag.entity';

export class TagUpdateDto extends PickType(Tag, ['name'] as const) {
  @IsString()
  name: string;
}

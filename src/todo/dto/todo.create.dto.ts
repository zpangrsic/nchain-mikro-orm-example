import { ApiProperty, PickType } from '@nestjs/swagger';
import { Todo } from '../todo.entity';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TodoTagDto } from './todo.tag.dto';
import { Transform, Type } from 'class-transformer';

export class TodoCreateDto extends PickType(Todo, [
  'value',
  'completed',
] as const) {
  @IsString()
  value: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    nullable: true,
    default: false,
  })
  completed?: boolean;

  @IsArray()
  @ApiProperty({
    isArray: true,
    nullable: true,
    default: [],
    type: String,
  })
  @Transform(({ value }) => {
    if (!(value instanceof Array)) {
      return [];
    }
    return value.map((v) => {
      if (typeof v !== 'string') {
        return null;
      }
      return v.trim().replaceAll(' ', '-').toLowerCase();
    });
  })
  tags: string[];
}

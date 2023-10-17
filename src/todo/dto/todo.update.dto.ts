import { IntersectionType, PickType } from '@nestjs/swagger';
import { Todo } from '../todo.entity';
import { IsBoolean, IsString } from 'class-validator';
import { TodoCreateDto } from './todo.create.dto';

export class TodoUpdateDto extends PickType(TodoCreateDto, [
  'completed',
  'tags',
] as const) {}

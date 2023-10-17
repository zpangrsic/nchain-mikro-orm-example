import {
  Collection,
  Entity,
  Index,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../common/entity/base.entity';
import { Tag } from '../tags/tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SoftDelete } from 'src/common/filters/soft-delete.filter';

@SoftDelete()
@Entity({ tableName: 'todos' })
export class Todo extends BaseEntity<Todo, 'id'> {
  @Property()
  @Index()
  value!: string;

  @Property({ default: false })
  completed?: boolean;

  @ManyToMany(() => Tag, (entity) => entity.todos, { owner: true })
  @ApiProperty({
    type: Tag,
    isArray: true,
  })
  tags = new Collection<Tag>(this);
}

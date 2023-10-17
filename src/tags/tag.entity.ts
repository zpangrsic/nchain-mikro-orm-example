import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  PrimaryKeyType,
} from '@mikro-orm/core';
import { TimestampEntity } from 'src/common/entity/timestamp.entity';
import { SoftDelete } from 'src/common/filters/soft-delete.filter';
import { Todo } from 'src/todo/todo.entity';

@SoftDelete()
@Entity({ tableName: 'tags' })
export class Tag extends TimestampEntity<Tag, 'name'> {
  [PrimaryKeyType]: string;

  @PrimaryKey({ unique: true })
  name: string;

  @ManyToMany(() => Todo, 'tags')
  todos = new Collection<Todo>(this);
}

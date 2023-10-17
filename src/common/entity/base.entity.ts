import {
  DateTimeType,
  Property,
  BaseEntity as OrmBaseEntity,
  PrimaryKey,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

export abstract class BaseEntity<
  Entity extends object,
  Primary extends keyof Entity,
  Populate extends string = string,
> extends OrmBaseEntity<Entity, Primary, Populate> {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string = v4();

  @Property({
    columnType: 'timestamptz',
    onCreate: () => new Date(),
  })
  dateCreated: Date;

  @Property({
    columnType: 'timestamptz',
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  dateModified: Date;

  @Property({ columnType: 'timestamptz', nullable: true })
  dateDeleted: Date;
}

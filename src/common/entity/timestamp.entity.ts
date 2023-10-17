import {
  Property,
  BaseEntity as OrmBaseEntity,
  PrimaryKey,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

export abstract class TimestampEntity<
  Entity extends object,
  Primary extends keyof Entity,
  Populate extends string = string,
> extends OrmBaseEntity<Entity, Primary, Populate> {
  @Property({
    type: 'timestamptz',
    onCreate: () => new Date(),
  })
  dateCreated: Date;

  @Property({
    type: 'timestamptz',
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  dateModified: Date;

  @Property({ type: 'timestamptz', nullable: true })
  @Exclude()
  dateDeleted: Date;
}

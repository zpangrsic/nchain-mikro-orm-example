import { Property, PrimaryKey } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { TimestampEntity } from './timestamp.entity';

export abstract class BaseEntity<
  Entity extends object,
  Primary extends keyof Entity,
  Populate extends string = string,
> extends TimestampEntity<Entity, Primary, Populate> {
  @PrimaryKey({
    type: 'uuid',
    defaultRaw: 'uuid_generate_v4()',
  })
  id: string;
}

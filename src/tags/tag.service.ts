import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  Loaded,
} from '@mikro-orm/core';
import { Tag } from './tag.entity';
import { TagCreateDto } from './dto/tag.create.dto';
import { TagUpdateDto } from './dto/tag.update.dto';
import { SoftDelete } from 'src/common/filters/soft-delete.filter';
import { TagAllQueryDto } from './dto/tag.all.query.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
    private readonly em: EntityManager,
  ) {}

  create(data: TagCreateDto): Tag {
    // create entity object
    return this.tagRepository.create(data);
  }

  async save(entity: Tag): Promise<Tag> {
    // pass to uow and persist data
    await this.em.persistAndFlush(entity);

    // return the saved referenced object
    return entity;
  }

  async update(name: string, data: TagUpdateDto): Promise<Loaded<Tag>> {
    // fetch one or fail
    const entity = await this.getOneByName(name);

    // assign data to existing entity
    this.tagRepository.assign(entity, data);

    // uow flush and persist data
    await this.em.flush();

    // return updated entity
    return entity;
  }

  async delete(id: string) {
    // fetch one or fail
    const entity = await this.getOneByName(id);

    try {
      // remove entity and persist data
      this.tagRepository.assign(entity, { dateDeleted: new Date() });
      await this.em.flush();
      return entity.dateDeleted !== null;
    } catch (e) {
      Logger.error(
        `Failed to delete Tag::${entity.name} with error ${e.message}`,
      );
      return false;
    }
  }

  async getOneByName(name: string) {
    // fetch one or fail
    return await this.tagRepository.findOneOrFail(
      { name: name },
      { filters: { softDelete: { isDeleted: false } } },
    );
  }

  async getAll(query: TagAllQueryDto) {
    const where: FilterQuery<Tag> = {};
    if (query.name) {
      where['name'] = { $like: `%${query.name}%` };
    }
    return await this.tagRepository.findAndCount(where, {
      filters: { softDelete: { isDeleted: query.deleted } },
    });
  }
}

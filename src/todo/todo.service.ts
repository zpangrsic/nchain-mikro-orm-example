import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Todo } from './todo.entity';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TagService } from 'src/tags/tag.service';
import { TodoAllQueryDto } from './dto/todo.all.query.dto';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
    private readonly em: EntityManager,
    private readonly tagService: TagService,
  ) {}

  async create(
    data: Omit<TodoCreateDto, 'tags'>,
    tags: string[],
  ): Promise<Todo> {
    // create entity object
    const entity = this.todoRepository.create(data);
    await this.processTags(entity, tags);
    return entity;
  }

  async save(entity: Todo): Promise<Todo> {
    // pass to uow and persist data
    await this.em.persistAndFlush(entity);

    // return the saved referenced object
    return entity;
  }

  async update(id: string, data: TodoUpdateDto): Promise<Todo> {
    // fetch one or fail
    const entity = await this.getOneById(id);

    if (data.tags) {
      await this.processTags(entity, data.tags);
    }

    delete data['tags'];

    // assign data to existing entity
    this.todoRepository.assign(entity, data as Omit<TodoUpdateDto, 'tags'>);

    // uow flush and persist data
    await this.save(entity);

    // return updated entity
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    // fetch the entity by id
    const entity = await this.getOneById(id);

    try {
      // remove entity and persist data
      this.todoRepository.assign(entity, { dateDeleted: new Date() });
      await this.em.flush();
      return entity.dateDeleted !== null;
    } catch (e) {
      Logger.error(
        `Failed to delete Todo::${entity.id} with error: ${e.message}`,
      );
      return false;
    }
  }

  async getOneById(id: string): Promise<Todo> {
    // fetch one or fail
    return await this.todoRepository.findOneOrFail(
      { id },
      { filters: { softDelete: { isDeleted: false } }, populate: ['tags'] },
    );
  }

  async getAll(query: TodoAllQueryDto): Promise<[Todo[], number]> {
    const where: FilterQuery<Todo> = {};
    if (query.tag) {
      where['tags'] = { name: { $like: `%${query.tag}%` } };
    }
    return await this.todoRepository.findAndCount(where, {
      filters: { softDelete: { isDeleted: query.deleted } },
      populate: ['tags'],
    });
  }

  private async processTags(entity: Todo, tags: string[]) {
    if (!tags || !(tags instanceof Array)) {
      return;
    }
    for (const tag of tags) {
      const existing = await this.em.findOne(Tag, tag);

      entity.tags.add(
        existing
          ? existing
          : this.tagService.create({
              name: tag,
            }),
      );
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { TagCreateDto } from './dto/tag.create.dto';
import { TagUpdateDto } from './dto/tag.update.dto';
import { TagAllQueryDto } from './dto/tag.all.query.dto';

@Controller('tag')
@ApiTags('Tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() dto: TagCreateDto) {
    const entity = this.tagService.create(dto);
    await this.tagService.save(entity);
    return entity;
  }

  @Patch('/:name')
  async updateTodo(@Param('name') name: string, @Body() dto: TagUpdateDto) {
    return await this.tagService.update(name, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.tagService.delete(id);
  }

  @Get('/:name')
  async getById(@Param('name') name: string) {
    return await this.tagService.getOneByName(name);
  }

  @Get()
  async getAll(@Query() query: TagAllQueryDto) {
    return await this.tagService.getAll(query);
  }
}

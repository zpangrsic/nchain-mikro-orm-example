import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { ApiTags } from '@nestjs/swagger';
import { TodoAllQueryDto } from './dto/todo.all.query.dto';

@Controller('todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() dto: TodoCreateDto) {
    const entity = await this.todoService.create(
      {
        completed: dto.completed,
        value: dto.value,
      },
      dto.tags,
    );
    await this.todoService.save(entity);
    return entity;
  }

  @Patch('/:id')
  async updateTodo(@Param('id') id: string, @Body() dto: TodoUpdateDto) {
    return await this.todoService.update(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.todoService.getOneById(id);
  }

  @Get()
  async getAll(@Query() query: TodoAllQueryDto) {
    return await this.todoService.getAll(query);
  }
}

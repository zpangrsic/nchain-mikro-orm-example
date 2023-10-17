import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TagModule } from 'src/tags/tag.module';

@Module({
  imports: [MikroOrmModule.forFeature([Todo]), TagModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

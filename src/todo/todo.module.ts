import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './todo.controller';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

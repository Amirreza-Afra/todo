import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todolist } from './entities/todo.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}

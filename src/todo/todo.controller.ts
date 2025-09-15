import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/req/create.req.dto';
import { ApiResponse } from '@nestjs/swagger';

//@ApiTags('todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'task added' })
  @ApiResponse({ status: 400, description: 'validation failed' })
  async createTask(@Body() dto: CreateTodoDTO) {
    return this.todoService.createTask(dto);
  }
}

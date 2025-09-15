import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/req/create.req.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetTaskResDto } from './dto/res/getTasks.res.dto';

//@ApiTags('todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'tasks added' })
  @ApiResponse({ status: 400, description: 'validation failed' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async createTask(@Body() dtos: CreateTodoDTO[]) {
    return this.todoService.createTasks(dtos);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'return all tasks or filtered by title',
    type: [GetTaskResDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Task with the specified ID not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getTask(@Query('title') title?: string) {
    return this.todoService.getTask(title);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/req/create.req.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
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
  @ApiOkResponse({})
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

  @ApiOkResponse({ description: 'task deleted from todo list' })
  @ApiBadRequestResponse({
    description: 'Validation failed (numeric string is expected)',
  })
  @ApiNotFoundResponse({description : 'task with id not found'})
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deletTask(id);
  }
}

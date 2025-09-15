import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/req/create.req.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService : TodoService){}

    @Post()
    async createTask(@Body() dto : CreateTodoDTO){
        return this.todoService.createTask(dto);
    }

}

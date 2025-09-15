import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todo.entities';
import { CreateTodoDTO } from './dto/req/create.req.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todoRep: Repository<Todolist>,
  ) {}

  async createTask(dto: CreateTodoDTO): Promise<{ message: string }>{
  if (dto.endDate && dto.startDate >= dto.endDate) {
    throw new BadRequestException('end date must be greater than start date');
  }

  try {
    const task = this.todoRep.create(dto);
    await this.todoRep.save(task);
    return { message: 'task added to todo list' };
  } catch (error) {
    throw new InternalServerErrorException('Failed to create task',error);
  }
}

}

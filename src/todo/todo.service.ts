import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todo.entities';
import { CreateTodoDTO } from './dto/req/create.req.dto';
import { error } from 'console';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todoRep: Repository<Todolist>,
  ) {}

  async createTask(dto: CreateTodoDTO): Promise<{ message: string }> {
    try {
      if (dto.endDate) {
        if (dto.startDate > dto.endDate) {
          throw new BadRequestException(
            'end date can not be small than start date',
          );
        }
      }
      const task = this.todoRep.create(dto);
      const saved = await this.todoRep.save(task);

      
      return { message: 'task added to todo list' };
    } catch (error) {
      throw new InternalServerErrorException('faild to create dto', error);
    }
  }
}

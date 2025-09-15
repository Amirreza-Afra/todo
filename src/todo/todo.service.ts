import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todo.entities';
import { CreateTodoDTO } from './dto/req/create.req.dto';
import { GetTaskResDto } from './dto/res/getTasks.res.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todoRep: Repository<Todolist>,
  ) {}

async createTasks(dtos: CreateTodoDTO[]): Promise<{ message: string }> {
  try {
    for (const dto of dtos) {
      if (dto.endDate && dto.startDate >= dto.endDate) {
        throw new BadRequestException(
          `end date must be greater than start date for task: ${dto.title}`,
        );
      }
    }

    const tasks = this.todoRep.create(dtos); 
    await this.todoRep.save(tasks);
      return { message: 'task added to todo list' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task', error);
    }
  }

  async getTask(title?: string): Promise<GetTaskResDto[]> {
    try {
      const db = this.todoRep.createQueryBuilder('todo');

      if (title) {
        const res = await db.where('todo.title = :title', { title }).getMany();
        if (res.length === 0) {
          throw new NotFoundException(`No task found with title: ${title}`);
        } else {
          return res;
        }
      } else {
        return await db.getMany();
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }

    throw new InternalServerErrorException('Failed to fetch tasks');
  }
}

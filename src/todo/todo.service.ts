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
import { UpdateTodoDTO, UpdateTodolistDTO } from './dto/req/update.req.dto';
import { UpdateTodolistResDTO } from './dto/res/update.res.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todoRep: Repository<Todolist>,
  ) {}

  //-----------created tasks-----------------
  async createTasks(dtos: CreateTodoDTO[]): Promise<{ message: string }> {
    if (!dtos || dtos.length === 0) {
      throw new BadRequestException('The task list cannot be empty');
    }

    return await this.todoRep.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          for (const dto of dtos) {
            if (dto.endDate && dto.startDate >= dto.endDate) {
              throw new BadRequestException(
                `end date must be greater than start date for task: ${dto.title}`,
              );
            }
          }

          const tasks = transactionalEntityManager.create(Todolist, dtos);
          await transactionalEntityManager.save(tasks);
          return { message: 'task added to todo list' };
        } catch (error) {
          if (error instanceof BadRequestException) {
            throw error;
          }
          throw new InternalServerErrorException(
            'Failed to create task',
            error,
          );
        }
      },
    );
  }

  //-------------get tasks---------------
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

  //-------------change tasks---------------
  async changeTasks(dto: UpdateTodolistDTO): Promise<{message : string}> {
    if (!Array.isArray(dto.updateTodos) || dto.updateTodos.length === 0) {
      throw new BadRequestException('The task list cannot be empty or invalid');
    }

    return await this.todoRep.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          for (const todo of dto.updateTodos) {
            if (!Number.isInteger(todo.id) || todo.id <= 0) {
              throw new BadRequestException(`Invalid task ID: ${todo.id}`);
            }

            if (
              todo.startDate &&
              todo.endDate &&
              todo.startDate >= todo.endDate
            ) {
              throw new BadRequestException(
                `End date must be greater than start date for task ID: ${todo.id}`,
              );
            }

            const taskExists = await transactionalEntityManager
              .createQueryBuilder(Todolist, 'todo')
              .where('todo.id = :id', { id: todo.id })
              .getCount();

            if (taskExists === 0) {
              throw new NotFoundException(`Task with ID ${todo.id} not found`);
            }

            const updateData: Partial<Todolist> = {};
            if (todo.title !== undefined) updateData.title = todo.title;
            if (todo.state !== undefined) updateData.state = todo.state;
            if (todo.startDate !== undefined) updateData.startDate = todo.startDate;
            if (todo.endDate !== undefined) updateData.endDate = todo.endDate;


            await transactionalEntityManager
              .createQueryBuilder()
              .update(Todolist)
              .set(updateData)
              .where('id = :id', { id: todo.id })
              .execute();
          }

          return { message: 'Tasks updated successfully'};
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
          }
          throw new InternalServerErrorException(
            'Failed to update tasks',
            error,
          );
          }
      },
    );
  }

  //-------------delete task---------------
  async deletTask(id: number): Promise<{ message: string }> {
    try {
      const deleted = await this.todoRep.delete({ id: id });
      if (deleted.affected == 0) {
        throw new NotFoundException(`task with ${id} not found`);
      } else {
        return { message: 'task deleted from todo list' };
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create task', error);
    }
  }
}

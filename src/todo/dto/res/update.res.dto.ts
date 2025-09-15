import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { State } from 'src/common/enum/todo_state.enum';

export class UpdateTodoResDTO {
  @ApiProperty({ example: '1', description: 'id of task' })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiPropertyOptional({ example: 'math', description: 'name of task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ enum: State, example: State.COMPLETE })
  @IsEnum(State)
  @IsNotEmpty()
  state: State;

  @ApiPropertyOptional({
    example: '2025-04-05T09:00:00.000Z',
    description: 'start date in ISO format',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({
    example: '2025-04-05T09:00:00.000Z',
    description: 'end date in ISO format',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

export class UpdateTodolistResDTO {
  @ApiProperty({ description: 'List of tasks' })
  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UpdateTodoResDTO)
  updateTodos: UpdateTodoResDTO[];
}
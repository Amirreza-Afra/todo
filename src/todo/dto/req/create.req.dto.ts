import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { State } from 'src/common/enum/todo_state.enum';

export class CreateTodoDTO {
  @ApiProperty({ example: 'math', description: 'name of task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: State, example: State.COMPLETE })
  @IsEnum(State)
  @IsNotEmpty()
  state: State;

  @ApiProperty({
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
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
import { State } from 'src/common/enum/todo_state.enum';

export class GetTaskResDto {


  id: number;
  @ApiProperty({ example: 'english', description: 'name of task' })
  title: string;

  @ApiProperty({ enum: State, example: State.COMPLETE })
  @IsEnum(State)
  state: State;

  @ApiProperty({
    example: '2025-04-05T09:00:00.000Z',
    description: 'start date in ISO format',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({
    example: '2025-04-05T09:00:00.000Z',
    description: 'end date in ISO format',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

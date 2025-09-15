import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { State } from 'src/common/enum/todo_state.enum';

@Entity({ name: 'todo_list' })
export class Todolist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: State, default: State.NOT_STARTED })
  state: State;

  @Column()
  startDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;
}

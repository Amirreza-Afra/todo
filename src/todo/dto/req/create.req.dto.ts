import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { State } from "src/common/enum/todo_state.enum";

export class CreateTodoDTO{
   
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(State)
    @IsNotEmpty()
    state: State;

    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    startDate: Date;

    @IsOptional()
    @IsDate()
    @Type(()=> Date)
    endDate?: Date;


}
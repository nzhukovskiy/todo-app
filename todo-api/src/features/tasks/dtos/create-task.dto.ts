import {IsOptional, IsString, Min, MinLength} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}
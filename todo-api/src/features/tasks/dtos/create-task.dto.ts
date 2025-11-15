import {IsOptional, IsString, Min, MinLength} from "class-validator";

export class CreateTaskDto {
    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}
import {IsNumber, IsString} from "class-validator";

export class CreateCourseDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    number: number;
}

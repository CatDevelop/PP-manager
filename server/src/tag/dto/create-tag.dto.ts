import {IsString} from "class-validator";

export class CreateTagDto {
    @IsString()
    text: string;

    @IsString()
    color: string;
}

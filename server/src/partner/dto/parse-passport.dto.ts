import {IsNumber, IsString} from "class-validator";

export class ParsePassportDto {
    @IsString()
    token: string;

    @IsString()
    session_cookie: string

    id?: number;
}

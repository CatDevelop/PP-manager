import {IsString} from "class-validator";

export class ParsePassportsDto {
    @IsString()
    token: string;

    @IsString()
    session_cookie: string
}

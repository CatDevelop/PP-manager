import {IsNumber, IsString} from "class-validator";

export class ParsePassportsDto {
    @IsString()
    token: string;

    @IsString()
    session_cookie: string

    @IsNumber()
    period_id: number;
}

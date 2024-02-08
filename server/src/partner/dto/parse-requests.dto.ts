import {IsString} from "class-validator";

export class ParseRequestsDto {
    @IsString()
    token: string;

    @IsString()
    session_cookie: string
}

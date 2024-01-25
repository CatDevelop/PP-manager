import {IsNumber, IsString} from "class-validator";

export class ParseTeamprojectDto {
    @IsString()
    token: string;

    @IsNumber()
    year: number;

    @IsNumber()
    term: number;
}

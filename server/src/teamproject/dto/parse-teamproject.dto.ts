import {IsNumber, IsString} from "class-validator";

export class ParseTeamprojectDto {
    @IsString()
    token: string;

    @IsNumber()
    period_id: number;
}

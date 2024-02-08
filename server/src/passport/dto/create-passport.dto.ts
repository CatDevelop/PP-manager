import {Column} from "typeorm";

export class CreatePassportDto {
    id: number;
    uid: string;
    short_name: string;
    diploma_name: string;
    team_count: number;
    students_count: number;
    request_id: number;
    date: Date;
    course: string[];
    kind: string;
    status: string;
}

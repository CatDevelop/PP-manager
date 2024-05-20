import {Column} from "typeorm";

export enum StudentsFiltersFieldName {
    FULLNAME = "fullname",
    PHONE = "phone",
    EMAIL = "email",
    GROUPNAME = "groupName",
    PROJECTNAME = "projectName",
    PASSPORT = "passport",
    REQUEST = "request",
    CURATORFULLNAME = "curator",
    TOTALSCORE = "totalScore",
    EXPERTSSCORE= "expertsScore",
    RETAKEDSCORE = "retakedScore"
}


export class FindAllStudentsDto {
    period_id: number;
    page: number;
    itemCountOnPage: number;


    options: {
        filtersGroup: {
            operation: "and" | "or",
            filters: [
                {
                    fieldName: StudentsFiltersFieldName,
                    operation: string,
                    value: string[]
                }
            ]
        },
        // sorts: [
        //     {
        //         order: "desc" | "asc",
        //         fieldName: "fullname" | "phone" | "email" | "groupName"
        //     }
        // ]
    };
}

import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "../../project/entities/project.entity";
import {Question} from "../../question/entities/question.entity";

@Entity()
export class QuestionSection {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @OneToMany(() => Question, (question) => question.questionSection, {nullable: true})
    questions: Question[];
}

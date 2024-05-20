import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Passport} from "../../passport/entities/passport.entity";
import {QuestionSection} from "../../question-section/entities/question-section.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    question: string

    @Column()
    answer: string

    @ManyToOne(() => QuestionSection, (section) => section.id, {nullable: true})
    @JoinColumn({ name: 'question_section' })
    questionSection: QuestionSection;
}

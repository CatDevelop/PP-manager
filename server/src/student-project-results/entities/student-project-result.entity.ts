import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "../../project/entities/project.entity";
import {Student} from "../../student/entities/student.entity";

@Entity()
export class StudentProjectResult {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    totalScore: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    expertsScore: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    finalScore: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    retakedScore: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    brsScore: number;

    @Column('decimal', { precision: 6, scale: 2, nullable: true})
    coefficient: number;

    @ManyToOne(() => Project, (project) => project.id, {nullable: true})
    @JoinColumn({ name: 'project'})
    project: Project;

    @ManyToOne(() => Student, (student) => student.id, {nullable: true})
    @JoinColumn({ name: 'student'})
    student: Student;
}

import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {Tag} from "../../tag/entities/tag.entity";
import {Student} from "../../student/entities/student.entity";

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    passport: string;

    @Column()
    name: string;

    // @Column({nullable: true})
    // students: string;

    @Column({nullable: true})
    curator: string

    @Column()
    year: number;

    @Column()
    term: number;

    @Column({default: false})
    isHaveReport: boolean;

    @Column({default: false})
    isHavePresentation: boolean;

    @Column({nullable: true})
    comissionScore: number;

    @Column()
    status: string;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({nullable: true})
    results: string;

    @Column({nullable: true})
    documents: string;

    @Column({nullable: true})
    details: string;

    @Column({nullable: true})
    team: string;

    @ManyToMany(() => Student, (student) => student.projects, {
        cascade: true
    })
    @JoinTable({
        name: "project_student", joinColumn: {
            name: 'project_id',
            referencedColumnName: 'id',
        }, inverseJoinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
        },
    })
    students: Student[];
}

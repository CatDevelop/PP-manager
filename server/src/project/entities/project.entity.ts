import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {Tag} from "../../tag/entities/tag.entity";
import {Student} from "../../student/entities/student.entity";
import {Passport} from "../../passport/entities/passport.entity";
import {CustomerUser} from "../../customer-user/entities/customer-user.entity";
import {Period} from "../../period/entities/period.entity";

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    curator: string

    @Column({default: false})
    isHaveReport: boolean;

    @Column({default: false})
    isHavePresentation: boolean;

    @Column({nullable: true})
    comissionScore: number;

    @Column()
    status: string;

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

    @CreateDateColumn({nullable: true})
    created_at: Date;

    @UpdateDateColumn({nullable: true})
    updated_at: Date;

    @ManyToOne(() => Passport, (passport) => passport.id, {nullable: true})
    @JoinColumn({ name: 'passport' })
    passport: Passport;

    @ManyToOne(() => Period, (period) => period.projects, {nullable: true})
    @JoinColumn({ name: 'period'})
    period: Period
}

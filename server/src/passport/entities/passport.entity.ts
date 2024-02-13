import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {Period} from "../../period/entities/period.entity";
import {Course} from "../../course/entities/course.entity";
import {Request} from "../../request/entities/request.entity";
import {Tag} from "../../tag/entities/tag.entity";

@Entity()
export class Passport {
    @PrimaryColumn()
    id: number;

    @Column()
    uid: string;

    @Column({nullable: true})
    short_name: string;

    @Column({nullable: true})
    diploma_name: string;

    @Column({nullable: true})
    date: Date;

    @Column({nullable: true})
    team_count: number;

    @Column({nullable: true})
    students_count: number;

    @Column({nullable: true})
    status: string;

    @Column({nullable: true})
    kind: string;

    @ManyToOne(() => Request, (request) => request.id, {nullable: true})
    @JoinColumn({ name: 'request'})
    request: Request;

    @ManyToMany(() => Course, (course) => course.passports, {onDelete: "CASCADE"})
    @JoinTable({
        name: "passport_course", joinColumn: {
            name: 'passport_id',
            referencedColumnName: 'id',
        }, inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
        },
    })
    course: Course[]

    @ManyToMany(() => Tag, (tag) => tag.passports, {
        cascade: true
    })
    @JoinTable({
        name: "passport_tag", joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        }, inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    })
    tags: Tag[];
}

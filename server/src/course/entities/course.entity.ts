import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import {Passport} from "../../passport/entities/passport.entity";

@Entity()
export class Course {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    number: number;

    @ManyToMany(() => Passport, (passport) => passport.course, {onDelete: "CASCADE"})
    passports: Passport[]
}

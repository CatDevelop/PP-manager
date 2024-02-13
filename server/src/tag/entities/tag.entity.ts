import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Passport} from "../../passport/entities/passport.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    color: string;


    @ManyToMany(() => Passport, (passport) => passport.tags, {onDelete: "CASCADE"})
    passports: Passport[]
}

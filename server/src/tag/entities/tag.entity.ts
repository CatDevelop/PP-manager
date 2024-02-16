import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Passport} from "../../passport/entities/passport.entity";
import {Request} from "../../request/entities/request.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    color: string;

    @ManyToMany(() => Request, (request) => request.tags, {onDelete: "CASCADE"})
    requests: Request[]
}

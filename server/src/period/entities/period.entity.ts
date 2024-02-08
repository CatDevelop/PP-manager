import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Passport} from "../../passport/entities/passport.entity";
import {Request} from "../../request/entities/request.entity"
@Entity()
export class Period {
    @PrimaryColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    term: number;

    @OneToMany(() => Request, (request) => request.id, {nullable: true})
    @JoinColumn({name: 'requests'})
    requests: Request[]
}

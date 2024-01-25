import {Column, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Project {
    @PrimaryColumn()
    id: string;

    @Column()
    passport: string;

    @Column()
    name: string;

    @Column({nullable: true})
    students: string;

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
}

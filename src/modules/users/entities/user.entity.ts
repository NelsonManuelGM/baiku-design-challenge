import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    first_name: string

    @Column({ nullable: false })
    last_name: string

    @Column({ nullable: false })
    email: string
}

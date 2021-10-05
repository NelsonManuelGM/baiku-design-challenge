import { Reservation } from "src/modules/reservation/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations: Reservation[];
}

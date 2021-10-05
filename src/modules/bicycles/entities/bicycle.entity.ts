import { Point } from 'geojson';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type TOURING = 'TOURING';
export type SPORT = 'SPORT';

export type UserRoleType = SPORT | TOURING;

@Entity()
export class Bicycle {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true })
  locked: boolean;

  @Column({
    type: 'character varying',
    enum: ['TOURING', 'SPORT'],
    default: 'SPORT',
  })
  type: UserRoleType;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  gps_location: Point;

  @OneToMany(() => Reservation, reservation => reservation.location)
  reservations: Reservation[]

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

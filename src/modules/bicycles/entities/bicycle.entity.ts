import { Point } from 'geojson';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
    enum: ['touring', 'sport'],
    default: 'sport',
  })
  type: UserRoleType;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  gps_location: Point;
}

import { Point } from "geojson";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PickupLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  postal_code: string;

  @Index()
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  gps_location: Point;

}

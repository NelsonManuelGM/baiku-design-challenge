import { Point } from "geojson";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { CreatePickupLocationDto } from './../dto/create-pickup-location.dto';


@Entity()
export class PickupLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  postalCode: string;

  @Index()
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  gpsLocations: Point;

}

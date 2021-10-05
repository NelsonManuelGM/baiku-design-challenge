import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createDataPoint from 'src/utils/arrToPointHelper';
import { Repository } from 'typeorm';
import { ClosestLocation } from '../dto/closest-location.dto';
import { CreatePickupLocationDto } from '../dto/create-pickup-location.dto';
import { UpdatePickupLocationDto } from '../dto/update-pickup-location.dto';
import { PickupLocation } from '../entities/pickup-location.entity';

@Injectable()
export class PickupLocationService {
  constructor(@InjectRepository(PickupLocation) private readonly pLocationRep: Repository<PickupLocation>) { }

  create({ city, country, gps_locations, postal_code, state, street }: CreatePickupLocationDto) {
    const newPLocation = new PickupLocation();
    newPLocation.city = city;
    newPLocation.country = country;
    newPLocation.postal_code = postal_code;
    newPLocation.state = state;
    newPLocation.street = street;

    newPLocation.gps_location = createDataPoint(gps_locations)
    return this.pLocationRep.save(newPLocation);
  }

  findAll() {
    return this.pLocationRep.find({});
  }

  findOne(id: string) {
    return this.pLocationRep.findOne({ id: id });
  }

  update(id: string, updatePickupLocationDto: UpdatePickupLocationDto) {
    if (Object.keys(updatePickupLocationDto).length === 0) {
      throw new BadRequestException('Update values are not defined!')
    }
    const { gps_locations, ...rest } = updatePickupLocationDto;
    const obj = { ...rest }

    if (gps_locations) {
      const newGpsLocation = createDataPoint(gps_locations)
      obj['gps_locations'] = newGpsLocation
    }

    return this.pLocationRep.update({ id: id }, obj);
  }

  remove(id: string) {
    return this.pLocationRep.delete({ id: id });
  }

  async closestLocation({ lat, lng }: ClosestLocation) {
    const origin = {
      type: "Point",
      coordinates: [lat, lng]
    };

    const locations = await this.pLocationRep
      .createQueryBuilder('closer_locations')
      .select(['id', 'country', 'state', 'city', 'postal_code',
        'ST_Distance(gps_location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(gps_location))) AS distance'])
      .orderBy("distance", "ASC")
      .setParameters({
        origin: JSON.stringify(origin)
      })
      .getRawMany();
    return locations[0]
  }

}


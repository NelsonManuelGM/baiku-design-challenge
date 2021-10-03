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

  create({ city, country, gpsLocations, postalCode, state, street }: CreatePickupLocationDto) {
    const newPLocation = new PickupLocation();
    newPLocation.city = city;
    newPLocation.country = country;
    newPLocation.postal_code = postalCode;
    newPLocation.state = state;
    newPLocation.street = street;

    newPLocation.gps_location = createDataPoint(gpsLocations)
    return this.pLocationRep.save(newPLocation);
  }

  findAll() {
    return this.pLocationRep.find({});
  }

  findOne(id: string) {
    return this.pLocationRep.findOne({ id: id });
  }

  update(id: string, updatePickupLocationDto: UpdatePickupLocationDto) {
    if(Object.keys(updatePickupLocationDto).length === 0){
      throw new BadRequestException('Update values are not defined!')
    }
    const { gpsLocations, ...rest } = updatePickupLocationDto;
    const newGpsLocation = createDataPoint(gpsLocations)
    return this.pLocationRep.update({ id: id }, { gps_location: newGpsLocation, ...rest });
  }

  remove(id: string) {
    return this.pLocationRep.delete({ id: id });
  }

  async closestLocation({ gpsLocations, country, state, city, postalCode }: ClosestLocation) {
    const origin = {
      type: "Point",
      coordinates: [gpsLocations[0], gpsLocations[1]]
    };

    const locations = await this.pLocationRep
      .createQueryBuilder('closer_locations')
      .select(['id','country', 'state', 'city', 'postal_code',
        'ST_Distance(gps_location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(gps_location))) AS distance'])
      .where('closer_locations.country = :country', { country })
      .where('closer_locations.state = :state', { state })
      .where('closer_locations.city = :city', { city })
      .where('closer_locations.postal_code = :postalCode', { postalCode })
      .orderBy("distance","ASC")
      .setParameters({
        origin: JSON.stringify(origin)
      })
      .getRawMany();
      return locations[0]
  }

}


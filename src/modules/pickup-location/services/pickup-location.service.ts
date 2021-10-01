import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createDataPoint from 'src/utils/arrToPointHelper';
import { Repository } from 'typeorm';
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
    newPLocation.postalCode = postalCode;
    newPLocation.state = state;
    newPLocation.street = street;

    newPLocation.gpsLocations = createDataPoint(gpsLocations)
    return this.pLocationRep.save(newPLocation);
  }

  findAll() {
    return this.pLocationRep.find({});
  }

  findOne(id: string) {
    return this.pLocationRep.findOne({ id: id });
  }

  update(id: string, { gpsLocations, ...rest }: UpdatePickupLocationDto) {
    const newGpsLocation = createDataPoint(gpsLocations)
    return this.pLocationRep.update({ id: id }, { gpsLocations: newGpsLocation, ...rest });
  }

  remove(id: string) {
    return this.pLocationRep.delete({ id: id });
  }


}


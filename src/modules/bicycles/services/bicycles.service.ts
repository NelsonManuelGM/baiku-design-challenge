import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import createDataPoint from 'src/utils/arrToPointHelper';
import { Repository } from 'typeorm';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { Bicycle } from '../entities/bicycle.entity';

@Injectable()
export class BicyclesService {
  constructor(
    @InjectRepository(Bicycle)
    private readonly bicyclesRep: Repository<Bicycle>,
  ) { }

  async create({ type, gps_locations, locked }: CreateBicycleDto) {
    const newBike = new Bicycle();
    newBike.type = type;
    newBike.locked = locked;
    newBike.gps_location = createDataPoint(gps_locations)
    return await this.bicyclesRep.save(newBike);
  }

  async findAll() {
    return await this.bicyclesRep.find({});
  }

  async findOne(id: string) {
    return await this.bicyclesRep.findOne({ id: id });
  }

  async update(id: string, updateBicycleDto: UpdateBicycleDto) {
    if (Object.keys(updateBicycleDto).length === 0) {
      throw new BadRequestException('Update values are not defined!')
    }
    const { gps_locations, ...rest } = updateBicycleDto;
    const data = { ...rest }
    if (gps_locations) {
      const newGpsLocation = createDataPoint(gps_locations)
      data['gps_location'] = newGpsLocation
    }

    return await this.bicyclesRep.update({ id: id }, data)
  }

  async remove(id: string) {
    return await this.bicyclesRep.delete({ id: id });
  }
}

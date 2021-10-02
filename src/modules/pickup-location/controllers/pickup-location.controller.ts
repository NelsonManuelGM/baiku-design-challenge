import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { ClosestLocation } from '../dto/closest-location.dto';
import { CreatePickupLocationDto } from '../dto/create-pickup-location.dto';
import { UpdatePickupLocationDto } from '../dto/update-pickup-location.dto';
import { PickupLocationService } from '../services/pickup-location.service';
import { PickupLocation } from './../entities/pickup-location.entity';

@ApiTags('pickup-location')
@Controller('pickup-location')
export class PickupLocationController {
  constructor(private readonly pickupLocationService: PickupLocationService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: PickupLocation,
  })
  create(@Body() createPickupLocationDto: CreatePickupLocationDto) {
    return this.pickupLocationService.create(createPickupLocationDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PickupLocation,
    isArray: true
  })
  findAll() {
    return this.pickupLocationService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PickupLocation,
  })
  findOne(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.findOne(id);
  }

  @Get(':id')
  findByCoordinates(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updatePickupLocationDto: UpdatePickupLocationDto) {
    return this.pickupLocationService.update(id, updatePickupLocationDto);
  }

  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.remove(id);
  }

  //TODO modify this to a GET method with params
  @Post('closest')
  getClosestLocation(@Body() gpsLocations: ClosestLocation) {
    return this.pickupLocationService.closestLocation(gpsLocations);
  }
}

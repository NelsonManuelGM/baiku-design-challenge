import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
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


  @Get('closest')
  closest(@Query() gpsLocations: ClosestLocation) {
    return this.pickupLocationService.closestLocation(gpsLocations);
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

  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updatePickupLocationDto: UpdatePickupLocationDto) {
    try {
      return this.pickupLocationService.update(id, updatePickupLocationDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.remove(id);
  }

}

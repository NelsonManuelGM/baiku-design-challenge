import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { ClosestLocation } from '../dto/closest-location.dto';
import { CreatedPickUpLocation, CreatePickupLocationDto } from '../dto/create-pickup-location.dto';
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
    type: CreatedPickUpLocation,
  })
  create(@Body() createPickupLocationDto: CreatePickupLocationDto) {
    return this.pickupLocationService.create(createPickupLocationDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedPickUpLocation,
    isArray: true
  })
  findAll() {
    return this.pickupLocationService.findAll();
  }

  @ApiQuery({ name: 'lat', type: String })
  @ApiQuery({ name: 'lng', type: String })
  @Get('closest')
  closest(@Query() gpsLocations: ClosestLocation) {
    return this.pickupLocationService.closestLocation(gpsLocations);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedPickUpLocation,
  })
  findOne(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiBody({ type: CreatePickupLocationDto})
  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updatePickupLocationDto: UpdatePickupLocationDto) {
    try {
      return this.pickupLocationService.update(id, updatePickupLocationDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.pickupLocationService.remove(id);
  }

}

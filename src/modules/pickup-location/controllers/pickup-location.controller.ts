import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PickupLocationService } from '../services/pickup-location.service';
import { CreatePickupLocationDto } from '../dto/create-pickup-location.dto';
import { UpdatePickupLocationDto } from '../dto/update-pickup-location.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pickup-location')
@Controller('pickup-location')
export class PickupLocationController {
  constructor(private readonly pickupLocationService: PickupLocationService) {}

  @Post()
  create(@Body() createPickupLocationDto: CreatePickupLocationDto) {
    return this.pickupLocationService.create(createPickupLocationDto);
  }

  @Get()
  findAll() {
    return this.pickupLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pickupLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePickupLocationDto: UpdatePickupLocationDto) {
    return this.pickupLocationService.update(+id, updatePickupLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pickupLocationService.remove(+id);
  }
}

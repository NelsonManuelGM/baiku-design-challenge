import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BicyclesService } from '../services/bicycles.service';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';

@ApiTags('cats')
@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) {}

  @Post()
  async create(@Body() createBicycleDto: CreateBicycleDto) {
    return await this.bicyclesService.create(createBicycleDto);
  }

  @Get()
  findAll() {
    return this.bicyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bicyclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    return this.bicyclesService.update(+id, updateBicycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bicyclesService.remove(+id);
  }
}

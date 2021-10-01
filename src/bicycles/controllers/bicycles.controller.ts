import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { BicyclesService } from '../services/bicycles.service';

@ApiTags('cats')
@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) { }

  @Post()
  async create(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicyclesService.create(createBicycleDto);
  }

  @Get()
  findAll() {
    return this.bicyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UuidPipe) id: string) {
    return this.bicyclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    return this.bicyclesService.update(id, updateBicycleDto);
  }

  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.bicyclesService.remove(id);
  }
}

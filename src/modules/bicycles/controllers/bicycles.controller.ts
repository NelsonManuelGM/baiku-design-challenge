import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { CreateBicycleDto } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { BicyclesService } from '../services/bicycles.service';
import { BicyclesModule } from './../bicycles.module';

@ApiTags('bicycles')
@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) { }

  @Post()
  @Get()
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: BicyclesModule,
  })
  async create(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicyclesService.create(createBicycleDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: BicyclesModule,
    isArray: true
  })
  findAll() {
    return this.bicyclesService.findAll();
  }

  @Get(':id')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: BicyclesModule,
  })
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

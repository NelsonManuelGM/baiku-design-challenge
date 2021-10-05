import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { CreateBicycleDto, CreatedBicycle } from '../dto/create-bicycle.dto';
import { UpdateBicycleDto } from '../dto/update-bicycle.dto';
import { BicyclesService } from '../services/bicycles.service';
import { BicyclesModule } from './../bicycles.module';

@ApiTags('bicycles')
@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) { }

  @ApiBody({ type: CreateBicycleDto})
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: BicyclesModule,
  })
  @Post()
  async create(@Body() createBicycleDto: CreateBicycleDto) {
    return this.bicyclesService.create(createBicycleDto);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedBicycle,
    isArray: true
  })
  @Get()
  findAll() {
    return this.bicyclesService.findAll();
  }


  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedBicycle,
  })
  @Get(':id')
  findOne(@Param('id', UuidPipe) id: string) {
    return this.bicyclesService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiBody({ type: CreateBicycleDto})
  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
    try {
      return this.bicyclesService.update(id, updateBicycleDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.bicyclesService.remove(id);
  }
}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { CreatedReservation, CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationService } from '../services/reservation.service';
import { ReservationValidator } from '../services/reservation.validation.service';

@ApiTags('reservation')
@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly reservationValidator: ReservationValidator
  ) { }

  @ApiBody({ type: CreateReservationDto})
  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: CreatedReservation
  })
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const data = await this.reservationValidator.validateCreateDTO(createReservationDto)
      return this.reservationService.create(data);
    } catch (error) {
      return new HttpException(error, HttpStatus.CONFLICT)
    }
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedReservation,
    isArray: true
  })
  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedReservation,
  })
  @Get(':id')
  findOne(@Param('id', UuidPipe) id: string) {
    return this.reservationService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiBody({ type: CreateReservationDto})
  @Patch(':id')
  async update(@Param('id', UuidPipe) id: string, @Body() updateReservationDto: UpdateReservationDto) {
    try {
      //TODO finish this method
      const data = await this.reservationValidator.validateUpdateDTO(updateReservationDto)
      return await this.reservationService.update(id, data);
    } catch (error) {
      return new HttpException(error, HttpStatus.CONFLICT)
    }
    return this.reservationService.update(id, updateReservationDto);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.reservationService.remove(id);
  }
}

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UuidPipe } from 'src/pipes/uuid.pipes';
import { CreateReservationDto } from '../dto/create-reservation.dto';
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

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      const data = await this.reservationValidator.validateCreateDTO(createReservationDto)
      return this.reservationService.create(data);
    } catch (error) {
      return new HttpException(error, HttpStatus.CONFLICT)
    }
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UuidPipe) id: string) {
    return this.reservationService.findOne(id);
  }

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

  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.reservationService.remove(id);
  }
}

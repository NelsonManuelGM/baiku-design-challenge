import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bicycle } from 'src/modules/bicycles/entities/bicycle.entity';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { Connection, Repository } from 'typeorm';
import { BicyclesService } from './../../bicycles/services/bicycles.service';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private reservationRep: Repository<Reservation>,
    private bicyclesService: BicyclesService,
    private connection: Connection
  ) { }

  async create(data) {
    const { user, location, bicycle, reserve_for } = data;

    const newReservation = new Reservation();
    newReservation.user = user;
    newReservation.location = location;
    newReservation.reserve_for = reserve_for ?? new Date();

    let response
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (bicycle) {
        newReservation.bicycle = bicycle;
        newReservation.completed = true;
        await queryRunner.manager.update(Bicycle, { id: bicycle.id }, { locked: false });
      }
      response = await queryRunner.manager.save(newReservation);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transactions failed in create: ' + err)
    } finally {
      await queryRunner.release();
    }

    //to keep the return clean
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user: _, location: __, bicycle: ___, ...rest } = response
    return { ...rest }
  }

  findAll() {
    return this.reservationRep.find({});
  }

  findOne(id: string) {
    return this.reservationRep.findOne({ id: id });
  }

  async update(id: string, updateReservationDto) {
    const { location, bicycle, reserve_for } = updateReservationDto
    const newReservation = {}

    if (location) {
      newReservation['location'] = location;
    }
    if (reserve_for) {
      newReservation['reserve_for'] = reserve_for;
    }

    let response
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (bicycle) {
        newReservation['bicycle'] = bicycle;
        newReservation['completed'] = true;
        await queryRunner.manager.update(Bicycle, { id: bicycle.id }, { locked: false });
      }
      response = await queryRunner.manager.update(Reservation, { id: id }, newReservation);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transactions failed in update: ' + err)
    } finally {
      await queryRunner.release();
    }

    // return this.reservationRep.update({ id: id }, updateReservationDto)
    return response;
  }

  async remove(id: string) {
    const reservation = await this.reservationRep.findOne({ id: id })
    if (!reservation) {
      throw new NotFoundException("reservation doesn't exist");
    }
    let response

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (reservation.completed) {
        await queryRunner.manager.update(Bicycle, { id: reservation.bicycle_id }, { locked: true })
      }
      response = await queryRunner.manager.delete(Reservation, { id: id });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Transactions failed, ' + err)
    } finally {
      await queryRunner.release();
    }

    return response;
  }
}

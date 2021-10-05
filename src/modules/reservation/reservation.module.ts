import { BicyclesModule } from './../bicycles/bicycles.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupLocationModule } from './../pickup-location/pickup-location.module';
import { UsersModule } from './../users/users.module';
import { ReservationController } from './controllers/reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './services/reservation.service';
import { ReservationValidator } from './services/reservation.validation.service';

@Module({
  imports: [UsersModule, PickupLocationModule, BicyclesModule, TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationValidator]
})
export class ReservationModule { }

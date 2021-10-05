import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/modules/reservation/entities/reservation.entity';
import { AppController } from './app.controller';
import { BicyclesModule } from './modules/bicycles/bicycles.module';
import { Bicycle } from './modules/bicycles/entities/bicycle.entity';
import { PickupLocation } from './modules/pickup-location/entities/pickup-location.entity';
import { PickupLocationModule } from './modules/pickup-location/pickup-location.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    BicyclesModule,
    PickupLocationModule,
    UsersModule,
    ReservationModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Bicycle, User, Reservation, PickupLocation],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule { }

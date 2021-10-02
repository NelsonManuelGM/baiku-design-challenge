import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupLocationController } from './controllers/pickup-location.controller';
import { PickupLocation } from './entities/pickup-location.entity';
import { PickupLocationService } from './services/pickup-location.service';

@Module({
  imports: [TypeOrmModule.forFeature([PickupLocation])],
  controllers: [PickupLocationController],
  providers: [PickupLocationService],
  exports: [PickupLocationService]
})
export class PickupLocationModule { }

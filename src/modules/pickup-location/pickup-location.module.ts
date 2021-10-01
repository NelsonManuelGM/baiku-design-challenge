import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PickupLocationService } from './services/pickup-location.service';
import { PickupLocationController } from './controllers/pickup-location.controller';
import { PickupLocation } from './entities/pickup-location.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PickupLocation])],
  controllers: [PickupLocationController],
  providers: [PickupLocationService]
})
export class PickupLocationModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BicyclesService } from './services/bicycles.service';
import { BicyclesController } from './controllers/bicycles.controller';
import { Bicycle } from './entities/bicycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bicycle])],
  controllers: [BicyclesController],
  providers: [BicyclesService],
})
export class BicyclesModule {}

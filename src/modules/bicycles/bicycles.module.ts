import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicyclesController } from './controllers/bicycles.controller';
import { Bicycle } from './entities/bicycle.entity';
import { BicyclesService } from './services/bicycles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bicycle])],
  controllers: [BicyclesController],
  providers: [BicyclesService],
})
export class BicyclesModule { }

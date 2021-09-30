import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BicyclesModule } from './bicycles/bicycles.module';

@Module({
  imports: [BicyclesModule],
  controllers: [AppController],
})
export class AppModule {}

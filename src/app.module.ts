import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BicyclesModule } from './modules/bicycles/bicycles.module';
import { Bicycle } from './modules/bicycles/entities/bicycle.entity';
import { PickupLocationModule } from './modules/pickup-location/pickup-location.module';

@Module({
  imports: [
    BicyclesModule,
    PickupLocationModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Bicycle],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

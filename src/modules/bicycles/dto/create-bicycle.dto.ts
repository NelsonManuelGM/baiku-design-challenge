import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { GeoJsonObject, Position } from 'geojson';
import { UserRoleType } from '../entities/bicycle.entity';

export interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class CreateBicycleDto {
  @ApiProperty()
  @IsBoolean()
  locked: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['TOURING','SPORT'])
  type: UserRoleType;

  @ApiProperty({type: Array ,example:[254525852,-80125474]})
  @IsArray()
  @IsNotEmpty()
  gps_locations: PointType;
}

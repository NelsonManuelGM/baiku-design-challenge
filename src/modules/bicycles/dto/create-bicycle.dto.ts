import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { GeoJsonObject, Position } from 'geojson';
import { UserRoleType } from '../entities/bicycle.entity';

interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class CreateBicycleDto {
  @IsBoolean()
  locked: boolean;

  @IsString()
  @IsNotEmpty()
  @IsIn(['TOURING','SPORT'])
  type: UserRoleType;

  @IsArray()
  @IsNotEmpty()
  gps_locations: PointType;
}

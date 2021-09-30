import { TOURING, SPORT, UserRoleType } from './../entities/bicycle.entity';
import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { GeoJsonObject, Position } from 'geojson';

interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class CreateBicycleDto {
  @IsBoolean()
  locked: boolean;

  @IsString()
  @IsNotEmpty()
  type: UserRoleType;

  gpsLocations: PointType;
}

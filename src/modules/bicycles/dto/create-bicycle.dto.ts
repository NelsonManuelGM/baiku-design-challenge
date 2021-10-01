import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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
  type: UserRoleType;

  @IsArray()
  @IsNotEmpty()
  gpsLocations: PointType;
}

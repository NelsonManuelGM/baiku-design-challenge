import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { GeoJsonObject, Position } from "geojson";

interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class ClosestLocation {
  @IsArray()
  @IsNotEmpty()
  gpsLocations: PointType;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}

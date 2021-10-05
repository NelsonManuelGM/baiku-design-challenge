import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { GeoJsonObject, Position } from "geojson";

interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class CreatePickupLocationDto {
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
  street: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsArray()
  @IsNotEmpty()
  gps_locations: PointType;

}

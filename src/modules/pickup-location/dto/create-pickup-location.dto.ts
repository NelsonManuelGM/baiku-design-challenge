import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { GeoJsonObject, Position, Point } from "geojson";

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
    postalCode: string;
  
    @IsArray()
    @IsNotEmpty()
    gpsLocations: PointType;

}

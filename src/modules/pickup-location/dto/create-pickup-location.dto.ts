import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { GeoJsonObject, Position } from "geojson";

interface PointType extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

export class CreatePickupLocationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty({type: Array ,example:[254525852,-80125474]})
  @IsArray()
  @IsNotEmpty()
  gps_locations: PointType;

}

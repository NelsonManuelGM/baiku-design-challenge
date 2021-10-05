import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ClosestLocation {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lng: string;
}
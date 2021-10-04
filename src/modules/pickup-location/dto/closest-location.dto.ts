import { IsNotEmpty, IsString } from "class-validator";

export class ClosestLocation {
  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;
}